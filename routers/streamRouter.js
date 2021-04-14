const express = require('express'); 
const router = express.Router(); 

const streamController = require('../controllers/streamController');

router.get('/', streamController.getStreams);

module.exports = router;