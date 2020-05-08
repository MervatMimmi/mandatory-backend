const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")

const router = require('express').Router();
let Room = require('./models/room');
let Message = require('./models/message');

app.use(bodyParser.urlencoded({ extended: true }));

//require('dotenv').config();
//const PORT = process.env.PORT || 9090;
const PORT = 9090;

app.use(cors());
app.use(express.json());

const dbUrl = 'mongodb://localhost:27017/mydb'

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB databas connection established sucessfully');
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const roomsRouter = require('./routes/rooms');
app.use('/rooms', roomsRouter(io));

io.on('connection',(socket) => {
    console.log('server: a user connected');
});

server.listen(PORT, function() {
    console.log('Server is running on Port' + PORT);  
});



/*
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
                        res.status(404);
                    });
            }else{
                console.log("Room already exist, dont create room: "+roomTitle);
                res.status(400).send(); 
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

module.exports = router;*/