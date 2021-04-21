const express = require('express'); 
const router = express.Router(); 

const settingController = require('../controllers/settingController')

router.put('/user/:id', settingController.updateUser);
// router.get('/admin/:id/contact', settingController);
// router.get('/admin/:id/temple', settingController);

module.exports = router;