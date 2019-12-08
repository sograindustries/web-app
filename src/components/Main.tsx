import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { HeartStatusAvatar } from './HeartStatusAvatar';

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));

export function Main() {
    const classes = useStyles();

    return (
        <div className={classes.heroContent}>
            <HeartStatusAvatar />
        </div>
    );
}
