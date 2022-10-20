const React = require("react");
import {
    ListItem,
    ListItemText
} from '@mui/material';
import TodoCheckBox from './todoCheckBox';

class TodoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemNumber: props.value,
            disabled: props.disabled
        }
    }

    render() {
        const labelTextId = `checkbox-list-secondary-label-${this.state.itemNumber}`;

        return (
            <ListItem
                key={this.state.itemNumber}
                secondaryAction={
                    <TodoCheckBox disabled={this.state.disabled} checked={false} labelTextId={labelTextId}/>
                }
                disablePadding>
                <ListItemText
                    id={labelTextId}
                    primary={`${this.state.itemNumber} прием`}
                    secondary="13:22 Саша"
                />
            </ListItem>
        );
    }
}

export default TodoItem;