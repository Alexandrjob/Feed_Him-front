import React, { useState, useEffect } from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';

import {
    Sheet,
    Button,
} from '../GlobalStyles/Styles';

export default function UserFeeding(props) {
    //const [responseStatus, setResponseStatus] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        sendData(data);
    };

    const sendData = (data) => {
        var url = props.url + '/configs';
        var methodType = "PUT";

        var timeStartFeeding = data.get('startFeeding');
        var hours = timeStartFeeding.slice(0, -3);
        var minutes = timeStartFeeding.slice(3);

        var startFeeding = new Date();
        startFeeding.setUTCHours(Number(hours), Number(minutes));

        var timeEndFeeding = data.get('endFeeding');
        hours = timeEndFeeding.slice(0, -3);
        minutes = timeEndFeeding.slice(3);

        var endFeeding = new Date();
        endFeeding.setUTCHours(Number(hours), Number(minutes));

        var jsonData = JSON.stringify({
            numberMealsPerDay: data.get('numberMealsPerDay'),
            startFeeding: startFeeding,
            endFeeding: endFeeding,
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
                console.log(xhr.responseText);
            } else {
                console.log("Server response: ", xhr.status);
            }
        };

        xhr.send(data);
    };

    return (
        <>
            <Sheet variant="outlined" sx={{ ml: props.ml }}>
                <div>
                    <Typography level="h4" component="h6">
                        Welcome to the Feeding
                    </Typography>
                    <Typography level="body2">check or change your feeding as you want</Typography>
                </div>
                <Box sx={{ display:'contents', gap: '16px' }} component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        name="numberMealsPerDay"
                        onChange={props.handleChangeFeeding}
                        value={props.feeding.numberMealsPerDay}
                        type="number"
                        label="Number meals per day" />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TextField
                            name="startFeeding"
                            onChange={props.handleChangeFeeding}
                            value={props.feeding.startFeeding}
                            type="time"
                            label="Start feeding"
                            sx={{ width: '45%' }} />
                        <TextField
                            name="endFeeding"
                            onChange={props.handleChangeFeeding}
                            value={props.feeding.endFeeding}
                            type="time"
                            label="End feeding"
                            sx={{ width: '45%' }} />
                    </Box>
                    <Button type="submit" color='warning'>Update</Button>
                </Box>
            </Sheet>
        </>
    );
}