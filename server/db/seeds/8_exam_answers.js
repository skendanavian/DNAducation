const faker = require("faker");
const {
  exams,
  exam_attempts,
  exam_answers,
} = require("../constants/seedConstants");

const createFakeExamAnswers = (exams, attempts, examAnswers) => {
  const rows = [];
  const qsPerAttempt = Math.floor(examAnswers / attempts); // 3
  const attemptsPerExam = Math.floor(attempts / exams); // 2

  for (let exam = 1; exam <= exams; exam++) {
    // console.log('exam ', exam);
    for (let examAttempt = 1; examAttempt <= attemptsPerExam; examAttempt++) {
      // console.log('examAttempt ', examAttempt);
      for (
        let attemptQ = exam * 3 - qsPerAttempt + 1;
        attemptQ <= exam * 3;
        attemptQ++
      ) {
        // console.log('attemptQ', attemptQ);
        console.log("examAttempt ", examAttempt);

        rows.push({
          exam_attempt_id: exam * 2 + examAttempt - 2,
          exam_question_id: attemptQ,
          answer: faker.lorem.sentences(2),
          mark:
            examAttempt % 2 === 0
              ? faker.random.number({ min: 0, max: 11 })
              : null,
          confidence_level: faker.random.number({ min: 0, max: 100 }),
        });
      }
    }
  }

  return rows;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("exam_answers")
    .del()
    .then(() => {
      return knex
        .raw("ALTER SEQUENCE exam_answers_id_seq RESTART;")
        .then(() => {
          // Inserts seed entries
          const rows = createFakeExamAnswers(
            exams,
            exam_attempts,
            exam_answers
          );
          return knex("exam_answers").insert(rows);
        });
    });
};

// test log
console.log({ exams, exam_attempts, exam_answers });
// console.log(createFakeExamAnswers(exams, exam_attempts, exam_answers));
