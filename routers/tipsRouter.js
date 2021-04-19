const express = require('express'); 
const router = express.Router(); 

const tipsController = require('../controllers/tipsController');

router.get('/audio_effect', tipsController.getAudioEffect);

module.exports = router;