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

  const details = {
    section_id,
    questions,
    due_time,
    title,
    description,
  };

  console.log(details);

  return axios.post(`${baseURL}/exams`, details).then((res) => {
    const examId = res.data[0].id;
    console.log({ examId });

    return axios.post(`${baseURL}/exams/${examId}/questions`, {
      questions,
    });
  });
}
