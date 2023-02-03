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
                    }
                });
            })
    })
};