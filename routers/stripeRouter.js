const express = require('express'); 
const router = express.Router();  

const stripeController = require('../controllers/stripeController'); 

router.post('/checkout', stripeController.stripeCheckout);
router.post('/sub', stripeController.stripeSub);

module.exports = router;