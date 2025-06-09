const db = require('../config/db');

const AdoptionPost = {
    createTableIfNotExists: () =>{
        const sql = `
        CREATE TABLE IF NOT EXISTS AdoptionPosts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            petName  VARCHAR(255) NOT NULL,
            species VARCHAR(255) NOT NULL,
            breed VARCHAR(255) NOT NULL,
            age INT NOT NULL,
            gender ENUM('Male', 'Female') NOT NULL,
            reasonForAdoption TEXT,
            location VARCHAR(255) NOT NULL,
            photoURL VARCHAR(255) NOT NULL,
            userID INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            udpatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;
        db.query(sql, (err) => {
            if (err) console.error('Error creating AdoptionPost table:', err);
            else console.log('AdoptionPosts table ready');
        });
    },
    getAll: (callback) => {
        db.query('SELECT * FROM AdoptionPosts', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM AdoptionPosts WHERE id = ?', [id], callback);
    },

    create: (post, callback) =>{
        const {
            petName,
            species,
            breed,
            age,
            gender,
            reasonForAdoption,
            location,
            photoURL,
            userID
        } = post;

        const sql = `
            INSERT INTO AdoptionPosts
            (petName, species, breed, age, gender, reasonForAdoption, location, photoURL, userID)
            values (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [petName, species, breed, age, gender, reasonForAdoption, location, photoURL, userID], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM AdoptionPosts WHERE id = ?'[id], callback);
    }
};

module.exports = AdoptionPost;
