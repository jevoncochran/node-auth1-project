const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

const users = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    users.add(user)
        .then(added => {
            res.status(201).json(added);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'unable to register user' });
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    users.findBy({ username })
        .first()
        .then(user => {
            console.log("user", user);
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}` });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'unable to retrieve user' });
        })
})

module.exports = router;