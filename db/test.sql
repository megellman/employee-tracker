-- create your actual values here 
-- run the schema once and run seed once
-- INSERT INTO table  (name) VALUES ("Beck")
-- INSERT INTO table (name) VALUES ("Joe")

INSERT INTO department(name) 
VALUES 
    ("HR"),
    ("Engineering"),
    ("Sales"),
    ("Operations"),
    ("Customer Service");

INSERT INTO role(title, salary, department_id) 
VALUES
        ("Recruiter", 65000, 1),
        ("HR Coordinator", 65000, 1),
        ("HR Director", 120000, 1),
        ("Junior Developer", 90000, 2),
        ("Front End Developer", 120000, 2),
        ("Back End Developer", 130000, 2),
        ("Full Stack Developer", 140000, 2),
        ("Associate", 75000, 3),
        ("Account Representative", 65000, 3),
        ("Account Executive", 140000, 3),
        ("Sales Manager", 120000, 3),
        ("Administrator", 140000, 4),
        ("Analyst", 90000, 4),
        ("Project Manager", 100000, 4),
        ("Operations Manager", 140000, 4),
        ("Solutions Consultant", 90000, 4),
        ("Customer Success Manager", 85000, 5),
        ("Support Specialist", 75000, 5),
        ("Client Service Manager", 85000, 5),
        ("Implementations Specialist", 65000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES 
    ("Joe", "Johnson", 1, null),
    ("Ann", "Pham", 2, null),
    ("Cara", "Leviene", 3, null),
    ("Jeremy", "Gomez", 4, null),
    ("Rob", "Lewis", 5, null),
    ("Beth", "Franklin", 3, 1),
    ("John", "Chen", 16, 5),
    ("Iris", "Houston", 10, 3),
    ("Helen", "Nguyen", 11, 3),
    ("Winston", "Graves", 12, 4),
    ("Shannon", "Cain", 17, 5),
    ("Roger", "Fields", 16, 4),
    ("Melody", "Woods", 14, 4),
    ("Danny", "Barton", 13, 4),
    ("Kristi", "Farmer", 7, 2),
    ("Hugh", "Ryan", 8, 3),
    ("Jeanette", "Carpenter", 8, 3),
    ("Cody", "Munoz", 6, 2),
    ("Karla", "Flores", 18, 5),
    ("Lindsey", "Tran", 17, 5),
    ("Kim", "Mccoy", 15, 4),
    ("Bailey", "Christensen", 19, 5),
    ("Larry", "Fullner", 20, 5),
    ("Barret", "Gain", 21, 5),
    ("Jo", "Kim", 10, 3);

SELECT * FROM employee;
SELECT department.name, role.title 
FROM role
LEFT JOIN department 
ON department.id = role.department_id;

-- I am presented with a formatted table showing department names and department ids
SELECT name, id FROM department;

-- I am presented with the job title, role id, the department that role belongs to, and the salary for that role
SELECT role.title, role.id, department.name, role.salary 
FROM role
Left JOIN department
ON role.department_id = department.id;

-- I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
SELECT employee.last_name, role.title, role.department_id, role.salary, employee.id, employee.first_name,employee.manager_id
FROM role
LEFT JOIN employee
ON role.id = employee.role_id;