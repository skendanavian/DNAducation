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

      const sectionsReq = axios.get(sectionsURL);
      const attemptsReq = axios.get(attemptsURL);

      sectionsReq
        .then(({ data: sections }) => {
          setNavButtons(() => {
            return [
              ...initalNavState,
              sections.map((sec) => {
                const { code } = sec;
                return { text: code, navAction: () => updateContentView(code) };
              }),
            ];
          });
          const sectionIds = sections.map((sec) => sec.section_id);
          const examsReq = axios.get(examsURL, { params: { sectionIds } });
          return Promise.all([sectionsReq, attemptsReq, examsReq]);
        })
        .then(([{ data: sections }, { data: attempts }, { data: exams }]) => {
          const examsWithData = exams.map((exam) => {
            const examSection = sections.find((sec) => {
              return sec.section_id === exam.section_id;
            });
            const examAttempts = attempts.filter((att) => {
              return att.exam_id === exam.id;
            });

            return {
              ...exam,
              section: examSection,
              attempts: examAttempts,
            };
          });
          setExams(examsWithData);
        })
        .catch((err) => {
          console.error(err);
        });
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
