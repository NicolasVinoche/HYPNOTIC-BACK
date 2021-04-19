const express = require('express'); 
const router = express.Router(); 

const tipsController = require('../controllers/tipsController');

router.get('/audio-effect', tipsController.getAudioEffect);
router.get('/midi-effect', tipsController.getMidiEffect);
router.get('/midi-instrument', tipsController.getMidiInstrument);

module.exports = router;