import * as React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import Home from './home';

const defaults = {
    trainLines: [],
    networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: true,
    },
};

const resolvers = {
    Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
            const data = {
                networkStatus: {
                    __typename: 'NetworkStatus',
                    isConnected,
                },
            };
            cache.writeData({ data });
            return null;
        },
    },
};
const cache = new InMemoryCache();

const stateLink = withClientState({
    cache,
    resolvers,
    defaults,
});

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink, new HttpLink()]),
});

export default function() {
    return (
        <ApolloProvider client={client}>
            <Home />
        </ApolloProvider>
    );
}
