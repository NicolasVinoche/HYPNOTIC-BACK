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
const contactRouter = require('./contactRouter');
const templeRouter = require('./templeRouter');

const errorsMiddleware = require('../controllers/errorsMiddleware'); 
const authentificationMiddleware = require('./authentificationMiddleware');

const router = express.Router();

router.use('/user', userRouter);
router.use('/stream', authentificationMiddleware.checkTokenMiddleware(), (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Décodage du token
    const decoded = jwt.decode(token, { complete: false })

    return res.json({ content: decoded }); 
});

router.use('/pack', packRouter);
router.use('/project', projectRouter);
router.use('/stream', streamRouter); 
router.use('/tips', tipsRouter);
router.use('/cart', cartRouter);
router.use('/masterclass', masterclassRouter);
router.use('/setting', settingRouter); 
router.use('/messages', contactRouter);
router.use('/', stripeRouter);
router.use('/temple', templeRouter);


router.use(errorsMiddleware.error404);
router.use(errorsMiddleware.error500);

module.exports = router;