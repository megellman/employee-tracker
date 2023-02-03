const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log("Connected to the employee_db database!")
);

// Homepage -- asks the intial question of what user wants and directs them from there
function prompt() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'Select one option',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'I\'m done'],
            name: 'homepage'
        }
    )
    // Shows all departments
        .then((response) => {
            if (response.homepage === 'view all departments') {
                db.query('SELECT id AS "Department ID", name AS "Department Name" FROM department', function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(result);
                        prompt();
                    }
                });
    // Shows all roles
            } else if (response.homepage === 'view all roles') {
                db.query('SELECT role.title AS "Job Title", role.id AS "Role ID", department.name AS Department, role.salary AS Salary FROM role Left JOIN department ON role.department_id = department.id', function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(result);
                        prompt();
                    }
                });
    // Shows all employees
            } else if (response.homepage === 'view all employees') {
                db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM department JOIN role ON department.id = role.department_id JOIN employee ON employee.role_id = role.id;", function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(result);
                        prompt();
                    }
                });
    // Redirects to another function 
            } else if (response.homepage === 'add a department') {
                addDepartment();
            } else if (response.homepage === 'add a role') {
                addRole();
            } else if (response.homepage === 'add an employee') {
                addEmployee();
            } else if (response.homepage === 'update an employee role') {
                updateEmployee();
            } else if (response.homepage === 'I\'m done'){
                console.log('Goodbye!');
                process.exit();
            }
        })
};

// Takes response from prompt and uses that in the query to create a new department
function addDepartment() {
    inquirer.prompt(
        {
            type: "input",
            input: "Enter the name of the department you would like to add",
            name: "department",
        }
    )
        .then((response) => {
            db.query("INSERT INTO department(name) VALUES (?)", response.department, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    console.log(`${response.department} has been added!`);
                    prompt();
                }
            });
        })
};

// Async query gets the department names and ids
async function getDepartments() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', function (err, results) {
            if (err) throw err
            resolve(results);
        })
    })
}

// Creates a new role
async function addRole() {
    getDepartments().then(response => {
        inquirer.prompt(
            [{
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
                choices: response.map((roleData) => {
                    return roleData.name
                }),
                name: "department",
            }]
        )
            .then(answer => {
                const selectedRole = response.filter(role => {
                    return role.name == answer.department
                })
                db.query("INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)", [answer.role, answer.salary, selectedRole[0].id], function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        console.log(`${answer.role} has been added!`);
                        prompt();
                    }
                });
            })
    })
};

// Gets manager id and name 
async function getManagers() {
    return new Promise((resolve, reject) => {
        db.query("SELECT employee.id, CONCAT (first_name, ' ', last_name) AS name FROM employee", function (err, results) {
            if (err) throw err;
            resolve(results);
        })
    })
}

// Gets role id and title
async function getRoles() {
    return new Promise((resolve, reject) => {
        db.query("SELECT role.id, title FROM role", function (err, results) {
            if (err) throw err;
            resolve(results);
        })
    })
}

// Creates a new employee
async function addEmployee() {
    const response = await getRoles();
    const input = await inquirer.prompt(
        [{
            type: "input",
            input: "Enter employee first name",
            name: "firstName",
        },
        {
            type: "input",
            input: "Enter employee last name",
            name: "lastName",
        },
        {
            type: "list",
            input: "Select the employee's role",
            choices: response.map((roleData) => {
                return roleData.title
            }),
            name: "role",
        }]
    )
    const selectedRole = await response.filter(role => {
        return role.name == input.name
    });
    const managers = await getManagers()
    const answers = await inquirer.prompt({
        type: 'list',
        message: 'Select the employee\'s manager',
        choices: managers.map(manager => manager.name),
        name: 'manager',
    })
    const selectedManager = await managers.filter(manager => {
        return manager.name == answers.manager
    })
    db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [input.firstName, input.lastName, selectedRole[0].id, selectedManager[0].id], function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(`${input.firstName} ${input.lastName} has been added!`);
            prompt();
        }
    });
};

// Get employee names and ids
async function getEmployees() {
    return new Promise((resolve, reject) => {
        db.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id, role_id FROM employee;", function (err, result) {
            if (err) throw err;
            resolve(result)
        })
    })
}

// Updates an employees role
async function updateEmployee() {
    const response = await getEmployees();
    const answer = await inquirer.prompt(
        {
            type: "list",
            input: "Select the employee",
            choices: response.map((employeeData) => {
                return employeeData.name
            }),
            name: "employee",
        })
    const selectedName = await response.filter((employee) => {
        return employee.name == answer.employee
    });
    const roles = await getRoles();
    const input = await inquirer.prompt({
        type: "list",
        message: "Select the employee's new role",
        choices: roles.map((roleData) => {
            return roleData.title
        }),
        name: "role",
    })
    const roleInfo = await roles.filter(roleData => {
        return roleData.title == input.role
    })
    db.query("UPDATE employee SET role_id = (?) WHERE id = (?)", [roleInfo[0].id, selectedName[0].id], function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log(`${answer.employee}'s role has been updated to ${input.role}!`);
            prompt();
        }
    })
}

prompt();