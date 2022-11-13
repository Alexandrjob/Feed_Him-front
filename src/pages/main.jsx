import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanelTodo from '../components/tabPanelTodo';

import TabListCalendar from "../components/tabListCalendar";

export default function Main(props) {
    const container = {
        position: 'absolute',
        width: props.width,
        left: '50%',
        transform: 'translate(-50%, -0%)',
    };

    const [url, setUrl] = useState("http://localhost:5001/api/diets");
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(new Date().getDate().toString());
    const [formatData, setFormatData] = useState([]);

    //Метод объединяет все обьекты одного дня в один начиная с первого.
    const getFormatData = (data) => {
        const trueNumberServings = getNumberServings(data);
        let formatData = [];
        let box = [];
        let countDay = 0;

        //Массив формируется следующим образом =>
        //В каждой ячейче(box) по trueNumberServings массива.
        //Каждая ячейка олицетворяет один день.
        for (let i = 0; i < data.length; i++) {
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
    const getNumberServings = (data) => {
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

    const loadData = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
            let result = JSON.parse(xhr.responseText);
            setFormatData(getFormatData(result.value));
            setLoading(false);
        }.bind(this);
        xhr.send();
    }

    useEffect(() => {
        setLoading(true);
        loadData();
        console.log("looding");
    }, []);

    const send = (data) => {
        const xhr = new XMLHttpRequest();

        xhr.open("PUT", url);
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

        xhr.send(jsonData);
    }

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeCheckBox = (event) => {
        //pach - это поле, генерируемое вот так name={index + ' ' + indexInList}  
        let pach = event.target.name.split(' ');
        let diet = formatData[pach[0]][pach[1]];

        if (event.target.checked) {
            diet = updateDietInFormatData(diet, pach, props.waiterName, new Date(), event.target.checked);
            send(diet);
            return;
        }
        diet = updateDietInFormatData(diet, pach, null, null, null);
        send(diet);
    }

    const updateDietInFormatData = (diet, pach, name, date, checked) => {
        diet.waiterName = name;
        diet.date = date;
        diet.status = checked;

        let updateFormatData = formatData.slice();
        updateFormatData[pach[0]][pach[1]] = diet;

        setFormatData(formatData);
        return diet;
    }

    return (
        <Container sx={container}>
            <Typography sx={{ marginBottom: '20px', marginTop: '40px', textAlign: 'center' }} variant="h4">Покорми кота</Typography>
            <TabContext value={value}>
                <Box >
                    <TabListCalendar onChange={handleChangeTab} />
                </Box>
                <Typography sx={{ marginTop: '20px' }} variant="h6">Сегодня</Typography>
                {loading
                    ? <Typography sx={{ marginBottom: '20px', textAlign: 'center' }} variant="h4">Грузим</Typography>
                    : <TabPanelTodo data={formatData} value={value} handleChangeCheckBox={handleChangeCheckBox} />
                }
            </TabContext>
        </Container >
    )
}