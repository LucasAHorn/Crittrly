const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const multer = require('multer');

const upload = multer({ dest: 'public/uploads/'});

router.get('/', adoptionController.getAllAdoptionPosts);
router.get('/:id', adoptionController.getAdoptionPostById);
router.post('/', upload.single('photo'), adoptionController.createAdoptionPost);
router.delete('/:id', adoptionController.deleteAdoptionPost);

module.exports = router;