const express = require('express'); 
const router = express.Router();  

const packController = require('../controllers/packController');

router.get('/', packController.getPacks);
router.get('/:tag?', packController.packByTag);
router.get('/:id', packController.packById);



module.exports = router;