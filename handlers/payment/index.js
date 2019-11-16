const {Router} = require('express');
const webhook = require('./webhook');

const router = new Router();

router.use('/webhook', webhook);

module.exports = router;
