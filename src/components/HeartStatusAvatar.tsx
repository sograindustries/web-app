import * as React from 'react';
import { Avatar, makeStyles, Typography, Container, Badge, withStyles, Box } from '@material-ui/core';

const StyledBadge = withStyles(theme => ({
    badge: {
        backgroundColor: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid #44b700',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
}));

export function HeartStatusAvatar() {
    const classes = useStyles();
    const avatarUri = 'https://theofficeanalytics.files.wordpress.com/2017/11/dwight.jpeg?w=1200';
    const avatarName = 'Dwight Schrute';

    return (
        <Container className={classes.root} maxWidth="xs">
            <Box m={1}>
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Avatar alt={avatarName} src={avatarUri} className={classes.bigAvatar} />{' '}
                </StyledBadge>
            </Box>

            <div>
                <Typography variant="h6">{avatarName}</Typography>
            </div>
        </Container>
    );
}
