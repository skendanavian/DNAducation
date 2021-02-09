require("dotenv").config({ path: "../.env" });

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "5432",
      user: "labber",
      password: "labber",
      database: "dnaducation",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
