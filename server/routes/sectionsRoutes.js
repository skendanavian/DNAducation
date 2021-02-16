const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getSections,
  getUserIdsFromStudentNumbers,
  createSectionWithStudentIds,
  getExamsBySections,
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
    console.log(req.body);
    const {
      classId: class_id,
      userId: teacher_user_id,
      studentNumbers,
    } = req.body;

    getUserIdsFromStudentNumbers(studentNumbers)
      .then((studentIds) => {
        return createSectionWithStudentIds({
          class_id,
          teacher_user_id,
          studentIds,
        });
      })
      .then((sectionStudents) => {
        res.json(sectionStudents);
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
