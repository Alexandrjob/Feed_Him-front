const React = require("react");
import {
    Container,
    Typography
} from '@mui/material';
import Calendar from "../components/calendar";
import TodoList from "../components/todoList";

const container = {
    position: 'absolute',
    width: getWight(),
    left: '50%',
    top: '10%',
    transform: 'translate(-50%, -20%)',
};

//Копипаст, быстрое решение.https://russianblogs.com/article/2360155478/
function getWight() {
    const MOBILE_SIZE = '100%';
    const DESKTOP_SIZE = '50%';

    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var isPC = true;

    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
            isPC = false;
            break;
        }
    }

    if(isPC){
        return '50%';
    }
    return '100%';
}

class Main extends React.Component { 
    render() {
        return (
            <Container sx={container}>
                <Typography sx={{ marginBottom: '20', textAlign: 'center' }} variant="h4">Покорми кота</Typography>
                {/* <Calendar /> */}
                <Typography sx={{ marginTop: '20' }} variant="h6">Сегодня</Typography>
                <TodoList />
            </Container >
        )
    }
}

export default Main;