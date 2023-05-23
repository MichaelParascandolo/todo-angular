const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

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

// get all employees and all projects
app.get("/api/employees-and-projects", (req, res) => {
  const employeeSql = `SELECT * FROM employee;`;
  const projectsSql = `SELECT * FROM projects;`;
  connection.query(employeeSql, (err, employeeRows) => {
    if (err) {
      console.error("Error executing employee query:", err);
    } else {
      connection.query(projectsSql, (err, projectsRows) => {
        if (err) {
          console.error("Error executing projects query:", err);
        } else {
          const employeeData = JSON.parse(JSON.stringify(employeeRows));
          const projectsData = JSON.parse(JSON.stringify(projectsRows));
          res.json({ employees: employeeData, projects: projectsData });
        }
      });
    }
  });
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
  const sql = `SELECT *
  FROM projects
  JOIN assignments ON projects.project_id = assignments.project_id
  JOIN employee ON ? = employee.employee_id;`;
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
