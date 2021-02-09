const faker = require("faker");
const bcrypt = require("bcrypt");
const {users, teachers} = require("../constants/seedConstants");


const createFakeUsers = (n) => {
  const rows = [];
  const salt = bcrypt.genSaltSync(13);
  for (let i = 0; i < n; i++) {
    const hash = bcrypt.hashSync("test", salt);
    rows.push({
      name: faker.name.findName(),
      student_number:Math.floor(faker.random.number({min:100000, max:999999})),
      password: hash,
      email: faker.internet.email(),
      is_teacher:false
    });
  }
  return rows;
};
const createFakeTeachers = (n) => {
  const rows = [];
  const salt = bcrypt.genSaltSync(13);
  for (let i = 0; i < n; i++) {
    const hash = bcrypt.hashSync("test", salt);
    rows.push({
      name: faker.name.findName(),
      student_number:Math.floor(faker.random.number({min:100000, max:999999})),
      password: hash,
      email: faker.internet.email(),
      is_teacher:true
    });
  }
  return rows;
};

exports.seed = function (knex) {
  knex.raw("ALTER SEQUENCE users_id_seq RESTART;");
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      const rows = [...createFakeUsers(users), ...createFakeTeachers(teachers)]
      return knex("users").insert(rows);
    });
};
