import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
    GET_LINE_STATUSES,
    GetLineStatusesQuery,
} from './../../graphql/queries/tfl';

import MainTemplate from './../../components/templates/main';
import TubeLines from './../../components/organisms/tubeLines';
import ErrorHandler from './../../components/organisms/errorHandler';

type Props = RouteComponentProps<{}>;

export default class TubeLinesContainer extends React.PureComponent<Props> {
    handleClick = (line: string) => () => {
        this.props.history.push(`/lines/${line}`);
    };

    render() {
        return (
            <MainTemplate {...this.props}>
                <GetLineStatusesQuery
                    query={GET_LINE_STATUSES}
                    pollInterval={10_000}
                    displayName="GetLineStatuses"
                >
                    {({ data, error, loading }) => (
                        <ErrorHandler
                            loaded={Boolean(data && data.lines)}
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
            </MainTemplate>
        );
    }
}
