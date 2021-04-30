const express = require('express'); 
const router = express.Router(); 

const settingController = require('../controllers/settingController'); 
const multerS3 = require('../controllers/multers3');

router.put('/user/:id', settingController.updateUser);
router.post('/admin/pack', multerS3.newPack, (req, res, next) => {
console.log('req:', req.files)
next()
} ); //settingController.newPack
router.post('/admin/track', settingController.newTrack);

module.exports = router;