const express = require('express'); 
const router = express.Router();  

const albumController = require('../controllers/albumController');

router.get('/', albumController.getAlbum);
router.get('/:id', albumController.albumById);

module.exports = router;