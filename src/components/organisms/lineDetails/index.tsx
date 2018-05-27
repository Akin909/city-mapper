import * as React from 'react';
import styled from 'styled-components';

import { capitalize } from './../../../utils';
import { Station, Line } from './../../../graphql/queries/tfl';

const LineDetailsContainer = styled.div`
    width: 60%;
    height: 60%;
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const Station = styled.div`
    background-color: palevioletred;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    margin: 1em 0.5em;
`;

const StationDetails = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface LineDetailsProps {
    stop: Line;
    onClick: (stopId: string) => void;
}

const LineDetails = (props: LineDetailsProps) => {
    return (
        <LineDetailsContainer>
            <span>
                <strong>{capitalize(props.stop.lineName)}</strong>:{' '}
                <i>{capitalize(props.stop.direction)}</i>
            </span>
            {props.stop.stations.map((station, idx) => (
                <Station
                    key={`${station.name}-${idx}`}
                    onClick={() => props.onClick(station.id)}
                >
                    <StationDetails>
                        <span>{station.name}</span>
                        <span>{station.status}</span>
                    </StationDetails>
                </Station>
            ))}
        </LineDetailsContainer>
    );
};

export default LineDetails;
