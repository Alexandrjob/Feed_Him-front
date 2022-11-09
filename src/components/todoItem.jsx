import React from "react";
import {
    ListItem,
    ListItemText
} from '@mui/material';
import TodoCheckBox from './todoCheckBox';

export default function TodoItem(props) {
    const getFormatString = (dateStr) => {
        let date = new Date(dateStr).toLocaleTimeString().slice(0, -3);
        return date;
    };

    let textSecondary;
    if (props.date == null || props.waiterName == null) {
        textSecondary = "Не покормлено";
    }
    else {
        var date = getFormatString(props.date);
        textSecondary = date + ' ' + props.waiterName;
    }

    return (
        <ListItem
            secondaryAction={
                <TodoCheckBox checked={!!props.checked}
                    name={props.name}
                    disabled={props.disabled}
                    handleChange={props.handleChange} />
            }
            disablePadding>
            <ListItemText
                primary={`${props.servingNumber} прием`}
                secondary={textSecondary}
            />
        </ListItem>
    );

}