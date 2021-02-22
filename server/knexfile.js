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
    connectionString: process.env.DATABASE_URL,
    // connection:{ssl: { rejectUnauthorized: false }},
    migrations: {
        directory: __dirname + '/db/migrations',
      },
    seeds: {
        directory: __dirname + '/db/seeds',
      },
  },
};
