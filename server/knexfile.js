require("dotenv").config({ path: "./.env" });

const conn = process.env.DATABASE_URL;
const [__, user, password, host, port, database] = conn.split(/[/:@]+/g);


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
      user,
      password,
      host,
      port,
      database,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
        directory: __dirname + '/db/migrations',
      },
    seeds: {
        directory: __dirname + '/db/seeds',
      },
  },
};
