-- DROP DATABASE IF EXISTS cs319_final;

CREATE DATABASE IF NOT EXISTS DatabaseName;
USE DatabaseName;

-- Lucas: password can be updated via the 2fa information, and email
CREATE TABLE IF NOT EXISTS user_info (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(63) NOT NULL UNIQUE,
    email VARCHAR(63) NOT NULL,
    birth_city VARCHAR(63) NOT NULL, -- 2FA (forgot password)
    first_pet_name VARCHAR(63) NOT NULL, -- 2FA (forgot password)
    address_line_1 VARCHAR(127) NOT NULL,
    address_line_2_optional VARCHAR(127),
    address_line_3 VARCHAR(127) NOT NULL,
    address_line_4 VARCHAR(127) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Lucas: stores products and links back to the user who created them
CREATE TABLE IF NOT EXISTS product_info (
    product_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    manager_id BIGINT NOT NULL,
    manager_name VARCHAR(63) NOT NULL,
    product_type INT NOT NULL, -- enum that can be 0 (electronic), 1 (home/office), or 2 (clothing) 
    image LONGBLOB NOT NULL,
    title VARCHAR(63),
    price FLOAT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES user_info(user_id) ON DELETE CASCADE
);