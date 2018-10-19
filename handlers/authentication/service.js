const config = require('config');
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.replace(/^\s*Bearer\s*/, '');
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};

const verifyToken = (req, res, next) => {
  jwt.verify(req.token, config.get('API_TOKEN_SECRET'), (err, authData) => {
    console.log({authData});
    if (err) {
      res.sendStatus(403);
    } else {
      req.authData = authData;
      next();
    }
  });
};

const signToken = (req, res) => {
  jwt.sign(
    {userId: req.user._id},
    'secretkey',
    {expiresIn: '5 min'},
    (err, token) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({token});
      }
    }
  );
};

module.exports = {
  checkToken,
  verifyToken,
  signToken
};
