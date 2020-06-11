const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_managerDB",
   }); 
    
   connection.connect(function (err) {
    if (err) throw err;
    runManager();
  });
    
  function runManager() {
    inquirer
      .prompt([
        {
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: [
            "Add a department",
            "Add a role",
            "Add an employee",
            "View a department",
            "View a role",
            "View an employee",
            "Update employee role",
            "Exit",
          ],
        },
      ]).then(function (answer) {
        switch (answer.action) {
          case "Add a department":
            addDepartment();
            break;
  
          case "Add a role":
            addRole();
            break;
  
          case "Add an Employee":
            addEmployee();
            break;
  
          case "View a department":
            viewDepartment();
            break;
  
          case "View a role":
            viewRole();
            break;
  
          case "View an employee":
            viewEmployee();
            break;
  
          case "Update employee role":
            update();
            break;
  
          case "Exit":
            connection.end();
            break;
        }
      });
  }