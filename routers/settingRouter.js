const express = require('express'); 
const router = express.Router(); 

const settingController = require('../controllers/settingController')

router.put('/user/:id', settingController.updateUser);
router.post('/admin/pack', settingController.newPack); 
router.post('/admin/track', settingController.newTrack);

module.exports = router;