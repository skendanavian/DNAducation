import { useState, useEffect } from "react";

import Nav from "./Nav";
import AccountContent from "./AccountContent";

import {
  fetchStudentData,
  fetchTeacherData,
  fetchUserData,
} from "../../helpers/dataFetchers";
import sectionNamer from "../../helpers/sectionNamer";

require("dotenv").config({ path: "../../../.env" });

const AccountPage = (props) => {
  const { setToken, token, userId, setExamId } = props;

  const [user, setUser] = useState({});
  const [sections, setSections] = useState({
    student: [],
    teacher: [],
  });
  const [exams, setExams] = useState({
    student: [],
    teacher: [],
  });
  const [contentView, setContentView] = useState({
    type: null,
    view: "Loading",
  });
  const [tdnaOpen, setTdnaOpen] = useState(false);
  const updateContentView = ({ type, view }) => {
    setContentView({ type, view });
  };

  // below stored in useRef for good react practice
  // as value read in useEffect below, eslint complains otherwise
  const [navButtons, setNavButtons] = useState({
    meta: [],
    studentSections: [],
    teacherSections: [],
  });

  useEffect(() => {
    if (userId && token) {
      fetchUserData(userId, token).then(({ data: user }) => {
        setUser(user);
        const type = user.is_teacher ? "Teacher" : "Student";
        updateContentView({ type, view: "Account" });
        setNavButtons((prev) => ({
          ...prev,
          meta: [
            {
              text: "Account",
              type,
              navAction: () => updateContentView({ type, view: "Account" }),
            },
          ],
        }));
      });
    }
  }, [token, userId, tdnaOpen]);

  useEffect(() => {
    if (userId && token && user) {
      fetchStudentData(userId, token)
        .then(([{ data: sections }, { data: attempts }, { data: exams }]) => {
          console.log("student sections");
          console.table(sections);
          console.log("student attempts");
          console.table(attempts);
          console.log("student exams");
          console.table(exams);
          if (sections.length) {
            setSections((prev) => ({ ...prev, student: sections }));
            setNavButtons((prev) => {
              return {
                ...prev,
                studentSections: sections.map((sec) => {
                  const { code, section_id } = sec;
                  const type = "Student";
                  return {
                    text: code,
                    type,
                    navAction: () =>
                      updateContentView({ type, view: section_id }),
                  };
                }),
              };
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
            setExams((prev) => ({ ...prev, student: examsWithData }));
          }
        })
        .catch((err) => {
          console.error(err);
        });
      if (user.is_teacher) {
        fetchTeacherData(userId, token)
          .then(([{ data: sections }, { data: attempts }, { data: exams }]) => {
            if (sections.length) {
              console.log("teacher sections");
              console.table(sections);
              console.log("teacher attempts");
              console.table(attempts);
              console.log("teacher exams");
              console.table(exams);
              setSections((prev) => ({ ...prev, teacher: sections }));
              setNavButtons((prev) => {
                // creates a new letter name, just dependent on the order
                // restarts a 'A' from a new class
                const namer = sectionNamer();
                return {
                  ...prev,
                  teacherSections: sections.map((sec) => {
                    const { code, section_id } = sec;
                    const type = "Teacher";
                    return {
                      text: `${code} ${namer.getName(code)}`,
                      type,
                      navAction: () =>
                        updateContentView({ type, view: section_id }),
                    };
                  }),
                };
              });
              const examsWithData = exams.map((exam) => {
                const examSection = sections.find((section) => {
                  return section.section_id === exam.section_id;
                });
                const examAttempts = attempts.filter((attempt) => {
                  return attempt.exam_id === exam.id && attempt.time_submitted;
                });

                return {
                  ...exam,
                  section: examSection,
                  attempts: examAttempts,
                };
              });
              setExams((prev) => ({ ...prev, teacher: examsWithData }));
            }
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
  const accountContentProps = {
    user,
    sections,
    contentView,
    exams,
    setExamId,
    setTdnaOpen,
  };
  return (
    <Nav {...navProps}>
      <AccountContent {...accountContentProps} />
    </Nav>
  );
};

export default AccountPage;
