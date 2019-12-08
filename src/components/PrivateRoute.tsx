import * as React from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { ViewerContext } from './ViewerContextProvider';
import { ROUTE_LOGIN } from '../App';

function PrivateRoute(props: RouteProps) {
    const { viewer } = React.useContext(ViewerContext);

    if (viewer) {
        return <Route exact={true} {...props} />;
    }

    return <Redirect to={ROUTE_LOGIN} />;
}

export default PrivateRoute;
