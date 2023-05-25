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

// delete project
app.delete("/api/projects-delete", (req, res) => {
  const project_id = req.query.project_id;
  if (!project_id) {
    res.status(400).send("Missing project_id parameter");
    return;
  }
  const assignmentsSql = `DELETE FROM assignments WHERE project_id = ?;`;
  const projectSql = `DELETE FROM projects WHERE project_id = ?;`;
  connection.query(assignmentsSql, [project_id], (err, assignmentsRows) => {
    if (err) {
      res.status(500).send("Error deleting project assignments");
    } else {
      connection.query(projectSql, [project_id], (err, projectRows) => {
        if (err) {
          res.status(500).send("Error deleting project");
        } else {
          res.send("Project deleted");
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
  const sql = `SELECT assignments.project_id, MIN(assignments.assignment_id) AS assignment_id, GROUP_CONCAT(DISTINCT employee.name SEPARATOR ', ') AS employee_names, MIN(projects.name) AS project_name, COALESCE(SUM(assignments.estimated_hours), 0) AS total_estimated_hours
  FROM assignments
  JOIN employee ON assignments.employee_id = employee.employee_id
  JOIN projects ON assignments.project_id = projects.project_id
  WHERE assignments.project_id IN (
    SELECT project_id
    FROM assignments
    WHERE employee_id IN (?)
  )
  GROUP BY assignments.project_id, projects.name
  `;
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
