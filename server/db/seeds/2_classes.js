const faker = require("faker");
const bcrypt = require("bcrypt");
const {classes} = require("../constants/seedConstants");

const createFakeClasses = (n) => {
  const rows = [];
  for (let i = 0; i < n; i++) {
    const classCode1 =["STA", "PHIL", "CALC", "ENG", "HIST", "PSY", "ANTH"];
    const classCode2 =['100', '200', '300', '400', '120', '220', '320'];
    const classTitle = ["Theoretical Solutions", "Introductory Course 1"]

    Math.floor(Math.random() * 7)
    rows.push({
      title: classTitle[i],
      code:classCode1[Math.floor(Math.random() * 7)] + classCode2[Math.floor(Math.random() * 7)],
      description: faker.random.words(10)      
    });
  }
  return rows;
};


exports.seed = function (knex) {
  knex.raw("ALTER SEQUENCE classes_id_seq RESTART;");
  // Deletes ALL existing entries
  return knex("classes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("classes").insert(createFakeClasses(classes));
    });
};