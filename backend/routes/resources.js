const express = require('express');
const router = express.Router();
const db = require('../config/db');

//GET requests to '/api/resources' and returns all entries in the resources table.
router.get('/', (req, res) => {
    const category = req.query.category;
    let sql = 'SELECT * FROM resources';
    const params = [];

    if (category){
        sql += ' WHERE category = ?';
        params.push(category);
    }
    db.query(sql, params, (err, results) =>{
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

//POST a new resource
router.post('/', (req,res) =>{
    const {title, description, link, category} = req.body;
    const sql = 'INSERT INTO resources (title, description, link, category) VALUES (?,?,?,?)';
    db.query(sql, [title, description, link, category], (err, result) =>{
        if (err) return res.status(500).json(err);
        res.json({id: result.insertId, ...req.body});
    });
});

//DELETE a resource
router.delete('/:id', (req, res) =>{
    db.query('DELETE FROM resources WHERE id = ?', [req.params.id],(err) =>{
        if (err) return res.status(500).json(err);
        res.json({message: 'Resource deleted successfully'});
    });
});

//PUT(UPDATE) a resource
router.put('/:id', (req, res) =>{
    const {title, description, link, category} = req.body;
    const sql = 'UPDATE resources SET title = ?, description = ?, link = ?, category = ? WHERE id = ?';
    db.query(sql, [title, description, link, category, req.params.id], (err,result) =>{
        if (err) return res.status(500).json(err);
        res.json({message: 'Resource updated successfully'});
    });
});

module.exports = router;