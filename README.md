# Employee Tracker
![license badge](https://img.shields.io/static/v1?label=license&message=MIT&color=blue)

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| Inquirer   | [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML) |      |   
| Git | [git-scm.com](https://git-scm.com/)     |    
| Node.js | [nodejs.org/docs](https://nodejs.org/docs/latest-v16.x/api/) |
| Console Table | [npmjs.com](https://www.npmjs.com/package/console.table) |
| MySQL | [dev.mysql.com](https://dev.mysql.com/doc/refman/8.0/en/invisible-columns.html) |
    
## Description

[Visit the Deployed Site](https://megellman.github.io/employee-tracker/)
    
This project is an employee database where a user can view departments, roles, and employees as well as update the various content. 

I created this project using Node.js, Inquirer, and MySQL. When a user first runs the application, they are presented with a few different options. They can either see different information or they can change information. 

This project was my first time applying my knowledge of MySQL. Through this, I've gained a lot of experience with MySQL. Additionally, I have built upon my knowledge of Node.js and Inquirer.

[Project Video]( https://watch.screencastify.com/v/AxtvWVHLFjhYMW1czkQV)

## Code Example
```
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
```
Here I used async and await to update the employee information. The inquirer prompt will not run until the getEmployees function has run.  The response.filter will not run until the inquirer prompt is finished and so on. This makes working with inquirer and ansynchronous functions easy because they will not run without their necessary information.

## Author Info

### Megan Ellman

[LinkedIn](https://www.linkedin.com/in/megan-ellman/)

[GitHub](https://github.com/megellman)

[Portfolio](https://megellman.github.io/portfolio/)

## License
  
  This project is covered under the MIT license. For more information please click [here](https://choosealicense.com/)

## Questions

[GitHub](github.com/megellman)

If you have any additional questions, you can reach me at meganlellman@gmail.com
