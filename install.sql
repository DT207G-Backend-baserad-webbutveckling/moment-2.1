CREATE DATABASE cv;

USE cv;

CREATE TABLE workexperience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    companyname VARCHAR(255) NOT NULL,
    jobtitle VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE,
    description TEXT
);
