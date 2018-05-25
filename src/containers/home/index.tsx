import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 5%;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 1em;
`;

const Title = styled.h1`
    display: flex;
`;

import { GET_LINE_STATUSES } from './../../graphql/queries/tfl';

interface Props {}

interface Status {
    severity: string;
    statusSeverityDescription: string;
}

interface LineProps {
    line: {
        name: string;
        lineStatuses: Status[];
    };
}

const Line = ({ line }: LineProps) => (
    <div>
        <h3>{line.name}</h3>
        {line.lineStatuses &&
            line.lineStatuses.map(status => (
                <React.Fragment>
                    <span>{status.severity}</span>
                    <span>{status.statusSeverityDescription}</span>
                </React.Fragment>
            ))}
    </div>
);

class Home extends React.Component<Props> {
    async componentDidMount() {}
    render() {
        return (
            <Container>
                <Title>Mini Mapper</Title>
                <Query query={GET_LINE_STATUSES}>
                    {({ data, error, loading }) =>
                        loading ? (
                            <div>Loading...</div>
                        ) : data && data.lines ? (
                            <Grid>
                                {data.lines.map((line, index) => (
                                    <Line line={line} key={line + index} />
                                ))}
                            </Grid>
                        ) : (
                            <div>No data</div>
                        )
                    }
                </Query>
            </Container>
        );
    }
}

export default Home;
