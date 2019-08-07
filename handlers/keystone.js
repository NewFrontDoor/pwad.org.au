const {Router} = require('express');
const keystone = require('keystone');
const {find} = require('lodash');

const router = new Router();

router.use('/', (req, res, next) => {
  if (req.ability.can('read', 'keystone')) {
    keystone.list('User').set('hidden', req.ability.cannot('manage', 'User'));
  }

  next();
});

const checkAbility = (req, res, next) => {
  const list = find(keystone.lists, {path: req.params.list});
  if (list) {
    if (req.ability.can('read', list.key)) {
      next();
    } else {
      res.redirect('/keystone');
    }
  } else {
    next();
  }
};

router.all('/:list/:page([0-9]{1,5})?', checkAbility);
router.all('/:list/:item', checkAbility);

module.exports = router;
