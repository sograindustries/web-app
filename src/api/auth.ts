import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_9vsr32SCz', // your user pool id here
    ClientId: '1hojv8fbr0nkft2p2tbvgksi46', // your app client id here
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export const makeAuthService = () => {
    return {
        login: async (username: string, password: string) => {
            return new Promise<{ username: string; jwt: string }>((res, rej) => {
                const authenticationData = {
                    Username: username,
                    Password: password,
                };
                const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

                const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
                    Username: username,
                    Pool: userPool,
                });

                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function(result) {
                        console.log(result);
                        res({
                            username: result.getAccessToken().payload['cognito:user'],
                            jwt: result.getIdToken().getJwtToken(),
                        });
                    },

                    onFailure: function(err) {
                        rej(err);
                    },
                });
            });
        },

        signup: async (username: string, password: string) => {
            return new Promise<AmazonCognitoIdentity.CognitoUser>((res, rej) => {
                userPool.signUp(
                    username,
                    password,
                    [
                        new AmazonCognitoIdentity.CognitoUserAttribute({
                            Name: 'email',
                            Value: username,
                        }),
                    ],
                    [],
                    function(err, result) {
                        if (err) {
                            rej(err);
                            return;
                        }

                        if (!result) {
                            rej(new Error('No result available.'));
                            return;
                        }

                        res(result.user);
                    },
                );
            });
        },

        getCurrentUser: () => {
            return new Promise<{ username: string; jwt: string } | null>((res, rej) => {
                const cognitoUser = userPool.getCurrentUser();

                if (!cognitoUser) {
                    res(null);
                    return;
                }

                cognitoUser.getSession((err: any, session: any) => {
                    if (err) {
                        rej(err);
                        return;
                    }

                    const accessToken = session.getIdToken();
                    res({
                        jwt: accessToken.getJwtToken(),
                        username: accessToken['payload']['username'],
                    });
                });
            });
        },

        signOut: () => {
            return new Promise((res, rej) => {
                const cognitoUser = userPool.getCurrentUser();

                if (cognitoUser) {
                    cognitoUser.signOut();
                    res();
                } else {
                    rej(new Error('User is not available.'));
                }
            });
        },
    };
};
