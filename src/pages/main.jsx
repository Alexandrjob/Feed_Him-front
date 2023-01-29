import React from "react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
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
    transform: 'translate(-50%, -0%)',
};

//Метод объединяет все обьекты одного дня в один.
function getFormatData(data) {
    const trueNumberServings = getNumberServings(data);
    let formatData = [];
    let box = [];
    let countDay = 0;

    //Массив формируется следующим образом =>
    //В каждой ячейче(box) по trueNumberServings массива.
    //Каждая ячейка олицетворяет один день.
    for (let i = 0; i < data.length; i++) {
        box[data[i].servingNumber - 1] = data[i];
        box[data[i].servingNumber - 1].backColor = getBackgroundColor(data[i]);
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

function getBackgroundColor(item) {
    const DONE = "#95ffa696";
    const WARNING = "#ffa095";

    if (item.status) {
        return DONE;
    }

    const scheduledDate = new Date(item.estimatedDateFeeding);
    
    let feedingDeadlineDate = new Date(scheduledDate);
    feedingDeadlineDate.setMinutes(scheduledDate.getMinutes() + 10);
    
    const currentDate = new Date();

    if (currentDate > feedingDeadlineDate) {
        return WARNING;
    }

    return "";  
}   

function generateTabList(handle) {
    return <TabListCalendar onChange={handle} />
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        container.width = props.width;

        this.state = {
            url: "https://localhost:7146",
            connection: '',
            loading: true,
            value: new Date().getDate().toString(),
            disabledItem: false,
            formatData: [],
            tabList: <></>
        };
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.state.url + "/api/diets", true);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.onload = function () {
            var result = JSON.parse(xhr.responseText);
            console.log(result.diets);
            this.setState({ formatData: getFormatData(result.diets), loading: false });
        }.bind(this);
        xhr.send();

    }

    async OnConnected() {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(this.state.url + "/hub")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("UpdateDiet", (diet) => {
                diet.backColor = getBackgroundColor(diet);

                let updateFormatData = this.state.formatData;
                updateFormatData[diet.rowArray][diet.columnArray] = diet;
                this.setState({ formatData: updateFormatData });
            });

            await connection.start();
            await connection.invoke("OnConnectedAsync", this.props.waiterName);
            this.setState({ connection: connection });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.setState({ tabList: generateTabList(this.handleChangeTab) });
        this.loadData();
        this.OnConnected();
    }

    send(data, pach) {
        const xhr = new XMLHttpRequest();

        xhr.open("PUT", this.state.url + "/api/diets");
        xhr.setRequestHeader("content-type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.log("Server response: ", xhr.statusText);
            }
        };

        var normalTypeDate = null;
        if (data.date != null) {
            //Добавляем часы в соответствии с часовым поясом. 
            //Причина: парсинг json отнимает часовой пояс.
            normalTypeDate = new Date(data.date);
            normalTypeDate.setUTCHours(normalTypeDate.getUTCHours() + 7);
        }

        var jsonData = JSON.stringify({
            id: data.id,
            servingNumber: data.servingNumber,
            waiterName: data.waiterName,
            date: normalTypeDate,
            status: Boolean(data.status),
            rowArray: pach[0],
            columnArray: pach[1]
        });

        xhr.send(jsonData);
    }

    handleChangeTab(event, newValue) {
        this.setState({
            value: newValue
        });
    };

    handleChangeCheckBox(event) {
        const DONE = "#95ffa696";
        //pach - это поле, генерируемое вот так name={index + ' ' + indexInList}  
        let pach = event.target.name.split(' ');
        let diet = this.state.formatData[pach[0]][pach[1]];

        if (event.target.checked) {
            diet = this.updateDietInFormatData(diet, pach, this.props.waiterName, new Date(), event.target.checked, DONE);
            this.send(diet, pach);
            return;
        }

        diet = this.updateDietInFormatData(diet, pach, null, null, null, "");
        this.send(diet, pach);
    }

    updateDietInFormatData(diet, pach, name, date, checked, color) {
        diet.waiterName = name;
        diet.date = date;
        diet.status = checked;
        diet.backColor = color;

        //Рука лицо, ну а как по другому? только хуками, но пока этим заниматься не буду.
        let updateFormatData = this.state.formatData;
        updateFormatData[pach[0]][pach[1]] = diet;

        this.setState({ formatData: updateFormatData });

        return diet;
    }

    render() {
        return (
            <Container sx={container}>
                <Typography sx={{ marginBottom: '20px', marginTop: '40px', textAlign: 'center' }} variant="h4">Покорми кота</Typography>
                <TabContext value={this.state.value}>
                    <Box >
                        {this.state.tabList}
                    </Box>
                    <Typography sx={{ marginTop: '20px' }} variant="h6">Сегодня</Typography>
                    <TabPanelTodo loading={this.state.loading} data={this.state.formatData} value={this.state.value}
                        handleChangeCheckBox={this.handleChangeCheckBox} />
                </TabContext>
            </Container >
        )
    }
}

export default Main;