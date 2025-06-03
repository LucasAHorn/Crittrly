-- This should contain the sql to create the tables
CREATE DATABASE IF NOT EXISTS crittrly_db;

USE crittrly_db;

CREATE TABLE IF NOT EXISTS resources(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(500),
    category VARCHAR(100)
);