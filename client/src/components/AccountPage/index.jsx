import { useState, useEffect } from "react";

import Nav from "./Nav";
import AccountContent from "./AccountContent";

import {
  fetchStudentData,
  fetchTeacherData,
  fetchUserData,
} from "../../helpers/requestHelpers";
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
    sectionId: null,
    attemptId: null,
  });
  const [tdnaOpen, setTdnaOpen] = useState(false);
  const [studentData, setStudentData] = useState(false);
  const [teacherData, setTeacherData] = useState(false);

  const updateContentView = (input, prevFunc) => {
    if (input === "use prev") {
      setContentView(prevFunc);
      return;
    }

    const { type, view, sectionId, attemptId } = input;

    console.table({ type, view, sectionId, attemptId });
    setContentView({ type, view, sectionId, attemptId });
  };

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
        updateContentView({
          type,
          view: "Account",
          sectionId: null,
          attemptId: null,
        });
        setNavButtons((prev) => ({
          ...prev,
          meta: [
            {
              text: "Account",
              type,
              navAction: () =>
                updateContentView({
                  type,
                  view: "Account",
                  sectionId: null,
                  attemptId: null,
                }),
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
                  const { code, section_id: sectionId } = sec;
                  const type = "Student";
                  return {
                    text: code,
                    type,
                    sectionId,
                    navAction: () =>
                      updateContentView({
                        type,
                        sectionId,
                        view: "Section",
                        attemptId: null,
                      }),
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
    }
  }, [userId, token, user, studentData]);

  useEffect(() => {
    if (user && user.is_teacher) {
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
                  const { code, section_id: sectionId } = sec;
                  const type = "Teacher";
                  return {
                    text: `${code} ${namer.getName(code)}`,
                    type,
                    sectionId,
                    navAction: () =>
                      updateContentView({
                        type,
                        sectionId,
                        attemptId: null,
                        view: "Section",
                      }),
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
  }, [user, token, userId, teacherData]);

  const navProps = {
    navButtons,
    setToken,
    pageTitle: "🧬 DNAducation",
    contentView,
  };
  const accountContentProps = {
    user,
    sections,
    contentView,
    updateContentView,
    exams,
    setExamId,
    token,
    setTdnaOpen,
    setStudentData,
    setTeacherData,
  };
  return (
    <Nav {...navProps}>
      <AccountContent {...accountContentProps} />
    </Nav>
  );
};

export default AccountPage;
