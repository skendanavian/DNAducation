require("dotenv").config({ path: "./.env" });

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: 'localhost',
      port: 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    debug:true,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
