const express = require('express'); 
const router = express.Router(); 

const masterclassController = require('../controllers/masterclassController')

router.get('/', masterclassController.getMasterclasses);

module.exports = router;