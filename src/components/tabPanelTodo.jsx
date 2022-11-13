import React from 'react';
import {
    List,
    Box,
    Divider,
    Typography,
} from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TodoItem from './todoItem';

export default function TabPanelTodo(props) {
    console.log("Вызвали");
    const tabPanel = {
        width: "100%",
        padding: "0px",
        centered: "true"
    };
    
    const list = {
        width: "100%",
        centered: "true"
    };

    const checkDisabledItems = () => {
        let number = new Date().getDate();
    
        if (number == props.value) {
            return false;
        }
    
        return true;
    }
    const disabledItem = checkDisabledItems();

    const genereteTodoItems = (index, itemDay, disabledItem, handleChangeCheckBox) => {
        const items = itemDay.map((item, indexInList) => {
            let backColor;
            const date = new Date(item.estimatedDateFeeding);
            const extendedDate = new Date(date).setMinutes(date.getMinutes() + 10);
            const currentDate = new Date();

            if (item.status) {
                backColor = "#95ffa6";
            }
            else if (date.getDate() === currentDate.getDate()) {
                if (date.getHours() < currentDate.getHours()) {
                    backColor = "#ffa095";
                }
                else if (date.getHours() === currentDate.getHours()) {
                    if (extendedDate.getMinutes() < currentDate.getMinutes()) {
                        backColor = "#ffa095";
                    }
                }
            }

            if (!item.status && date.getDate() < currentDate.getDate()) {
                backColor = "#ffa095";
            }

            const box =
                <Box key={indexInList} sx={{ boxShadow: 2, borderRadius: 2, marginBottom: "10px", padding: "10px", backgroundColor: backColor }}>
                    <Typography variant="subtitle1" color="text.primary">
                        №{indexInList + 1} {date.toLocaleTimeString().slice(0, -3)}
                    </Typography>
                    <Divider />
                    <TodoItem name={index + ' ' + indexInList} servingNumber={indexInList + 1}
                        date={item.date} waiterName={item.waiterName} disabled={disabledItem} checked={item.status} handleChange={handleChangeCheckBox} />
                </Box>;

            return box;
        })

        return items;
    }

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