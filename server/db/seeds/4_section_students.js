const faker = require("faker");
const bcrypt = require("bcrypt");
const {section_students} = require("../constants/seedConstants");

// 16 students total - 4 students per section
// 4 section Id's
// 8 student Id's

const createFakeSectionStudents = (n) => {
  
  const rows = [];
  let userId = 0;
  for(let sectionId = 1; sectionId <= 4; sectionId++) {
    for (let i = 1; i <= 4; i++) {
      userId++  
      if(userId === 9) userId = 1;
      rows.push({
        user_id: userId,
        section_id: sectionId
      
      });
    }
  }
  return rows;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("section_students")
    .del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE section_students_id_seq RESTART;').then(() => {
        // Inserts seed entries
        return knex("section_students").insert(createFakeSectionStudents(section_students));
      })
    });
};

console.log(createFakeSectionStudents(16));