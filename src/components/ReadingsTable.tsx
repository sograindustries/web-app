import * as React from 'react';
import gql from 'graphql-tag';
import { ReadingsTableItemFragment, ReadingsTableReadingsFragment } from '../generated/graphql';
import { ListItem, List, Divider, createStyles, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import { ROUTE_PATIENT } from '../App';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        listItem: {
            padding: '10px 5 10px 5',
        },
    }),
);

interface ReadingsTableItemProps {
    reading: ReadingsTableItemFragment;
    onClick: () => void;
}

function ReadingsTableItem(props: ReadingsTableItemProps) {
    const classes = useStyles();
    return (
        <ListItem className={classes.listItem} button={true} onClick={props.onClick}>
            <div>{props.reading.id}</div>
            <div>{props.reading.uri}</div>
        </ListItem>
    );
}

ReadingsTableItem.queries = {
    reading: gql`
        fragment ReadingsTableItem on Reading {
            id
            uri
        }
    `,
};

function ReadingsTable(props: ReadingsTableReadingsFragment) {
    const history = useHistory();
    const handleOnPatientItemClick = (id: number) => {
        history.push(ROUTE_PATIENT.replace(':id', `${id}`));
    };

    return (
        <List>
            {(props.readings || []).map((reading, i) => (
                <React.Fragment key={reading.id}>
                    {i % 2 == 1 && <Divider />}
                    <ReadingsTableItem onClick={() => handleOnPatientItemClick(reading.id)} reading={reading} />
                </React.Fragment>
            ))}
        </List>
    );
}

ReadingsTable.queries = {
    readings: gql`
        fragment ReadingsTableReadings on User {
            readings {
                ...ReadingsTableItem
            }
        }
        ${ReadingsTableItem.queries.reading}
    `,
};

export default ReadingsTable;
