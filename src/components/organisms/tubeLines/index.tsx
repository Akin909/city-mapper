import * as React from 'react';

import Grid from './../../atoms/grid';
import Line from './../../molecules/line';
import { Lines } from './../../../graphql/queries/tfl';

interface TubelinesProps {
    lines: Lines[];
    onClick: (name: string) => () => void;
}
const TubeLines = ({ lines, onClick }: TubelinesProps) => (
    <Grid>
        {lines.map((line, i) => (
            <Line
                line={line}
                key={line.name + i}
                onClick={onClick(line.name)}
            />
        ))}
    </Grid>
);

export default TubeLines;
