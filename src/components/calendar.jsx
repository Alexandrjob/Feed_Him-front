const React = require("react");
import {
    Box,
    Tabs,
    Tab
} from '@mui/material';

import CastomTab from "./CastomTab"

class Calendar extends React.Component {
    render() {
        return (
            <Box >
                <Tabs
                    variant="scrollable"
                    scrollButtons={false}
                    aria-label="scrollable prevent tabs example"
                    centered>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                    <CastomTab/>
                </Tabs>
            </Box>
        )
    }
}

export default Calendar;