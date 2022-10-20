const React = require("react");
import {
    Checkbox
} from '@mui/material';

class TodoCheckBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: props.disabled,
            checked: props.checked,
            labelTextId: props.labelTextId
        }
    }

    hanldeChangeCheckBox = e => {
        this.setState({
            checked: e.currentTarget.checked 
        })
    }

    render() {
        return (
            <Checkbox
                edge="end"
                inputProps={{ "aria-labelledby": this.state.labelTextId }}
                disabled={this.state.disabled}
                checked={this.state.checked}
                onChange={this.hanldeChangeCheckBox} />
        );
    }
}

export default TodoCheckBox;