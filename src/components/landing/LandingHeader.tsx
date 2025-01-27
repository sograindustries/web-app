import * as React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Logo from '../base/Logo';

const useStyles = makeStyles(() => ({
    root: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
    title: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 0,
    },
}));

function LandingHeader() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Logo size="md" />
                <Typography variant="h4">ARGOS HEALTH</Typography>
            </div>

            <Typography variant="h6" style={{ color: '#a2a2a2' }}>
                Never Miss a Beat.
            </Typography>
        </div>
    );
}

export default LandingHeader;
