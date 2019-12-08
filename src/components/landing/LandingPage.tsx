import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import LandingHeader from './LandingHeader';
import AppBar from './AppBar';

const useStyles = makeStyles(() => ({
    root: {
        height: 'inherit',
    },
    container: {
        alignItems: 'center',
        display: 'flex',
        height: '80%',
        justifyContent: 'center',
    },
}));

function LandingPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar />
            <div className={classes.container}>
                <LandingHeader />
            </div>
        </div>
    );
}

export default LandingPage;
