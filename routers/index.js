const express = require('express');

const userRouter = require('./userRouter');
const packRouter = require('./packRouter'); 
const trackRouter = require('./trackRouter');
const streamRouter = require('./streamRouter'); 
const tipsRouter = require('./tipsRouter');
const cartRouter = require('./cartRouter');
const masterclassRouter = require('./masterclassRouter');
const settingRouter = require('./settingRouter'); 
const stripeRouter = require('./stripeRouter'); 
const contactRouter = require('./contactRouter');
const templeRouter = require('./templeRouter');
const albumRouter = require('./albumRouter');
const checkRouter = require('./checkRouter')

const errorsMiddleware = require('../controllers/errorsMiddleware'); 
const auth = require('../controllers/auth');

const router = express.Router();

router.use('/user', userRouter);
router.use('/pack', auth, packRouter);
router.use('/track', auth, trackRouter);
router.use('/stream', auth, streamRouter); 
router.use('/tips', auth, tipsRouter);
router.use('/cart', auth, cartRouter);
router.use('/masterclass', auth, masterclassRouter);
router.use('/setting', auth, settingRouter);
router.use('/contact', contactRouter);
router.use('/stripe', auth, stripeRouter);
router.use('/temple', templeRouter); 
router.use('/album', albumRouter);
router.use('/check', checkRouter);


router.use(errorsMiddleware.error404);
router.use(errorsMiddleware.error500);

module.exports = router;