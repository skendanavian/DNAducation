const faker = require("faker");
const {exams, exam_questions} = require('../constants/seedConstants');

const createFakeExamQuestions = (exams, examQuestions) => {
  const rows = [];
  const qsPerExam = Math.floor(examQuestions / exams);
  for (let i = 1; i <= exams; i++) {
    for(let j = 0; j < qsPerExam; j++) {
      rows.push({
        exam_id: i,
        question_number:j + 1,
        question: faker.random.words(20),
        mark_value: faker.random.number({min:6, max: 10}),
      });
    }
  }
  return rows;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("exam_questions")
    .del()
    .then(() => {
      return knex.raw('ALTER SEQUENCE exam_questions_id_seq RESTART;').then(() => {
        // Inserts seed entries
        const rows = createFakeExamQuestions(exams, exam_questions);
        return knex("exam_questions").insert(rows);
      })
    });
};

// test log
console.log(createFakeExamQuestions(exams, exam_questions));