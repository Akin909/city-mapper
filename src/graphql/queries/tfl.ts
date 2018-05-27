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
                id
                status
                name
            }
        }
    }
`;

export interface Station {
    id: string;
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

interface StopDetails {
    icsCode: string;
    stopType: string;
    stationNaptan: string;
    lines: Line[];
    id: string;
    commonName: string;
}

interface GetStopDetailsData {
    stop: StopDetails;
}

interface GetStopDetailsVariables {
    stopId: string;
}

export class GetStopDetailsQuery extends Query<
    GetStopDetailsData,
    GetStopDetailsVariables
> {}

export const GET_STOP_DETAILS = gql`
    query getStopDetail($stopId: string) {
        stop(stopId: $stopId) @rest(type: "Stop", path: "/StopPoint/:stopId") {
            icsCode
            stopType
            stationNaptan
            id
            commonName
            lines {
                name
            }
        }
    }
`;
