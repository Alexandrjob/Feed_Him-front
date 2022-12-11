import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';

import {
    Sheet,
    Button,
} from '../GlobalStyles/Styles';

export default function UserFeeding(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        send(data);
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
                <TextField
                    name="Number Meals Per Day "
                    type="number"
                    label="Number meals per day" />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        name="start date"
                        type="time"
                        label="Start feeding"
                        sx={{ width: '45%' }} />
                    <TextField
                        name="end date"
                        type="time"
                        label="End feeding"
                        sx={{ width: '45%' }} />
                </Box>
                <Button color='warning'>Update</Button>
            </Sheet>
        </>
    );
}