/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Box, Stack } from '@mui/material';
import Message from './message';

const ChatBody = (props: { socket: any }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const { socket } = props;

    const chatbodyRef = useRef<HTMLDivElement>(null);

    const makeid = (length: number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    };

    useEffect(() => {
        socket.on('receive_message', (data: any) => {
            console.log(data);
            setMessages((state) => [
                {
                    message: data.message,
                    username: data.username,
                    id: makeid(16)
                },
                ...state
            ]);
        });

        return () => socket.off('receive_message');
    }, [socket]);

    useEffect(() => {
        socket.on('last_100_messages', (data: any) => {
            setMessages((state) => [
                ...state,
                ...data.map((message: { room: string; message: string; username: string }) => ({
                    message: message.message,
                    username: message.username,
                    id: makeid(16)
                }))
            ]);
        });
    });

    useEffect(() => {
        chatbodyRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='chat-body' ref={chatbodyRef}>
            <Box width='100%' height='100%' display='flex'>
                <Stack direction='column-reverse' spacing={5}>
                    {messages.map((message) => (
                        <div className='row'>
                            <Message id={message.id} username={message.username} message={message.message} />
                        </div>
                    ))}
                </Stack>
            </Box>
        </div>
    );
};

export default ChatBody;
