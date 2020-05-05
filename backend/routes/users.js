const router = require('express').Router();
let User = require('../models/user');

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).end();
        });
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save()
        .then(() => {
            console.log('working working');
            res.status(201).send();
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
        });
});

module.exports = router;