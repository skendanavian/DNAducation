const faker = require("faker");
const bcrypt = require("bcrypt");
const {sections} = require("../constants/seedConstants");

//2 sections per class and 2 sections per teacher

const createFakeSections = (n) => {
  const rows = [];
  for (let i = 0; i < n; i++) {
    const classId = i % 2 === 0 ? 1 : 2;
    const teacherId = i % 2 === 0 ? 9 : 10;
    rows.push({
      class_id: classId,
      teacher_user_id: teacherId,
    });
  }
  return rows;
};


exports.seed = function (knex) {
  knex.raw("ALTER SEQUENCE sections_id_seq RESTART;");
  // Deletes ALL existing entries
  return knex("sections")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("sections").insert(createFakeSections(sections));
    });
};

console.log(createFakeSections(sections));