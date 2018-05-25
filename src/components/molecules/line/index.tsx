import * as React from 'react';
import styled from 'styled-components';
import * as R from 'rambda';

interface Status {
    severity: string;
    statusSeverityDescription: string;
}

interface LineProps {
    line: {
        name: string;
        lineStatuses: Status[];
    };
    onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

const statusReactionMap = {
    goodService: '😀',
    minorDelays: '😣',
    severeDelays: '🤬',
};

const lineColorMap = {
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
    background-color: ${p => lineColorMap[p.line]};
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

const normalize = R.compose(camelize, replaceAmpersand, R.toLower);

const respondToStatus = (status: string) => {
    const normalizedStatus = normalize(status);
    return ` ${statusReactionMap[normalizedStatus] || ''}`;
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
