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
        let textSecondary;
        if (this.props.date == null || this.props.waiterName == null) {
            textSecondary = "Не покормлено";
        }
        else {
            var date = getFormatString(this.props.date);
            textSecondary = date + ' ' + this.props.waiterName;
        }
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
                    secondary={textSecondary}
                />
            </ListItem>
        );
    }
}

function getFormatString(dateStr) {
    let date = new Date(dateStr).toLocaleString().slice(0, -3);
    return date;
}
export default TodoItem;