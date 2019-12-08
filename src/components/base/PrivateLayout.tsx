import * as React from 'react';
import PrivateHeader from '../header/PrivateHeader';

function PrivateLayout(props: { children: React.ReactNode }) {
    return (
        <>
            <PrivateHeader />
            {props.children}
        </>
    );
}

export default PrivateLayout;
