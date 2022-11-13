import React from "react";
import {
    Checkbox
} from '@mui/material';

export default function TodoCheckBox(props) {
    return (
        <Checkbox
            edge="end"
            name={props.name}
            inputProps={{ "aria-labelledby": props.labelTextId }}
            disabled={props.disabled}
            checked={props.checked}
            onChange={props.handleChange} />
    );
}