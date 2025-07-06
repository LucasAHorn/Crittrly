const express = require('express');
const router = express.Router();
const db = require('../config/db');

console.log("forum.js active");

//GET all forum topics
router.get('/topics', async (req, res) =>{
    try{
        const [results] = await db.query('SELECT * FROM forum_topics ORDER BY created_at DESC');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch topics', details: err.message });
    }
});

//CREATE a new topic
router.post('/topics', async (req, res) =>{
    const{ title }=req.body;
    if (!title) return res.status(400).json({ error: "Title is required."});

    try {
        const [result] = await db.query('INSERT INTO forum_topics (title) VALUES (?)', [title]);
        res.json({ id: result.insertId, title});
    } catch(err){
        res.status(500).json({error: 'Failed to create topic', details: err.message });
    }
});

//GET posts for a topic
router.get('/topics/:topicId/posts', async (req, res) =>{
    const topicId = req.params.topicId;
    try{
        const [result] = await db.query(
            'SELECT * FROM forum_posts WHERE topic_id = ? ORDER BY created_at ASC', 
            [topicId]
        );
        res.json(results);
    } catch (err){
        res.status(500).json({ error: 'Failed to fetch posts', details: err.message});
    }
});

//ADD a post to a topic
router.post('/topics/:topicId/posts', async (req,res) =>{
    const topicId = req.params.topicId;
    const { author, content } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required."});

    try {
        const [result] = await db.query(
            'INSERT INTO forum_posts (topic_id, author, content) VALUES (?, ?, ?)',
            [topicId, author || 'Anonymous', content]
        );
        console.log('Inserted post id:', result.insertId);
        res.json({
            id: result.insertId,
            topic_id: topicId,
            author: author || 'Anonymous',
            content,
        });
    } catch (err){
        res.status(500).json({ error: 'Failed to add post', details: err.message});
    }
});

module.exports = router;