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

//Для проверки
const dietss = [
    {
        id: 'tl2zI5J3IbLwukybTEsIxXXb6',
        Date: new Date(),
        Status: 'true',
    },
    {
        id: 'tl2zI5J3IbLwukybTEsIxXXb6',
        Date: new Date(),
        Status: 'true',
    }
]

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabledItems: true,
            currentDate: new Date(),
        };

        //Тестирую проверку
        var date = new Date();
        dietss[1].Date.setDate(date.getDate() + 1);

        this.checkDisabledItems();
    }

    checkDisabledItems() {
        if (this.state.currentDate.getFullYear() == dietss[1].Date.getFullYear() &&
        this.state.currentDate.getMonth() == dietss[1].Date.getMonth() &&
        this.state.currentDate.getDate() == dietss[1].Date.getDate()) {
            //this.state.disabledItems = false;
            this.setState({disabledItems: false});
        }
    }

    render() {
        return (
            <Box>
                <List dense sx={list}>
                    <TodoItem itemNumber={1} disabled={this.state.disabledItems} />
                    <TodoItem itemNumber={2} disabled={this.state.disabledItems} />
                    <TodoItem itemNumber={3} disabled={this.state.disabledItems} />
                </List>
            </Box>
        )
    }
}

export default TodoList;