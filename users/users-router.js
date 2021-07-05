const express = require('express');
const router = express.Router();

const users = require('../users/users-model');

router.get('/', (req, res) => {
    users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'unable to retrive users' });
        })
})

module.exports = router;