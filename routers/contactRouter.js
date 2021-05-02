const express = require('express'); 
const router = express.Router();  

const contactController = require('../controllers/contactControllers');
const auth = require('../controllers/auth');

router.get('/', auth, contactController.getMessages); 
router.post('/:id', contactController.postMessage);
router.delete('/:id', contactController.deleteMessage);

module.exports = router;