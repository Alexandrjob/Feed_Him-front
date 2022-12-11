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
                    name="User name"
                    type="text"
                    placeholder="Sasha"
                    label="User name"
                />
                <TextField
                    name="email"
                    type="email"
                    placeholder="Sasha@gmail.com"
                    label="Email"
                />
                <Button >Update</Button>
            </Sheet>
        </>
    );
}