import React from "react";
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
    top: '15%',
    transform: 'translate(-50%, -20%)',
};

//Метод объединяет все обьекты одного дня в один начиная с первого.
function getFormatData(data) {
    const trueNumberServings = getNumberServings(data);
    let formatData = [];
    let box = [];
    let countDay = 0;

    //Массив формируется следующим образом =>
    //В каждой ячейче(box) по trueNumberServings массива.
    //Каждая ячейка олицетворяет один день.
    for (let i = 0; i < data.length; i++) {
        data[i].estimatedDateFeeding = new Date(data[i].estimatedDateFeeding).toLocaleTimeString().slice(0, -3);
        box[data[i].servingNumber - 1] = data[i];
        if (data[i].servingNumber === trueNumberServings) {
            formatData[countDay] = box;
            box = [];

            countDay++;
        }
    }
    
    return formatData;
}

//Возвращает количество порций в день.
function getNumberServings(data) {
    //Вряд-ли коту нужно будет давать больше 10 порций в день.
    const estimatedNumberServings = 10;
    let max = 0;
    for (let i = 0; i < estimatedNumberServings; i++) {
        if (data[i].servingNumber > max) {
            max = data[i].servingNumber;
        }
    }

    return max;
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        container.width = props.width;

        this.state = {
            url: "https://localhost:7146/api/diets",
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
        xhr.open("get", this.state.url, true);
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

    send(data) {
        const xhr = new XMLHttpRequest();

        xhr.open("PUT", this.state.url);
        xhr.setRequestHeader("content-type", "application/json");

        // обработчик получения ответа сервера
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.log("Server response: ", xhr.statusText);
            }
        };

        var normalTypeDate = new Date(Date(data.date));
        //Добавляем часы в соответствии с часовым поясом. 
        //Причина: парсинг json отнимает часовой пояс.
        normalTypeDate.setUTCHours(normalTypeDate.getUTCHours() + 7);

        var jsonData = JSON.stringify({
            id: data.id,
            servingNumber: data.servingNumber,
            waiterName: data.waiterName,
            date: normalTypeDate,
            status: Boolean(data.status),
        });

        xhr.send(jsonData);     // отправляем значение user в методе send
    }

    handleChangeTab(event, newValue) {
        this.setState({
            value: newValue
        });
    };

    handleChangeCheckBox(event) {
        //pach - это поле, генерируемое вот так name={index + ' ' + indexInList}  
        let pach = event.target.name.split(' ');
        let diet = this.state.formatData[pach[0]][pach[1]];

        if (event.target.checked) {
            diet = this.updateDietInFormatData(diet, pach, this.props.waiterName, new Date(), event.target.checked);
            this.send(diet);
            return;
        }

        diet = this.updateDietInFormatData(diet, pach, null, null, null);
        this.send(diet);
    }

    updateDietInFormatData(diet, pach, name, date, checked) {
        diet.waiterName = name;
        diet.date = date;
        diet.status = checked;

        //Рука лицо, ну а как по другому? только хуками, но пока этим заниматься не буду.
        let updateFormatData = this.state.formatData;
        updateFormatData[pach[0]][pach[1]] = diet;

        this.setState({ formatData: updateFormatData });

        return diet;
    }

    render() {
        return (
            <Container sx={container}>
                <Typography sx={{ marginBottom: '20px',marginTop: '40px', textAlign: 'center' }} variant="h4">Покорми кота</Typography>
                <TabContext value={this.state.value}>
                    <Box >
                        <TabListCalendar onChange={this.handleChangeTab} />
                    </Box>
                    <Typography sx={{ marginTop: '20px' }} variant="h6">Сегодня</Typography>
                    {this.state.loading
                        ? <Typography sx={{ marginBottom: '20px', textAlign: 'center' }} variant="h4">Грузим</Typography>
                        : <TabPanelTodo data={this.state.formatData} value={this.state.value}
                            handleChangeCheckBox={this.handleChangeCheckBox} />
                    }
                </TabContext>
            </Container >
        )
    }
}

export default Main;