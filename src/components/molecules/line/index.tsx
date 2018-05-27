import * as React from 'react';
import styled from 'styled-components';
import { compose, toLower } from 'rambda';

import { Lines } from './../../../graphql/queries/tfl';

interface LineProps {
    line: Lines;
    onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

interface StringMap {
    [line: string]: string;
}

const statusReactions: StringMap = {
    goodService: '😀',
    minorDelays: '😣',
    severeDelays: '🤬',
    partClosure: '😱',
    serviceClosed: '😴',
};

const lineColors: StringMap = {
    bakerloo: '#996633',
    piccadilly: '#000099',
    circle: '#FFCC00',
    central: '#CC3333',
    jubilee: '#868F98',
    metropolitan: '#660066',
    district: '#006633',
    northern: '#000000',
    victoria: '#0099CC',
    hammersmithAndCity: '#CC9999',
    waterlooAndCity: '#66CCCC',
};

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
`;

const Detail = styled.span`
    text-align: center;
`;

const LineName = styled.h3`
    text-align: center;
    margin: 0.2em;
`;

const replaceAmpersand = (word: string) => word.replace(/[&]/g, 'and');
const camelize = (word: string) => {
    const [beginning, ...rest] = word.split(' ');
    const upperCaseWords = rest.map(
        each => each[0].toUpperCase() + each.slice(1, each.length),
    );
    return [beginning, ...upperCaseWords].join('');
};

const normalize = compose(camelize, replaceAmpersand, toLower);

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
