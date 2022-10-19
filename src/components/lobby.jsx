const React = require("react");
import {
    Box,
    Container,
    ButtonGroup,
    Button,
    Typography
} from '@mui/material';
import "./style/lobby.css";

const buttons = [
    <Button key="one">Саша</Button>,
    <Button key="two">Катя</Button>,
    <Button key="three">Наташа</Button>,
    <Button key="three">Лариса</Button>
];

class Lobby extends React.Component {
    render() {
        return (
            <Box className="Box">
                <Container>
                    <Typography sx={{ marginBottom: '20', textAlign: 'center' }} variant="h2">
                    Выберите ваше имя
                </Typography>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        fullWidth="true"
                        variant="text">
                        {buttons}
                    </ButtonGroup>
                </Container>
            </Box >
        )
    }
}

export default Lobby;