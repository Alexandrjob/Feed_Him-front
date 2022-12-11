import SheetD from '@mui/joy/Sheet';
import ButtonD from '@mui/joy/Button';

import { styled } from '@mui/material/styles';

export const Sheet = styled(SheetD)`
    min-width: 437px;
    border-radius: 30px;
    margin-left: 3rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: rgb(187 187 187 / 28%) 0px 4px 30px 6px;
`;

export const Button = styled(ButtonD)`
    width: 100px;
    margin-top: 8px;
`;