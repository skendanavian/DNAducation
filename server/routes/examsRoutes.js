const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getExams,
  getExamById,
  getQuestionsByExam,
  incrementSubmissionCount,
  setQuestionsByExam,
  deleteQuestionsByExam
}) => {

  // get all exams
  router.get("/", (req, res, next) => {
    getExams()
      .then((exams) => {
        res.json(exams);
      })
      .catch((err) => next(err));
  });

  // create exam
  router.post("/", (req, res, next) => {
    getExams()
      .then((exams) => {
        res.json(exams);
      })
      .catch((err) => next(err));
  });

  // get exam by id
  router.get("/:examId", (req, res, next) => {
    const {examId} = req.params;
    getExamById(examId)
      .then((exam) => {
        res.json(exam);
      })
      .catch((err) => next(err));
  });

  // update exam submission count
  router.patch("/:examId", (req, res, next) => {
    const { examId } = req.params;
    incrementSubmissionCount(examId)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  // get all questions for an exam
  router.get(`/:examId/questions`, (req, res, next) => {
    const { examId } = req.params;
    getQuestionsByExam(examId)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        res.json(result);
      })
      .catch((err) => next(err));
  });

  // insert all questions for an exam
  router.post(`/:examId/questions`, (req, res, next) => {
    const { examId } = req.params;
    const { questions } = req.body;

    setQuestionsByExam(examId, questions)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  // delete all questions for an exam
  router.delete(`/:examId/questions`, (req, res, next) => {
    const { examId } = req.params;
    
    deleteQuestionsByExam(examId)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};