const inquirer = require('inquirer');
const mysql = require('mysql2');
let departments = ["HR", "Engineering", "Sales", "Customer Service", "Operations"];

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log("Connected to the employee_db database.")
);

inquirer.prompt(
    {
        type: 'list',
        message: 'Select one option',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
        name: 'homepage'
    }
)
    .then((response) => {
        if (response.homepage === 'view all departments') {
            console.log('made it')
            db.query('SELECT * FROM department');
        } else if (response.homepage === 'view all roles') {
            db.query('SELECT role.title, role.id, department.name, role.salary FROM role Left JOIN department ON role.department_id = department.id', function (err, results) {
                console.log(results);
            });
        } else if (response.homepage === 'view all employees') {
            db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id', function (err, results) {
                console.log(results);
            });
        } else if (response.homepage === 'add a department'){
            addDepartment();
        } else if (response.homepage === 'add a role'){
            addRole();
        } else if (response.homepage === 'add an employee role'){
            addEmployee();
        } else if (response.homepage === 'update an employee role'){
            updateEmployee();
        }
    });

function addDepartment(){
    inquirer.prompt(
        {
            type: "input",
            input: "Enter the name of the department you would like to add",
            name: "department",
        }
    )
    .then((response) => {
        departments.push(response.department);
        db.query("INSERT INTO department(name) VALUES (?)", response.name, function(err, results){
            console.log(results);
        })
    })
};

function addRole(){
    inquirer.prompt(
        {
            type: "input",
            input: "Enter the name of the role you would like to add",
            name: "role",
        },
        {
            type: "number",
            input: "Enter the salary for this role",
            name: "salary",
        },
        {
            type: "list",
            input: "Enter the name of the department this role falls under",
            choices: departments,
            name: "department",
        }
    )
        .then((response) => {
            let departmentChoice = (departments.indexOf(response.department) + 1);
            db.query("INSERT INTO role(title, salary, department) VALUES (?)", response.role, response.salary, departmentChoice, function(err, results){
                console.log(results);
            })
        })
};

function addEmployee(){
    inquirer.prompt(
        {
            type: "input",
            input: "Enter employee first name",
            name: "role",
        },
        {
            type: "number",
            input: "Enter employee last name",
            name: "salary",
        },
        {
            type: "list",
            input: "Enter the name of the department this role falls under",
            choices: departments,
            name: "department",
        },
        {
            type: "input",
            input: "Enter employee's manager",
            name: "department",
        }
    )
    .then((response) => {
        let departmentChoice = (departments.indexOf(response.department) + 1);
        db.query("INSERT INTO role(title, salary, department) VALUES (?)", response.role, response.salary, departmentChoice, function(err, results){
            console.log(results);
        })
    })
};

function updateEmployee(){
    inquirer.prompt(
        {
            type: "input",
            input: "Enter employee first name",
            name: "role",
        },
        {
            type: "number",
            input: "Enter employee last name",
            name: "salary",
        },
        {
            type: "input",
            input: "Enter employee role",
            name: "department",
        },
        {
            type: "input",
            input: "Enter employee's manager",
            name: "department",
        }
    )
};

