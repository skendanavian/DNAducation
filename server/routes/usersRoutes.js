const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getUsers,
  getUserById,
  getAttemptsByStudent,
  getSectionsByStudent,
  getAttemptsByTeacher,
  getSectionsByTeacher,
  updateTypingProfile,
}) => {
  router.get("/", (req, res, next) => {
    getUsers()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => next(err));
  });

  router.get(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    getUserById(id)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  // get sections by student id
  router.get(`/:id/sections`, (req, res, next) => {
    const { id } = req.params;

    getSectionsByStudent(id)
      .then((result) => {
        if (!result.length) {
          console.log("No sections found for user");
        }
        res.json(result);
      })
      .catch((err) => next(err));
  });

  // get all attemmpts by student id
  router.get(`/:id/attempts`, (req, res, next) => {
    const { id } = req.params;

    getAttemptsByStudent(id)
      .then((result) => {
        if (!result.length) {
          console.log("No attempts found for user");
        }
        res.json(result);
      })
      .catch((err) => next(err));
  });

  // get sections by user id, as a teacher
  router.get(`/teacher/:id/sections`, (req, res, next) => {
    const { id } = req.params;

    getSectionsByTeacher(id)
      .then((result) => {
        if (!result.length) {
          console.log("No sections found for teacher");
        }
        res.json(result);
      })
      .catch((err) => next(err));
  });

  //get all attemmpts by teacher id
  router.get(`/teacher/:id/attempts`, (req, res, next) => {
    const { id } = req.params;

    getAttemptsByTeacher(id)
      .then((result) => {
        if (!result.length) {
          console.log("No attempts found for teacher");
        }
        res.json(result);
      })
      .catch((err) => next(err));
  });

  // update Typingdna profile to true for user
  router.patch("/:userId", (req, res, next) => {
    const { userId, status } = req.body;
    // console.log(userId);
    updateTypingProfile(userId, status)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};
