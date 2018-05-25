import gql from 'graphql-tag';

export const GET_LINE_STATUSES = gql`
    query lineStatuses {
        lines @rest(type: "Line", path: "/line/mode/tube/status") {
            name
            modeName
            lineStatuses
        }
    }
`;

// Practice Queries and mutations
export const UPDATE_NETWORK_STATUS = gql`
    mutation updateNetworkStatus($isConnected: Boolean) {
        updateNetworkStatus(isConnected: $isConnected) @client
    }
`;

export const GET_NETWORK_STATUS = gql`
    query {
        networkStatus @client {
            isConnected
        }
    }
`;
