const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const axios = require("axios");
require("dotenv").config();
const TypingDnaClient = require("typingdnaclient");
const { ErrorHandler } = require("../helpers/errorsHelper");

const typingDnaClient = new TypingDnaClient(
  `${process.env.TDNA_API_KEY}`,
  `${process.env.TDNA_SECRET}`
);

module.exports = ({}) => {
  router.post("/:id", (req, res, next) => {
    const { userId, typingPattern } = req.body;

    console.log(req.body);

    const extendedId = `000000${userId}`;

    typingDnaClient.auto(extendedId, typingPattern, function (error, result) {
      if (error) {
        console.error(error);
        next(error);
      }
      // TODO -> call db if it is an exam answer or last attempt of making a profile
      // Might want to split this logic up into different routes
      res.json(result);
      console.log(result);
      next();
    });
  });

  return router;
};
