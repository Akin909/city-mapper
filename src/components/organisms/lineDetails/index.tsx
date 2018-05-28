import * as React from 'react';
import styled from 'styled-components';

import { capitalize } from './../../../utils';
import { lineColors } from './../../../utils/styles';
import TflLogo from './../../atoms/tflLogo';
import { Station, Line } from './../../../graphql/queries/tfl';

const LineDetailsContainer = styled.div`
    height: 80%;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const Station = styled.div`
    background-color: #356327;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    margin: 1em 0.5em;
`;

const StationDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0.4em;
`;

const StationName = styled.span`
    color: white;
    font-size: 1.2em;
    overflow: hidden;
    text-align: center;
`;

const LineName = styled<{ line: string }, 'span'>('span')`
    color: ${p => lineColors[p.line]};
`;

interface LineDetailsProps {
    stop: Line;
    onClick: (stopId: string) => void;
}

const LineDetails = (props: LineDetailsProps) => {
    return (
        <LineDetailsContainer>
            <span>
                <LineName line={props.stop.lineName}>
                    <strong>{capitalize(props.stop.lineName)}</strong>
                </LineName>: <i>{capitalize(props.stop.direction)}</i>
            </span>
            {props.stop.stations.map((station, idx) => (
                <Station
                    key={`${station.name}-${idx}`}
                    onClick={() => props.onClick(station.id)}
                >
                    <StationDetails>
                        <TflLogo />
                        <StationName>{station.name}</StationName>
                        {station.status && <span>{station.status}</span>}
                    </StationDetails>
                </Station>
            ))}
        </LineDetailsContainer>
    );
};

export default LineDetails;
