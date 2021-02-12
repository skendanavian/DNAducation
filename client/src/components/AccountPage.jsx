import { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import { Box, Button, Divider } from "@material-ui/core";

import useAxios from "../hooks/useAxios";
import Nav from "./Nav";
import ExamCard from "./ExamCard";

require("dotenv").config({ path: "../../.env" });

const baseURL = process.env.REACT_APP_REQUEST_URL;

const AccountPage = (props) => {
  const pageTitle = "🧬 DNAducation";

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

  const [attempts, setAttempts] = useState([]);
  let [sections, setSections] = useState([]);

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
    setUserId,
    setToken,
    pageTitle,
  };
  return (
    <>
      <Nav {...navProps}>{contentController(contentView, exams)}</Nav>
      <Typography>Sections{sections && JSON.stringify(sections[0])}</Typography>
      <Typography>Attempts{attempts && JSON.stringify(attempts[0])}</Typography>
    </>
  );
};

export default AccountPage;
