import gql from 'graphql-tag';

export const GET_LINE_STATUSES = gql`
    query lineStatuses {
        lines
            @rest(method: "GET", type: "Line", path: "/line/mode/tube/status") {
            name
            modeName
            lineStatuses
        }
    }
`;

export const GET_LINE_DETAILS = gql`
    query lineDetails($line: String) {
        line(line: $line)
            @rest(
                type: "LineDetails"
                path: "/line/:line/route/sequence/outbound"
            ) {
            lineId
            lineName
            direction
            isOutboundOnly
            stations {
                status
                name
            }
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
