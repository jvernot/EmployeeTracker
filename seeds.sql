USE employee_trackerDB;


INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id) 
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id) 
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id) 
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO role (title, salary, department_id) 
VALUES ("Software Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id) 
VALUES ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id) 
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO role (title, salary, department_id) 
VALUES ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Bruce", "Wayne", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michael", "Jordan", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lebron", "James", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wayne", "Gretzky", 5, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tiger", "Woods", 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joel", "Embiid", 7, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Simmons", 7, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carson", "Wentz", 4, 2);