import { AppBar, Toolbar, IconButton, Typography, Stack, createTheme, ThemeProvider, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    typography: {
        fontFamily: ['Nunito', 'sans-serif'].join(',')
    }
});

const Navbar = (props?: { socket?: any; room?: string }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [smallerScreen, setSmallerScreen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [socket, setSocket] = useState<any>();

    const auth = useAuthUser();
    const navigate = useNavigate();

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    const handleShowMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLoginText = () => {
        if (auth()) {
            if (auth()?.username.length > 5) {
                return auth()?.username.substring(0, 5) + '...';
            } else {
                return auth()?.username;
            }
        } else {
            return 'Login';
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (width < 768) {
            setSmallerScreen(true);
        } else {
            setSmallerScreen(false);
        }
    }, [width]);

    useEffect(() => {
        if (props) {
            setSocket(props.socket);
        } else {
            setSocket(null);
        }
    }, [props]);

    const handleChatBtnClick = () => {
        const username = auth()?.username;
        const room = props?.room;
        if (window.location.href !== '/chat') {
            navigate('/chat');
        } else if (socket && room) {
            socket.emit('leave_room', { username, room });
        } else {
            navigate('/chat');
        }
    };

    return (
        <div>
            <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' />
            <AppBar position='fixed' sx={{ background: 'linear-gradient(90deg, rgba(17,45,78,1) 0%, rgba(63,114,175,1) 100%)', height: '100px', justifyContent: 'center' }}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu' size='large' sx={{ mr: '3px', ml: '5px' }} href='/'>
                        <span className='material-symbols-outlined' style={{ fontSize: 30 }}>
                            mms
                        </span>
                    </IconButton>
                    <ThemeProvider theme={theme}>
                        <Typography variant='h6' className='navbarTypography' sx={{ fontSize: '30px', position: 'relative', bottom: '1px', letterSpacing: '0.0.7rem', pointerEvents: 'none' }}>
                            Chat<span>Mate</span>
                        </Typography>
                    </ThemeProvider>
                    {smallerScreen ? (
                        <IconButton
                            edge='end'
                            color='inherit'
                            aria-label='menu'
                            size='large'
                            sx={{ ml: 'auto' }}
                            id='smaller-screen-button'
                            onClick={handleShowMenu}
                            aria-controls={open ? 'smaller-screen-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? true : undefined}>
                            <MenuIcon sx={{ fontSize: 37 }} />
                        </IconButton>
                    ) : (
                        <Stack direction='row' spacing={4} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                            <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito' }} href='/chat'>
                                Chat
                            </Button>
                            <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito' }} href='/signup'>
                                Sign Up
                            </Button>
                            <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito' }} href='/login'>
                                {handleLoginText()}
                            </Button>
                        </Stack>
                    )}
                    <Menu
                        id='smaller-screen-menu'
                        anchorEl={anchorEl}
                        open={open}
                        MenuListProps={{
                            'aria-labelledby': 'smaller-screen-button'
                        }}
                        onClose={handleCloseMenu}>
                        <MenuItem sx={{ justifyContent: 'center' }}>
                            <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito' }} onClick={handleChatBtnClick}>
                                Chat
                            </Button>
                        </MenuItem>
                        <MenuItem sx={{ justifyContent: 'center' }}>
                            <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito' }} href='/signup'>
                                Sign Up
                            </Button>
                        </MenuItem>
                        <MenuItem sx={{ justifyContent: 'center' }}>
                            <Button color='inherit' sx={{ fontSize: 22, textTransform: 'none', fontFamily: 'Nunito' }} href='/login'>
                                {handleLoginText()}
                            </Button>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
