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
      host:"ec2-54-198-73-79.compute-1.amazonaws.com",
      database: "d35vh2lj2daeq5",
      user: "tofshwckvdsnug",
      port: 5432,
      password: "84c4e1a6a609681393b66684cc6eb580a07e9399e758cf56661d03d8f508d34d",
      // ssl: true


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
