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

  // create section
  router.post("/", (req, res, next) => {
    createSection(req.body)
      .then((sections) => {
        res.json(sections);
      })
      .catch((err) => next(err));
  });

  // get all exams for provided sections
  router.get(`/exams`, (req, res, next) => {
    const { sectionIds } = req.query;
    getExamsBySections(sectionIds)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};