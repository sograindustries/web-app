import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './components/landing/LandingPage';
import { ViewerContext } from './components/ViewerContextProvider';
import { WithApiProps, withApi } from './api/hoc';

export const ROUTE_LANDING = '/';
export const ROUTE_HOME = '/home';
export const ROUTE_LOGIN = '/login';

function App(props: WithApiProps) {
    const [initialized, setInitialized] = React.useState(false);
    const { viewer, setViewer } = React.useContext(ViewerContext);

    React.useEffect(() => {
        if (!viewer) {
            props.api.auth
                .getCurrentUser()
                .then(setViewer)
                .finally(() => {
                    setInitialized(true);
                });
        } else {
            setInitialized(true);
        }
    }, []);

    if (!initialized) {
        return <div>Initializing...</div>;
    }

    return (
        <Router>
            <Switch>
                <PrivateRoute path={ROUTE_HOME} component={HomePage} />
                <Route path={ROUTE_LOGIN} component={LoginPage} />
                <Route path={ROUTE_LANDING} component={LandingPage} />
            </Switch>
        </Router>
    );
}

export default withApi(App);
