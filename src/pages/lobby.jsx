const React = require("react");
import {
    Box,
    Container,
    ButtonGroup,
    Button,
    Typography
} from '@mui/material';

var box = {
    position: 'absolute',
    width: '50%',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, -50%)',
}

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        box.width = props.width;
    }

    render() {
        return (
            <Box sx={box}>
                <Container>
                    <Typography sx={{ marginBottom: '20', textAlign: 'center' }} variant="h2">
                        Выберите ваше имя
                    </Typography>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        fullWidth={true}
                        variant="text">
                        <Button key="0" onClick={() => this.props.handleChange(0)}>Саша</Button>
                        <Button key="1" onClick={() => this.props.handleChange(1)}>Катя</Button>
                        <Button key="2" onClick={() => this.props.handleChange(2)}>Наташа</Button>
                        <Button key="3" onClick={() => this.props.handleChange(3)}>Лариса</Button>
                    </ButtonGroup>
                </Container>
            </Box >
        )
    }
}

export default Lobby;