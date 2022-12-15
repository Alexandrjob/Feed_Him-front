import * as React from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
} from '@mui/material';
import { useState } from 'react';

import { styled } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';
import Straight from '@mui/icons-material/Straight';
import { Link, Navigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {/* <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '} */}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const ColorButton = styled(Button)(({ theme }) => ({
    padding: '5px 30px',
    marginTop: '60px',
    marginBottom: '24px',
    marginLeft: '250px',
    textTransform: 'none',
    letterSpacing: '0.0857em',
    borderRadius: '0px',
    borderWidth: '2px',

    color: theme.palette.getContrastText(yellow[500]),
    borderColor: '#f7de95',

    '&:hover': {
        backgroundColor: '#fff9c461',
        borderColor: yellow[500],
        borderWidth: 2,
    },
}));

const CssTextField = styled(TextField)({
    '& label.MuiInputLabel-standard': {
        paddingLeft: '10px',
    },
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .css-1a1fmpi-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before': {
        borderBottomWidth: '2px',
        borderBottomColor: 'black',
    },
    '& .MuiInputBase-root:before': {
        borderBottomWidth: '2px',
        borderBottomColor: '',
    },
    '& .MuiInput-underline:after': {
        borderBottomWidth: '2px',
        borderBottomColor: yellow[300],
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
        },
        '&:hover fieldset': {
            borderColor: 'yellow',
        }
    },
});

const ColorLink = styled(Link)(({ theme }) => ({
    color: 'gray',
    textDecorationLine: 'none',

    '&:hover': {
        color: 'black',
        textDecorationLine: 'underline',
    },
}));

export default function SignIn(props) {
    const [isError, setIsError] = useState(false);
    const [helperText, sethelperText] = useState("");

    if (props.auth) {
        return <Navigate to="/" />;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        send(data);
    };

    const send = (data) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", props.url + '/users/Authentication');
        xhr.setRequestHeader("content-type", "application/json");

        xhr.onload = () => {
            var result = JSON.parse(xhr.responseText);
            if (result.statusCode === 200) {
                let token = result.value.token;
                if (token != null) {
                    props.changeAuthHandle(true);
                    window.localStorage.setItem('token', token);
                    window.localStorage.setItem('name', result.value.name);
                }
            }
            else if (result.statusCode === 409) {
                setIsError(true);
                sethelperText("Incorrect data");
            }
            else {
                console.log("Server response: ", xhr.status);
            }
        };

        var jsonData = JSON.stringify({
            email: data.get('email'),
            name: 'string',//TODO: delete
            password: data.get('password'),
            token: 'string',//TODO: delete
        });
        xhr.send(jsonData);
    };

    const changeHandle = () => {
        setIsError(false);
        sethelperText("");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                    SING IN | <ColorLink to={'/singup'} >SING UP</ColorLink>
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <CssTextField
                        error={isError}
                        helperText={helperText}
                        variant="standard"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={changeHandle}
                    />
                    <CssTextField
                        error={isError}
                        helperText={helperText}
                        variant="standard"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={changeHandle}
                    />
                    <ColorLink to="#" variant="body2" sx={{ color: 'gray', marginLeft: '270px' }}>
                        forgot password?
                    </ColorLink>
                    <ColorButton
                        type="submit"
                        variant="outlined"
                    >
                        log in <Straight sx={{ rotate: "90deg" }} />
                    </ColorButton>
                </Box>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
    );
}