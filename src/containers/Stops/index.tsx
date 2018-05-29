import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Container from './../../components/atoms/flexContainer';
import Arrivals from './../../components/organisms/arrivals';
import Transfers from './../../components/organisms/transfers';

type Props = RouteComponentProps<{ stopId: string }>;

export default class StopsContainer extends React.PureComponent<Props> {
    render() {
        const { stopId } = this.props.match.params;
        return (
            <Container>
                <Transfers stopId={stopId} loadingMessage="Loading Transfers..." />
                <Arrivals limit={3} stopId={stopId} loadingMessage="Loading Arrivals..." />
            </Container>
        );
    }
}
