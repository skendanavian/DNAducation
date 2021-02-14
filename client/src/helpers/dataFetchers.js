import generateAxios from "./generateAxios";

require("dotenv").config({ path: "../../../.env" });

const baseURL = process.env.REACT_APP_REQUEST_URL;

export function fetchStudentData(userId, token) {
  const sectionsURL = baseURL + `/users/${userId}/sections`;
  const attemptsURL = baseURL + `/users/${userId}/attempts`;
  const examsURL = baseURL + `/sections/exams`;

  const axios = generateAxios(token);

  const sectionsReq = axios.get(sectionsURL);
  const attemptsReq = axios.get(attemptsURL);

  return sectionsReq
  .then(({ data: sections }) => {
    const sectionIds = sections.map((sec) => sec.section_id);
    const examsReq = axios.get(examsURL, { params: { sectionIds } });
    return Promise.all([sectionsReq, attemptsReq, examsReq]);
  })
}

export function fetchTeacherData(userId, token) {
  const sectionsURL = baseURL + `/users/${userId}/sections`;
  const attemptsURL = baseURL + `/users/${userId}/attempts`;
  const examsURL = baseURL + `/sections/exams`;

  const axios = generateAxios(token);

  const sectionsReq = axios.get(sectionsURL, { params: {'teacher':true}});
  const attemptsReq = axios.get(attemptsURL);

  return sectionsReq
  .then(({ data: sections }) => {
    const sectionIds = sections.map((sec) => sec.section_id);
    const examsReq = axios.get(examsURL, { params: { sectionIds } });
    return Promise.all([sectionsReq, attemptsReq, examsReq]);
  })
}

export function fetchUserData(userId, token) {
  const sectionsURL = baseURL + `/users/${userId}`;

  const axios = generateAxios(token);

  return axios.get(sectionsURL);
}
