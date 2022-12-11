import * as React from 'react';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';

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

export default function UserGroup(props) {

    return (
        <>
            <Sheet variant="outlined">
                <div>
                    <Typography level="h4" component="h6">
                        Welcome to the create group
                    </Typography>
                    <Typography level="body2">check or change your group as you want</Typography>
                </div>

                <Invation />

                <BoxName>
                    <Typography level="h6" >Name</Typography>
                </BoxName>
                <List sx={{
                    // "--List-item-paddingX": "0px"
                }}>
                    <ListItem
                        endAction={
                            <IconButton aria-label="Delete" size="sm" color="danger">
                                <Delete />
                            </IconButton>
                        }>
                        <ListItemButton >Natasha</ListItemButton>
                    </ListItem>
                    <ListItem
                        endAction={
                            <IconButton aria-label="Delete" size="sm" color="danger">
                                <Delete />
                            </IconButton>
                        }>
                        <ListItemButton >Larisa</ListItemButton>
                    </ListItem>
                </List>
                <BoxLink>
                    <ButtonLink color='info'>Get link</ButtonLink>
                    <TypographyLink fontWeight="lg">Link to join the group</TypographyLink>
                </BoxLink>
            </Sheet>
        </>
    );
}