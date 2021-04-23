const express = require('express'); 
const router = express.Router();  

const contactController = require('../controllers/contactControllers');

router.get('/', contactController.getMessages); 
router.post('/:id', contactController.postMessage);

module.exports = router;