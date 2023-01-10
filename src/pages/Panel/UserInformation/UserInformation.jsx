import * as React from 'react';
import { useState } from 'react';

import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';

import {
    Sheet,
    Button,
} from '../GlobalStyles/Styles';

export default function UserInformation(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        sendData(data);
    };

    const sendData = (data) => {
        var url = props.url + '/users/update/email';
        var methodType = "POST";

        var jsonData = JSON.stringify({
            name: data.get('name'),
            email: data.get('email')
        });

        send(url, methodType, jsonData);
    }

    const send = (url, methodType, data) => {
        console.log(data);
        const token = window.localStorage.getItem('token');
        const xhr = new XMLHttpRequest();
        xhr.open(methodType, url);

        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                if(!!!!xhr.responseText){
                    window.localStorage.setItem('token', xhr.responseText);
                }
            } else {
                console.log("Server response: ", xhr.status);
            }
        };

        xhr.send(data);
    };

    return (
        <>
            <Sheet component="form" onSubmit={handleSubmit} noValidate variant="outlined" sx={{ ml: props.ml, mb:'0px' }} >
                <div>
                    <Typography level="h4" component="h6">
                        Welcome to the Information
                    </Typography>
                    <Typography level="body2">check or change your information as you want</Typography>
                </div>
                <TextField
                    name="name"
                    value={props.information.name}
                    type="text"
                    placeholder="Enter your name"
                    label="User name"
                    onChange={props.handleChangeInf}
                />
                <TextField
                    name="email"
                    value={props.information.email}
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                    onChange={props.handleChangeInf}
                />
                <Button type="submit">Update</Button>
            </Sheet>
        </>
    );
}