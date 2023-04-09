import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatFooter = () => {
    const [message, SetMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        SetMessage('');
        // do something with the message
    };

    return (
        <div className='chat-footer'>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <Box width='100%' height='100%' display='flex' alignItems='center'>
                    <TextField
                        type='text'
                        label='Type message...'
                        variant='filled'
                        value={message}
                        onChange={(e) => SetMessage(e.target.value)}
                        sx={{ width: '80%', mt: '20px', ml: '100px', backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    <IconButton type='submit' size='large' sx={{ ml: '20px', mt: '20px' }}>
                        <SendIcon fontSize='large' sx={{ color: 'white' }} />
                    </IconButton>
                </Box>
            </form>
        </div>
    );
};

export default ChatFooter;
