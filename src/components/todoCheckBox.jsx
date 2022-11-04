import React from "react";
import {
    Checkbox
} from '@mui/material';

class TodoCheckBox extends React.Component {
    render() {
        return (
            <Checkbox
                edge="end"
                name={this.props.name}
                inputProps={{ "aria-labelledby": this.props.labelTextId }}
                disabled={this.props.disabled}
                checked={this.props.checked}
                onChange={this.props.handleChange} />
        );
    }
}

export default TodoCheckBox;