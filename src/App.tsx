import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage';
import SignUpPage from './pages/signup';
import LoginPage from './pages/login';
import ChatPage from './pages/chat';
import VerifyPage from './pages/verify';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/chat' element={<ChatPage />} />
                    <Route path='/verify/:token' element={<VerifyPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
