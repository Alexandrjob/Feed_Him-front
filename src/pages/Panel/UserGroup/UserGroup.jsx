import React, { useState } from 'react';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';

import { useParams, useNavigate } from "react-router-dom";

import {
    Sheet,
    BoxName,
    BoxLink,
    ListItem,
    ListItemButton,
    ButtonLink,
    TypographyLink
} from './StylesUserGroup';

import IconButton from '@mui/joy/IconButton';
import Delete from '@mui/icons-material/Delete';

import Invation from './Invitation';

function isEmptyObject(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

export default function UserGroup(props) {
    const [link, setLink] = useState('Link to join the group');
    const navigate = useNavigate();
    const params = useParams();

    const handleSubmitLink = (event) => {
        var url = props.url + '/groups';
        var methodType = "GET";
        sendData(url, methodType);
    };

    const sendData = (url, methodType) => {
        send(url, methodType);
    }

    const send = (url, methodType) => {
        const token = window.localStorage.getItem('token');
        const xhr = new XMLHttpRequest();

        xhr.open(methodType, url);
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                if (methodType == 'POST') {
                    console.log('Вышел с группы');
                    props.handleLoad();
                    navigate('/panel');
                    return;
                }
                setLink(xhr.responseText);
            } else {
                console.log("Server response: ", xhr.status);
            }
        };

        xhr.send();
    };

    const handleSubmitLeave = (event) => {
        var url = props.url + '/groups/restore';
        var methodType = "POST";
        sendData(url, methodType);
    };

    return (
        <>
            <Sheet variant="outlined">
                <div>
                    <Typography level="h4" component="h6">
                        Welcome to the create group
                    </Typography>
                    <Typography level="body2">check or change your group as you want</Typography>
                </div>
                {!isEmptyObject(params) ?
                    <Invation params={params} handleLoad={props.handleLoad}/>
                    : <></>}

                <BoxName>
                    <Typography level="h6" >Name</Typography>
                </BoxName>
                <List sx={{
                    // "--List-item-paddingX": "0px"
                }}>
                    {props.group.map((item, indexInList) =>
                        <ListItem
                            key={indexInList}
                            endAction={
                                props.isCreator ?
                                    <IconButton name={indexInList} aria-label="Delete" size="sm" color="danger" onClick={() => props.handleChangeGroup(indexInList)}>
                                        <Delete />
                                    </IconButton>
                                    : (<></>)}>
                            <ListItemButton >{item.name}</ListItemButton>
                        </ListItem>
                    )}
                </List>
                {props.isCreator ?
                    <BoxLink >
                        <ButtonLink color='info' onClick={handleSubmitLink}>Get link</ButtonLink>
                        <TypographyLink sx={{ display: '-webkit-box', maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{link}</TypographyLink>
                    </BoxLink>
                    :
                    <BoxLink >
                        <ButtonLink color='info' onClick={handleSubmitLeave}>Leave</ButtonLink>
                    </BoxLink>}

            </Sheet>
        </>
    );
}