import React, { useState, useEffect } from 'react';

import { Container } from '@mui/material';
import Box from '@mui/joy/Box';
import { CssVarsProvider } from '@mui/joy/styles';
import TabPanel from '@mui/joy/TabPanel';
import TabsD from '@mui/joy/Tabs';
import CircularProgress from '@mui/joy/CircularProgress';
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
    const [isLoading, setIsLoading] = useState(false);

    const [index, setIndex] = React.useState(props.focusTab);
    const colors = ['primary', 'info', 'danger', 'neutral', 'warning', 'success'];

    const [information, setInformation] = useState({ name: '', email: '' });
    const [feeding, setFeeding] = useState({});
    const [group, setGroup] = useState({});
    const [isCreator, setIsCreator] = useState(false);

    useEffect(() => {
        // if (this.props.auth) {
        loadData();
        // }
    }, []);

    const loadData = () => {
        var url = props.url + '/users';
        var methodType = "GET";

        send(url, methodType);
    }

    const send = (url, methodType) => {
        const token = window.localStorage.getItem('token');
        const xhr = new XMLHttpRequest();
        xhr.open(methodType, url);
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                setInformation(result.user);
                if (!!!!result.config) {
                    let startFeeding = result.config.startFeeding.slice(11).slice(0, -3);
                    let endFeeding = result.config.endFeeding.slice(11).slice(0, -3);
                    result.config.startFeeding = startFeeding;
                    result.config.endFeeding = endFeeding;
                    setFeeding(result.config);
                }

                setGroup(result.usersGroup);
                setIsCreator(result.isCreator);

                setIsLoading(true);
            } else {
                console.log("Server response: ", xhr.status);
            }
        };

        xhr.send();
    };

    const handleChangeInformation = e => {
        const { name, value } = e.target;
        setInformation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleChangeFeeding = e => {
        const { name, value } = e.target;
        setFeeding(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleChangeGroup = e => {
        const { name, value } = e.target;
        setGroup(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Container sx={container} maxWidth='83%'>
            <BoxMainN className="BoxMain">
                <CssVarsProvider>
                    {isLoading ?
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
                                <UserProfile information={information} />
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
                                    <Tab sx={{ display: isCreator ? 'flex' : 'none' }}
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
                                <UserInformation information={information} url={props.url} handleChangeInf={handleChangeInformation} />
                            </TabPanel>
                            <TabPanel value={1}>
                                <UserPassword url={props.url} />
                            </TabPanel >
                            {isCreator ?
                                <TabPanel value={2}>
                                    <UserFeeding feeding={feeding} url={props.url} handleChangeFeeding={handleChangeFeeding} />
                                </TabPanel >
                                : <TabPanel value={2}><UserFeeding feeding={feeding} url={props.url} /></TabPanel>
                            }
                            <TabPanel value={3}>
                                <UserGroup isCreator={isCreator} group={group} url={props.url} handleLoad={loadData} handleChangeGroup={handleChangeGroup} />
                            </TabPanel>

                        </Tabs>
                        : <CircularProgress variant="soft" />}
                </CssVarsProvider>
            </BoxMainN >
        </Container>
    );
}