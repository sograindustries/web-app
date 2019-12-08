import * as React from 'react';
import { Container, CssBaseline, makeStyles, Paper, Typography } from '@material-ui/core';
import LandingHeader from './LandingHeader';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
}));

function LandingPage() {
    const classes = useStyles();
    return (
        <Container className={classes.root} maxWidth="xl">
            <CssBaseline />
            <LandingHeader />
        </Container>
    );
}

export default LandingPage;
