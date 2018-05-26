import * as React from 'react';
import styled from 'styled-components';

import {
    GetLineStatusesQuery,
    GetLineDetailsQuery,
} from './../../graphql/queries/tfl';
import * as tfl from './../../graphql/queries/tfl';
import Container from './../../components/atoms/flexContainer';
import ErrorHandler from './../../components/organisms/errorHandler';
import TubeLines from './../../components/organisms/tubeLines';
import Stop from './../../components/organisms/stops';

const Title = styled.h1`
    display: flex;
`;

interface State {
    selected: string;
}

class Home extends React.Component<{}, State> {
    state: State = {
        selected: null,
    };

    handleClick = (name: string) => () => {
        this.setState({ selected: name });
    };

    render() {
        const { selected } = this.state;
        return (
            <Container>
                <Title>Mini Mapper</Title>
                {!selected ? (
                    <GetLineStatusesQuery query={tfl.GET_LINE_STATUSES}>
                        {({ data, error, loading }) => (
                            <ErrorHandler
                                loaded={!!(data && data.lines)}
                                loading={loading}
                                error={error}
                                data={data}
                                render={({ lines }) => (
                                    <TubeLines
                                        lines={lines}
                                        onClick={this.handleClick}
                                    />
                                )}
                            />
                        )}
                    </GetLineStatusesQuery>
                ) : (
                    <GetLineDetailsQuery
                        query={tfl.GET_LINE_DETAILS}
                        variables={{ line: selected }}
                    >
                        {({ data, error, loading }) => (
                            <ErrorHandler
                                data={data}
                                loading={loading}
                                error={error}
                                loaded={!!(data && data.line)}
                                render={({ line }) => <Stop stop={data.line} />}
                            />
                        )}
                    </GetLineDetailsQuery>
                )}
            </Container>
        );
    }
}

export default Home;
