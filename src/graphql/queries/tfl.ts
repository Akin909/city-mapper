import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

export interface LineStatus {
    severity: string;
    statusSeverityDescription: string;
}

export interface Lines {
    name: string;
    modeName: string;
    lineStatuses: LineStatus[];
}

interface GetLinesData {
    lines: Lines[];
}

export class GetLineStatusesQuery extends Query<GetLinesData> {}

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

export interface Station {
    status: string;
    name: string;
}

export interface Line {
    lineId: string;
    lineName: string;
    direction: 'outbound' | 'inbound';
    isOutboundOnly: boolean;
    stations: Station[];
}

interface GetLineDetailsData {
    line: Line;
}

interface GetLineDetailVariables {
    line: string;
}

export class GetLineDetailsQuery extends Query<
    GetLineDetailsData,
    GetLineDetailVariables
> {}

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
