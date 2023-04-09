import React, { useState, useEffect } from 'react';
import { Typography, Stack, Paper, IconButton, TextField, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuthUser } from 'react-auth-kit';

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

interface Props {
    onSubmit: (roomID: string, password: string) => void;
}

const JoiningMenu = (props: Props) => {
    const auth = useAuthUser();
    const [elevation, setElevation] = useState(12);
    const [roomID, setRoomID] = useState('');
    const [width, setWidth] = useState(window.innerWidth);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
    const handleSubmit = () => {
        if (roomID && password) {
            props.onSubmit(roomID, password);
        }
    };

    const handleWidthChange = () => {
        if (width < 1100) {
            return '75vw';
        } else {
            return '25vw';
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    });

    return (
        <div>
            <Paper elevation={elevation} className='accessForms' id='paper' sx={{ borderRadius: '20px' }}>
                <Stack justifyContent='center' spacing={13}>
                    <Typography color='white' fontSize={60} sx={{ fontFamily: 'Futura', textAlign: 'center', position: 'relative', top: '2vh' }}>
                        Hi {auth()?.username} <br /> Join a chat room!
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={5} alignItems='center'>
                            <InputTextField
                                name='roomID'
                                value={roomID}
                                variant='standard'
                                label='Room ID'
                                type='text'
                                color='primary'
                                size='medium'
                                onChange={(e) => {
                                    setRoomID(e.target.value);
                                }}
                                InputProps={{ style: { color: 'white', fontSize: 30, height: '60px' } }}
                                InputLabelProps={{ style: { color: 'white', fontSize: 26 } }}
                                sx={{ width: handleWidthChange() }}
                            />
                            <InputTextField
                                name='password'
                                value={password}
                                variant='standard'
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                color='primary'
                                size='medium'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                InputProps={{
                                    style: { color: 'white', fontSize: 30, height: '60px' },
                                    endAdornment: (
                                        <IconButton
                                            sx={{ color: 'white' }}
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}>
                                            {showPassword ? <Visibility fontSize='large' /> : <VisibilityOff fontSize='large' />}{' '}
                                        </IconButton>
                                    )
                                }}
                                InputLabelProps={{ style: { color: 'white', fontSize: 26 } }}
                                sx={{ width: handleWidthChange() }}
                            />
                            <Button type='submit' variant='text' sx={{ fontSize: '2rem', height: '80px', width: '160px', color: 'white', position: 'relative', top: '2vh' }} className='btnSubmit'>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </div>
    );
};

export default JoiningMenu;
