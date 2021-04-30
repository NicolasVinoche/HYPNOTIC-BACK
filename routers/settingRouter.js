const express = require('express'); 
const router = express.Router(); 

const settingController = require('../controllers/settingController'); 
const multerS3 = require('../controllers/multers3'); 
const packDataMapper = require ('../dataMappers/packDataMapper');

router.put('/user/:id', settingController.updateUser);
router.post('/admin/pack', multerS3.newPack, async(req, res, next) => {
    console.log('req.file:', req.file)
    console.log('req.title:', req.body.title)
    next()
    title = req.body.title;
        description = req.body.description;
        price = req.body.price;
        tag = req.body.tag;
        file = req.file.location;
    try {
            const newpack = await packDataMapper.insertPack(title, description, price, tag, file);
                console.log(newpack);
            // return res.status(200).json ({newpack}); 
        } catch (error) {
            next(error)
        }
} ); //settingController.newPack
router.post('/admin/track', settingController.newTrack);

module.exports = router;