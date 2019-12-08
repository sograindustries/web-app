import * as React from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { ViewerContext } from './ViewerContextProvider';
import { ROUTE_LOGIN } from '../App';
import PrivateLayout from './base/PrivateLayout';

function PrivateRoute(props: RouteProps) {
    const { viewer } = React.useContext(ViewerContext);

    if (viewer) {
        return (
            <PrivateLayout>
                <Route exact={true} {...props} />
            </PrivateLayout>
        );
    }

    return <Redirect to={ROUTE_LOGIN} />;
}

export default PrivateRoute;
