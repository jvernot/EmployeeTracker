// Dependencies
const express = require("express");
const mysql = require("mysql");
const inquirer = require('inquirer');

// Create express app instance.
var app = express();

// Set the port for the application
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Sqlpack0!",
  database: "employee_trackerDB"
});

// Initiate MySQL Connection.
connection.connect(err => {
    if (err) throw err;

    console.log("connected as id " + connection.threadId);
    //run the first inquirer function
});

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});

