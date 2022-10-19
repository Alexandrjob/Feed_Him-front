const React = require("react");
import {
    Box,
    Checkbox
} from '@mui/material';

class TodoItem extends React.Component {
    render() {
        return (
            <Box>
                <h3>Первый прием</h3>
                <h3>Саша</h3>
                <h3>Время</h3>
                <Checkbox />
            </Box>
        )
    }
}

export default TodoItem;