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
    ])
    .then(function (answer) {
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
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What department are you adding?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) values(?)",
        [response.department],
        function (err, res) {
          if (err) throw err;

          viewDepartment();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Add a role",
      },
      {
        type: "input",
        name: "salary",
        message: "Add a salary",
      },
      {
        type: "input",
        name: "department_id",
        message: "Add a department id",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO employee_role (title, salary, department_id) VALUES (?,?,?)",
        [response.role, response.salary, response.department_id],
        function (err, res) {
          if (err) throw err;
          // console.table(res);
          viewRole();
        }
      );
    });
}

function addEmployee() {
  console.log("Add employee");
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleId",
        type: "lists",
        message: "Assign a role ID?",
        choices: [1, 2, 3, 4, 5, 6],
      },
      {
        name: "managerId",
        type: "lists",
        message: "Assign a manager ID",
        choices: [1, 2],
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) values(?, ?, ?, ?)",
        [
          response.firstname,
          response.lastname,
          response.roleId,
          response.managerId,
        ],
        function (err, res) {
          if (err) throw err;
          viewEmployee();
        }
      );
    });
}

function viewDepartment() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runManager();
  });
}

function viewRole() {
  var query = "SELECT * FROM employee_role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runManager();
  });
}

function viewEmployee() {
  //* is everthing
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runManager();
  });
}

function update() {
  console.log("Update employee roles");
  connection.query("SELECT * FROM employee", function (err, employeeObject) {
    const employees = employeeObject.map((employee) => {
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });

    connection.query("SELECT * FROM employee_role", function (err, roleObject) {
      const roles = roleObject.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "What employee's role do you want to update?",
            choices: employees,
          },
          {
            type: "list",
            name: "role",
            message: "What is the employees new role?",
            choices: roles,
          },
        ])
        .then((answer) => {
          console.log(answer);

          const id = answer.employee;
          const role = answer.role;

          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [role, id],
            function (err, result) {
              if (err) throw err;
              viewEmployee();
              console.log(
                `Employee number ${id}'s role id is changed to role number ${role}`
              );
            }
          );
        });
    });
  });
}
