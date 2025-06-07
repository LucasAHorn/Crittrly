const AdoptionPost = require('../models/AdoptionPost');

exports.getAllAdoptionPosts = async (req, res) => {
    try {
        const posts = await AdoptionPost.findAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({error: 'Failed to retrieve adoption posts.'});
    }
};

exports.getAdoptionPostById = async (req, res) => {
    try{
        const post = await AdoptionPost.findByPk(req.params.id);
        if (!post) return res.status(404).json({error: 'Post not found.'});
        res.json(post);
    } catch(err){
        res.status(500).json({error: 'Failed to retrieve the post.'});
    }
};

exports.createAdoptionPost = async (req, res) => {
    try{
        const { petName, species, breed, age, gender, description, reasonForAdoption, locaiton, userID } = req.body;
        const photoURL = req.file ? `/uploads/${req.file.filename}` : null;

        const post = await AdoptionPost.create({
            petName,
            species,
            breed,
            age,
            gender,
            description,
            reasonForAdoption,
            locaiton,
            userID,
            photoURL
        });
        res.status(201).json(post);
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'Failed to create adoption post.'});
    }
};

exports.deleteAdoptionPost = async (req, res) => {
    try {
        const deleted = await AdoptionPost.destroy({ where: { id: req.params.id }});
        if (!deleted) return res.status(404).json({error: 'Post not found'});
        res.json({ message: 'Post deleted'});
    } catch(err){
        res.status(500).json({ error: 'Failed to delete post.'});
    }
};
