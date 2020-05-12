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
                updateRoles();
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

        //go to dept table and search for where it matches answer

        connection.query('INSERT INTO department (name) VALUES (?)', [answer.department], (err, res) => {
          if (err) throw err;

          console.log(`Department Added`);
          promptUser();
        });
    });
};

const addRole = () => {
  let departments = [];

  connection.query(`SELECT * FROM department`, (err, data) => {
    if (err) throw err;

    data.forEach(dept => departments.push(dept));
  });

  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the role title?'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary for this role?'
        },
        {
          name: 'department_id',
          type: 'list',
          message: 'What department is this role in?',
          choices: departments
        }
    ]) 
    .then(function({ title, salary, department_id }) {
      // let index = departments.indexOf(department_id);

      connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, res) => {
        if (err) throw err;
  
        console.log(`Role Added`);
        promptUser();
      });
    })
};

const addEmployee = () => {
  let employees = [];
  let roles = [];

  connection.query(`SELECT * FROM employee`, (err, data) => {
    if (err) throw err;

    data.forEach(empl => employees.push(empl));
  

    connection.query(`SELECT * FROM role`, (err, data) => {
      if (err) throw err;

      data.forEach(job => roles.push(job));
    

      inquirer
        .prompt([
          {
            name: 'first_name',
            type: 'input',
            message: 'What is the employees first name?'
          },
          {
            name: 'last_name',
            type: 'input',
            message: 'What is the employees last name?'
          },
          {
            name: 'role_id',
            type: 'list',
            message: 'What is their role?',
            choices: roles
          },
          {
            name: 'manager_id',
            type: 'list',
            message: 'Who is their manager?',
            choices: employees
          }
        ])
        .then(function ({ first_name, last_name, role_id, manager_id }) {
          let queryText = `INSERT INTO employee (first_name, last_name, role_id`;
          if (manager_id != 'none') {
              queryText += `, manager_id) VALUES ('${first_name}', '${last_name}', ${roles.indexOf(role_id)}, ${employees.indexOf(manager_id) + 1})`
          } else {
              queryText += `) VALUES ('${first_name}', '${last_name}', ${roles.indexOf(role_id) + 1})`
          }
          console.log(queryText)

          connection.query(queryText, function (err, data) {
            if (err) throw err;

            promptUser();
          });
        });

      });
    });
};


const updateRoles = () => {

  connection.query(`SELECT * FROM employee`, (err, data) => {
    if (err) throw err;
    console.log(data);

    const employees = data.map(e => ({ name:e.first_name, value:e.id }))
    console.log(employees);

    connection.query(`SELECT * FROM role`, (err, data) => {
      if (err) throw err;
  
      const roles = data.map(e => ({ name:e.title, value:e.id }));
    
        inquirer
          .prompt([
            {
              name: 'employee_id',
              message: "Which employees role needs to be updated",
              type: 'list',
              choices: employees
            },
            {
              name: 'role_id',
              message: "What is the new role?",
              type: 'list',
              choices: roles
            }
          ]).then(function ({ employee_id, role_id }) {
              
            connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [employee_id, role_id], function (err, data) {
              if (err) throw err;

              promptUser();
            })
          })
      });
    })
}















app.listen(PORT, function() {
    console.log("Server Connected!");
});

