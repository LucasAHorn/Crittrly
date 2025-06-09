const express = require('express');
const router = express.Router();
const db = require('../config/db');

//GET all forum topics
router.get('/topics', (req, res) =>{
    const sql = 'SELECT * FROM forum_topics ORDER BY created_at DESC';
    db.query(sql, (err, results) =>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//CREATE a new topic
router.post('/topics', (req, res) =>{
    const{ title }=req.body;
    if (!title) return res.status(400).json({ error: "Title is required."});

    const sql = 'INSERT INTO forum_topics (title) VALUES (?)';
    db.query(sql, [title], (err, result) =>{
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, title });
    });
});

//GET posts for a topic
router.get('/topics/:topicId/posts', (req, res) =>{
    const topicId = req.params.topicId;
    const sql = 'SELECT * FROM forum_posts WHERE topic_id = ? ORDER BY created_at ASC';
    db.query(sql,[topicId], (err, results) =>{
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//ADD a post to a topic
router.post('/topics/:topicId/posts', (req,res) =>{
    const topicId = req.params.topicId;
    const { author, content } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required."});

    const sql = 'INSERT INTO forums_posts (topic_id, author, content) VALUES (?, ?, ?)';
    db.query(sql, [topic_id, author || 'Anonymous', content], (err, result) =>{
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, topic_id: topicId, author, content });
    });
});

module.exports = router;