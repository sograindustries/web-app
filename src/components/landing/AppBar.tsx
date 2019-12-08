import * as React from 'react';
import { AppBar as MaterialAppBar, Toolbar, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ROUTE_HOME } from '../../App';

const useStyles = makeStyles(theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
        },
        li: {
            listStyle: 'none',
        },
    },
    appBar: {
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },
    toolbar: {
        flexWrap: 'wrap',
    },

    link: {
        margin: theme.spacing(1, 1.5),
    },
}));

function AppBar() {
    const classes = useStyles();

    return (
        <MaterialAppBar position="static" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Link to={ROUTE_HOME}>Dashboard</Link>
            </Toolbar>
        </MaterialAppBar>
    );
}

export default AppBar;
