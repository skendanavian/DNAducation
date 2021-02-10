const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({  
  getAttemptsByUser,
  getAttemptById,
  createAttempt,
  updateAttempt,
  setExamAttemptAnswer,
  submitMarkForAnswer
}) => {
  // router.get("/", (req, res, next) => {
  //   getUsers()
  //     .then((users) => {
  //       res.json(users);
  //     })
  //     .catch((err) => next(err));
  // });

  router.get(`/:id`, (req, res, next) => {
    const { id } = req.params;
    getAttemptById(id)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  //const {section_students_id, exam_id, time_started} = data;
// const createAttemptTest = {"section_students_id": 2, 'exam_id': 3, "time_started": "2021-02-09 22:58:41.175932+00" }
  router.post(`/`, (req, res, next) => {
    // const {  } = req.body;
    createAttempt(req.body)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        console.log(result);
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  router.post(`/`, (req, res, next) => {
    // const {  } = req.body;
    createAttempt(req.body)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        console.log(result);
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  //{"exam_attempt_id": 3, "exam_question_id": 2, "answer": "this is my answer", "confidence_level": 97 }

  // answering question
  router.post(`/:attemptsId/answers`, (req, res, next) => {
    const {
      attemptsId: exam_attempt_id,
    } = req.params;

    const data = {exam_attempt_id, ...req.body};
    
    setExamAttemptAnswer(data)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        console.log(result);
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  // submitting a mark for an individual question
  router.patch(`/:attemptsId/answers/:answersId`, (req, res, next) => {
    const {
      answersId: exam_answers_id,
    } = req.params;
    const { mark } = req.body;

    submitMarkForAnswer(Number(exam_answers_id), mark)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};