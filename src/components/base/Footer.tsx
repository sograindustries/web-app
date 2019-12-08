import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { Copyright } from './Copyright';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Copyright />
        </footer>
    );
}
