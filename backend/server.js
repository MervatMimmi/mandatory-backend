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
