const React = require("react");
import {
    Checkbox,
    ListItem,
    ListItemText
} from '@mui/material';

class TodoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }
    render() {
        const labelTextId = `checkbox-list-secondary-label-${this.state.value}`;
        return (
            <ListItem
                key={this.state.value}
                secondaryAction={
                    <Checkbox
                        edge="end"
                        inputProps={{ "aria-labelledby": labelTextId }} />
                }
                disablePadding>
                <ListItemText
                    id={labelTextId}
                    primary={`${this.state.value + 1} прием`}
                    secondary="13:22 Саша"
                />
            </ListItem>
        );
    }
}

export default TodoItem;