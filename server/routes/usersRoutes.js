const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getUsers,
  getUserById,
  getSectionsByStudent,
  getAttemptsByStudent,
  getSectionsByTeacher,
  getAttemptsByTeacher,
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

  // get sections by user id, as a student
  router.get(`/:id/sections`, (req, res, next) => {
    const { id } = req.params;

    console.log('--------------------------------------------');
    console.log(`userRoutes:: get student sections for ${id}`);

    getSectionsByStudent(id)
      .then((result) => {
        if (!result.length) {
<<<<<<< HEAD
          console.log('No sections found for user');
=======
          throw new ErrorHandler(404, "No sections found for user");
>>>>>>> main
        }
        res.json(result);
      })
      .catch((err) => next(err));

  });

<<<<<<< HEAD
  // get all attempts by student id 
=======
  // get all attemmpts by student id
>>>>>>> main
  router.get(`/:id/attempts`, (req, res, next) => {
    const { id } = req.params;

    console.log('--------------------------------------------');
    console.log(`userRoutes:: get student attempts for ${id}`);

    getAttemptsByStudent(id)
      .then((result) => {
        if (!result.length) {
<<<<<<< HEAD
          console.log('No attempts found for user');
=======
          throw new ErrorHandler(404, "No attempts found for user");
>>>>>>> main
        }
        res.json(result);
      })
      .catch((err) => next(err));
  });

<<<<<<< HEAD
  // get sections by user id, as a teacher
  router.get(`/teacher/:id/sections`, (req, res, next) => {
    const { id } = req.params;

    console.log('--------------------------------------------');
    console.log(`userRoutes:: get teacher sections for ${id}`);

    getSectionsByTeacher(id)
      .then((result) => {
        if (!result.length) {
          console.log('No sections found for teacher');
        }
        res.json(result);
      })
      .catch((err) => next(err));

  });

  // get all attemmpts by teacher id 
  router.get(`/teacher/:id/attempts`, (req, res, next) => {
    const { id } = req.params;

    console.log('--------------------------------------------');
    console.log(`userRoutes:: get teacher attempts for ${id}`);

    getAttemptsByTeacher(id)
      .then((result) => {
        if (!result.length) {
          console.log('No attempts found for teacher');
        }
=======
  // update Typingdna profile to true for user
  router.patch("/:userId", (req, res, next) => {
    const { userId, status } = req.body;
    console.log(userId);
    updateTypingProfile(userId, status)
      .then((result) => {
>>>>>>> main
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};
