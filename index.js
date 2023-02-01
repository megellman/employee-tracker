const inquirer = require('inquirer');

inquirer.prompt(
    {
        type: 'list',
        message: 'Select one option',
        choices: [' view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role'],
        name: 'addOrDone'
    }
)
    .then((response) => {
        if (response === 'view all departments,') {
            ;
        } else if (response === 'view all roles') {
            ;
        } else if (response === 'add a department') {
            ;
        }
    })

