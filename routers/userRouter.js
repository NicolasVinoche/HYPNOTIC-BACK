const express = require('express'); 
const router = express.Router(); 

const userController = require('../controllers/userController')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout/:id', userController.logout);
router.get ('/items/:id', userController.getItem);

module.exports = router;