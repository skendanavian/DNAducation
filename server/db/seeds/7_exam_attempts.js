const faker = require("faker");
const {exam_attempts, exams} = require('../constants/seedConstants');

const daysFromNow = (d => {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * d);
});

const getStartAndSubmitDatesDaysFromNow = (start, stop) => {
  return [
    faker.date.between(daysFromNow(start),daysFromNow(stop)),
    faker.date.between(daysFromNow(start), daysFromNow(stop))
  ].sort((a, b) => a - b);
}

const createFakeExamAttemps = (exams, attempts) => {
  const rows = [];
  const attemptsPerExam = Math.floor(attempts / exams);

  const [started, submitted] = getStartAndSubmitDatesDaysFromNow(-250, 30)
  
  for (let i = 1; i <= exams; i++) {
    for(let j = 0; j < attemptsPerExam; j++) {
      rows.push({
        section_students_id: i + j,
        exam_id: i,
        average_confidence: faker.random.number({min: 0, max: 100}),
        time_started: started,
        time_submitted: Math.random() > 0.3 ? submitted : null,
        
      });
    }
  }
  return rows;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("exam_attempts")
    .del()
    .then(() => {
      return knex.raw('ALTER SEQUENCE exam_attempts_id_seq RESTART;').then(() => {
        // Inserts seed entries
        const rows = createFakeExamAttemps(exams, exam_attempts);
        return knex("exam_attempts").insert(rows);
      })
    });
};

// test log
// console.log(createFakeExamAttemps(exams, exam_attempts));
// console.log(getStartAndSubmitDatesDaysFromNow(-250, 30));