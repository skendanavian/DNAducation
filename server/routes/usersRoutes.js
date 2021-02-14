const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getUsers,
  getUserById,
  getSectionsByStudent,
  getAttemptsByStudent,
  updateTypeDnaProfile,
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
          throw new ErrorHandler(404, "No sections found for user");
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
          throw new ErrorHandler(404, "No attempts found for user");
        }
        res.json(result);
      })
      .catch((err) => next(err));
  });

  // update Typingdna profile to true for user
  router.patch("/:userId", (req, res, next) => {
    const { userId } = req.params;
    const { status } = req.body;
    updateTypeDnaProfile(userId, status)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};
