// Express setup
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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

const indexRouter = require("./routes/indexRoutes");
const usersRouter = require("./routes/usersRoutes");
const examsRouter = require("./routes/examsRoutes");
const attemptsRouter = require("./routes/attemptsRoutes");
const sectionsRouter = require("./routes/sectionsRoutes");
const apiRouter = require("./routes/apiRoutes");

const usersController = require("./controllers/usersController")(db);
const sectionsController = require("./controllers/sectionsController")(db);
const examsController = require("./controllers/examsController")(db);
const attemptsController = require("./controllers/attemptsController")(db);
const apiController = require("./controllers/apiController")(db);

// Routes setup
app.use("/", indexRouter(usersController));
app.use(
  "/users",
  authMiddleware,
  usersRouter({
    ...usersController,
    ...sectionsController,
    ...attemptsController,
    ...apiController,
  })
);
app.use("/exams", examsRouter(examsController));
app.use("/attempts", attemptsRouter(attemptsController));
app.use("/sections", sectionsRouter(sectionsController));
app.use("/api", apiRouter(apiController));

// const Router404 = require("./routes/404Route");
// app.use("*", Router404);

// Error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
