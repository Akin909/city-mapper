export default {
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
    Query: {
        lineStatuses: (_, { lines }, { cache }) => {
            const data = {
                lineStatuses: {
                    __typename: 'Line',
                    lines,
                },
            };
            cache.writeData({ data });
            return lines;
        },
    },
};
