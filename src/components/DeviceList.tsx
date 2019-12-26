import * as React from 'react';
import gql from 'graphql-tag';
import { useGetViewerPatchesQuery } from '../generated/graphql';
import { Switch } from '@material-ui/core';

function DeviceList() {
    const { data, loading, error } = useGetViewerPatchesQuery();

    return (
        <div>
            {JSON.stringify(data)}
            Light:
            <Switch
                onChange={() => {
                    fetch('https://fcm.googleapis.com/fcm/send', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'key=AAAAMi2ZH6M:APA91bGNdc8rXgPMw25x904cE_NqMIicjRuHqWrbZKq_61BCx4p_h6PJqXTUB1mgs8yV2pgoYSdWqtUVWkl9E-JygkTSYNVVlAhR10uEtBbzbigVqdrlHwN55WMO1vG8WuFgXFlQPToB',
                        },
                        body: JSON.stringify({
                            to:
                                'dVvjE5Bto6c:APA91bEEdI-Y3uRqsmSrKbx76Xh5HieQiRmPZcw6W5_sCVwwimCdFebKh78t1i3NuWaUFkKlWMJbe4ugO_MQT8hHJaBq1Retzfxw0OC94s68nMNYIf4hCEkQf31-C7SDa38q71KRdbdw',
                            data: {
                                hello: 'world!',
                            },
                        }),
                    });
                }}
                value="checkedB"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    );
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
