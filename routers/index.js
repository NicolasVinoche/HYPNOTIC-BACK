const express = require('express');

const userRouter = require('./userRouter');
const packRouter = require('./packRouter'); 
const projectRouter = require('./projectRouter');
const streamRouter = require('./streamRouter'); 
const tipsRouter = require('./tipsRouter');
const cartRouter = require('./cartRouter');
const masterclassRouter = require('./masterclassRouter');
const settingRouter = require('./settingRouter'); 
const stripeRouter = require('./stripeRouter');

const errorsMiddleware = require('../controllers/errorsMiddleware');

const router = express.Router();

router.use('/user', userRouter);
router.use('/pack', packRouter); 
router.use('/project', projectRouter);
router.use('/stream', streamRouter); 
router.use('/tips', tipsRouter);
router.use('/cart', cartRouter);
router.use('/masterclass', masterclassRouter);
router.use('/setting', settingRouter); 
router.use('/', stripeRouter);


router.use(errorsMiddleware.error404);
router.use(errorsMiddleware.error500);

module.exports = router;