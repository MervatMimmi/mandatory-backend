const router = require('express').Router();
let Message = require('../models/message');

router.get('/', (req, res) => {
    Message.find()
        .then(messages => {
            res.send(messages);
        })
        .catch(error => {
            console.error(error);
            res.status(500).end()
        });
});
