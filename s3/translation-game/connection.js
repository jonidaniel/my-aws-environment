const mysql = require(`mysql2`);
require("dotenv").config();

// Import the fetched AWS SSM parameters
const params = require(`./params.json`);

let DB_HOST = "";
let DB_PORT = "";
let DB_USER = "";
let DB_PW = "";
let DB_DB = "";

for (item of params.Parameters) {
  if (item.Name == "DB_HOST") {
    DB_HOST = item.Value;
  } else if (item.Name == "DB_PORT") {
    DB_PORT = item.Value;
  } else if (item.Name == "DB_USER") {
    DB_USER = item.Value;
  } else if (item.Name == "DB_PW") {
    DB_PW = item.Value;
  } else if (item.Name == "DB_DB") {
    DB_DB = item.Value;
  }
}

// Create database connection variable (here: connection pool), i.e. configuration object
var pool = mysql.createPool({
  // Maximum 10 connections at a time
  connectionLimit: 10,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PW,
  database: DB_DB,
});

// Output notification when connection is acquired from connection pool (for testing)
pool.on("acquire", (connection) => {
  console.log("---");
  console.log("Connection %d acquired", connection.threadId);
});

// Output notification when connection is released back to connection pool (for testing)
pool.on("release", (connection) => {
  console.log("---");
  console.log("Connection %d released", connection.threadId);
});

let connectionFunctions = {
  // 1. GET all resources from database table
  getAll: (callbackFn) => {
    pool.query(`SELECT * FROM animal`, (error, results) => {
      if (error) {
        callbackFn(error);
      } else {
        callbackFn(results);
      }
    });
  },
  // 2. GET single resource from database table
  getById: (id, callbackFn) => {
    pool.query(`SELECT * FROM animal WHERE id = ${id}`, (error, results) => {
      if (error) {
        callbackFn(error);
      } else {
        // Look for animal with right id,
        // i.e. make sure there is animal with desired id
        let result = results.find((animal) => animal.id == id);
        if (result) {
          callbackFn(result);
        } else {
          callbackFn(false);
        }
      }
    });
  },
  // 3. POST single resource to database table
  post: (eng, fin, callbackFn) => {
    pool.query(
      `INSERT INTO guess (eng, fin) VALUES ('${eng}', '${fin}')`,
      (error) => {
        if (error) {
          callbackFn(error);
        } else {
          callbackFn(false);
        }
      }
    );
  },
  // 4. DELETE single resource from database table
  deleteByID: (id, callbackFn) => {
    pool.query(`DELETE FROM animal WHERE id = ${id}`, (error) => {
      if (error) {
        callbackFn(error);
      } else {
        callbackFn(false);
      }
    });
  },
  // End connection to database
  // Waits for all queries to finish before ending connection
  end: () => {
    pool.end();
  },
};

module.exports = connectionFunctions;
