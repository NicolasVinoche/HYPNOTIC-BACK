const express = require('express'); 
const router = express.Router(); 

const masterclassController = require('../controllers/masterclassController')
const auth = require('../controllers/auth');

router.get('/',auth, masterclassController.getMasterclasses);

module.exports = router;