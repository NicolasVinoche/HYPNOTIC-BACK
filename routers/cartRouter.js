const express = require('express'); 
const router = express.Router(); 

const cartController = require('../controllers/cartController');


router.put('/:id', cartController.cartUpdate); 
router.get('/:id', cartController.getCart);

module.exports = router;