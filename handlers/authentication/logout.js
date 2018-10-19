const keystone = require('keystone');
const {Router} = require('express');

const router = new Router();

router.get('/', keystone.session.signout, (req, res) => res.redirect('/'));

module.exports = router;
