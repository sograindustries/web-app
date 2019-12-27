import * as React from 'react';
import gql from 'graphql-tag';
import { WithApiProps, withApi } from '../api/hoc';
import { ViewerContext } from './ViewerContextProvider';
import EcgChartGraph from './EcgChartGraph';
import { useGetUserReadingsLazyQuery } from '../generated/graphql';

interface Props {
    userId: number;
}

function EcgChart(props: Props & WithApiProps) {
    const [voltages, setVoltages] = React.useState<number[]>([]);
    const { viewer } = React.useContext(ViewerContext);
    const [lastUpdated, setLastUpdated] = React.useState(new Date());
    const [getUserReadings, { data, error }] = useGetUserReadingsLazyQuery();

    if (!viewer) {
        return <div>An error occurred. User is not logged in. </div>;
    }

    React.useEffect(() => {
        getUserReadings({
            variables: {
                userId: props.userId,
                startUnix: Math.floor(new Date(Date.now() - 7000).getTime() / 1000),
            },
        });

        setInterval(async () => {
            setLastUpdated(new Date());
            getUserReadings({
                variables: {
                    userId: props.userId,
                    startUnix: Math.floor(new Date(Date.now() - 7000).getTime() / 1000),
                },
            });
        }, 1500);
    }, []);

    React.useEffect(() => {
        (async () => {
            if (!data || !data.user) {
                return;
            }

            const readings = await Promise.all(
                (data.user.readings || []).map(reading => {
                    if (reading && reading.uri) {
                        return props.api.ecg.get(reading.uri, viewer.jwt);
                    }

                    return null;
                }),
            );

            setVoltages(
                (readings as any)
                    .reverse()
                    .flat()
                    .map((el: any) => el[2])
                    .flat()
                    .slice(0, 250 * 10),
            );
        })();
    }, [data]);

    if (error) {
        return <div>An error occurred fetching heart data.</div>;
    }

    return (
        <div>
            <div>{lastUpdated.toISOString()}</div>
            <EcgChartGraph data={voltages} />
        </div>
    );
}

EcgChart.queries = {
    getUserReadings: gql`
        query GetUserReadings($userId: Int!, $startUnix: Int) {
            user(id: $userId) {
                readings(startUnix: $startUnix) {
                    id
                    uri
                }
            }
        }
    `,
};

export default withApi(EcgChart);
