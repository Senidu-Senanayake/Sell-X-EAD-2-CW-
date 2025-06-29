create database userdb;
USE userdb;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'Moderator', 'Stock Manager') NOT NULL,
  contact VARCHAR(20)
);