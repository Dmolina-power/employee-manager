use employee_managerDB;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Daniel', 'Molina', 1, NULL),
    ('Lindsay', 'Martinez', 2, 1),
    ('James', 'Rodriguez', 3, NULL),
    ('Kevin', 'Suarez', 4, 3),
    ('Tim', 'Allen', 5, NULL),
    ('Aiden', 'Jaziel', 6, 5),
    ('Dominick', 'William', 7, NULL),
    ('Travis', 'Zayn', 8, 7);