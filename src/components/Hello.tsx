import gql from 'graphql-tag';
import * as React from 'react';
import { useGetViewerQuery } from '../generated/graphql';

export function Hello() {
    const { data, loading, error } = useGetViewerQuery();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {`${error}`}</div>;
    }

    if (data) {
        return <div>Hello, {JSON.stringify(data)}</div>;
    }

    return <div>An unexpected error occured.</div>;
}

Hello.queries = {
    getViewer: gql`
        query GetViewer {
            viewer {
                username
            }
        }
    `,
};
