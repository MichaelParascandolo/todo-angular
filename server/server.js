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
// connect to database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});
// test endpoint
app.get("/api/data", (req, res) => {
  const data = { message: "Hello from the server!!" };
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
