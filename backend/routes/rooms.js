const router = require('express').Router();
let Room = require('../models/room.model');

// GET ALL ROOMS
router.get('/', (req, res) => {
    Room.find()
        .then(rooms => {
            res.send(rooms);
        })
        .catch(error => {
            console.error(error);
            res.status(500).end(); 
        });
});

/*// GET ONE ROOM BY ID
router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(room => {
            res.send(room);
        })
        .catch(error => {
            console.error(error);
            res.status(500).end();  
        });
});*/

// SAVE ALL ROOMS
router.post('/', (req, res) => {
    console.log('hej      ' + req.body.roomTitle);
    const roomTitle = req.body.roomTitle;
    const newRoom = new Room({roomTitle});
    newRoom.save()
        .then(() => {
            console.log('new room is created');
            res.status(201).send();
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
        });
});

/*// UPDATE ROOM
router.patch('/:id', (req,res) => {
    Room.findByIdAndUpdate(req.params.id)
        .then(() => {
            console.log('changed: ' + req.params.id);
            res.status(201).send();
        })
        .catch(error => {
        console.error(error);
        res.status(201).send(post);
        });
});*/

// DELETE ROOM
router.delete('/:id', (req,res) => {
    console.log(req.body._id);
    
    Room.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log('deleted: ' + req.params.id);
            res.status(201).send();
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
            
        })
    }); 



module.exports = router;