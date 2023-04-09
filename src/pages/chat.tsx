import React, { useState } from 'react';
import NavBar from '../components/navbar';
import ChatBar from '../components/chatPageComponents/chatBar';
import ChatBody from '../components/chatPageComponents/chatBody';
import ChatFooter from '../components/chatPageComponents/chatFooter';
import JoiningMenu from '../components/joiningMenu';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatPage = () => {
    const [joined, setJoined] = useState(false);
    const [room, setRoom] = useState('');

    const handleJoin = (roomID: string, password: string) => {
        socket.emit('join_room', { roomID, password });
        setJoined(true);
        setRoom(roomID);
    };

    return (
        <div>
            <NavBar />
            {joined ? (
                <div id='chat'>
                    <div id='Chat-LEFT'>
                        <ChatBar room={room} />
                    </div>
                    <div id='Chat-RIGHT'>
                        <ChatBody />
                        <ChatFooter />
                    </div>
                </div>
            ) : (
                <div id='joiningMenu'>
                    <JoiningMenu onSubmit={handleJoin} />
                </div>
            )}
        </div>
    );
};

export default ChatPage;
