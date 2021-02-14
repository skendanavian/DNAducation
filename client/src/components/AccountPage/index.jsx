import { useState, useEffect, useRef } from "react";

import Nav from "./Nav";
import AccountContent from "./AccountContent";

import {
  fetchStudentData,
  fetchTeacherData,
  fetchUserData,
} from "../../helpers/dataFetchers";

require("dotenv").config({ path: "../../../.env" });

const AccountPage = (props) => {
  const { setToken, token, userId } = props;

  const [exams, setExams] = useState([]);
  const [user, setUser] = useState({});
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
      fetchUserData(userId, token).then(({ data: user }) => {
        setUser(user);
      });
    }
  }, [token, userId]);

  useEffect(() => {
    if (userId && token) {
      fetchStudentData(userId, token)
        .then(([{ data: sections }, { data: attempts }, { data: exams }]) => {
          setNavButtons(() => {
            return [
              ...initalNavState.current,
              sections.map((sec) => {
                const { code } = sec;
                return { text: code, navAction: () => updateContentView(code) };
              }),
            ];
          });
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
      if (user && user.is_teacher) {
        fetchTeacherData(userId, token)
          .then(([{ data: sections }, { data: attempts }, { data: exams }]) => {
            setNavButtons((prev) => {
              return [
                ...prev,
                sections.map((sec) => {
                  const { code } = sec;
                  return {
                    text: code,
                    navAction: () => updateContentView(code),
                  };
                }),
              ];
            });
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
            setExams((prev) => [...prev, ...examsWithData]);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, [userId, token, user]);

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
