import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const ChatBar = (props: { room: string }) => {
    return (
        <div className='chat-bar'>
            <Box width='100%' height='100%'>
                <Typography variant='h4' sx={{ color: 'white', textAlign: 'center', mt: '20px', fontWeight: '600' }}>
                    {props.room}
                </Typography>
                <Stack>
                    <Typography variant='h4' sx={{ color: 'white', mt: '30px', ml: '5px', fontFamily: 'Nunito' }}>
                        User 1
                    </Typography>
                    <Typography variant='h4' sx={{ color: 'white', mt: '30px', ml: '5px', fontFamily: 'Nunito' }}>
                        User 2
                    </Typography>
                    <Typography variant='h4' sx={{ color: 'white', mt: '30px', ml: '5px', fontFamily: 'Nunito' }}>
                        User 3
                    </Typography>
                </Stack>
            </Box>
        </div>
    );
};

export default ChatBar;
