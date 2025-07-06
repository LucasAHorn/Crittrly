const express = require('express');
const router = express.Router();
const db = require('../config/db');

console.log("resources.js active");

//GET requests to '/api/resources' and returns all entries in the resources table.
router.get('/', async (req, res) => {
    try{
        const category = req.query.category;
        let sql = 'SELECT * FROM resources';
        const params = [];
        if (category){
            sql += ' WHERE category = ?';
            params.push(category);
        }
        const [results] = await db.query(sql, params);
        res.json(results);
    } catch (err){
        res.status(500).json({ error: 'Failed to fetch resources', details: err });
    }
});

//POST a new resource
router.post('/', async (req,res) =>{
    try{
        const { title, description, link, category } = req.body;
        const sql = 'INSERT INTO resources (title, description, link, category) VALUES (?, ?, ?, ?)';

        const [result] = await db.query(sql, [title, description, link, category]);
        res.json({ id: result.insertId, ...req.body});
    } catch (err){
        res.status(500).json({ error: 'Failed to create resource', details: err });
    }
});
    
//DELETE a resource
router.delete('/:id', async (req, res) =>{
    try{
        await db.query('DELETE FROM resources WHERE id = ?', [req.params.id]);
        res.json({ message: 'Resource deleted successfully' });
    } catch(err){
        res.status(500).json({ error: 'Failed to delete resource', details: err });
    }
});

//PUT(UPDATE) a resource
router.put('/:id', async (req, res) =>{
    try{
        const {title, description, link, category} = req.body;
        const sql = 'UPDATE resources SET title = ?, description = ?, link = ?, category = ? WHERE id = ?';
        await db.query(sql, [title, description, link, category, req.params.id]);
        res.json({ message: 'Resource updated successfully'});
    } catch(err){
        res.status(500).json({ error: 'Failed to update resource', details: err});
    }
});

module.exports = router;