const db = require('../config/db');

exports.getAllAdoptionPosts = (req, res) =>{
    const sql = 'SELECT * FROM AdoptionPosts';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to retrieve adoption posts', err);
            return res.status(500).json({ error: 'Failed to retrieve adoption posts.'});
        }
        res.json(results);
    });
};

exports.getAdoptionPostById = (req, res) => {
    const sql = 'SELECT * FROM AdoptionPosts WHERE id = ?';
    const id = req.params.id;

    db.query(sql, [id], (err, results) => {
        if(err){
            console.error('Failed to retreive adoption post: ', err);
            return res.status(500).json({error: 'Post not found.'});
        }
        res.json(results[0]);
    });
};

exports.createAdoptionPost = (req, res) => {
    const {
        petName, species, breed, age, gender, description,
        reasonForAdoption, location, userID
    } = req.body;

    const photoURL = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = `INSERT INTO AdoptionPosts 
      (petName, species, breed, age, gender, description, reasonForAdoption, location, userID, photoURL)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [petName, species, breed, age, gender, description, reasonForAdoption, location, userID, photoURL];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Failed to create adoption post:', err);
            return res.status(500).json({ error: 'Failed to create adoption post.' });
        }
        res.status(201).json({ id: result.insertId, ...req.body, photoURL });
    });
};

exports.deleteAdoptionPost = (req, res) => {
    const sql = 'DELETE FROM AdoptionPosts WHERE id = ?';
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Failed to delete post:', err);
            return res.status(500).json({ error: 'Failed to delete post.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    });
};