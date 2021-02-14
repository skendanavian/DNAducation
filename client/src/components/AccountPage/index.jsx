import { useState, useEffect, useRef } from "react";

import generateAxios from "../../helpers/generateAxios";
import Nav from "./Nav";
import AccountContent from "./AccountContent";

require("dotenv").config({ path: "../../../.env" });

const baseURL = process.env.REACT_APP_REQUEST_URL;

const AccountPage = (props) => {
  const { setToken, token, userId } = props;

  const [user, setUser] = useState({});
  const [exams, setExams] = useState([]);
  const [contentView, setContentView] = useState("Account");
  const updateContentView = (view) => setContentView(view);

  // below stored in useRef for good react practice
  // as value read in useEffect below, eslint complains otherwise
  const initalNavState = useRef([
    [{ text: "Account", navAction: () => updateContentView("Account") }],
  ]);
  const [navButtons, setNavButtons] = useState(initalNavState.current);

  useEffect(() => {
    if (userId && token) {
      const sectionsURL = baseURL + `/users/${userId}/sections`;
      const attemptsURL = baseURL + `/users/${userId}/attempts`;
      const examsURL = baseURL + `/sections/exams`;
      const userURL = baseURL + `/users/${userId}`;

      const axios = generateAxios(token);

      const sectionsReq = axios.get(sectionsURL);
      const attemptsReq = axios.get(attemptsURL);
      axios.get(userURL).then(({ data: userRes }) => {
        setUser(userRes);
      });

      sectionsReq
        .then(({ data: sections }) => {
          setNavButtons(() => {
            return [
              ...initalNavState.current,
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
            const examSection = sections.find((section) => {
              return section.section_id === exam.section_id;
            });
            const examAttempts = attempts.filter((attempt) => {
              return attempt.exam_id === exam.id;
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
  }, [userId, token]);

  const navProps = {
    buttonDefs: navButtons,
    setToken,
    pageTitle: "🧬 DNAducation",
  };
  return (
    <Nav {...navProps}>
      <AccountContent user={user} contentView={contentView} exams={exams} />
    </Nav>
  );
};

export default AccountPage;
