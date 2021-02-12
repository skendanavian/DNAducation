import { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import { Box, Button, Divider } from "@material-ui/core";

import useAxios from "../hooks/useAxios";
import Nav from "./Nav";
import ExamCard from "./ExamCard";

require("dotenv").config({ path: "../../.env" });

const baseURL = process.env.REACT_APP_REQUEST_URL;

const AccountPage = (props) => {
  const { setToken } = props;
  const pageTitle = "🧬 DNAducation";

  const userId = localStorage.getItem("userId");

  const [exams, setExams] = useState([]);
  const [contentView, setContentView] = useState("Account");

  const updateContentView = (view) => {
    console.log(view);
    setContentView(view);
  };
  const initalNavState = [
    [{ text: "Account", navAction: () => updateContentView("Account") }],
  ];
  const [navButtons, setNavButtons] = useState(initalNavState);

  const axios = useAxios(sessionStorage.getItem("jwt"));

  useEffect(() => {
    if (userId) {
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
          setExams(examsWithAttempts);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const sectionDetails = (details) => {
    const { title, description, teacher_id, code } = details;
    return (
      <Box>
        <Typography>{code}</Typography>
        <Typography>{title}</Typography>
        <Typography>{description}</Typography>
        <Typography>{teacher_id}</Typography>
      </Box>
    );
  };

  const accountDetails = (details) => {
    const { name, email } = details;
    return (
      <Box>
        <Typography>{name}</Typography>
        <Typography>{email}</Typography>
        <Button>Record Your TypeDNA Profile!</Button>
      </Box>
    );
  };

  // take in Account or class code as view
  const contentController = (contentView, exams) => {
    if (!contentView) {
      return <Typography>Where are you?</Typography>;
    }
    if (!exams.length) {
      return <Typography>No exams Here!</Typography>;
    }
    if (contentView === "Account") {
      // display unsubmitted exams
      const examsToDisplay = exams.filter((exam) => {
        return !exam.attempts.length;
      });

      return (
        <>
          {accountDetails({ name: "Edward Johnson", email: "eddy@gmail.com" })}
          <Divider></Divider>
          <Typography>Unsubmitted Assessments</Typography>
          {examsToDisplay.map((exam) => (
            <ExamCard key={exam.title} exam={exam} />
          ))}
        </>
      );
    } else {
      // if view not account, view is a code
      // display exams from that section
      const examsToDisplay = exams.filter((exam) => {
        return exam.section.code === contentView;
      });

      return (
        <>
          {sectionDetails(examsToDisplay[0].section)}
          <Divider></Divider>
          <Typography>Unsubmitted Assessments</Typography>
          {examsToDisplay.map((exam) => (
            <ExamCard key={exam.title} exam={exam} />
          ))}
        </>
      );
    }
  };

  const navProps = {
    buttonDefs: navButtons,
    setToken,
    pageTitle,
  };
  return <Nav {...navProps}>{contentController(contentView, exams)}</Nav>;
};

export default AccountPage;
