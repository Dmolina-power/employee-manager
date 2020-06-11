DROP DATABASE IF EXISTS employee_managerDB;
CREATE DATABASE employee_managerDB;
USE employee_managerDB;

CREATE TABLE department(
  id INT AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
  PRIMARY KEY (id)
);
CREATE TABLE employee_role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;