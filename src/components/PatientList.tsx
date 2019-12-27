import * as React from 'react';
import gql from 'graphql-tag';
import { useGetViewerPatientsQuery, PatientListItemPatientFragment } from '../generated/graphql';
import { ListItem, List, Divider, createStyles, makeStyles, Typography } from '@material-ui/core';
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

interface PatientListItemProps {
    patient: PatientListItemPatientFragment;
    onClick: () => void;
}

function PatientListItem(props: PatientListItemProps) {
    const classes = useStyles();
    return (
        <ListItem className={classes.listItem} button={true} onClick={props.onClick}>
            <Typography variant="h5">
                {props.patient.firstName} {props.patient.lastName}
            </Typography>
        </ListItem>
    );
}

PatientListItem.queries = {
    patient: gql`
        fragment PatientListItemPatient on User {
            id
            firstName
            lastName
        }
    `,
};

function PatientList() {
    const { data, loading, error } = useGetViewerPatientsQuery({});
    const history = useHistory();

    const handleOnPatientItemClick = (id: number) => {
        history.push(ROUTE_PATIENT.replace(':id', `${id}`));
    };

    if (loading) {
        return <div>Loading patients...</div>;
    }

    if (error) {
        return <div>Something went wrong. {`${error}`}</div>;
    }

    if (!data || !data.viewer || !data.viewer.patients) {
        return <div>Unable to retrieve patient list.</div>;
    }

    return (
        <>
            <Typography variant="h3">Your Patients</Typography>
            <List>
                {data.viewer.patients.map((patient, i) => (
                    <React.Fragment key={patient.id}>
                        {i % 2 == 1 && <Divider />}
                        <PatientListItem onClick={() => handleOnPatientItemClick(patient.id)} patient={patient} />
                    </React.Fragment>
                ))}
            </List>
        </>
    );
}

PatientList.queries = {
    getPatients: gql`
        query GetViewerPatients {
            viewer {
                patients {
                    ...PatientListItemPatient
                }
            }
        }
        ${PatientListItem.queries.patient}
    `,
};

export default PatientList;
