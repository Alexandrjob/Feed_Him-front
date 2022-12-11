import * as React from 'react';

import { Container } from '@mui/material';

import { CssVarsProvider } from '@mui/joy/styles';
import TabPanel from '@mui/joy/TabPanel';
import TabsD from '@mui/joy/Tabs';
import { tabClasses } from '@mui/joy/Tab';

import { Tab, TabList, BoxMain, BoxLeft } from './StylesPanel';

import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import UserProfile from './UserProfile/UserProfile'
import UserInformation from './UserInformation/UserInformation';
import UserPassword from './UserPassword/UserPassword';
import UserFeeding from './UserFeeding/UserFeeding'
import UserGroup from './UserGroup/UserGroup'

import { styled } from '@mui/system';

const container = {
    justifyContent: 'center',
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
};

const BoxMainN = styled(BoxMain)(({ theme }) => ({
    '@media screen and (max-width: 900px)': {
        width: '100%',
    },
}));

const Tabs = styled(TabsD)(({ theme }) => ({
    '@media screen and (max-width: 900px)': {
        width: '100%',
        minHeight: '100vh',
        marginTop: '80px',
        flexDirection: 'column',

        '.BoxLeft': {
            width: '100%',
        },
        '.JoyTabPanel-root': {
            width: '100%',
            marginTop: '24px',
        },
        '.JoySheet-root': {
            minWidth: '0',
            marginLeft: '0',
        },
        '.TypographyInvationText': {
            flexWrap: 'wrap',
        },
        '.BoxInvationButtons': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        '.InvationButton': {
            marginRight: '0',
            marginBottom: '8px',
        },
    },
}));

export default function Panel(props) {
    const [index, setIndex] = React.useState(0);
    const colors = ['primary', 'info', 'danger', 'neutral', 'warning', 'success'];

    return (
        <Container sx={container} maxWidth='83%'>
            <BoxMainN className="BoxMain">
                <CssVarsProvider>
                    <Tabs
                        aria-label="Soft tabs"
                        value={index}
                        orientation="vertical"
                        onChange={(event, value) => setIndex(value)}
                        sx={(theme) => ({
                            width: '85%',
                            borderRadius: 'lg',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
                            [`& .${tabClasses.root}`]: {
                                borderRadius: '16px',
                                transition: '0.3s',
                                fontWeight: '600',
                                flex: 1,
                                [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                                    opacity: 0.72,
                                },
                            },
                        })}>
                        <BoxLeft className="BoxLeft">
                            <UserProfile />
                            <TabList variant="outlined" sx={{ marginTop: '1.5rem', border: 'solid 1px #dee2e6', }}>
                                <Tab
                                    {...(index === 0 && { variant: 'soft', color: colors[0] })}>
                                    <PermContactCalendarOutlinedIcon />
                                    Information
                                    <NavigateNextOutlinedIcon />
                                </Tab>
                                <Tab
                                    {...(index === 1 && { variant: 'soft', color: colors[2] })}>
                                    <LockPersonOutlinedIcon />
                                    Password
                                    <NavigateNextOutlinedIcon />
                                </Tab>
                                <Tab
                                    {...(index === 2 && { variant: 'soft', color: colors[4] })}>
                                    <FavoriteBorderIcon />
                                    Feeding
                                    <NavigateNextOutlinedIcon />
                                </Tab>
                                <Tab
                                    {...(index === 3 && { variant: 'soft', color: colors[1] })}>
                                    <GroupOutlinedIcon />
                                    Group
                                    <NavigateNextOutlinedIcon />
                                </Tab>
                            </TabList>
                        </BoxLeft>

                        <TabPanel value={0}>
                            <UserInformation username={'Sasha'} email={'Sasha@gmail.com'} />
                        </TabPanel>
                        <TabPanel value={1}>
                            <UserPassword />
                        </TabPanel >
                        <TabPanel value={2}>
                            <UserFeeding />
                        </TabPanel >
                        <TabPanel value={3}>
                            <UserGroup />
                        </TabPanel>

                    </Tabs>
                </CssVarsProvider>
            </BoxMainN >
        </Container>
    );
}