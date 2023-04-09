/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Message from './message';

const ChatBody = () => {
    return (
        <div className='chat-body'>
            <Box width='100%' height='100%' display='flex'>
                <Stack direction='column-reverse' spacing={5}>
                    <div className='row'>
                        <Message id={1} username='Alexxino' message='Hello. Are you user 2? Is this thing working? Are we stuck in a simulation? yaaaaaaaaaaaaaaa help meeeeeeeeeee' />
                    </div>
                    <div className='row'>
                        <Message id={2} username='User2' message='Hey hello. I am user 2. It seems to work!' />
                    </div>
                    <div className='row'>
                        <Message id={3} username='Alexxino' message='Oh thank god. I was starting to think I was going crazy. I mean, I am, but I was starting to think I was going crazy in a simulation.' />
                    </div>
                    <div className='row'>
                        <Message id={4} username='Alexxino' message='BTW, fortnite sucks.' />
                    </div>
                    <div className='row'>
                        <Message id={5} username='User2' message='I agree. I am a minecraft player myself.' />
                    </div>
                    <div className='row'>
                        <Message id={6} username='User3' message='Hey hello. I am user 3. It seems to work here too!' />
                    </div>
                </Stack>
            </Box>
        </div>
    );
};

export default ChatBody;
