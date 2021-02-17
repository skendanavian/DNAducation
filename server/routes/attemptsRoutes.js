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
  submitMarkForAnswer,
  getSectionStudentId,
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
    const { user_id, exam_id, time_started } = req.body;

    getSectionStudentId({ user_id, exam_id })
      .then((result) => {
        // console.log(":::::::::", result);
        // console.log(res.fields);
        if (!result.length)
          throw new ErrorHandler(
            403,
            "User not enrolled in section for attempted exam, your stolen questions are now forfeit"
          );
        if (result.length > 1)
          throw new ErrorHandler(
            409,
            "User cannot be in the same section twice"
          );
        return createAttempt({
          section_students_id: result[0].id,
          exam_id,
          time_started,
        });
      })
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        console.log(result.fields);
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  //Update attempt on final submit
  router.patch(`/:attemptId`, (req, res, next) => {
    console.log(req.body);
    updateAttempt(req.body)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        console.log(result);
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  // answering question
  router.post(`/:attemptsId/answers`, (req, res, next) => {
    const { attemptsId: exam_attempt_id } = req.params;

    console.log(req.params);
    console.log(req.data);

    const data = { exam_attempt_id, ...req.body };

    setExamAttemptAnswer(data)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        console.log(result);
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  // submitting a mark for an individual question
  router.patch(`/answers/:answersId`, (req, res, next) => {
    const { answersId: exam_answers_id } = req.params;
    const { mark } = req.body;

    submitMarkForAnswer(Number(exam_answers_id), mark)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};
