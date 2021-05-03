const express = require('express'); 
const router = express.Router(); 

const settingController = require('../controllers/settingController'); 
const multerS3 = require('../controllers/multers3'); 
const packDataMapper = require ('../dataMappers/packDataMapper'); 
const trackDataMapper = require('../dataMappers/tracksDataMapper');
const albumDataMapper = require('../dataMappers/albumDataMapper');


router.put('/user/:id', settingController.updateUser);

// NEW PACK

router.post('/admin/pack', express.json({ limit: '100mb' }) ,multerS3.newPack, async(req, res, next) => {
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
            return res.status(200, 'INSERTION EN BASE DU PACK OK'); 
        } catch (error) {
            next(error)
        }
} ); 

// NEW TRACK

router.post('/admin/track', express.json({ limit: '100mb' }) ,multerS3.newTrack, async(req, res, next) => {
    console.log('req.file:', req.file)
    console.log('req.title:', req.body.title)
    next()
        title = req.body.title; 
        track_number = req.body.track_number;
        description = req.body.description;
        price = req.body.price;
        album_id = req.body.album_id;
        file = req.file.location;
    try {
            const newtrack = await trackDataMapper.insertTracks(title, track_number, description, price, album_id, file);
                console.log(newtrack);
            return res.status(200, 'INSERTION EN BASE DU TRACK OK'); 
        } catch (error) {
            next(error)
        }
} );

// NEW ALBUM

router.post('/admin/album', express.json({ limit: '100mb' }) ,multerS3.newTrack, async(req, res, next) => {
    console.log('req.file:', req.file)
    console.log('req.title:', req.body.title)
    next()
        title = req.body.title; 
        description = req.body.description;
        file = req.file.location;
        try {
            const newalbum = await albumDataMapper.insertAlbums(title, description, file);
                console.log(newalbum);
            return res.status(200, 'INSERTION EN BASE DE L\'ALBUM OK'); 
        } catch (error) {
            next(error)
        }
} );
module.exports = router;