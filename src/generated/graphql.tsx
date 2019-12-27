import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Battery = {
   __typename?: 'Battery',
  value?: Maybe<Scalars['Float']>,
  createdAt?: Maybe<Scalars['String']>,
};

/** Creates a patch. */
export type CreatePatchInput = {
  bleId?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['Int']>,
};

export type CreatePatchPayload = {
   __typename?: 'CreatePatchPayload',
  /** The patch created. */
  patch?: Maybe<Patch>,
};

/** Creates a reading for a given patch. */
export type CreateReadingInput = {
  patchId?: Maybe<Scalars['Int']>,
  patchBleId?: Maybe<Scalars['ID']>,
  uri?: Maybe<Scalars['String']>,
  /** Commit hash associated with FW build. */
  firmwareVersion?: Maybe<Scalars['String']>,
  /** Packet sequence number since device was last powered on. Reset to 0 when device is powered off. */
  sequence?: Maybe<Scalars['Int']>,
  /** Number of milliseconds patch has been on. */
  uptimeMs?: Maybe<Scalars['Int']>,
  /** Set of tags used to provide additional context to reading. */
  tags?: Maybe<Array<Scalars['String']>>,
};

export type CreateReadingPayload = {
   __typename?: 'CreateReadingPayload',
  /** The patch created. */
  reading?: Maybe<Reading>,
};

export type Mutation = {
   __typename?: 'Mutation',
  updatePatch?: Maybe<UpdatePatchPayload>,
  createPatch?: Maybe<CreatePatchPayload>,
  createReading?: Maybe<CreateReadingPayload>,
  setPatchMode?: Maybe<SetPatchModePayload>,
  version?: Maybe<Scalars['String']>,
};


export type MutationUpdatePatchArgs = {
  input: UpdatePatchInput
};


export type MutationCreatePatchArgs = {
  input: CreatePatchInput
};


export type MutationCreateReadingArgs = {
  input: CreateReadingInput
};


export type MutationSetPatchModeArgs = {
  input: SetPatchModeInput
};

export type Patch = {
   __typename?: 'Patch',
  id: Scalars['Int'],
  bleId?: Maybe<Scalars['String']>,
  battery?: Maybe<Battery>,
  batteryActivity?: Maybe<Array<Battery>>,
  firmwareVersion?: Maybe<Scalars['String']>,
  appVersion?: Maybe<Scalars['String']>,
  mobileDevice?: Maybe<Scalars['String']>,
  readingCount?: Maybe<Scalars['Int']>,
  readings?: Maybe<Array<Reading>>,
  mode?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  readings?: Maybe<Array<Maybe<Reading>>>,
  version?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  viewer?: Maybe<User>,
};


export type QueryReadingsArgs = {
  patchId: Scalars['Int'],
  start?: Maybe<Scalars['String']>
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>,
  username?: Maybe<Scalars['String']>
};

export type Reading = {
   __typename?: 'Reading',
  id: Scalars['Int'],
  createdAt?: Maybe<Scalars['String']>,
  uri?: Maybe<Scalars['String']>,
  firmwareVersion?: Maybe<Scalars['String']>,
  sequence?: Maybe<Scalars['Int']>,
  uptimeMs?: Maybe<Scalars['Int']>,
  tags?: Maybe<Array<Scalars['String']>>,
};

/** Creates a reading for a given patch. */
export type SetPatchModeInput = {
  patchId?: Maybe<Scalars['Int']>,
  mode?: Maybe<Scalars['String']>,
};

export type SetPatchModePayload = {
   __typename?: 'SetPatchModePayload',
  id: Scalars['Int'],
  mode?: Maybe<Scalars['String']>,
};

/** Updates patch of provided ID. */
export type UpdatePatchInput = {
  id: Scalars['Int'],
  bleId?: Maybe<Scalars['String']>,
};

export type UpdatePatchPayload = {
   __typename?: 'UpdatePatchPayload',
  /** The patch updated. */
  patch?: Maybe<Patch>,
};

export type User = {
   __typename?: 'User',
  patches: Array<Patch>,
  patch?: Maybe<Patch>,
  patients?: Maybe<Array<User>>,
  readings?: Maybe<Array<Reading>>,
  id: Scalars['Int'],
  username: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};


export type UserPatchArgs = {
  id: Scalars['Int']
};


export type UserReadingsArgs = {
  startUnix?: Maybe<Scalars['Int']>
};

export type BatteryActivityPartsFragment = (
  { __typename?: 'Patch' }
  & { battery: Maybe<(
    { __typename?: 'Battery' }
    & Pick<Battery, 'value'>
  )>, batteryActivity: Maybe<Array<(
    { __typename?: 'Battery' }
    & Pick<Battery, 'createdAt' | 'value'>
  )>> }
);

export type GetViewerPatchesQueryVariables = {};


export type GetViewerPatchesQuery = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & { patches: Array<(
      { __typename?: 'Patch' }
      & Pick<Patch, 'bleId' | 'mode'>
    )> }
  )> }
);

export type GetUserReadingsQueryVariables = {
  userId: Scalars['Int'],
  startUnix?: Maybe<Scalars['Int']>
};


export type GetUserReadingsQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & { readings: Maybe<Array<(
      { __typename?: 'Reading' }
      & Pick<Reading, 'id' | 'uri'>
    )>> }
  )> }
);

export type GetViewerQueryVariables = {};


export type GetViewerQuery = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);

export type PatchCardStatsOverviewFragment = (
  { __typename?: 'Patch' }
  & Pick<Patch, 'readingCount'>
);

export type GetPatchesFragment = (
  { __typename?: 'User' }
  & { patches: Array<(
    { __typename?: 'Patch' }
    & Pick<Patch, 'id'>
    & PatchPartsFragment
  )> }
);

export type PatchPartsFragment = (
  { __typename?: 'Patch' }
  & Pick<Patch, 'id' | 'bleId' | 'mobileDevice' | 'firmwareVersion' | 'appVersion'>
  & BatteryActivityPartsFragment
  & PatchCardStatsOverviewFragment
);

export type GetPatchSummaryQueryVariables = {
  id: Scalars['Int']
};


export type GetPatchSummaryQuery = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & { patch: Maybe<(
      { __typename?: 'Patch' }
      & Pick<Patch, 'id' | 'bleId' | 'readingCount'>
      & { readings: Maybe<Array<(
        { __typename?: 'Reading' }
        & Pick<Reading, 'id' | 'createdAt' | 'uri'>
      )>> }
    )> }
  )> }
);

export type PatientListItemPatientFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName'>
);

export type GetViewerPatientsQueryVariables = {};


export type GetViewerPatientsQuery = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & { patients: Maybe<Array<(
      { __typename?: 'User' }
      & PatientListItemPatientFragment
    )>> }
  )> }
);

export type GetPatientQueryVariables = {
  id: Scalars['Int']
};


export type GetPatientQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'username'>
    & GetPatchesFragment
  )> }
);

export type ReadingsTableItemFragment = (
  { __typename?: 'Reading' }
  & Pick<Reading, 'id' | 'uri'>
);

export type ReadingsTableReadingsFragment = (
  { __typename?: 'User' }
  & { readings: Maybe<Array<(
    { __typename?: 'Reading' }
    & ReadingsTableItemFragment
  )>> }
);

export const BatteryActivityPartsFragmentDoc = gql`
    fragment BatteryActivityParts on Patch {
  battery {
    value
  }
  batteryActivity {
    createdAt
    value
  }
}
    `;
export const PatchCardStatsOverviewFragmentDoc = gql`
    fragment PatchCardStatsOverview on Patch {
  readingCount
}
    `;
export const PatchPartsFragmentDoc = gql`
    fragment PatchParts on Patch {
  id
  bleId
  mobileDevice
  firmwareVersion
  appVersion
  ...BatteryActivityParts
  ...PatchCardStatsOverview
}
    ${BatteryActivityPartsFragmentDoc}
${PatchCardStatsOverviewFragmentDoc}`;
export const GetPatchesFragmentDoc = gql`
    fragment GetPatches on User {
  patches {
    id
    ...PatchParts
  }
}
    ${PatchPartsFragmentDoc}`;
export const PatientListItemPatientFragmentDoc = gql`
    fragment PatientListItemPatient on User {
  id
  firstName
  lastName
}
    `;
export const ReadingsTableItemFragmentDoc = gql`
    fragment ReadingsTableItem on Reading {
  id
  uri
}
    `;
export const ReadingsTableReadingsFragmentDoc = gql`
    fragment ReadingsTableReadings on User {
  readings {
    ...ReadingsTableItem
  }
}
    ${ReadingsTableItemFragmentDoc}`;
export const GetViewerPatchesDocument = gql`
    query GetViewerPatches {
  viewer {
    patches {
      bleId
      mode
    }
  }
}
    `;
export type GetViewerPatchesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetViewerPatchesQuery, GetViewerPatchesQueryVariables>, 'query'>;

    export const GetViewerPatchesComponent = (props: GetViewerPatchesComponentProps) => (
      <ApolloReactComponents.Query<GetViewerPatchesQuery, GetViewerPatchesQueryVariables> query={GetViewerPatchesDocument} {...props} />
    );
    
export type GetViewerPatchesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetViewerPatchesQuery, GetViewerPatchesQueryVariables> | TChildProps;
export function withGetViewerPatches<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetViewerPatchesQuery,
  GetViewerPatchesQueryVariables,
  GetViewerPatchesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetViewerPatchesQuery, GetViewerPatchesQueryVariables, GetViewerPatchesProps<TChildProps>>(GetViewerPatchesDocument, {
      alias: 'getViewerPatches',
      ...operationOptions
    });
};

/**
 * __useGetViewerPatchesQuery__
 *
 * To run a query within a React component, call `useGetViewerPatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerPatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerPatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetViewerPatchesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetViewerPatchesQuery, GetViewerPatchesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetViewerPatchesQuery, GetViewerPatchesQueryVariables>(GetViewerPatchesDocument, baseOptions);
      }
export function useGetViewerPatchesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewerPatchesQuery, GetViewerPatchesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetViewerPatchesQuery, GetViewerPatchesQueryVariables>(GetViewerPatchesDocument, baseOptions);
        }
export type GetViewerPatchesQueryHookResult = ReturnType<typeof useGetViewerPatchesQuery>;
export type GetViewerPatchesLazyQueryHookResult = ReturnType<typeof useGetViewerPatchesLazyQuery>;
export type GetViewerPatchesQueryResult = ApolloReactCommon.QueryResult<GetViewerPatchesQuery, GetViewerPatchesQueryVariables>;
export const GetUserReadingsDocument = gql`
    query GetUserReadings($userId: Int!, $startUnix: Int) {
  user(id: $userId) {
    readings(startUnix: $startUnix) {
      id
      uri
    }
  }
}
    `;
export type GetUserReadingsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserReadingsQuery, GetUserReadingsQueryVariables>, 'query'> & ({ variables: GetUserReadingsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetUserReadingsComponent = (props: GetUserReadingsComponentProps) => (
      <ApolloReactComponents.Query<GetUserReadingsQuery, GetUserReadingsQueryVariables> query={GetUserReadingsDocument} {...props} />
    );
    
export type GetUserReadingsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserReadingsQuery, GetUserReadingsQueryVariables> | TChildProps;
export function withGetUserReadings<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserReadingsQuery,
  GetUserReadingsQueryVariables,
  GetUserReadingsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserReadingsQuery, GetUserReadingsQueryVariables, GetUserReadingsProps<TChildProps>>(GetUserReadingsDocument, {
      alias: 'getUserReadings',
      ...operationOptions
    });
};

/**
 * __useGetUserReadingsQuery__
 *
 * To run a query within a React component, call `useGetUserReadingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserReadingsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserReadingsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      startUnix: // value for 'startUnix'
 *   },
 * });
 */
export function useGetUserReadingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserReadingsQuery, GetUserReadingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserReadingsQuery, GetUserReadingsQueryVariables>(GetUserReadingsDocument, baseOptions);
      }
export function useGetUserReadingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserReadingsQuery, GetUserReadingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserReadingsQuery, GetUserReadingsQueryVariables>(GetUserReadingsDocument, baseOptions);
        }
export type GetUserReadingsQueryHookResult = ReturnType<typeof useGetUserReadingsQuery>;
export type GetUserReadingsLazyQueryHookResult = ReturnType<typeof useGetUserReadingsLazyQuery>;
export type GetUserReadingsQueryResult = ApolloReactCommon.QueryResult<GetUserReadingsQuery, GetUserReadingsQueryVariables>;
export const GetViewerDocument = gql`
    query GetViewer {
  viewer {
    username
  }
}
    `;
export type GetViewerComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetViewerQuery, GetViewerQueryVariables>, 'query'>;

    export const GetViewerComponent = (props: GetViewerComponentProps) => (
      <ApolloReactComponents.Query<GetViewerQuery, GetViewerQueryVariables> query={GetViewerDocument} {...props} />
    );
    
export type GetViewerProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetViewerQuery, GetViewerQueryVariables> | TChildProps;
export function withGetViewer<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetViewerQuery,
  GetViewerQueryVariables,
  GetViewerProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetViewerQuery, GetViewerQueryVariables, GetViewerProps<TChildProps>>(GetViewerDocument, {
      alias: 'getViewer',
      ...operationOptions
    });
};

/**
 * __useGetViewerQuery__
 *
 * To run a query within a React component, call `useGetViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetViewerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
        return ApolloReactHooks.useQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, baseOptions);
      }
export function useGetViewerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, baseOptions);
        }
export type GetViewerQueryHookResult = ReturnType<typeof useGetViewerQuery>;
export type GetViewerLazyQueryHookResult = ReturnType<typeof useGetViewerLazyQuery>;
export type GetViewerQueryResult = ApolloReactCommon.QueryResult<GetViewerQuery, GetViewerQueryVariables>;
export const GetPatchSummaryDocument = gql`
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
    `;
export type GetPatchSummaryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>, 'query'> & ({ variables: GetPatchSummaryQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPatchSummaryComponent = (props: GetPatchSummaryComponentProps) => (
      <ApolloReactComponents.Query<GetPatchSummaryQuery, GetPatchSummaryQueryVariables> query={GetPatchSummaryDocument} {...props} />
    );
    
export type GetPatchSummaryProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetPatchSummaryQuery, GetPatchSummaryQueryVariables> | TChildProps;
export function withGetPatchSummary<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPatchSummaryQuery,
  GetPatchSummaryQueryVariables,
  GetPatchSummaryProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetPatchSummaryQuery, GetPatchSummaryQueryVariables, GetPatchSummaryProps<TChildProps>>(GetPatchSummaryDocument, {
      alias: 'getPatchSummary',
      ...operationOptions
    });
};

/**
 * __useGetPatchSummaryQuery__
 *
 * To run a query within a React component, call `useGetPatchSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPatchSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPatchSummaryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPatchSummaryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>(GetPatchSummaryDocument, baseOptions);
      }
export function useGetPatchSummaryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>(GetPatchSummaryDocument, baseOptions);
        }
export type GetPatchSummaryQueryHookResult = ReturnType<typeof useGetPatchSummaryQuery>;
export type GetPatchSummaryLazyQueryHookResult = ReturnType<typeof useGetPatchSummaryLazyQuery>;
export type GetPatchSummaryQueryResult = ApolloReactCommon.QueryResult<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>;
export const GetViewerPatientsDocument = gql`
    query GetViewerPatients {
  viewer {
    patients {
      ...PatientListItemPatient
    }
  }
}
    ${PatientListItemPatientFragmentDoc}`;
export type GetViewerPatientsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetViewerPatientsQuery, GetViewerPatientsQueryVariables>, 'query'>;

    export const GetViewerPatientsComponent = (props: GetViewerPatientsComponentProps) => (
      <ApolloReactComponents.Query<GetViewerPatientsQuery, GetViewerPatientsQueryVariables> query={GetViewerPatientsDocument} {...props} />
    );
    
export type GetViewerPatientsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetViewerPatientsQuery, GetViewerPatientsQueryVariables> | TChildProps;
export function withGetViewerPatients<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetViewerPatientsQuery,
  GetViewerPatientsQueryVariables,
  GetViewerPatientsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetViewerPatientsQuery, GetViewerPatientsQueryVariables, GetViewerPatientsProps<TChildProps>>(GetViewerPatientsDocument, {
      alias: 'getViewerPatients',
      ...operationOptions
    });
};

/**
 * __useGetViewerPatientsQuery__
 *
 * To run a query within a React component, call `useGetViewerPatientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerPatientsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerPatientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetViewerPatientsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetViewerPatientsQuery, GetViewerPatientsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetViewerPatientsQuery, GetViewerPatientsQueryVariables>(GetViewerPatientsDocument, baseOptions);
      }
export function useGetViewerPatientsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewerPatientsQuery, GetViewerPatientsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetViewerPatientsQuery, GetViewerPatientsQueryVariables>(GetViewerPatientsDocument, baseOptions);
        }
export type GetViewerPatientsQueryHookResult = ReturnType<typeof useGetViewerPatientsQuery>;
export type GetViewerPatientsLazyQueryHookResult = ReturnType<typeof useGetViewerPatientsLazyQuery>;
export type GetViewerPatientsQueryResult = ApolloReactCommon.QueryResult<GetViewerPatientsQuery, GetViewerPatientsQueryVariables>;
export const GetPatientDocument = gql`
    query GetPatient($id: Int!) {
  user(id: $id) {
    firstName
    lastName
    username
    ...GetPatches
  }
}
    ${GetPatchesFragmentDoc}`;
export type GetPatientComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPatientQuery, GetPatientQueryVariables>, 'query'> & ({ variables: GetPatientQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPatientComponent = (props: GetPatientComponentProps) => (
      <ApolloReactComponents.Query<GetPatientQuery, GetPatientQueryVariables> query={GetPatientDocument} {...props} />
    );
    
export type GetPatientProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetPatientQuery, GetPatientQueryVariables> | TChildProps;
export function withGetPatient<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPatientQuery,
  GetPatientQueryVariables,
  GetPatientProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetPatientQuery, GetPatientQueryVariables, GetPatientProps<TChildProps>>(GetPatientDocument, {
      alias: 'getPatient',
      ...operationOptions
    });
};

/**
 * __useGetPatientQuery__
 *
 * To run a query within a React component, call `useGetPatientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPatientQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPatientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPatientQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPatientQuery, GetPatientQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPatientQuery, GetPatientQueryVariables>(GetPatientDocument, baseOptions);
      }
export function useGetPatientLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPatientQuery, GetPatientQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPatientQuery, GetPatientQueryVariables>(GetPatientDocument, baseOptions);
        }
export type GetPatientQueryHookResult = ReturnType<typeof useGetPatientQuery>;
export type GetPatientLazyQueryHookResult = ReturnType<typeof useGetPatientLazyQuery>;
export type GetPatientQueryResult = ApolloReactCommon.QueryResult<GetPatientQuery, GetPatientQueryVariables>;