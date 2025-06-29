const db = require('../config/db');

const AdoptionPost = {
getAll: (callback) => {
        db.query('SELECT * FROM AdoptionPosts', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM AdoptionPosts WHERE post_id = ?', [post_id], callback);
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

    delete: (post_id, callback) => {
        db.query('DELETE FROM AdoptionPosts WHERE post_id = ?'[post_id], callback);
    }
};

module.exports = AdoptionPost;
