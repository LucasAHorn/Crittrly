// import express from 'express';
// import multer from 'multer';
// import adoptionController from '../controllers/adoptionController';


const express = require('express');
const multer = require('multer');
const adoptionController = require('../controllers/adoptionController.js');

const router = express.Router();
const upload = multer({ dest: 'public/uploads/'});

console.log("adoption.js active");

router.get('/', adoptionController.getAllAdoptionPosts);
router.get('/:id', adoptionController.getAdoptionPostById);
router.post('/', upload.single('photo'), adoptionController.createAdoptionPost);
router.delete('/:id', adoptionController.deleteAdoptionPost);

module.exports = router;