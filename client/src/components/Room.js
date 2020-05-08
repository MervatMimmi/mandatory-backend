import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import io from 'socket.io-client';

import { makeStyles, TextField } from '@material-ui/core';
import { Paper, Typography, Button, Chip} from '@material-ui/core';
import { token$ } from './store';


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
    },
    logout: {
        position: 'absolute',
        top: '600px',
    }, 
}));

const socket = io('http://localhost:9090');

export default function Room(props) {
    const classes = useStyles();
    const [message, updateMessage] = useState('');
    const [messages, updateMessages] = useState([]);
    const [data, updateData] = useState([]);
    const [token, setToken] =useState(token$.value);
    
    const path = window.location.pathname.split('/');
    //console.log(path);
    const roomId = path[2];
    //console.log(roomId);
    
    useEffect(() => {
        const subscription = token$.subscribe(setToken);
        return() => subscription.unsubscribe();
    }, []);

    
    useEffect(()=> {
        axios.get('/rooms/room/' +roomId)
            .then(response => {
                console.log(response.data);
                updateData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
           
    }, [messages,roomId]); 
    
    socket.on('newMsg', (data) => {
        console.log('FUUUNKAAAAAR: '+data);
        updateMessages(x => x.concat(data));
      });

    function handleOnChange(e) {
        updateMessage(e.target.value);
    }

    function sendMessage(e) {
        e.preventDefault();
        
        let data = {
            message: message,
            messageBy: token,
            chatRoomId:roomId,
        };
        //console.log(data);
        
        axios.post('/rooms/room/'+roomId, data)
            .then(response => {
                //console.log(response.data);
                updateMessage(response.data);
            })
            .catch(error => {
                console.error(error);
            });
            updateMessage('');
    }
    
    return(
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Paper className = {classes.root}>
                <form onSubmit = {sendMessage}>
                    <Typography className = {classes.typography} variant = 'h4' component = 'h4'>
                        MERN chat app
                    </Typography>
                    <Typography className = {classes.typography} variant = 'h5' component = 'h5'>
                        Hello {token$.value}! 
                    </Typography>
                    <div className = {classes.flex}>
                        <div className = {classes.topicsWindow}>
                            <Link to ='/main' ><Button className = {classes.button}
                                    variant = 'contained'
                                    color = 'primary'
                                    >
                                    Main
                            </Button></Link>
                            <div className = {classes.roomlist}>
                                {/*{roomList}*/}
                            </div>
                            <div className = {classes.logout}>
                                <Link to ='/' ><Button className = {classes.button}
                                        variant = 'contained'
                                        color = 'primary'
                                        //onClick = {logOut}
                                        >
                                            Logout
                                </Button></Link>
                            </div>
                        </div>
                        <div className = {classes.chatWindow}>
                           
                            {
                                data.map((msg, i) => (
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
                            type = 'submit'
                            >
                                Send
                        </Button>
                    
                    </div>
                </form>
            </Paper>
        </div>
    )
}

