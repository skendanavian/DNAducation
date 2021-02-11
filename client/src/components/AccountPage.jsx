import { useContext, useEffect } from "react";

import Typography from "@material-ui/core/Typography";

import useAxios from "../hooks/useAxios";
import Nav from "./Nav";

const baseURL = "http://localhost:3001";

const AccountPage = (props) => {
  const { setToken } = props;
  console.log(userId);
  let classCodes = [
    "STAT 100",
    "HIST 220",
    "PHIL 230",
    "CALC 232",
    "ENG 330",
    "PSY 395",
    "ANTH 440",
  ];
  const pageTitle = "🧬 DNAducation";
  let user = { name: "Devin Sanders", email: "dsand@gmail.com" };

  const axios = useAxios();

  useEffect(() => {
    // get class codes for user
    if (userId) {
      let sectionsURL = baseURL + `/users/${userId}/sections`;
      console.log(sectionsURL);
      const sectionsReq = axios.get(sectionsURL);
      // const exams = axios.get(baseURL + `/sections/exams`, [sectionIds]);
      // get class titles, descriptions, section teacher, section ids

      console.log(sectionsReq);

      sectionsReq.then((result) => {
        console.log("what?", result);
      });
    }
  }, [userId]);

  const navProps = {
    setToken,
    classCodes,
    pageTitle,
    user,
  };
  return (
    <Nav {...navProps}>
      <Typography>
        Et suscipit doloribus eos qui magni ad. Odio deserunt enim odio tempora
        commodi. Sunt corrupti voluptas quas eos quia. Maiores deserunt eius
        atque rerum quibusdam. Totam unde est quo neque cum.
      </Typography>
    </Nav>
  );
};

export default AccountPage;
