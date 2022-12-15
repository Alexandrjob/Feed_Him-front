import * as React from 'react';
import { useState } from 'react';

import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';

import {
    Sheet,
    Button,
} from '../GlobalStyles/Styles';

export default function UserInformation(props) {

    return (
        <>
            <Sheet variant="outlined" sx={{ ml: props.ml }} >
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
                <Button >Update</Button>
            </Sheet>
        </>
    );
}