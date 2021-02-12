import { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import { Box, Button, Divider } from "@material-ui/core";

import useAxios from "../../hooks/useAxios";
import Nav from "./Nav";
import AccountContent from "./AccountContent";

require("dotenv").config({ path: "../../../.env" });

const baseURL = process.env.REACT_APP_REQUEST_URL;

const AccountPage = (props) => {
  const { setToken, token, userId } = props;

  const pageTitle = "🧬 DNAducation";

  const [exams, setExams] = useState([]);
  const [contentView, setContentView] = useState("Account");

  const updateContentView = (view) => {
    setContentView(view);
  };
  const initalNavState = [
    [{ text: "Account", navAction: () => updateContentView("Account") }],
  ];
  const [navButtons, setNavButtons] = useState(initalNavState);

  const axios = useAxios(token);

  useEffect(() => {
    if (userId && token) {
      const sectionsURL = baseURL + `/users/${userId}/sections`;
      const attemptsURL = baseURL + `/users/${userId}/attempts`;
      const examsURL = baseURL + `/sections/exams`;

      let attempts = [];
      let sections = [];

      // get sections and attempts for user
      Promise.all([axios.get(sectionsURL), axios.get(attemptsURL)])
        .then(([{ data: sectionsRes }, { data: attemptsRes }]) => {
          attempts = attemptsRes;
          sections = sectionsRes;

          // set classcodes and nav callbacks for drawer/sidebar
          setNavButtons((prev) => {
            return [
              ...prev,
              sections.map((sec) => {
                const { code } = sec;
                return { text: code, navAction: () => updateContentView(code) };
              }),
            ];
          });

          // get exams for sections user is in
          const sectionIds = sections.map((sec) => sec.section_id);
          return axios.get(examsURL, { params: { sectionIds } });
        })
        .then(({ data: exams }) => {
          const examsWithAttempts = exams.map((exam) => {
            return {
              ...exam,
              section: sections.find((sec) => {
                return sec.section_id === exam.section_id;
              }),
              attempts: attempts.filter((att) => {
                return att.exam_id === exam.id;
              }),
            };
          });
          console.log({ examsWithAttempts });
          setExams(examsWithAttempts);
        })
        .catch((err) => console.error(err));
    }
  }, [userId, token, axios]);

  const navProps = {
    buttonDefs: navButtons,
    setToken,
    pageTitle,
  };
  return (
    <Nav {...navProps}>
      <AccountContent contentView={contentView} exams={exams} />
    </Nav>
  );
};

export default AccountPage;
