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
            choices: ['View all employees', 'Add to departments, roles, or employees.', 'Update emplyee roles', 'exit']
        })
        .then(answer => {
            switch (answer.action) {
              case 'Add to departments, roles, or employees.':
                addElement();
                break;
      
              case 'View all employees':
                viewEmployees();
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


const viewEmployees = () => {
  const query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    if (err) throw err;

   console.table(res);

    promptUser();
  });
}





const addElement = () => {
    inquirer
        .prompt({
            name: 'table',
            type: 'list',
            message: 'What list would you like to add to?',
            choices: ['Departments', 'Roles', 'Employees']
        })
        .then(answer => {
            switch (answer.table) {
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

        connection.query('INSERT INTO department (name) VALUES (?)', [answer.department], (err, res) => {
          if (err) throw err;

          console.log(`Department Added`);
          promptUser();
        });
    });
};

async function addRole() {

  const questions = [
    {
    name: 'title',
    type: 'input',
    message: 'What is the role title?'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary for this role?'
    }];

    try {
      const answers = await inquirer .prompt(questions);

      await connection.query('INSERT INTO role (title, salary) VALUES (?, ?)', [answers.title, answers.salary], (err, res) => {
        if (err) throw err;

        console.log(`Role Added`);
        promptUser();
      });
    }
    catch(err) {
      console.log(err);
    }
};

// const addEmployee = () => {
//   const questions = [
//     {
//     name: 'firstName',
//     type: 'input',
//     message: 'What is the employees first name?'
//     },
//     {
//       name: 'lastName',
//       type: 'input',
//       message: 'What is the employees last name?'
//     }];

//     try {
//       const answers = await inquirer .prompt(questions);

//       await connection.query('INSERT INTO role (title, salary) VALUES (?, ?)', [answers.title, answers.salary], (err, res) => {
//         if (err) throw err;

//         console.log(`Role Added`);
//         promptUser();
//       });
//     }
//     catch(err) {
//       console.log(err);
//     }
// };




  // inquirer
  //   .prompt(
  //   {
  //   name: 'title',
  //   type: 'input',
  //   message: 'What is the role title?'
  // },
  //   {
  //     name: 'salary',
  //     type: 'input',
  //     message: 'What is the salary for this role?'
  //   })
    // .then(answer => {

    //   connection.query('INSERT INTO role (title, salary) VALUES (?)', [answer.title, answer.salary], (err, res) => {
    //     if (err) throw err;

    //     console.log(`Role Added`);
    //     promptUser();
    //   });
    // });





const updateEmployee = () => {

};















app.listen(PORT, function() {
    console.log("Server Connected!");
});

