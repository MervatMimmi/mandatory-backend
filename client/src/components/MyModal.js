import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Button, TextField, Typography, Backdrop } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
       

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '16px',
        border: '2px solid #3f51b5',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        
    },
    modalbuttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'space-around',
    }
}));

export default function MyModal(props) {
    const classes = useStyles();
    const {modal, closeModal} = props;
    //const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState([]);

    const handleNewRoom = (e) => setNewRoom(e.target.value);

    function createRoom(e) {
        e.preventDefault();
        const room = {newRoom: newRoom}

        axios.post('http://localhost:9090/rooms/', {room})
            .then(response => {
                console.log(response);
                //roomList(response);
            })
            .catch(error => {
                console.error(error);
            })
            setNewRoom('');
            closeModal();
    }

    return(
        <div className = {classes.backdrop}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modal}
                onClose={closeModal}
                closeAfterTransition
                disableBackdropClick = {true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500, 
                }}
                >
                <Fade in={modal} >
                    <div className={classes.paper}>
                        <Typography>
                            Create a new chatroom!
                        </Typography>
                        <TextField className = {classes.chatBox}
                            id = 'standard-name' 
                            label = 'Write room name..'
                            margin = 'normal'
                            value = {newRoom}
                            onChange = {e => {handleNewRoom(e)}}
                            />
                         <Button className = {classes.button}
                            variant = 'contained' 
                            color = 'primary'
                            onClick = {createRoom}>
                            Create
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
    
    
}