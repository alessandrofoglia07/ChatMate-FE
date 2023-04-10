import React, { useState } from 'react';
import NavBar from '../components/navbar';
import ChatBar from '../components/chatPageComponents/chatBar';
import ChatBody from '../components/chatPageComponents/chatBody';
import ChatFooter from '../components/chatPageComponents/chatFooter';
import JoiningMenu from '../components/joiningMenu';
import io from 'socket.io-client';
import { useAuthUser } from 'react-auth-kit';

const socket = io('http://localhost:5000');

const ChatPage = () => {
    const auth = useAuthUser();

    const [joined, setJoined] = useState(false);
    const [room, setRoom] = useState('');

    const handleJoin = (room: string) => {
        const username: string | null = auth()?.username;
        if (username) {
            socket.emit('join_room', { room, username });
            socket.emit('get_chatroom_users', { room });
            setJoined(true);
            setRoom(room);
        }
    };

    const handleLeave = () => {
        const username = auth()?.username;
        socket.emit('leave_room', { room, username });
        setJoined(false);
        setRoom('');
    };

    return (
        <div>
            <NavBar />
            {joined ? (
                <div id='chat'>
                    <div id='Chat-LEFT'>
                        <ChatBar room={room} socket={socket} onLeave={handleLeave} />
                    </div>
                    <div id='Chat-RIGHT'>
                        <ChatBody socket={socket} />
                        <ChatFooter socket={socket} room={room} />
                    </div>
                </div>
            ) : (
                <div id='joiningMenu'>
                    <JoiningMenu socket={socket} onSubmit={handleJoin} />
                </div>
            )}
        </div>
    );
};

export default ChatPage;
