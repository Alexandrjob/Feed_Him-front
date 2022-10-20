const React = require("react");
import {
    Box,
    Tabs
} from '@mui/material';

import CalenarItem from "./calenarItem"

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetItem: props.targetDay,
            daysInMonth: new Date().daysInMonth(),
            items: [],
        };

        this.generateItems();
    }

    generateItems() {
        for (let i = 0; i < this.state.daysInMonth; i++) {
            if(this.state.targetItem == i){
                this.state.items[i] = <CalenarItem key={i} day={i} />;
            }

            this.state.items[i] = <CalenarItem key={i} day={i} />;
            this.setState({});
        }
    }
    
    render() {
        return (
            <Box >
                <Tabs value={1}
                    disableUnderline={true}
                    variant="scrollable"
                    scrollButtons={false}
                    aria-label="scrollable prevent tabs example"
                    centered>
                    {this.state.items}
                </Tabs>
            </Box>
        )
    }
}

Date.prototype.daysInMonth = function () {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

export default Calendar;