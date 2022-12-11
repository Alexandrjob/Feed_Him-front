import React from "react";
import {
    Box,
} from '@mui/material';

import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';

import { styled } from '@mui/system';

const BoxN = styled(Box)`
    min-height: 150px;
    height: 27%;
    padding: 20px;
    border: solid 1px #dee2e6;
    border-radius: 30px;
    box-shadow: rgb(187 187 187 / 28%) 0px 4px 30px 6px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function UserProfile(props) {

    return (
        <BoxN>
            <Avatar sx={{ "--Avatar-size": '130px', marginTop: '-65px' }} size="lg">Sa</Avatar>
            <Typography sx={{ marginTop: '0.75rem', }} level="h4">Sasha</Typography>
            <Typography level="body1">MyEmail@gmail.com</Typography>
        </BoxN>
    );
}