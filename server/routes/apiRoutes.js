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

    typingDnaClient.auto(
      extendedId,
      typingPattern,

      function (error, result) {
        console.log(result);
        if (error) {
          next(error);
        }
        if (!result.statusCode || result.statusCode !== 200) {
          console.log(result);
          res.json(result);
          next(error);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  });

  return router;
};
