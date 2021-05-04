const express = require('express'); 
const router = express.Router(); 

const userController = require('../controllers/userController')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout/:id', userController.logout);
router.get ('/item/:id', userController.getItem);

module.exports = router;