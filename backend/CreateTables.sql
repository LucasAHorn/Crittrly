-- This should contain the sql to create the tables
CREATE DATABASE IF NOT EXISTS crittrly_db;
USE crittrly_db;

CREATE TABLE IF NOT EXISTS resources(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(500),
    category VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS forum_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS forum_posts(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic_id INT NOT NULL,
    author VARCHAR(100) DEFAULT 'Anonymous',
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS adoption_posts(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    petName VARCHAR(100) NOT NULL,
    species VARCHAR(50),
    breed VARCHAR(100),
    age VARCHAR(50),
    gender VARCHAR(20),
    description TEXT,
    reasonForAdoption TEXT,
    location VARCHAR(255),
    userID INT,
    photoURL VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);