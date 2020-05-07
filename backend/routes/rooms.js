const router = require('express').Router();
let Room = require('../models/room');
let Message = require('../models/message');

const express = require('express');
const server = require('http').Server(express);
const io = require('socket.io')(server);



// Get a list of all chat rooms
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

// Post api/create room with a roomTitle
router.post('/', (req, res) => {
    console.log('hej      ' + req.body.roomTitle);
    const roomTitle = req.body.roomTitle;
    Room.find({roomTitle:roomTitle})
        .then(room =>{
            if(room.length === 0){
                console.log("Room doesn't exist, create room: "+ roomTitle);
                const newRoom = new Room({roomTitle});
                newRoom.save()
                    .then(() => {
                        console.log('new room is created');
                        res.status(201).send();
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(400);
                    });
            }else{
                console.log("Room already exist, dont create room: "+roomTitle);
                res.status(400); 
            }  
        })
        .catch(error => {
            console.error(error);
            res.status(500).end();
        });
    
});

// get one room by id
router.get('/:id/', (req, res) => {
    Room.findById(req.params.id)
        .then(room => {
            res.status(200).send(room)
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
        });
});

// Delete api room
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
});

//Post api room id, username, message

router.post('/room/:id', (req, res) => {
    
    const chatRoomId = req.params.id;
    let newMsg = new Message({
        chatRoomId: chatRoomId,
        message: req.body.message,
        messageBy: req.body.messageBy,
    });
    newMsg.save()
        .then(() => {
            console.log('msg saved');
           
            
            io.emit('newMsg', newMsg);
            res.status(201).send();
            /*
            io.on('connection',(socket) => {
                console.log('rooms: a user connected');
                socket.emit('newMsg', newMsg); 
            });
            */
                
        })
        .catch(error => {
            console.error(error);
            res.status(400).end();
        });
});

//Get chat details in a room
router.get('/room/:id' , (req, res) => {
   Message.find({chatRoomId:req.params.id})
        .then(messages =>{
            res.send(messages);
        })
        .catch(error => {
            console.error(error);
            res.status(500).end();
        });
});

module.exports = router;