import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Container from './../../components/atoms/flexContainer';
import Arrivals from './../../components/organisms/arrivals';
import Transfers from './../../components/organisms/transfers';

type Props = RouteComponentProps<{ stopId: string }>;

const ScrollContainer = Container.extend`
    overflow-y: auto;
    padding: 2em;
`;

export default class StopsContainer extends React.PureComponent<Props> {
    render() {
        const { stopId } = this.props.match.params;
        return (
            <ScrollContainer>
                <Transfers
                    stopId={stopId}
                    loadingMessage="Loading Transfers..."
                />
                <Arrivals
                    stopId={stopId}
                    loadingMessage="Loading Arrivals..."
                />
            </ScrollContainer>
        );
    }
}
