// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useAuthUser } from 'react-auth-kit';

const Message = (props: { username: string; message: string; id: number }) => {
    const auth = useAuthUser();

    useEffect(() => {
        const message = document.getElementById(props.id.toString());
        if (props.username === auth()?.username) {
            message?.classList.remove('message-left');
            message?.classList.add('message-right');
        }
    });

    return (
        <div id={props.id.toString()} className='message-left'>
            <Box width='100%' height='100%'>
                <Stack direction='row' spacing={2}>
                    <Typography variant='h6' sx={{ color: 'black', ml: '20px', mt: '-30px', fontFamily: 'Nunito' }}>
                        {props.username}
                    </Typography>
                    <Typography variant='h6' sx={{ position: 'relative', color: 'white', top: '10px', right: '70px' }}>
                        {props.message}
                    </Typography>
                </Stack>
            </Box>
        </div>
    );
};

export default Message;
