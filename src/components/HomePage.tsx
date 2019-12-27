import * as React from 'react';
import { Container } from '@material-ui/core';
import PatientList from './PatientList';

function HomePage() {
    return (
        <Container>
            <main>
                <PatientList />
            </main>
        </Container>
    );
}

export default HomePage;
