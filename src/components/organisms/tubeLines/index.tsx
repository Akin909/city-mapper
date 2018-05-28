import * as React from 'react';

import Grid from './../../atoms/grid';
import Line from './../../molecules/line';
import { Lines } from './../../../graphql/queries/tfl';

interface TubelinesProps {
    lines: Lines[];
    onClick: (name: string) => () => void;
}

const TubeLinesContainer = Grid.extend`
    grid-gap: 0.2em;
    padding: 1em;
`;

const TubeLines = ({ lines, onClick }: TubelinesProps) => (
    <TubeLinesContainer>
        {lines.map((line, i) => (
            <Line
                line={line}
                key={line.name + i}
                onClick={onClick(line.name)}
            />
        ))}
    </TubeLinesContainer>
);

export default TubeLines;
