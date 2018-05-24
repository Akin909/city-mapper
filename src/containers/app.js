import React from 'react';
import { ApolloClient } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import Home from './home';

const cache = new InMemoryCache();

const stateLink = withClientState({
    cache,
    resolvers: {
        Mutation: {
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
                const data = {
                    networkStatus: {
                        __typename: 'NetworkStatus',
                        isConnected,
                    },
                };
                cach.writeData({ data });
                return null;
            },
        },
    },
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
