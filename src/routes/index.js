const { Router } = require('express');
const userRouter = require('./user');
const sensorRouter = require('./sensor');
const router = Router();
const middlewareAuth = require('../handles/functions')

router.use('/user', userRouter);
router.use('/sensor', middlewareAuth, sensorRouter)

module.exports = router