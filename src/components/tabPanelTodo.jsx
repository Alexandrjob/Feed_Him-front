import React from 'react';
import {
    List,
} from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TodoItem from './todoItem';

const tabPanel = {
    width: "100%",
    padding: "0px",
    centered: "true"
};

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
// id, servingNumber, waiterName, date, status
function genereteTodoItems(index, itemDay, disabledItem, handleChangeCheckBox) {
    return (
        itemDay.map((item, indexInList) =>
            <TodoItem key={indexInList} name={index + ' ' + indexInList} servingNumber={indexInList + 1} date={item.date} waiterName={item.waiterName} disabled={disabledItem} checked={item.status} handleChange={handleChangeCheckBox} />
        )
    )
}

function TabPanelTodo(props) {
    const disabledItem = checkDisabledItems(props.value);
    
    return (
        props.data.map((item, index) =>
            <TabPanel sx={tabPanel} key={(index + 1).toString()} value={(index + 1).toString()}>
                <List dense sx={list} key={index}>
                    {genereteTodoItems(index, item, disabledItem, props.handleChangeCheckBox)}
                </List>
            </TabPanel>
        )
    )

}

export default TabPanelTodo;