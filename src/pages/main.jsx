const React = require("react");
import {
    Box,
    Container,
    Typography,
    List
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanelTodo from '../components/tabPanelTodo';
import TabPanel from '@mui/lab/TabPanel';
import TodoItem from '../components/todoItem';
import TabListCalendar from "../components/tabListCalendar";

const data = [
    {
        id: 1,
        name: "Sahsa",
        number: 1,
        date: "2022-10-16 10:51:38",
        status: 0
    },
    {
        id: 2,
        name: "Ira",
        number: 2,
        date: "2022-10-16 10:51:38",
        status: 1
    },
    {
        id: 3,
        name: "Sasha",
        number: 3,
        date: "2022-10-16 10:51:38",
        status: 1
    },
    {
        id: 4,
        name: "Sasha",
        number: 1,
        date: "2022-10-16 10:51:38",
        status: 0
    },
    {
        id: 5,
        name: "Sasha",
        number: 2,
        date: "2022-10-16 10:51:38",
        status: 1
    },
    {
        id: 6,
        name: "Sasha",
        number: 3,
        date: "2022-10-16 10:51:38",
        status: 1
    },
    {
        id: 7,
        name: "Sasha",
        number: 1,
        date: "2022-10-16 10:51:38",
        status: 0
    },
    {
        id: 8,
        name: "Sasha",
        number: 2,
        date: "2022-10-16 10:51:38",
        status: 0
    },
    {
        id: 9,
        name: "Sasha",
        number: 3,
        date: "2022-10-16 10:51:38",
        status: 1
    }
]

const container = {
    position: 'absolute',
    width: getWight(),
    left: '50%',
    top: '10%',
    transform: 'translate(-50%, -20%)',
};

const list = {
    width: "100%",
    centered: "true"
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

function getdaysInMonthArray(currentDate) {
    var daysInMonth = [];
    const days = currentDate.daysInMonth();

    for (let i = 0; i < days; i++) {
        daysInMonth[i] = i + 1;
    }

    return daysInMonth;
}

//Метод объединяет 3 обьекта в один начиная с первого(метод является говно кодом).
function getFormatData() {
    let formatData = [];
    let box = [];
    let count = 0;
    let countDay = 0;

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

    // console.log(formatData);
    return formatData;
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "2",
            daysInMonthArray: [],
            disabledItem: false,
            formatData: getFormatData(),
        };
        this.state.daysInMonthArray = getdaysInMonthArray(new Date());
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
                    {/* <TabPanelTodo daysInMonthArray={this.state.daysInMonthArray} /> */}

                    {this.state.formatData.map((item, index) =>
                        <TabPanel key={(index + 1).toString()} value={(index + 1).toString()}>
                            <List dense sx={list} key={index}>
                                <TodoItem keyy={item[0].id} name={index + ' ' + item[0].id} value={item[0].id} date={item[0].date} disabled={false} checked={item[0].status} handleChange={this.handleChangeCheckBox} />
                                <TodoItem keyy={item[1].id} name={index + ' ' + item[1].id} value={item[1].id} date={item[1].date} disabled={false} checked={item[1].status} handleChange={this.handleChangeCheckBox} />
                                <TodoItem keyy={item[2].id} name={index + ' ' + item[2].id} value={item[2].id} date={item[2].date} disabled={false} checked={item[2].status} handleChange={this.handleChangeCheckBox} />
                            </List>
                        </TabPanel>
                    )}

                </TabContext>
            </Container >
        )
    }
}

export default Main;