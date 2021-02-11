const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({ getUsers, getUserById, getSectionsByStudent }) => {
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

  router.get(`/:id/sections`, (req, res, next) => {
    const { id } = req.params;
    getSectionsByStudent(id)
      .then((result) => {
        if (!result.length) {
          throw new ErrorHandler(404, "No sections found for user")
        };
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};
