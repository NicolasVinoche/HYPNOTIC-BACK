const express = require('express'); 
const router = express.Router(); 

const settingController = require('../controllers/settingController'); 
const multerS3 = require('../controllers/multers3');

router.put('/user/:id', settingController.updateUser);
router.post('/admin/pack', multerS3.newPack, async (res, req, next) => {
    console.log('req.file:', req.file)
    // console.log('req.title:', req.title)
    // console.log('req.description:', req.description)
    // console.log('req.tag:', req.tag)
    // console.log('req.price:', req.price)
    // title = req.body.title;
        // description = req.body.description;
        // price = req.body.price;
        // tag = req.body.tag;
        // file = req.file.location;
    try {
            // const newpack = await packDataMapper.insertPack(title, description, price, tag,req.file.location);
            //     console.log(newpack);
            // return res.status(200).json ({newpack}); 
        } catch (error) {
            next(error)
        }
} ); //settingController.newPack
router.post('/admin/track', settingController.newTrack);

module.exports = router;