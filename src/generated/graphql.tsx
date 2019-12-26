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
  id: Scalars['Int'],
  username: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};


export type UserPatchArgs = {
  id: Scalars['Int']
};

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

export type GetViewerQueryVariables = {};


export type GetViewerQuery = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);


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