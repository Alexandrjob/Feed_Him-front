import React from 'react';
import {
    List,
    Box,
    Divider,
    Typography,
    ListItem,
    ListItemText
} from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TodoItem from './todoItem';
import Skeleton from "@mui/material/Skeleton";

export default function TabPanelTodo(props) {
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
        let loading = props.loading;

        const items = (loading ? [...Array(7)] : itemDay).map((item, indexInList) => {
            const date = loading ? null : new Date(item.estimatedDateFeeding);
            const backColor = loading ? '' : item.backColor;
            const text = loading ? "" : "№" + (indexInList + 1) + " " + date.toLocaleTimeString().slice(0, -3);
            const box =
                <Box key={indexInList} sx={{ boxShadow: 2, borderRadius: 2, marginBottom: "10px", padding: "10px", backgroundColor: backColor }}>
                    <Typography variant="subtitle1" color="text.primary">
                        {loading ? <Skeleton width={80} animation="wave"/> : text}
                    </Typography>
                    <Divider />
                    {loading ? (
                        <ListItem
                            secondaryAction={<Skeleton width={20} height={30} animation="wave"/>}
                            disablePadding>
                            <ListItemText>
                                <Skeleton width={120} animation="wave"/>
                            </ListItemText>
                        </ListItem>
                    ) : (
                        <TodoItem name={index + ' ' + indexInList} servingNumber={indexInList + 1}
                            date={item.date} waiterName={item.waiterName} disabled={disabledItem} checked={item.status} handleChange={props.handleChangeCheckBox} />
                    )}
                </Box>;

            return box;
        })

        return items;
    }

    return (
        (props.loading ? [...Array(30)] : props.data).map((item, index) =>
            <TabPanel sx={tabPanel} key={(index + 1).toString()} value={(index + 1).toString()}>
                <List dense sx={list} key={index}>
                    {genereteTodoItems(index, item, disabledItem)}
                </List>
            </TabPanel>
        )
    )
}