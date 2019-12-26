import * as React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import DeviceList from './DeviceList';

function HomePage() {
    return (
        <Container>
            <CssBaseline />
            <main>
                <DeviceList />
            </main>
        </Container>
    );
}

export default HomePage;
