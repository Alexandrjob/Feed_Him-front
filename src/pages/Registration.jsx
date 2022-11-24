import * as React from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
} from '@mui/material';

import Straight from '@mui/icons-material/Straight';

import { styled } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';

import { Link, Navigate, useNavigate } from "react-router-dom";

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

const ColorLink = styled(Link)({
    color: 'gray',
    textDecorationLine: 'none',

    '&:hover': {
        color: 'black',
        textDecorationLine: 'underline',
    },
});

export default function Registration(props) {
    const navigate = useNavigate();
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
        xhr.open("POST", props.url + '/users/Authorize');
        xhr.setRequestHeader("content-type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                navigate("/singin");
            } else {
                console.log("Server response: ", xhr.statusText);
            }
        };

        var jsonData = JSON.stringify({
            email: data.get('email'),
            name: data.get('name'),
            password: data.get('password'),
            repeatPassword: data.get('repeatPassword'),
        });
        xhr.send(jsonData);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                    <ColorLink to={'/singin'} >SING IN</ColorLink> | SING UP
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <CssTextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <CssTextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        name="name"
                        label="имя"
                        type="string"
                        id="name"
                        autoComplete="name"
                    />
                    <CssTextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <CssTextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        name="repeat-password"
                        label="repeat password"
                        type="password"
                        id="repeat-password"
                        autoComplete="current-repeat-password"
                    />
                    <ColorButton
                        type="submit"
                        variant="outlined">
                        sing up <Straight sx={{ rotate: "90deg" }} />
                    </ColorButton>
                </Box>
            </Box>
        </Container>
    );
}