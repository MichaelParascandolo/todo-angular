const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");

// database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "todo",
});

// test connection to database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// get all employees
app.get("/api/employees", (req, res) => {
  const sql = "SELECT * FROM employee";
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      res.send({ Employees: rows });
    }
  });
});

// get all projects
app.get("/api/projects", (req, res) => {
  const sql = "SELECT * FROM projects";
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      res.send({ Projects: rows });
    }
  });
});

// get all assignments
app.get("/api/assignments", (req, res) => {
  const sql = "SELECT * FROM assignments";
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      res.send(rows);
    }
  });
});

// get all employees and all projects
app.get("/api/employees-projects", (req, res) => {
  const sql = "SELECT * FROM employee";
  let emp;
  connection.query(sql, (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
    }
    emp = rows;
  });
  res.send({ Employees: emp });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
