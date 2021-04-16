const express = require('express'); 
const router = express.Router();  

const stripeController = require('../utils/stripeController'); 

router.post('/checkout', stripeController.stripeCheckout); 

module.exports = router;