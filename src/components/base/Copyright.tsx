import * as React from 'react';
import { Typography, Link } from '@material-ui/core';
import { APP_LINK, APP_NAME_UPPER_CASE } from '../../constants';

export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href={APP_LINK}>
                {APP_NAME_UPPER_CASE}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
