const { date } = require("faker");
const faker = require("faker");
const {sections, exams} = require('../constants/seedConstants');

const daysFromNow = (d => {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * d);
});
const createFakeExams = (sections, exams) => {
  const rows = [];
  const examsPerSection = Math.floor(exams / sections);

//8
  for (let i = 1; i <= sections; i++) {
    
    for(let j = 0; j < examsPerSection; j++) {
      rows.push({
        section_id: i,
        total_submissions: 2,
        due_time: faker.date.between(daysFromNow(-200), daysFromNow(30))
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
      return knex.raw('ALTER SEQUENCE exams_id_seq RESTART;').then(() => {
        // Inserts seed entries
        const rows = createFakeExams(sections, exams);
        return knex("exams").insert(rows);
      })
    });
};

// test log
console.log(createFakeExams(sections, exams));
// console.log(daysFromNow(-200));