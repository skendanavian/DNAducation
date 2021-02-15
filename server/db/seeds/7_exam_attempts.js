const faker = require("faker");
const {exam_attempts, exams } = require('../constants/seedConstants');

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

  
  
  for (let i = 1; i <= exams; i++) {
    for(let j = 0; j < attemptsPerExam; j++) {
      
      const [startedTime, submittedTime] = getStartAndSubmitDatesDaysFromNow(-250, 30);
      const wasSubmitted = Math.random() > 0.3;
      const wasMarked = Math.random() > 0.5;

      rows.push({
        section_students_id: i + j,
        exam_id: i,
        marks_earned: (wasSubmitted && wasMarked) ? faker.random.number({min:3, max: 33}) : null,
        average_confidence: wasSubmitted ? faker.random.number({min: 0, max: 100}) : null,
        time_started: startedTime,
        time_submitted: wasSubmitted ? submittedTime : null,
        
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