const React = require("react");
import {
    Box,
    Container,
    Typography
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanelTodo from '../components/tabPanelTodo';

import TabListCalendar from "../components/tabListCalendar";

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

    if (isPC) {
        return DESKTOP_SIZE;
    }
    return MOBILE_SIZE;
}

//Метод объединяет 3 обьекта в один начиная с первого(Внимание: говно код).
function getFormatData() {
    let formatData = [];
    let box = [];
    let count = 0;
    let countDay = 0;

    //Массив формируется следующим образом =>
    //В каждой ячейче по 3 массива.
    //Каждая ячейка олицетворяет один день.
    for (let i = 0; i < data.length; i++) {
        if (countDay >= 3) {
            formatData[count] = box;
            box = [];
            countDay = 0;
            count++;
        }
        box[countDay] = data[i];

        countDay++;
        if (i == 8) {
            formatData[count] = box;
        }
    }
    console.log(formatData);
    return formatData;
}

const data = [];

function initData() {
    const names = ["Саша", "Наташа", "Лариса", "Катя"];
    const days = new Date().daysInMonth() * 3 + 1;
    for (let i = 0; i < days; i++) {
        var box = {
            id: i,
            namber: Math.floor(Math.random() * 3) + 1,
            waiterName: names[Math.floor(Math.random() * 4)],
            date: new Date(),
            status: Math.floor(Math.random() * 2),
        };

        data[i] = box;
        box = [];
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        initData();

        this.state = {
            value: new Date().getDate().toString(),
            disabledItem: false,
            formatData: getFormatData(),
        };
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    }

    handleChangeTab(event, newValue) {
        this.setState({
            value: newValue
        });
    };

    handleChangeCheckBox(event) {
        let data = this.state.formatData;
        //pach - это поле, генерируемое вот так name={index + ' ' + item[0].id} 
        let pach = event.target.name.split(' ');

        for (let i = 0; i < data.length; i++) {
            if (data[pach[0]][i].id != pach[1]) {
                continue;
            }
            this.state.formatData[pach[0]][i].status = Number(event.target.checked);
            this.setState({ data });
            break;
        }
    };

    render() {
        return (
            <Container sx={container}>
                <Typography sx={{ marginBottom: '20', textAlign: 'center' }} variant="h4">Покорми кота</Typography>
                <TabContext value={this.state.value}>
                    <Box >
                        <TabListCalendar onChange={this.handleChangeTab} />
                    </Box>
                    <Typography sx={{ marginTop: '20' }} variant="h6">Сегодня</Typography>
                    <TabPanelTodo data={this.state.formatData}
                        handleChangeCheckBox={this.handleChangeCheckBox} />
                </TabContext>
            </Container >
        )
    }
}

export default Main;