const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const restricted = require('../auth/restricted-middleware');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);

router.get('/hash', (req, res) => {
  const authentication = req.headers.authentication;

  const hash = bcrypt.hashSync(authentication, 8);

  res.json({ originalValue: authentication, hashedValue: hash });
})

router.get('/', (req, res) => {
    console.log(req.session);
    res.json({ api: "It's alive" });
  });

module.exports = router;