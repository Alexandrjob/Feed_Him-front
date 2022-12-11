import * as React from 'react';

import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

export default function UserGroup(props) {
    return (

        <Box  sx={{ marginTop: 2 }} >
            <Box  sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f4eaff', padding: 1, borderRadius: '7px' }}>
                <Typography className="TypographyInvationText" sx={{
                    mr: 2,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} fontWeight="lg">
                    You were invited to
                    <Typography sx={{ ml: '4px', mr: '4px' }} variant="outlined" color="info">
                        Sasha
                    </Typography>
                    group
                </Typography>
                <Box className="BoxInvationButtons" sx={{ display: 'flex' }}>
                    <Button className="InvationButton" sx={{ mr: 1 }} color='info'>Accept</Button>
                    <Button color='danger'>Cancel</Button>
                </Box>
            </Box>
            <Box sx={{ marginTop: 1, backgroundColor: '#f4eaff', padding: 1, borderRadius: '7px' }}>
                <Typography
                    sx={{
                        width: '100%',
                    }} fontWeight="lg">
                    The current group will not be deleted, but you will lose access to it until you leave the new group.
                </Typography>
            </Box>
        </Box>

    );
}