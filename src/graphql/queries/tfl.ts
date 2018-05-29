import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_LINE_STATUSES = gql`
    query lineStatuses {
        lines @rest(method: "GET", type: "Line", path: "/line/mode/tube/status") {
            id
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
        line(line: $line) @rest(type: "LineDetails", path: "/line/:line/route/sequence/outbound") {
            id
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

interface Transfer {
    name: string;
}

interface GetLineDetailsData {
    line: Line;
}

interface GetLineDetailVariables {
    line: string;
}

export class GetLineDetailsQuery extends Query<GetLineDetailsData, GetLineDetailVariables> {}

export interface StopDetails {
    icsCode: string;
    stopType: string;
    stationNaptan: string;
    lines: Transfer[];
    id: string;
    commonName: string;
}

interface GetStopDetailsData {
    stop: StopDetails;
}

interface GetStopDetailsVariables {
    stopId: string;
}

export class GetStopDetailsQuery extends Query<GetStopDetailsData, GetStopDetailsVariables> {}

export const GET_STOP_DETAILS = gql`
    query getStopDetail($stopId: string) {
        stop(stopId: $stopId) @rest(type: "Stop", path: "/StopPoint/:stopId") {
            id
            icsCode
            stopType
            stationNaptan
            commonName
            lines {
                name
            }
        }
    }
`;

interface GetArrivalsVariables {
    stopId: string;
}

export interface GetArrivalsData {
    arrivals: Arrival[];
}

export class GetArrivalsQuery extends Query<GetArrivalsData, GetArrivalsVariables> {}

export interface Arrival {
    id: string;
    operationType: number;
    vehicleId: string;
    naptanId: string;
    stationName: string;
    lineId: string;
    lineName: string;
    platformName: string;
    direction: string;
    bearing: string;
    destinationNaptanId: string;
    destinationName: string;
    timestamp: string;
    timeToStation: number;
    currentLocation: string;
    towards: string;
    expectedArrival: string;
    timeToLive: string;
    modeName: string;
}

export const GET_STOP_ARRIVALS = gql`
    query getStopArrivals($stopId: string) {
        arrivals(stopId: $stopId) @rest(type: "Arrivals", path: "/StopPoint/:stopId/arrivals") {
            id
            operationType
            vehicleId
            naptanId
            stationName
            lineId
            lineName
            platformName
            direction
            bearing
            destinationNaptanId
            destinationName
            timestamp
            timeToStation
            currentLocation
            towards
            expectedArrival
            timeToLive
            modeName
        }
    }
`;
