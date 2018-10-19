const {Router} = require('express');
const google = require('./google');
const logout = require('./logout');
const verify = require('./verify');

const router = new Router();

router.use('/google', google);
router.use('/logout', logout);
router.use('/verify', verify);

module.exports = router;
