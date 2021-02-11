const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getSections,
  createSection,
  getSectionsByTeacher,
  getSectionsByStudent,
  getExamsBySections
}) => {

  // get all sections
  router.get("/", (req, res, next) => {
    getSections()
      .then((exams) => {
        res.json(exams);
      })
      .catch((err) => next(err));
  });

  // create sections
  router.post("/", (req, res, next) => {
    createSection(req.body)
      .then((sections) => {
        res.json(sections);
      })
      .catch((err) => next(err));
  });

  // get section by id
  // router.get("/:sectionId", (req, res, next) => {
  //   const {sectionId} = req.params;
  //   getSectionById(sectionId)
  //     .then((section) => {
  //       res.json(section);
  //     })
  //     .catch((err) => next(err));
  // });

  // get all exams for provided sections
  router.get(`/exams`, (req, res, next) => {
    const { sectionIds } = req.query;
    getExamsBySections(sectionIds)
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