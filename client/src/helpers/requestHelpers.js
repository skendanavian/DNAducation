import generateAxios from "./generateAxios";

require("dotenv").config({ path: "../../../.env" });

const baseURL = process.env.REACT_APP_REQUEST_URL;

const sectionsURL = (userId) =>  `${baseURL}/users/${userId}/sections`;
const attemptsURL = (userId) =>  `${baseURL}/users/${userId}/attempts`;
const examsURL = () =>  `${baseURL}/sections/exams`;

const teacherSectionsURL = (teacherId) =>  {
  return `${baseURL}/users/teacher/${teacherId}/sections`;
}
const teacherAttemptsURL = (teacherId) => {
  return `${baseURL}/users/teacher/${teacherId}/attempts`;
}

export function fetchStudentData(userId, token) {
  const axios = generateAxios(token);

  const sectionsReq = axios.get(sectionsURL(userId));
  const attemptsReq = axios.get(attemptsURL(userId));

  return sectionsReq
  .then(({ data: sections }) => {
    const sectionIds = sections.map((sec) => sec.section_id);
    let examsReq;
    if(!sectionIds.length) examsReq = new Promise((res) => res({data:[]}));
    else examsReq = axios.get(examsURL(userId), { params: { sectionIds } }); 
    return Promise.all([sectionsReq, attemptsReq, examsReq]);
  })
}

export function fetchTeacherData(userId, token) {
  const axios = generateAxios(token);

  const sectionsReq = axios.get(teacherSectionsURL(userId));
  const attemptsReq = axios.get(teacherAttemptsURL(userId));

  return sectionsReq
  .then(({ data: sections }) => {
    const sectionIds = sections.map((sec) => sec.section_id);
    let examsReq;
    if(!sectionIds.length) examsReq = new Promise((res) => res({data:[]}));
    else examsReq = axios.get(examsURL(userId), { params: { sectionIds } }); 
    return Promise.all([sectionsReq, attemptsReq, examsReq]);
  })
}

export function fetchUserData(userId, token) {
  const userURL = `${baseURL}/users/${userId}`;

  const axios = generateAxios(token);

  return axios.get(userURL);
}

export function fetchClasses() {
  const classesURL = `${baseURL}/classes`;

  const axios = generateAxios();

  return axios.get(classesURL);
}

export function postClass(classDetails) {
  const classesURL = `${baseURL}/classes`;

  const axios = generateAxios();

  return axios.post(classesURL, classDetails);
}

export function postSection(sectionDetails) {
  const sectionsURL = `${baseURL}/sections`;

  const axios = generateAxios();

  return axios.post(sectionsURL, sectionDetails);
}

export function getAttemptData(attemptId) {
  const attemptsURL = `${baseURL}/attempts/${attemptId}`;

  const axios = generateAxios();

  return axios.get(attemptsURL);
}

export function markAnswers(attemptId, marks) {
  const markAnswersURL = `${baseURL}/attempts/${attemptId}/mark`;

  const axios = generateAxios();

  return axios.patch(markAnswersURL, { marks });
}
