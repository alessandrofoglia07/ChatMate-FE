import React from 'react';
import '../App.css';
import { Typography, Button } from '@mui/material';
import Navbar from '../components/navbar';

const MainPage = () => {
    return (
        <div>
            <Navbar />
            <Typography variant='h1'>Main Page</Typography>
        </div>
    );
};

export default MainPage;