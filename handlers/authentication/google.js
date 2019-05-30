const {Router} = require('express');
const auth = require('./auth');
const callbacks = require('./callbacks');

const router = new Router();

const scope = ['profile email'];

const authHandler = auth('google', {scope, session: false});
const callbackHander = callbacks('google', {scope, session: false});

router.get('/', authHandler);
router.get('/callback', callbackHander);

module.exports = router;
