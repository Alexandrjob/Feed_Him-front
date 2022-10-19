const React = require("react");
import {
    Container,
    Typography
} from '@mui/material';
import Calendar from "./calendar";
import TodoList from "./TodoList";

const container = {
    position: 'absolute',
    width: '600px',
    left: '50%',
    top: '10%',
    transform: 'translate(-50%, -20%)',
};

class Main extends React.Component {
    render() {
        return (
            <Container sx={container}>
                <Typography sx={{ marginBottom: '20', textAlign: 'center' }} variant="h4">
                    Покорми кота
                </Typography>
                <Calendar />
                <Typography sx={{ marginTop: '20' }} variant="h6">
                    Сегодня
                </Typography>
                <TodoList />
            </Container >
        )
    }
}

export default Main;