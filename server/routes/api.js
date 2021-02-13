const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getUsers,
  getUserById,
  getSectionsByStudent,
  getAttemptsByStudent,
}) => {
  // We want to receive 3 successful responses from the API requests before setting Profile to true

  //Receive TypeDNA objects with userID
  router.post("/:id", (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    console.log(req.body);
    // getUserById(id)
    //   .then((result) => {
    //     if (!result.length) throw new ErrorHandler(404, "Not found");
    //     res.json(result[0]);
    //   })
    //   .catch((err) => next(err));
    res.json(req.body);
    next();
  });

  return router;
};
