const express = require('express'); 
const router = express.Router(); 

const tipsController = require('../controllers/tipsController');

router.get('/', tipsController.getTips); 
router.get('/:category?', tipsController.tipsByCategory); 

module.exports = router;