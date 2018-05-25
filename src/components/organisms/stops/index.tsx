import * as React from 'react';
import styled from 'styled-components';

interface StopDetails {
    direction: 'outbound' | 'inbound';
    lineName: string;
    stations: any[];
}

const StopContainer = styled.div`
    width: 60%;
    height: 60%;
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const Stop = (props: { stop: StopDetails }) => {
    return (
        <StopContainer>
            <span>
                <strong>{props.stop.lineName}</strong>: {props.stop.direction}
            </span>
            {props.stop.stations.map(station => (
                <div>
                    <p>
                        <span>{station.name}</span>
                        <span>{station.status}</span>
                    </p>
                </div>
            ))}
        </StopContainer>
    );
};

export default Stop;
