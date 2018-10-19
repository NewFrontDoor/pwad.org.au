const config = require('config');
const Keygrip = require('keygrip');
const jwt = require('jsonwebtoken');

const cookieKeygrip = new Keygrip([config.get('SESSION_COOKIE_SECRET')]);

const getCookies = ({userId}) => {
  const session = Buffer.from(
    JSON.stringify({passport: {user: userId}})
  ).toString('base64');

  const sessionSig = cookieKeygrip.sign(`session=${session}`);

  return {session, 'session.sig': sessionSig};
};

const signCookie = cookie => {
  return jwt.sign({cookie}, config.get('API_TOKEN_SECRET'), {
    expiresIn: '25y'
  });
};

module.exports = {
  cookieKeygrip,
  getCookies,
  signCookie
};
