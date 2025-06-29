CREATE DATABASE inventorydb;

USE inventorydb;

CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  unit_price DECIMAL(10, 2),
  stock_quantity INT DEFAULT 0,
  reorder_level INT DEFAULT 10
);
