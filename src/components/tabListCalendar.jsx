const React = require("react");
import {
    Tab,
} from '@mui/material';
import TabList from '@mui/lab/TabList';
import { styled } from '@mui/material/styles';

//Настройка стиля невыделенных табов.
const CastomTab = styled(Tab)`
    background-color: #D0EBF3;
    color: #7B9FC4;
    border-radius: 10px;
    min-width: 48;
    margin-left: 8;
    padding: 0;
`;

function getLabel(day) {
    return (
        <div >
            {day.number}<br />
            <span style={{ fontSize: "smaller" }}>{day.name}</span>
        </div>
    )
}

//Генерируется массив основанный на количестве дней в месяце(number,name).
function getDaysArray() {
    const days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
        const date = new Date();
        const daysInMonth = date.daysInMonth();               
        const todayDayNumber = date.getDay();

        var arrayTab = [];
        var index = todayDayNumber;

        for (var i = 0; i < daysInMonth; i++) {
            arrayTab.push({
                number: (i + 1),
                name: days[index++]
            })
            if (index == 7) index = 0;
        }

        return arrayTab;
}

//В sx настраиватся отобржение выделенного таба и скрывается индикатор.
function TabListCalendar(props) {
    const arrayDays = getDaysArray();

    return (
        <TabList onChange={props.onChange}
            selectionFollowsFocus={true}
            aria-label="lab API tabs example"
            scrollButtons={false}
            allowScrollButtonsMobile
            variant="scrollable"
            style={{ justifyContent: 'center' }}
            sx={{
                "& button.Mui-selected": { backgroundColor: "#BEDEF5", wight:"100" },
                ".MuiTabs-indicator": { visibility: "hidden",
                
                "& div.MuiTabs-scroller": {
                    '&.MuiTabs-scrollableX': { flexGrow: '0' },
                 }
             }
            }}>
            {arrayDays.map(day =>
                <CastomTab label={getLabel(day)} key={day.number} tabIndex={day.number} value={day.number.toString()} />
            )}
        </TabList>
    )

}

Date.prototype.daysInMonth = function () {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

export default TabListCalendar;