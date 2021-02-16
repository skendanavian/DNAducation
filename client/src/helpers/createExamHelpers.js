import generateAxios from "./generateAxios";

require("dotenv").config({ path: "../../../.env" });

const baseURL = process.env.REACT_APP_REQUEST_URL;

export default function createExamAndQuestions(
  examDetails,
  questions,
  section_id,
  token
) {
  const axios = generateAxios(token);

  const { desc: description, title, date: due_time } = examDetails;

  const examData = {
    section_id,
    questions,
    due_time,
    title,
    description,
  };

  console.log(examData);

  return axios
    .post(`${baseURL}/exams`, examData)
    .then((res) => console.log(res.data));
}
