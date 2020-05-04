import React, {useState} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import { makeStyles, TextField } from '@material-ui/core';
import { Paper, Typography, Button } from '@material-ui/core';

import { token$ } from './store';
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
        height: '300px',
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

export default function Main() {
    const classes = useStyles();
    const [modal, setModal] = useState(false);

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)
    
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
                       <MyModal closeModal = {closeModal} modal = {modal} />
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

