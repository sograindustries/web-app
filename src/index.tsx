import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import { setContext } from 'apollo-link-context';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ViewerContextProvider, { ViewerConsumer } from './components/ViewerContextProvider';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#f44336',
        },
    },
});

const authLink = (jwt: string | null) =>
    setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: jwt || '',
            },
        };
    });

const getApolloClient = (jwt: string | null) => {
    const client = new ApolloClient({
        link: authLink(jwt).concat(createHttpLink({ uri: process.env.GRAPHQL_URL })),
        cache: new InMemoryCache(),
    });

    return client;
};

function Application() {
    return (
        <ViewerContextProvider>
            <ViewerConsumer>
                {({ viewer }) => (
                    <ApolloProvider client={getApolloClient(viewer ? viewer.jwt : null)}>
                        <ThemeProvider theme={theme}>
                            <App />
                        </ThemeProvider>
                    </ApolloProvider>
                )}
            </ViewerConsumer>
        </ViewerContextProvider>
    );
}

ReactDOM.render(<Application />, document.getElementById('root'));
