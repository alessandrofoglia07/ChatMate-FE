import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

const ChatBar = (props: { room: string; socket: any; onLeave: (room: string) => void }) => {
    const { socket } = props;

    const [roomUsers, setRoomUsers] = useState<any[]>([]);

    useEffect(() => {
        socket.on('chatroom_users', (data: any) => {
            setRoomUsers(data);
        });

        return () => socket.off('room_users');
    }, [socket]);

    return (
        <div className='chat-bar'>
            <Box width='100%' height='100%'>
                <Typography variant='h4' sx={{ color: 'white', textAlign: 'center', mt: '20px', fontWeight: '600' }}>
                    {props.room}
                </Typography>
                <Stack>
                    {roomUsers.map((user) => (
                        <Typography variant='h4' sx={{ color: 'white', mt: '30px', ml: '5px', fontFamily: 'Nunito' }}>
                            {user.username}
                        </Typography>
                    ))}
                </Stack>
            </Box>
        </div>
    );
};

export default ChatBar;
