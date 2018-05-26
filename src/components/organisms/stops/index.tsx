import * as React from 'react';
import styled from 'styled-components';

import { Station, Line } from './../../../graphql/queries/tfl'

const StopContainer = styled.div`
    width: 60%;
    height: 60%;
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const Station = styled.div`
    background-color: aquamarine;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    margin: 1em 0.5em;
`;

const StationDetails = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Stop = (props: { stop: Line }) => {
    return (
        <StopContainer>
            <span>
                <strong>{props.stop.lineName}</strong>:{' '}
                <i>{props.stop.direction}</i>
            </span>
            {props.stop.stations.map((station, idx) => (
                <Station key={`${station.name}-${idx}`}>
                    <StationDetails>
                        <span>{station.name}</span>
                        <span>{station.status}</span>
                    </StationDetails>
                </Station>
            ))}
        </StopContainer>
    );
};

export default Stop;
