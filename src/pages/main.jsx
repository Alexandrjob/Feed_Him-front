const React = require("react");
import {
    Box,
    Container,
    Typography
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanelTodo from '../components/tabPanelTodo';

import TabListCalendar from "../components/tabListCalendar";

var container = {
    position: 'absolute',
    width: "50%",
    left: '50%',
    top: '10%',
    transform: 'translate(-50%, -20%)',
};

//Метод объединяет 3 обьекта в один начиная с первого(Внимание: говно код).
function getFormatData(data) {
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
    return formatData;
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        container.width = props.width;

        this.state = {
            loading: true,
            value: new Date().getDate().toString(),
            disabledItem: false,
            formatData: [],
        };
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://localhost:5001/api/diets", true);
        xhr.onload = function () {
            var result = JSON.parse(xhr.responseText);
            this.setState({ formatData: getFormatData(result.value), loading: false });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.loadData();
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
            if (event.target.checked) {
                this.addFormatData(data, pach, i, this.props.waiterName, new Date().toLocaleString().slice(0, -3));
                break;
            }

            this.addFormatData(data, pach, i, null, null);
            break;
        }
    };

    addFormatData(data, pach, i, name, date) {
        data[pach[0]][i].waiterName = name;
        data[pach[0]][i].date = date;
        this.setState({ data });
    }

    render() {
        return (
            <Container sx={container}>
                <Typography sx={{ marginBottom: '20', textAlign: 'center' }} variant="h4">Покорми кота</Typography>
                <TabContext value={this.state.value}>
                    <Box >
                        <TabListCalendar onChange={this.handleChangeTab} />
                    </Box>
                    <Typography sx={{ marginTop: '20' }} variant="h6">Сегодня</Typography>
                    {this.state.loading
                        ? <Typography sx={{ marginBottom: '20', textAlign: 'center' }} variant="h4">Грузим</Typography>
                        : <TabPanelTodo data={this.state.formatData} value={this.state.value}
                            handleChangeCheckBox={this.handleChangeCheckBox} />
                    }
                </TabContext>
            </Container >
        )
    }
}

export default Main;