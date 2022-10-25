const React = require("react");
import {
    ListItem,
    ListItemText
} from '@mui/material';
import TodoCheckBox from './todoCheckBox';

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const labelTextId = `checkbox-list-secondary-label-${this.props.keyy}`;

        return (
            <ListItem
                key={this.props.keyy}
                secondaryAction={
                    <TodoCheckBox checked={!!this.props.checked}
                        name={this.props.name}
                        disabled={this.props.disabled}
                        labelTextId={labelTextId}
                        handleChange={this.props.handleChange} />
                }
                disablePadding>
                <ListItemText
                    id={labelTextId}
                    primary={`${this.props.value} прием`}
                    secondary={this.props.date}
                />
            </ListItem>
        );
    }
}

export default TodoItem;