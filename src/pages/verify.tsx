import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const VerifyPage = () => {
    const { token } = useParams();
    const [verificationResult, setVerificationResult] = useState<any>(null);
    const [fontSize, setFontSize] = useState(100);
    const [width, setWidth] = useState(window.innerWidth);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            if (width < 768) {
                setFontSize(50);
            } else {
                setFontSize(100);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
    });

    const customTheme = createTheme({
        typography: {
            fontFamily: ['Nunito', 'sans-serif'].join(',')
        }
    });

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/verify/${token}`);
                if (!verificationResult || verificationResult == null) {
                    setVerificationResult(res.data);
                } else {
                    return;
                }
            } catch (err: any) {
                if (!verificationResult || verificationResult == null) {
                    setVerificationResult(err.message);
                } else {
                    return;
                }
            }
        };

        if (verificationResult == null) {
            verifyEmail();
        }
    });

    return (
        <div>
            <NavBar />
            {verificationResult ? (
                <ThemeProvider theme={customTheme}>
                    <Typography variant='h1' align='center' fontSize={fontSize} sx={{ mt: 40 }} className='verifyPageTitle'>
                        <strong>{verificationResult}</strong>
                    </Typography>
                </ThemeProvider>
            ) : (
                <ThemeProvider theme={customTheme}>
                    <Typography variant='h1' align='center' fontSize={fontSize} sx={{ mt: 40 }} className='verifyPageTitle'>
                        <strong>Verifying...</strong>
                    </Typography>
                </ThemeProvider>
            )}
        </div>
    );
};

export default VerifyPage;
