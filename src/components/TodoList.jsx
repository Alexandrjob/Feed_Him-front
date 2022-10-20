//const React = require("react");
import React from 'react';
import {
    Box,
    List

} from '@mui/material';
import TodoItem from './todoItem';

const list = {
    width: "100%", 
    centered: "true"
};

class TodoList extends React.Component {
    render() {
        return (
            <Box>
                <List dense sx={ list }>
                    <TodoItem value={1} />
                </List>
            </Box>
        )
    }
}

export default TodoList;