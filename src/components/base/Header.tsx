import * as React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { APP_NAME } from '../../constants';

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}));

export function Header() {
    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar>
                <FavoriteIcon className={classes.icon} />
                <Typography variant="h6" color="inherit" noWrap>
                    {APP_NAME}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
