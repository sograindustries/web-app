import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './components/landing/LandingPage';

export const ROUTE_LANDING = '/';
export const ROUTE_HOME = '/home';
export const ROUTE_LOGIN = '/login';

export function App() {
    return (
        <Router>
            <Switch>
                <Route path={ROUTE_LOGIN} component={LoginPage} />
                <PrivateRoute path={ROUTE_HOME} component={HomePage} />
                <Route path={ROUTE_LANDING} component={LandingPage} />
            </Switch>
        </Router>
    );
}
