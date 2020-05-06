import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

import { makeStyles, TextField } from '@material-ui/core';
import { Paper, Typography, Button, Chip, List, ListItem, ListItemText , IconButton} from '@material-ui/core';
import { token$, updateToken } from './store';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
    },
    typography: {
        textAlign: 'center',
    }, 
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    topicsWindow: {
        width: '30%',
        height: '500px',
        borderRight: '1px solid grey',
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px',
    },
    chatBox: {
        width: '85%',
    }, 
    button: {
        width: '15%',
    }
}));

const socket = io('http://localhost:9090');

export default function Room(props) {
    const classes = useStyles();
    const [message, updateMessage] = useState('');
    const [messages, updateMessages] = useState([]);
    const [token, setToken] =useState(token$.value);
    const [users, updateUsers] = useState([]);

    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        return() => subscription.unsubscribe();
    }, []);

    useEffect(()=> {
        socket.on('RECEIVE_MESSAGE', function(data){
            updateMessages(x => x.concat(data));
        });
        axios.get('/rooms/room/:id')
            .then(response => {
                console.log(response.data);
                updateMessages(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            return()=> {
                socket.off('socket off');
            };
    }, []);

    function handleOnChange(e) {
        updateMessage(e.target.value);
    }

    function sendMessage(e) {
        e.preventDefault();

        let data = {
            message: message,
            messageBy: token,
        };
        console.log(data);
        
        axios.post('/rooms/room', data)
            .then(response => {
                console.log(response.data);
                updateMessage('');
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    /*function onUpload(){
        handleRoomList()
    }

    useEffect(() => {
        handleRoomList();
    }, []);

    function handleRoomList() {
        axios.get('/rooms')
            .then(response => {
                console.log(response.data);
                updateRooms(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function logOut() {
        updateToken(null);
    }

    const roomList = (
        <div>
            <List>
                {rooms.map((room, i) => (
                    <ListItem key = {i} button component = {Link} to= {`/room/${room._id}`}>
                        <ListItemText primary = {room.roomTitle} />
                    </ListItem>
                ))}
            </List>
        </div>
    )*/
    
    return(
        <div>
            <Paper className = {classes.root}>
                <Typography className = {classes.typography} variant = 'h4' component = 'h4'>
                    MERN chat app
                </Typography>
                <Typography className = {classes.typography} variant = 'h5' component = 'h5'>
                    Hello {token$.value}! 
                </Typography>
                <div className = {classes.flex}>
                    <div className = {classes.topicsWindow}>
                        {/*{roomList}*/}
                       <Link to ='/' ><Button className = {classes.button}
                            variant = 'contained'
                            color = 'primary'
                            //onClick = {logOut}
                            >
                                Logout
                       </Button></Link>
                       <Link to ='/main' ><Button className = {classes.button}
                            variant = 'contained'
                            color = 'primary'
                            >
                            Main
                       </Button></Link>
                    </div>
                    <div className = {classes.chatWindow}>
                        {
                            messages.map((msg, i) => (
                                <div className = {classes.flex} key = {i}>
                                    <Chip className = {classes.chip}
                                        label = {msg.messageBy}/>
                                        <Typography variant = 'body1'>
                                            {msg.message}
                                        </Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className = {classes.flex}>
                    <TextField className = {classes.chatBox}
                        id = 'standard-name' 
                        label = 'Send a chat'
                        margin = 'normal'
                        value = {message}
                        onChange = {handleOnChange}
                        />
                    <Button className = {classes.button}
                        variant = 'contained' 
                        color = 'primary'
                        onClick = {sendMessage}
                        >
                            Send
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

