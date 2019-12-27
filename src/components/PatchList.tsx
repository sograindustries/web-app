import * as React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import PatchListItem from './PatchListItem';
import { GetPatchesFragment } from '../generated/graphql';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
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
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    depositContext: {
        flex: 1,
    },
}));

function PatchList(props: GetPatchesFragment) {
    const classes = useStyles();

    if (!props.patches) {
        return <div>Loading Patches...</div>;
    }

    return (
        <Grid container={true} spacing={3} className={classes.container}>
            {props.patches.map(patch => {
                return <PatchListItem key={patch.id} {...patch} />;
            })}
        </Grid>
    );
}

PatchList.queries = {
    getPatches: gql`
        fragment GetPatches on User {
            patches {
                id
                ...PatchParts
            }
        }

        ${PatchListItem.fragments.patch}
    `,
};

export default PatchList;
