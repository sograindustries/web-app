import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { App } from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ViewerContextProvider from './components/ViewerContextProvider';

const { GRAPHQL_URL } = process.env;

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

const client = new ApolloClient({
    link: createHttpLink({ uri: GRAPHQL_URL }),
    cache: new InMemoryCache(),
});

function Application() {
    return (
        <ViewerContextProvider>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </ApolloProvider>
        </ViewerContextProvider>
    );
}

ReactDOM.render(<Application />, document.getElementById('root'));
