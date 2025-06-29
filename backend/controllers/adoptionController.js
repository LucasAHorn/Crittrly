const db = require('../config/db');

exports.getAllAdoptionPosts = async (req, res) =>{
    try{
        const [results] = await db.query('SELECT * FROM AdoptionPosts');
        res.json(results);
    } catch(err){
        console.error('Failed to retrieve adoption posts:', err);
        res.status(500).json({ error: 'Failed to retrieve adoption posts.'});
    }
};

exports.getAdoptionPostById = async (req, res) => {
    const post_id = req.params.id;
    try{
        const [results] = await db.query('SELECT * FROM AdoptionPosts WHERE id = ?', [post_id]);
        if (results.length === 0){
            return res.status(404).json({ error: 'Post not found. '});
        }
        res.json(results[0]);
    } catch (err){
        console.error('Failed to retrieve adption post: ', err);
        res.status(500).json({ error: 'Failed to retrieve post.'});
    }
};

exports.createAdoptionPost = async (req, res) => {
    const {
        petName, species, breed, age, gender, description,
        reasonForAdoption, location, userID
    } = req.body;

    const photoURL = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = `INSERT INTO AdoptionPosts 
      (petName, species, breed, age, gender, description, reasonForAdoption, location, userID, photoURL)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [petName, species, breed, age, gender, description, reasonForAdoption, location, userID, photoURL];

    try{
        const [result] = await db.query(sql, values);
        res.status(201).json({ id: result.insertId, ...req.body, photoURL});
    } catch (err){
        console.error('Failed to create adoption post:', err);
        res.status(500).json({ error: 'Failed to create adoption post.'});
    }
};

exports.deleteAdoptionPost = async (req, res) => {
    const id = req.params.id;
    try{
        const[result] = await db.query('DELETE FROM AdoptionPosts WHERE id = ?', [id]);
        if (result.affectedRows === 0){
            return res.status(404).json({ error: 'Post not found.'});
        }
        res.json({ message: 'Post deleted'});
    } catch (err){
        console.error('Failed to delete post: ', err);
        res.status(500).json({ error: 'Failed to delete post.'});
    }
};