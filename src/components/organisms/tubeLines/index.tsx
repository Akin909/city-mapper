import * as React from 'react';

import Grid from './../../atoms/grid';
import Line from './../../molecules/line';

interface LineStatuses {
    severity: string;
    statusSeverityDescription: string;
}

interface TubelinesProps {
    lines: Array<{
        name: string;
        lineStatuses: LineStatuses[];
    }>;
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
