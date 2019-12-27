import * as React from 'react';
import gql from 'graphql-tag';
import { useGetViewerPatchesQuery } from '../generated/graphql';

function DeviceList() {
    const { data, loading, error } = useGetViewerPatchesQuery();

    return <div>{JSON.stringify(data)}</div>;
}

DeviceList.queries = {
    getViewerPatches: gql`
        query GetViewerPatches {
            viewer {
                patches {
                    bleId
                    mode
                }
            }
        }
    `,
};

export default DeviceList;
