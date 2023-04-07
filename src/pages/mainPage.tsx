/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Typography, Button } from '@mui/material';
import Navbar from '../components/navbar';

const MainPage = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [smallerScreen, setSmallerScreen] = useState(false);

    const [buttonsSX, setButtonsSX] = useState({});

    const handleResize = () => {
        setWidth(window.innerWidth);
        if (width < 1100) {
            setButtonsSX({
                fontSize: '3rem',
                fontFamily: 'Nunito',
                width: '300px',
                height: '100px',
                borderBottomWidth: '5px',
                borderTopWidth: '0px',
                borderRightWidth: '0px',
                borderLeftWidth: '0px',
                textTransform: 'none',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: '2400px',
                '&:hover': {
                    borderBottomWidth: '5px',
                    borderTopWidth: '0px',
                    borderRightWidth: '0px',
                    borderLeftWidth: '0px'
                }
            });
        } else {
            setButtonsSX({
                fontSize: '3rem',
                fontFamily: 'Nunito',
                width: '500px',
                height: '100px',
                borderBottomWidth: '5px',
                borderTopWidth: '0px',
                borderRightWidth: '0px',
                borderLeftWidth: '0px',
                textTransform: 'none',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: '2400px',
                '&:hover': {
                    borderBottomWidth: '5px',
                    borderTopWidth: '0px',
                    borderRightWidth: '0px',
                    borderLeftWidth: '0px'
                }
            });
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (width < 1100) {
            setSmallerScreen(true);
        } else {
            setSmallerScreen(false);
        }
    }, [width]);

    useEffect(() => {
        const element = document.getElementById('typography1');
        const scrollFunction = () => {
            const y = window.scrollY;
            if (y >= 0 && (element!.classList.contains('hide') || element!.classList.contains('show'))) {
                element!.classList.remove('hide');
                element!.classList.add('show');
            } else if (y <= 0 && element!.classList.contains('show')) {
                return;
            }
        };
        window.addEventListener('scroll', scrollFunction);
    }, []);

    useEffect(() => {
        const element = document.getElementById('img1');
        const scrollFunction = () => {
            const y = window.scrollY;
            if (y > 180 && (element!.classList.contains('hide') || element!.classList.contains('show'))) {
                element!.classList.remove('hide');
                element!.classList.add('show');
            } else if (y <= 180 && element!.classList.contains('show')) {
                return;
            }
        };
        window.addEventListener('scroll', scrollFunction);
    });

    useEffect(() => {
        const element = document.getElementById('typography2');
        const scrollFunction = () => {
            const y = window.scrollY;
            if (y > 200 && (element!.classList.contains('hide') || element!.classList.contains('show'))) {
                element!.classList.remove('hide');
                element!.classList.add('show');
            } else if (y <= 200 && element!.classList.contains('show')) {
                return;
            }
        };
        window.addEventListener('scroll', scrollFunction);
    }, []);

    useEffect(() => {
        const element = document.getElementById('img2');
        const scrollFunction = () => {
            const y = window.scrollY;
            if (y > 880 && (element!.classList.contains('hide') || element!.classList.contains('show'))) {
                element!.classList.remove('hide');
                element!.classList.add('show');
            } else if (y <= 580 && element!.classList.contains('show')) {
                return;
            }
        };
        window.addEventListener('scroll', scrollFunction);
    });

    useEffect(() => {
        const element = document.getElementById('typography3');
        const scrollFunction = () => {
            const y = window.scrollY;
            if (y > 900 && (element!.classList.contains('hide') || element!.classList.contains('show'))) {
                element!.classList.remove('hide');
                element!.classList.add('show');
            } else if (y <= 600 && element!.classList.contains('show')) {
                return;
            }
        };
        window.addEventListener('scroll', scrollFunction);
    });

    useEffect(() => {
        const element = document.getElementById('button-get-started');
        const scrollFunction = () => {
            const y = window.scrollY;
            if (y > 1300 && (element!.classList.contains('hide') || element!.classList.contains('show1'))) {
                element!.classList.remove('hide');
                element!.classList.add('show1');
            } else if (y <= 1300 && element!.classList.contains('show1')) {
                return;
            }
        };
        window.addEventListener('scroll', scrollFunction);
    });

    const handleFontSizes = () => {
        if (smallerScreen) {
            return '4rem';
        } else {
            return '8rem';
        }
    };

    return (
        <div id='main-page'>
            <Navbar />
            <div id='1'>
                <Typography variant='h1' id='typography1' className='mainPageTitle' sx={{ fontFamily: 'Nunito', fontSize: handleFontSizes() }}>
                    <b>
                        Chat now. <br />
                        <span style={{ marginLeft: '100px' }}>
                            <i>Rapid fast.</i>
                        </span>
                    </b>
                </Typography>
            </div>
            <div id='2'>
                <img
                    src='https://images.pexels.com/photos/3807742/pexels-photo-3807742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    id='img1'
                    alt='Girl using mobile'
                    className='mainPageImage1 nonDraggableImg hide'
                />
                <Typography variant='h1' id='typography2' className='hide mainPageTitle2' sx={{ fontFamily: 'Nunito', fontSize: handleFontSizes() }}>
                    <b>
                        100% <i>free</i> <br />{' '}
                        <span style={{ marginLeft: '100px' }}>
                            and <i>secure.</i>
                        </span>
                    </b>
                </Typography>
            </div>
            <div id='3'>
                <img
                    src='https://images.pexels.com/photos/2379886/pexels-photo-2379886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    id='img2'
                    alt='Man using mobile'
                    className='mainPageImage2 nonDraggableImg hide'
                />
                <Typography variant='h1' id='typography3' className='hide mainPageTitle3' sx={{ fontFamily: 'Nunito', fontSize: handleFontSizes() }}>
                    <b>
                        <i>Open source.</i> <br />
                        <span style={{ marginLeft: '150px' }}>
                            <i>
                                Encrypted. <br /> <span style={{ marginLeft: '300px' }}>Forever.</span>
                            </i>
                        </span>
                    </b>
                </Typography>
            </div>
            <Button variant='outlined' className='hide' id='button-get-started' sx={buttonsSX} href='/login'>
                <b>Get Started</b>
            </Button>
            <button style={{ position: 'absolute', top: '2600px' }} className='hide' />
        </div>
    );
};

export default MainPage;
