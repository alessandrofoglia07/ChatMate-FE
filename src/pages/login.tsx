import React from 'react';
import Navbar from '../components/navbar';
import { LoginForm } from '../components/loginForm';

const LoginPage = () => {
    return (
        <div>
            <Navbar />
            <LoginForm />
        </div>
    );
};

export default LoginPage;
