import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

import { makeStyles, TextField, ListItemSecondaryAction } from '@material-ui/core';
import { Paper, Typography, Button, List, ListItem, ListItemText , IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { token$, updateToken } from './store';
import MyModal from './MyModal';

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

export default function Main() {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const [rooms, updateRooms] = useState([]);

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)
    
    function onUpload(){
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

    function handleDelete(roomId){
        console.log(roomId);
        
        axios.delete('/rooms/' + roomId)
            .then(response => {
                console.log(response.data);
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
                        <ListItemSecondaryAction>
                            <IconButton aria-label = 'Delete'
                                onClick = {() => {handleDelete(room._id)}}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    )
    
    return(
        <div>
            <Paper className = {classes.root}>
                <Typography className = {classes.typography} variant = 'h4' component = 'h4'>
                    MERN chat app
                </Typography>
                <Typography className = {classes.typography} variant = 'h5' component = 'h5'>
                    Hello {token$.value} !
                </Typography>
                <div className = {classes.flex}>
                    <div className = {classes.topicsWindow}>
                        {!modal && <Button className = {classes.button}
                            variant = 'contained'
                            color = 'primary'
                            onClick = {openModal}>
                                Create
                        </Button>}
                       <MyModal closeModal = {closeModal} modal = {modal} onUpload = {onUpload} />
                        {roomList}
                       <Link to ='/' ><Button className = {classes.button}
                            variant = 'contained'
                            color = 'primary'
                            onClick = {logOut}>
                                Logout
                       </Button></Link>
                    </div>
                    <div className = {classes.chatWindow}>

                    </div>
                </div>
                <div className = {classes.flex}>
                    <TextField className = {classes.chatBox}
                        id = 'standard-name' 
                        label = 'Send a chat'
                        margin = 'normal'
                        
                        />
                    <Button className = {classes.button}
                        variant = 'contained' color = 'primary'>
                            Send
                    </Button>

                </div>
            </Paper>
        </div>
    )
}

