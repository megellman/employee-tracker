-- I am presented with a formatted table showing department names and department ids
SELECT * FROM department;

-- I am presented with the job title, role id, the department that role belongs to, and the salary for that role
SELECT role.title, role.id, department.name, role.salary 
FROM role
Left JOIN department
ON role.department_id = department.id;

-- I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
FROM department
JOIN role
ON department.id = role.department_id
JOIN employee
ON employee.role_id = role.id;


INSERT INTO department(name)
VALUES (?)

INSERT INTO role(title, salary, department)
VALUES (?)

INSERT INTO role(first_name, last_name, role_id, manager_id)
VALUES (?)