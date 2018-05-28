import * as React from 'react';
import styled from 'styled-components';

import { normalize } from './../../../utils';
import { lineColors, statusReactions } from './../../../utils/styles';
import { Lines } from './../../../graphql/queries/tfl';

interface LineProps {
    line: Lines;
    onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

interface ContainerProps {
    line: string;
    onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}
const LineContainer = styled<ContainerProps, 'div'>('div')`
    background-color: ${p => lineColors[p.line]};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1em;
    color: white;
    border-radius: 5px;
    box-shadow: -0.5px 1px 1px #356327;
`;

const Detail = styled.span`
    text-align: center;
`;

const LineName = styled.h3`
    text-align: center;
    margin: 0.2em;
`;

const respondToStatus = (status: string) => {
    const normalizedStatus = normalize(status);
    return ` ${statusReactions[normalizedStatus] || ''}`;
};

const Line = ({ line, onClick }: LineProps) => (
    <LineContainer line={normalize(line.name)} onClick={onClick}>
        <LineName>{line.name}</LineName>
        {line.lineStatuses &&
            line.lineStatuses.map((status, index) => (
                <React.Fragment key={`${status}-${index}`}>
                    <Detail>{status.severity}</Detail>
                    <Detail>
                        {status.statusSeverityDescription}
                        {respondToStatus(status.statusSeverityDescription)}
                    </Detail>
                </React.Fragment>
            ))}
    </LineContainer>
);

export default Line;
