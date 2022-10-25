import React from 'react';
import {
    List,
} from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TodoItem from './todoItem';

const list = {
    width: "100%",
    centered: "true"
};

function checkDisabledItems(data) {
    //number - индекс текущего дня.
    const currentDate = new Date();
    const number = currentDate.getDate() - 1;
    console.log(data[number][0].date);
    const date = new Date(data[number][0].date);

    var disabled;

    if (currentDate.getFullYear() == date.getFullYear() &&
        currentDate.getMonth() == date.getMonth() &&
        currentDate.getDate() == date.getDate()) {
        disabled = false;
    }

    return disabled;
}

function TabPanelTodo(props) {
    const disabledItem = checkDisabledItems(props.data);

    return (
        props.data.map((item, index) =>
            <TabPanel key={(index + 1).toString()} value={(index + 1).toString()}>
                <List dense sx={list} key={index}>
                    <TodoItem keyy={item[0].id} name={index + ' ' + item[0].id} value={item[0].id} date={item[0].date} waiterName={item[0].waiterName} disabled={disabledItem} checked={item[0].status} handleChange={props.handleChangeCheckBox} />
                    <TodoItem keyy={item[1].id} name={index + ' ' + item[1].id} value={item[1].id} date={item[1].date} waiterName={item[1].waiterName} disabled={disabledItem} checked={item[1].status} handleChange={props.handleChangeCheckBox} />
                    <TodoItem keyy={item[2].id} name={index + ' ' + item[2].id} value={item[2].id} date={item[2].date} waiterName={item[2].waiterName} disabled={disabledItem} checked={item[2].status} handleChange={props.handleChangeCheckBox} />
                </List>
            </TabPanel>
        )
    )

}

export default TabPanelTodo;