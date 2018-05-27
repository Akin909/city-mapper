import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
    GET_STOP_DETAILS,
    GetStopDetailsQuery,
} from './../../graphql/queries/tfl';

import { SmallTitle } from './../../components/atoms/title';
import ErrorHandler from './../../components/organisms/errorHandler';
import MainTemplate from './../../components/templates/main';

type Props = RouteComponentProps<{ stopId: string }>;

export default class StopsContainer extends React.PureComponent<Props> {
    render() {
        const { stopId } = this.props.match.params;
        return (
            <MainTemplate {...this.props}>
                <GetStopDetailsQuery
                    query={GET_STOP_DETAILS}
                    variables={{ stopId }}
                >
                    {({ data, error, loading }) => (
                        <ErrorHandler
                            data={data}
                            loading={loading}
                            error={error}
                            loaded={Boolean(data && data.stop)}
                            render={({ stop }) => (
                                <React.Fragment>
                                    <SmallTitle>{stop.commonName}</SmallTitle>
                                    <ul>
                                        {stop.lines.map(
                                            (each: { name: string }) => (
                                                <li>{each.name}</li>
                                            ),
                                        )}
                                    </ul>
                                </React.Fragment>
                            )}
                        />
                    )}
                </GetStopDetailsQuery>
            </MainTemplate>
        );
    }
}
