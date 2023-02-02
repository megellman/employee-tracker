INSERT INTO department(name) 
VALUES 
    ("HR"),
    ("Engineering"),
    ("Sales"),
    ("Customer Service"),
    ("Operations");

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
    ("Joe", "Johnson", 11, null),
    ("Ann", "Pham", 7, null),
    ("Cara", "Leviene", 3, null),
    ("Jeremy", "Gomez", 15, null),
    ("Rob", "Lewis", 17, null),
    ("Beth", "Franklin", 1, 1),
    ("John", "Chen", 16, 5),
    ("Iris", "Houston", 10, 3),
    ("Helen", "Nguyen", 9, 3),
    ("Winston", "Graves", 12, 4),
    ("Shannon", "Cain", 19, 5),
    ("Roger", "Fields", 16, 4),
    ("Melody", "Woods", 14, 4),
    ("Danny", "Barton", 13, 4),
    ("Kristi", "Farmer", 6, 2),
    ("Hugh", "Ryan", 8, 3),
    ("Jeanette", "Carpenter", 8, 3),
    ("Cody", "Munoz", 6, 2),
    ("Karla", "Flores", 18, 5),
    ("Lindsey", "Tran", 18, 5),
    ("Kim", "Mccoy", 14, 4),
    ("Bailey", "Christensen", 19, 5),
    ("Larry", "Fullner", 20, 5),
    ("Barret", "Gain", 19, 5),
    ("Jo", "Kim", 10, 3);
   
