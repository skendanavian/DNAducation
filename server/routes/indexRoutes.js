const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../../.env" });
const { validateEmail } = require("../helpers/emailValidator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getUserByEmail,
  getUserByStudentNumber,
  createNewUser,
}) => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  //TODO: setup /register route

  router.post("/register", (req, res, next) => {
    const { name, studentId, email, password } = req.body;
    const salt = bcrypt.genSaltSync(13);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (!email || !password || !studentId || !name) {
      next(new ErrorHandler(400, "Missing field(s)"));
    } else {
      console.log("attempting to register with", {
        name,
        studentId,
        email,
        password,
      });
      //Check DB for email and student ID

      if (!validateEmail(email)) {
        throw new ErrorHandler(401, "Invalid Email Format");
      }

      const userByEmail = getUserByEmail(email);
      const userByStudentNumber = getUserByStudentNumber(studentId);

      Promise.all([userByEmail, userByStudentNumber])
        .then(([usersWithSameEmail, usersWithSameStudentNumber]) => {
          if (usersWithSameEmail.length) {
            throw new ErrorHandler(401, "User email already exists");
          }
          if (usersWithSameStudentNumber.length) {
            throw new ErrorHandler(401, "User student number already exists");
          }
          const token = jwt.sign(
            {
              data: name,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );

          createNewUser({
            name,
            student_number: studentId,
            password: hashedPassword,
            email,
          });
          res.json({ token });
        })
        .catch((err) => {
          next(err);
        });
    }
  });

  router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new ErrorHandler(400, "Missing field(s)"));
    } else {
      getUserByEmail(email)
        .then((result) => {
          if (!result.length)
            throw new ErrorHandler(401, "Invalid password or email address");
          const hashedPassword = result[0].password;
          const isValid = bcrypt.compareSync(password, hashedPassword);
          if (!isValid)
            throw new ErrorHandler(401, "Invalid password or email address");
          const token = jwt.sign(
            {
              data: result[0].id,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );
          res.json({ token, id: result[0].id });
        })
        .catch((err) => {
          next(err);
        });
    }
  });

  return router;
};
