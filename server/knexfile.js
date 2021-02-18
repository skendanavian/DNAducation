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
    // debug:true,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  production: {
    client: 'pg',
    // connection: process.env.DATABASE_URL,
    connection: {
      host:process.env.DATABASE_URL,
      ssl: true
    },
    migrations: {
        directory: __dirname + '/db/migrations',
      },
    seeds: {
        directory: __dirname + '/db/seeds',
      },
  },
  // production: {
  //   client: "pg",
  //   connection: {
  //     host: 'dnaducation-instance-1.c5rq2kwuwipy.us-east-2.rds.amazonaws.com',
  //     port: 5432,
  //     user: process.env.DB_USER,
  //     password: process.env.DB_PASS,
  //     database: process.env.DB_NAME,
  //   },
  //   // debug:true,
  //   migrations: {
  //     directory: "./db/migrations",
  //   },
  //   seeds: {
  //     directory: "./db/seeds",
  //   },
  // },
};
