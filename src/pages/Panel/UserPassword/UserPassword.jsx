import * as React from 'react';
import { useState } from 'react';

import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';

import {
    Sheet,
    Button,
} from '../GlobalStyles/Styles';

export default function UserPassword(props) {

    return (
        <>
            <Sheet variant="outlined" sx={{ ml: props.ml }}>
                <div>
                    <Typography level="h4" component="h6">
                    Welcome to the change password
                    </Typography>
                    <Typography level="body2">change your password as you want</Typography>
                </div>
                <TextField
                    name="Current Password"
                    type="password"
                    placeholder="Enter your current password"
                    label="Current Password"/>
                <TextField
                    name="New Password"
                    type="password"
                    placeholder="Enter your new password"
                    label="New Password"/>
                <TextField
                    name="Confirm New Password"
                    type="password"
                    placeholder="Enter your confirm new password"
                    label="Confirm New Password" />
                <Button color='danger'>Update</Button>
            </Sheet>
        </>
    );
}