// Dependencies
const express = require("express");
const mysql = require("mysql");
const inquirer = require('inquirer');

// Create express app instance.
var app = express();

// Set the port for the application
var PORT = process.env.PORT || 7070;

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
    promptUser();
});

const promptUser = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add to departments, roles, or employees.', 'View departments, roles or employees.', 'Update emplyee roles', 'exit']
        })
        .then(answer => {
            switch (answer.action) {
              case 'Add to departments, roles, or employees.':
                addElement();
                break;
      
              case 'View departments, roles or employees.':
                viewElement();
                break;
      
              case 'Update emplyee roles':
                updateEmployee();
                break;
      
              case 'exit':
                connection.end();
                break;
            }
        });
};

const addElement = () => {
    inquirer
        .prompt({
            name: 'table',
            type: 'list',
            message: 'What list would you like to add to?',
            choices: ['Departments', 'Roles', 'Employees']
        })
        .then(answer => {
            switch (answer.action) {
              case 'Departments':
                addDepartment();
                break;
      
              case 'Roles':
                addRole();
                break;
      
              case 'Employees':
                addEmployee();
                break;

            }
        });
};

const addDepartment = () => {
    inquirer
        .prompt({
        name: 'department',
        type: 'input',
        message: 'What is the name of the department to be added?'
        })
        .then(answer => {
        console.log(answer.department);

        connection.query('INSERT INTO department (name) VALUES ?', [answer.department], (err, res) => {
          if (err) throw err;

          console.log(`Department Added`);
          promptUser();
        });
    });
}

const addRole = () => {
  inquirer
    .prompt({
    name: 'title',
    type: 'input',
    message: 'What is the role title?'},
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary for this role?'
    })
    .then(answer => {

      const { title, salary } = answer;

      connection.query('INSERT INTO role (title, salary) VALUES ?', [title, salary], (err, res) => {
        if (err) throw err;

        console.log(`Role Added`);
        promptUser();
      });
    });
}



const viewElement = () => {

};

const updateEmployee = () => {

};















app.listen(PORT, function() {
    console.log("Server Connected!");
});

