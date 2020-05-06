const router = require('express').Router();
let Room = require('../models/room');
let Message = require('../models/message');

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

// GET ONE ROOM
router.get('/:id/', (req, res) => {
    Room.findById(req.params.id)
        .then(room => {
            res.send(room)
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
        });
});

// DELETE ONE ROOM
router.delete('/:id/', (req, res) => {
    console.log(req.params.id);
    
    let roomId = req.params.id;
    console.log("roomId "+roomId);
    Room.findByIdAndDelete(req.params.id)
    .then(() => {
        res.send('Room deleted')
    })
    .catch(error => {
        console.error(error);
        res.status(400).end();  
    });
})

//save chat in a room
router.post('/room', (req, res) => {
    let newMsg = new Message({
        message: req.body.message,
        messageBy: req.body.messageBy,
    });
    newMsg.save()
        .then(() => {
            console.log('msg saved');
            res.status(201).send();
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
        });
});

//Get chat in a room
router.get('/room/:id' , (req, res) => {
    Message.find()
        .then(messages =>{
            res.send(messages);
        })
        .catch(error => {
            console.error(error);
            res.status(500).end();
        });
});

module.exports = router;