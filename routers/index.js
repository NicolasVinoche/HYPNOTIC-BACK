const express = require('express');

const userRouter = require('./userRouter');
const packRouter = require('./packRouter'); 
const projectRouter = require('./projectRouter');
const streamRouter = require('./streamRouter');

const packController = require('../controllers/packController');


const errorsMiddleware = require('../controllers/errorsMiddleware');

const router = express.Router();

router.use('/user', userRouter);
router.use('/pack', packRouter); 
router.use('/project', projectRouter);
router.use('/stream', streamRouter);

router.use(errorsMiddleware.error404);
router.use(errorsMiddleware.error500);

module.exports = router;