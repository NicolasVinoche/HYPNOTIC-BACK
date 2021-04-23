const express = require('express'); 
const router = express.Router(); 

const cartController = require('../controllers/cartController'); 
const auth = require('../controllers/auth');

router.put('/:id', cartController.cartUpdate); 
router.get('/:id', auth, cartController.getCart);

module.exports = router;