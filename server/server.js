const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");

// allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

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
      res.send(rows);
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
      res.send(rows);
    }
  });
});

// get all assignments from project ID and employee name
app.get("/api/assignments", (req, res) => {
  const projectId = req.query.projectId;
  const sql = `
  SELECT assignments.*, employee.name AS employee_name
  FROM assignments
  JOIN employee ON assignments.employee_id = employee.employee_id
  WHERE project_id = ?;
  `;
  connection.query(sql, [projectId], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      res.send(rows);
    }
  });
});

// get list of projects containing employee ID
app.get("/api/employee-projects", (req, res) => {
  const employeeId = req.query.employeeId;
  const sql = `SELECT projects.* FROM projects JOIN assignments ON projects.project_id = assignments.project_id WHERE assignments.employee_id = ?;`;
  connection.query(sql, [employeeId], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      res.send(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
