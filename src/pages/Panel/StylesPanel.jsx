import BoxD from '@mui/joy/Box';
import TabListD from '@mui/joy/TabList';
import TabD from '@mui/joy/Tab';
import { styled } from '@mui/system';

export const BoxMain = styled(BoxD)`
    width: 83%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BoxLeft = styled(BoxD)`
    min-width: 300px;
    max-width: 600px;
    width: 33%;
`;

export const TabList = styled(TabListD)`
    border-radius: 30px;
    box-shadow: rgb(187 187 187 / 28%) 0px 4px 30px 6px;
    padding-top:15px;
    padding-bottom:15px;
`;

export const Tab = styled(TabD)`
    display: flex;
    justify-content: center;
    padding: 15px 23px;
    justify-content: space-between;
`;