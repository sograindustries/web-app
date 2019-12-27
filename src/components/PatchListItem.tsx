import * as React from 'react';
import { Grid, Paper, makeStyles, Typography, Button } from '@material-ui/core';
import clsx from 'clsx';
import gql from 'graphql-tag';

import BatteryChart from './BatteryChart';
import PatchCardStatsOverview from './PatchCardStatsOverview';
import { useHistory } from 'react-router';
import { PatchPartsFragment } from '../generated/graphql';
import { ROUTE_PATCH_SUMMARY } from '../App';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
    },
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
    },
    fixedHeight: {
        height: 100,
    },
    depositContext: {
        flex: 1,
    },
}));

function Title(props: { children: any; onClick: () => void }) {
    return (
        <Typography component="h2" variant="h6" color="primary" onClick={props.onClick}>
            {props.children}
        </Typography>
    );
}

function PatchListItem(props: PatchPartsFragment) {
    const classes = useStyles({});
    const history = useHistory();

    const handleClick = () => {
        history.push(ROUTE_PATCH_SUMMARY.replace(':id', `${props.id}`));
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Grid item={true} xs={12} md={6} lg={6}>
            <Paper className={fixedHeightPaper} style={{ position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Title onClick={handleClick}>{props.firmwareVersion}</Title>

                    <Typography variant="caption" color="textSecondary" className={classes.depositContext}>
                        <div>{props.mobileDevice}</div>
                        <div>{props.bleId}</div>
                        <div>FW: {props.firmwareVersion}</div>
                        <div>APP: {props.appVersion}</div>
                    </Typography>

                    <BatteryChart {...props} />
                </div>

                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        display: 'flex',
                        flex: 1,
                    }}
                >
                    <PatchCardStatsOverview {...props} />
                </div>
            </Paper>
        </Grid>
    );
}

PatchListItem.fragments = {
    patch: gql`
        fragment PatchParts on Patch {
            id
            bleId
            mobileDevice
            firmwareVersion
            appVersion
            ...BatteryActivityParts
            ...PatchCardStatsOverview
        }

        ${BatteryChart.fragments.batteryActivity}
        ${PatchCardStatsOverview.fragments.stats}
    `,
};

export default PatchListItem;
