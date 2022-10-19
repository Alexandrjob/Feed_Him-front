//const React = require("react");
import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Checkbox,

} from '@mui/material';

class TodoList extends React.Component {
    render() {
        return (
            <Box>
                <List
                    dense
                    sx={{ width: "100%", centered:"true"}}>
                    {[0, 1, 2].map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem
                                key={value}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        inputProps={{ "aria-labelledby": labelId }} />
                                }
                                disablePadding>
                                    <ListItemText
                                        id={labelId}
                                        primary={`${value + 1} прием`}
                                        secondary="July 20, 2014"
                                    />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        )
    }
}

export default TodoList;