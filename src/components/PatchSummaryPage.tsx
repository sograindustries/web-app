import * as React from 'react';
import gql from 'graphql-tag';
import { Switch, FormControlLabel, Button } from '@material-ui/core';
import { CognitoIdentityCredentials, config, S3 } from 'aws-sdk';
import EcgChart2 from './EcgChart2';
import { ViewerContext } from './ViewerContextProvider';
import { useGetPatchSummaryQuery } from '../generated/graphql';

const poolData = {
    UserPoolId: 'us-east-1_9vsr32SCz', // your user pool id here
    ClientId: '1hojv8fbr0nkft2p2tbvgksi46', // your app client id here
};

const makeEcgService = () => {
    return {
        list: (jwt: string) => {
            return new Promise<{ key: string; size: number }[]>(async (res, rej) => {
                await config.update({
                    ...config,
                    region: 'us-east-1',
                    credentials: new CognitoIdentityCredentials({
                        IdentityPoolId: 'us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be',
                        Logins: {
                            [`cognito-idp.us-east-1.amazonaws.com/${poolData.UserPoolId}`]: jwt,
                        },
                    }),
                });

                const s3 = new S3({
                    apiVersion: '2006-03-01',
                });

                s3.listObjects({ Bucket: 'argos-ecgs', MaxKeys: 100 }, (error, data) => {
                    if (error) {
                        console.error('ERROR: ', error);
                        rej(error);
                    }

                    if (data && data.Contents) {
                        res(
                            data.Contents.map(bucket => ({
                                key: bucket.Key || 'n/a',
                                size: bucket.Size || 0,
                            })),
                        );
                    }

                    rej(new Error("Something wen't wrong uploading data to bucket."));
                });
            });
        },
        get: (key: string, jwt: string) => {
            return new Promise(async (res, rej) => {
                await config.update({
                    ...config,
                    region: 'us-east-1',
                    credentials: new CognitoIdentityCredentials({
                        IdentityPoolId: 'us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be',
                        Logins: {
                            [`cognito-idp.us-east-1.amazonaws.com/${poolData.UserPoolId}`]: jwt,
                        },
                    }),
                });

                const s3 = new S3({
                    apiVersion: '2006-03-01',
                });

                s3.getObject({ Bucket: 'argos-ecgs', Key: key }, (error, data) => {
                    if (error) {
                        console.error('ERROR: ', error);
                        rej(error);
                    }

                    if (data && data.Body) {
                        res(JSON.parse(data.Body.toString('utf-8')));
                    }

                    rej(new Error("Something wen't wrong uploading data to bucket."));
                });
            });
        },
    };
};

const service = makeEcgService();

interface Props {
    match: { params: { id: string } };
}

function ChartContainer(props: { jwt: string | null; uri: string | null | undefined; createdAt: string | null }) {
    const [data, setData]: any = React.useState(null);

    const [error, setError]: any = React.useState(null);

    React.useEffect(() => {
        if (props.jwt && props.uri) {
            service
                .get(props.uri, props.jwt)
                .then(setData)
                .catch(setError);
        }
    }, [props.uri, props.jwt]);

    if (error) {
        return <div>{JSON.stringify(error)}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const handleDownload = () => {
        let textToSave = data.map((el: any) => JSON.stringify(el.flat().join(',')) + '\n');

        textToSave = data.join('\n');

        //  textToSave = textToSave.slice(1, textToSave.length - 1).replace("\n", "");

        const hiddenElement = document.createElement('a');

        hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
        hiddenElement.target = '_blank';
        hiddenElement.download = `${props.uri}`;
        hiddenElement.click();
    };

    console.log(data);

    let isContiguous = true;
    for (let i = 0; i < data.length - 1; i++) {
        const currPacketCount = data[i][0];
        const nextPacketCount = data[i + 1][0];

        if (nextPacketCount - currPacketCount !== 1) {
            isContiguous = false;
        }
    }

    return (
        <div>
            <Button onClick={handleDownload} color="primary">
                Download
            </Button>
            {isContiguous ? 'VALID. IS CONTIGUOUS' : 'INVALID. NOT CONTIGUOUS.'}
            <EcgChart2 data={data.map((el: any) => el[2]).flat()} />
        </div>
    );
}

function Reading(props: { uri: string | null | undefined; createdAt: string }) {
    const [isChartVisible, setIsChartVisible] = React.useState(false);
    const { viewer } = React.useContext(ViewerContext);

    if (!viewer) {
        return <div>Something went wrong.</div>;
    }

    return (
        <div>
            <div>{props.uri}</div>
            <div>{new Date(parseInt(props.createdAt)).toISOString()}</div>
            <FormControlLabel
                control={
                    <Switch
                        checked={isChartVisible}
                        onChange={event => {
                            setIsChartVisible(event.target.checked);
                        }}
                    />
                }
                label="Show Chart"
            />
            {isChartVisible && <ChartContainer {...props} jwt={viewer.jwt} />}
        </div>
    );
}

function PatchSummaryPageInner(props: { id: number }) {
    const { data, error, loading } = useGetPatchSummaryQuery({
        variables: {
            id: props.id,
        },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{JSON.stringify(error)}</div>;
    }

    if (!data) {
        return <div>Something went wrong...</div>;
    }

    if (!data.viewer) {
        return <div>Something went wrong... no viewer?</div>;
    }

    if (!data.viewer.patch) {
        return <div>No patches</div>;
    }

    return (
        <div>
            {data.viewer.patch.readings!.reverse().map(reading => {
                if (reading.uri && reading.createdAt) {
                    return <Reading key={reading.uri} uri={reading.uri} createdAt={reading.createdAt} />;
                }

                return null;
            })}
        </div>
    );
}

function PatchSummaryPage(props: Props) {
    let numericId: number | null = null;
    try {
        numericId = parseInt(props.match.params.id);
    } catch (error) {
        return <div>Invalid ID!</div>;
    }

    return <PatchSummaryPageInner id={13} />;
}

PatchSummaryPage.queries = {
    patch: gql`
        query GetPatchSummary($id: Int!) {
            viewer {
                patch(id: $id) {
                    id
                    bleId
                    readingCount
                    readings {
                        id
                        createdAt
                        uri
                    }
                }
            }
        }
    `,
};

export default PatchSummaryPage;
