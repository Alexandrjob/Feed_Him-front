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

function checkDisabledItems(value) {
    let number = new Date().getDate();

    if (number == value){
        return false;
    }

    return true;
}

function TabPanelTodo(props) {
    const disabledItem = checkDisabledItems(props.value);
    
    return (
        props.data.map((item, index) =>
            <TabPanel key={(index + 1).toString()} value={(index + 1).toString()}>
                <List dense sx={list} key={index}>
                    <TodoItem keyy={item[0].id} name={index + ' ' + 0} value={1} date={item[0].date} waiterName={item[0].waiterName} disabled={disabledItem} checked={item[0].status} handleChange={props.handleChangeCheckBox} />
                    <TodoItem keyy={item[1].id} name={index + ' ' + 1} value={2} date={item[1].date} waiterName={item[1].waiterName} disabled={disabledItem} checked={item[1].status} handleChange={props.handleChangeCheckBox} />
                    <TodoItem keyy={item[2].id} name={index + ' ' + 2} value={3} date={item[2].date} waiterName={item[2].waiterName} disabled={disabledItem} checked={item[2].status} handleChange={props.handleChangeCheckBox} />
                </List>
            </TabPanel>
        )
    )

}

export default TabPanelTodo;