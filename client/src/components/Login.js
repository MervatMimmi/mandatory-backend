import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';
import { Grid, Card, CardHeader, TextField } from '@material-ui/core';
import axios from 'axios';

import { updateToken } from './store';

const useStyles = makeStyles({
    grid: {
        direction: 'column',
        alignItems: 'center',
        justifyContent:'center',
        minHeight: '100vh'
    },
    card: {
        width: '650px',
        height: '150px',
        padding: '100px 0px',
        display: 'block',
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0',
    },
    header: {
        textAlign: 'center'
    },
    formgrid: {
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    form: {
        margin: '0',
        '& .MuiInput-underline:after': {
            borderBottomColor: 'red',
        }
    }
});

export default function Login() {
    const [username, setUsername] = useState('');
    const [login, setLogin] = useState(false);

    const classes = useStyles(); 

    function handleOnChange(e) {
       setUsername(e.target.value)
   }

   function handleOnSubmit(e) {
       e.preventDefault();
        const user = {username: username}
        console.log(user);
        
        axios.post('http://localhost:9090/users/', user)
            .then(response => {
                console.log(response);
                updateToken(username);
            })
            .catch(error => {
                console.error(error);
            })
            setLogin(true);
            setUsername('');
   }

    return login ? (
        <Redirect to='/main' /> ) :
        ( <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Grid className = {classes.grid}
                container
                spacing = {0}
                >
                <Card className = {classes.card}
                    square
                    elevation = {10}
                    >
                    <CardHeader className = {classes.header}
                        title = "What's your nickname ?"
                        />
                    <Grid className = {classes.header}>
                        <form className = {classes.form}
                            noValidate autoComplete = 'off'
                            onSubmit = {handleOnSubmit}
                            >
                            <TextField
                                required
                                id = 'standard-basic'
                                label = 'Nickname'
                                value = {username}
                                onChange = {handleOnChange}
                            />
                        </form>
                    </Grid>
                </Card>
            </Grid>
        </div>
    )
}
