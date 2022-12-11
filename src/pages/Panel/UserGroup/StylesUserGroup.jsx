import SheetD from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import ListItemD from '@mui/joy/ListItem';
import ListItemButtonD from '@mui/joy/ListItemButton';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import { styled } from '@mui/material/styles';

export const Sheet = styled(SheetD)`
    min-width: 437px;
    border-radius: 30px;
    margin-left: 3rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    box-shadow: rgb(187 187 187 / 28%) 0px 4px 30px 6px;
`;

export const BoxName = styled(Box)`
    display: flex;
    margin-top: 25px;
    margin-left: 12px;
`;

export const BoxLink = styled(Box)`
    display: flex;
    margin-top: 8px; 
`;
export const ListItem = styled(ListItemD)`
    border-radius: 7px;
    //cursor: default;
    // margin-bottom: 5px;
    // border: solid 1px #0003;
`;

export const ListItemButton = styled(ListItemButtonD)`
    cursor: default;
    border-radius: 7px;
`;

export const ButtonLink = styled(Button)`
    width: 30%;
    margin-right: 12px;
`;

export const TypographyLink = styled(Typography)`
    border-radius: 7px;
    border: dashed 2px #0003;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;