import * as React from 'react';
import PrivateHeader from '../header/PrivateHeader';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(3),
    },
}));

function PrivateLayout(props: { children: React.ReactNode }) {
    const classes = useStyles();
    return (
        <>
            <PrivateHeader />
            <Container className={classes.root}>{props.children}</Container>
        </>
    );
}

export default PrivateLayout;
