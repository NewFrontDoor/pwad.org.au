const {Router} = require('express');
const {checkToken, verifyToken} = require('./service');

const router = new Router();

router.get('/', checkToken, verifyToken, (req, res) => {
  if (req.authData) {
    res.json(req.authData);
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
