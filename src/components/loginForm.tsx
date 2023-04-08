/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stack, TextField, Button, Link, IconButton, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useSignIn, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const InputTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: 'white'
    },
    '& .MuiInputLabel-root': {
        color: 'white'
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: 'white'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'white'
    }
});

export const LoginForm = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const auth = useAuthUser();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [incorrectPwdError, setIncorrectPwdError] = useState(false);
    const [emailNotRegisteredError, setEmailNotRegisteredError] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [elevation, setElevation] = useState(12);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (auth()) {
            navigate('/chat');
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    });

    useEffect(() => {
        const form = document.getElementById('paper');
        if (form) {
            form.addEventListener('mouseover', () => {
                setElevation(24);
            });
            form.addEventListener('mouseleave', () => {
                setElevation(12);
            });
        }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/auth/login', inputs);
        if (res.data.message === 'Login successful') {
            signIn({
                token: res.data.token,
                tokenType: 'Bearer',
                expiresIn: 28800,
                authState: {
                    id: res.data.id,
                    email: res.data.email,
                    username: res.data.username
                }
            });
            navigate('/chat');
        } else if (res.data.message === 'Incorrect password') {
            setIncorrectPwdError(true);
        } else if (res.data.message === 'Email not registered') {
            setEmailNotRegisteredError(true);
        } else {
            setServerError(true);
        }
    };

    const handleAlertClose = () => {
        setIncorrectPwdError(false);
        setEmailNotRegisteredError(false);
        setServerError(false);
    };

    const handleWidthChange = () => {
        if (width < 1100) {
            return '75vw';
        } else {
            return '25vw';
        }
    };

    return (
        <div>
            <Paper elevation={elevation} className='accessForms' id='paper' sx={{ borderRadius: '20px' }}>
                <Stack justifyContent='center' spacing={13}>
                    <Typography color='white' fontSize={60} sx={{ fontFamily: 'Futura', textAlign: 'center', position: 'relative', top: '2vh' }}>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={5} alignItems='center'>
                            <InputTextField
                                name='email'
                                value={inputs.email}
                                variant='standard'
                                label='Email'
                                type='email'
                                color='primary'
                                size='medium'
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'white', fontSize: 30, height: '60px' } }}
                                InputLabelProps={{ style: { color: 'white', fontSize: 26 } }}
                                sx={{ width: handleWidthChange() }}
                            />
                            <InputTextField
                                name='password'
                                value={inputs.password}
                                variant='standard'
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                color='primary'
                                size='medium'
                                onChange={handleInputChange}
                                InputProps={{
                                    style: { color: 'white', fontSize: 30, height: '60px' },
                                    endAdornment: (
                                        <IconButton
                                            sx={{ color: 'white' }}
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}>
                                            {' '}
                                            {showPassword ? <Visibility fontSize='large' /> : <VisibilityOff fontSize='large' />}{' '}
                                        </IconButton>
                                    )
                                }}
                                InputLabelProps={{ style: { color: 'white', fontSize: 26 } }}
                                sx={{ width: handleWidthChange() }}
                            />
                            <Button type='submit' variant='text' sx={{ fontSize: '2rem', height: '80px', width: '160px', color: 'white', position: 'relative', top: '7vh' }} className='btnSubmit'>
                                Submit
                            </Button>
                        </Stack>
                        <Stack alignItems='center'>
                            <Link href='/signup' sx={{ position: 'relative', top: '8vh', width: '230px' }}>
                                <Typography color='white' fontSize={20} sx={{ textAlign: 'center', pointerEvents: 'visible', width: '230px' }}>
                                    Don't have an account?
                                </Typography>
                            </Link>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
            <div className='custom-shape-divider-bottom-1679680709'>
                <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
                    <path
                        d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
                        className='shape-fill'></path>
                </svg>
            </div>
            <Snackbar open={incorrectPwdError} onClose={handleAlertClose} autoHideDuration={2000}>
                <Alert severity='error' variant='filled' onClose={handleAlertClose}>
                    Incorrect password.
                </Alert>
            </Snackbar>
            <Snackbar open={emailNotRegisteredError} onClose={handleAlertClose} autoHideDuration={2000}>
                <Alert severity='error' variant='filled' onClose={handleAlertClose}>
                    Email is not registered or not verified.
                </Alert>
            </Snackbar>
            <Snackbar open={serverError} onClose={handleAlertClose} autoHideDuration={2000}>
                <Alert severity='error' variant='filled' onClose={handleAlertClose}>
                    Server error 500
                </Alert>
            </Snackbar>
        </div>
    );
};
