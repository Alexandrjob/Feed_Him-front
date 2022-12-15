import React from 'react';

import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { useNavigate } from "react-router-dom";

export default function Invitation(props) {
    const navigate = useNavigate();

    const nameGroup = props.params.nameGroup;
    const invitation = props.params.invitation;

    const handleSubmit = (event) => {
        sendData();
    };

    const sendData = () => {
        var url = 'https://localhost:7146/api/groups/update' + '?tokenGroup=' + invitation;
        var methodType = "POST";
        var jsonData = JSON.stringify({
            tokenGroup: invitation
        });
        send(url, methodType, jsonData);
    }

    const send = (url, methodType, jsonData) => {
        const token = window.localStorage.getItem('token');
        const xhr = new XMLHttpRequest();

        xhr.open(methodType, url);
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-type", "text/plain");
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log('Принял приглос');
                props.handleLoad();
                navigate('/panel');
                return;
            }
            if (xhr.status === 202) {
                console.log('Уже состою в группе');
                navigate('/panel');
            }
            else {
                console.log("Server response: ", xhr.status);
            }
        };

        xhr.send(jsonData);
    };

    const handleHide = () => {
        navigate('/panel');
    }

    return (

        <Box sx={{ marginTop: 2 }} >
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f4eaff', padding: 1, borderRadius: '7px' }}>
                <Typography className="TypographyInvationText" sx={{
                    mr: 2,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} fontWeight="lg">
                    You were invited to
                    <Typography sx={{ ml: '4px', mr: '4px' }} variant="outlined" color="info">
                        {nameGroup}
                    </Typography>
                    group
                </Typography>
                <Box className="BoxInvationButtons" sx={{ display: 'flex' }}>
                    <Button className="InvationButton" sx={{ mr: 1 }} color='info' onClick={handleSubmit}>Accept</Button>
                    <Button color='danger' onClick={handleHide}>Cancel</Button>
                </Box>
            </Box>
            <Box sx={{ marginTop: 1, backgroundColor: '#f4eaff', padding: 1, borderRadius: '7px' }}>
                <Typography
                    sx={{
                        width: '100%',
                    }} fontWeight="lg">
                    The current group will not be deleted, but you will lose access to it until you leave the new group.
                </Typography>
            </Box>
        </Box>

    );
}