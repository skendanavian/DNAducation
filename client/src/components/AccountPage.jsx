import { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";

import useAxios from "../hooks/useAxios";
import Nav from "./Nav";
import { Box } from "@material-ui/core";

const baseURL = "http://localhost:3001";

const AccountPage = (props) => {
  const { setToken } = props;
  const pageTitle = "🧬 DNAducation";

  const userId = localStorage.getItem("userId");

  const [classCodes, setClassCodes] = useState([]);
  const [exams, setExams] = useState([]);

  const axios = useAxios(sessionStorage.getItem("jwt"));

  useEffect(() => {
    if (userId) {
      const sectionsURL = baseURL + `/users/${userId}/sections`;
      const examsUrl = baseURL + `/sections/exams`;

      axios
        .get(sectionsURL)
        .then(({ data: sections }) => {
          const classCodes = sections.map((sec) => sec.code);
          const sectionIds = sections.map((sec) => sec.section_id);
          setClassCodes(classCodes);
          return axios.get(examsUrl, { params: { sectionIds } });
        })
        .then(({ data: exams }) => {
          setExams(exams);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const navProps = {
    setToken,
    classCodes,
    pageTitle,
  };

  return (
    <Nav {...navProps}>
      <Box>Name: Email: </Box>
      <Box>Click Here to record your TypeDNA!</Box>
      {exams.map((exam) => (
        <Typography>{JSON.stringify(exam)}</Typography>
      ))}
    </Nav>
  );
};

export default AccountPage;
