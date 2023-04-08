/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stack, TextField, Button, Link, Alert, Snackbar, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

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
    },
    '& .MuiFormHelperText-root': {
        color: 'white',
        pointerEvents: 'none'
    }
});

export const SignUpForm = () => {
    const [elevation, setElevation] = useState(12);
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [canSubmit, setCanSubmit] = useState(false);
    const [signupError, setSignupError] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

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
    });

    // eslint-disable-next-line no-useless-escape
    const emailRegex =
        // eslint-disable-next-line no-useless-escape
        /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])?[a-zA-Z0-9!@#$%^&*.]{8,16}$/;

    useEffect(() => {
        if (inputs.username !== '' && inputs.email !== '' && inputs.password !== '' && emailRegex.test(inputs.email) && passwordRegex.test(inputs.password)) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [inputs]);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/signup', inputs);
        if (res.data.message === 'Email is already registered') {
            console.log('%cAxios: Email already exists', 'color: cyan');
            setSignupError(true);
        } else if (res.data.message === 'User created') {
            console.log('%cAxios: Account created', 'color: cyan');
            setSignupSuccess(true);
        } else if (res.status === 500) {
            console.log('Server error');
            alert('Server error');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((init) => ({
            ...init,
            [e.target.name]: e.target.value
        }));
    };

    const handleWidthChange = () => {
        if (width < 1100) {
            return '75vw';
        } else {
            return '25vw';
        }
    };

    const handleErrorAlertClose = () => {
        setSignupError(false);
        setSignupSuccess(false);
    };

    return (
        <div>
            <Paper elevation={elevation} className='accessForms' id='paper' sx={{ borderRadius: '20px' }}>
                <Stack justifyContent='center' spacing={10}>
                    <Typography color='white' fontSize={60} sx={{ fontFamily: 'Nunito', textAlign: 'center', position: 'relative', top: '2vh' }}>
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3} alignItems='center'>
                            <InputTextField
                                name='username'
                                value={inputs.username}
                                variant='standard'
                                label='Username'
                                type='text'
                                color='primary'
                                size='medium'
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'white', fontSize: 30, height: '50px' } }}
                                InputLabelProps={{ style: { color: 'white', fontSize: 26 } }}
                                sx={{ width: handleWidthChange() }}
                            />
                            <InputTextField
                                name='email'
                                value={inputs.email}
                                variant='standard'
                                label='Email'
                                type='email'
                                color='primary'
                                size='medium'
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'white', fontSize: 30, height: '50px' } }}
                                InputLabelProps={{ style: { color: 'white', fontSize: 26 } }}
                                sx={{ width: handleWidthChange() }}
                            />
                            <InputTextField
                                name='password'
                                helperText={!canSubmit ? 'Password must be 8-16 characters long and contain at least a number' : ''}
                                value={inputs.password}
                                variant='standard'
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                color='primary'
                                size='medium'
                                onChange={handleInputChange}
                                InputProps={{
                                    style: { color: 'white', fontSize: 30, height: '50px' },
                                    endAdornment: (
                                        <IconButton
                                            sx={{ color: 'white' }}
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}>
                                            {showPassword ? <Visibility fontSize='large' /> : <VisibilityOff fontSize='large' />}
                                        </IconButton>
                                    )
                                }}
                                InputLabelProps={{ style: { color: 'white', fontSize: 26 } }}
                                sx={{ width: handleWidthChange() }}
                            />
                            <Button type='submit' variant='text' sx={{ fontSize: '2rem', height: '80px', width: '160px', color: 'white', position: 'relative' }} className='btnSubmit' disabled={!canSubmit}>
                                Submit
                            </Button>
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
            <Snackbar open={signupError} autoHideDuration={2000} onClose={handleErrorAlertClose}>
                <Alert severity='error' variant='filled' onClose={handleErrorAlertClose}>
                    Email already exists.
                </Alert>
            </Snackbar>
            <Snackbar open={signupSuccess} autoHideDuration={2000} onClose={handleErrorAlertClose}>
                <Alert severity='success' variant='filled' onClose={handleErrorAlertClose}>
                    Sign up successful. You will receive a verification email soon.
                </Alert>
            </Snackbar>
        </div>
    );
};
