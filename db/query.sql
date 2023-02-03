-- Department names and department ids
SELECT * FROM department;

-- Job title, role id, the department that role belongs to, and the salary for that role
SELECT role.title, role.id, department.name, role.salary 
FROM role
Left JOIN department
ON role.department_id = department.id;

-- Employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
FROM department
JOIN role
ON department.id = role.department_id
JOIN employee
ON employee.role_id = role.id;

-- Add a department
INSERT INTO department(name) VALUES (?);

-- Add a role 
INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);

-- Manager first and last name and id
SELECT employee.id, CONCAT (first_name, ' ', last_name) AS name FROM employee;

-- Role id and title
SELECT role.id, title FROM role;

-- Add an employee
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);

-- Get employee first and last name and id and role id
SELECT CONCAT(first_name, ' ', last_name) AS name, id, role_id FROM employee;

-- Add a new employee
UPDATE employee SET role_id = (?) WHERE id = (?);

