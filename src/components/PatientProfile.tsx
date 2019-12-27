import * as React from 'react';
import { useParams } from 'react-router';
import gql from 'graphql-tag';
import { useGetPatientLazyQuery } from '../generated/graphql';
import { Typography } from '@material-ui/core';
import EcgChart from './EcgChart';
import PatchList from './PatchList';

function PatientProfile() {
    const { id } = useParams();
    const [getPatient, { data, loading, error }] = useGetPatientLazyQuery();

    if (!id) {
        return <div>Invalid Patient ID.</div>;
    }

    const numericId = parseInt(id, 10 /* radix */);

    React.useEffect(() => {
        getPatient({
            variables: {
                id: numericId,
            },
        });
    }, []);

    if (loading) {
        return <div>Loading patient...</div>;
    }

    if (error) {
        return <div>An error occurred. {`${error}`}</div>;
    }

    if (!data || !data.user) {
        return <div>Unable to fetch patient data.</div>;
    }

    const patient = data.user;

    return (
        <>
            <Typography variant="h4">
                {patient.firstName} {patient.lastName}
            </Typography>
            <EcgChart userId={numericId} />
            <PatchList {...patient} />
        </>
    );
}

PatientProfile.queries = {
    getPatient: gql`
        query GetPatient($id: Int!) {
            user(id: $id) {
                firstName
                lastName
                username
                ...GetPatches
            }
        }
        ${PatchList.queries.getPatches}
    `,
};

export default PatientProfile;
