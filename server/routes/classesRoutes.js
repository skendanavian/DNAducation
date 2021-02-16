const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../../.env" });
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getClasses,
  createClass,
}) => {

  router.get("/", (req, res) => {
    getClasses().then((result) => {
      res.json(result);
    })
  });

  router.post("/", (req, res, next) => {
    const {code, title, description} = req.body;
    getClasses().then((result) => {
      if (result.find(cl => cl.code === code)) {
        throw new ErrorHandler(409, "Class Code already exists");
      }
      createClass({code, title, description}).then((result) => {
        res.json(result);
      })
    }).catch((err) => next(err))
  });

  return router;
};
