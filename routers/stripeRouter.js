const express = require('express'); 
const router = express.Router();  

const stripeController = require('../utils/stripeController'); 

router.post('/', stripeController.stripeCheckout); 

module.exports = router;