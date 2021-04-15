const express = require('express'); 
const router = express.Router(); 

const settingController = require('../controllers/settingController')

router.put('/userupdate/:id', settingController.updateUser);

//router.put('/userpseudo/:id', settingController.updatePseudo);
//router.put('/userpassword/:id', settingController.updatePassword);


module.exports = router;