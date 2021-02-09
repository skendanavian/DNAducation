// Express setup
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Environment setup
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  const logger = require("morgan");
  app.use(logger("dev"));
}

// Database setup
const knexfile = require("./knexfile");
const db = require("knex")(knexfile[process.env.NODE_ENV]);

//Middlewars
const { authMiddleware } = require("./middlewares/authMiddleware");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

// Routes setup
const indexRouter = require("./routes/indexRoutes");
const usersController = require("./controllers/usersController")(db);
app.use("/", indexRouter(usersController));

const usersRouter = require("./routes/usersRoutes");
app.use("/users", authMiddleware, usersRouter(usersController));

// const Router404 = require("./routes/404Route");
// app.use("*", Router404);

// Error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
