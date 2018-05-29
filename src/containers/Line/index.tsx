import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
    GET_LINE_DETAILS,
    GetLineDetailsQuery,
} from './../../graphql/queries/tfl';

import ErrorHandler from './../../components/organisms/errorHandler';
import LineDetails from './../../components/organisms/lineDetails';
import { kebabCase } from '../../utils';

type Props = RouteComponentProps<{ line: string }>;

export default class LineContainer extends React.PureComponent<Props> {
    handleClick = (stop: string) => {
        this.props.history.push(`/stops/${stop}`);
    };

    render() {
        const line = kebabCase(this.props.match.params.line);
        return (
            <GetLineDetailsQuery query={GET_LINE_DETAILS} variables={{ line }}>
                {({ data, error, loading }) => (
                    <ErrorHandler
                        data={data}
                        error={error}
                        loading={loading}
                        loaded={Boolean(data && data.line)}
                        render={({ line }) => (
                            <LineDetails
                                stop={line}
                                onClick={this.handleClick}
                            />
                        )}
                    />
                )}
            </GetLineDetailsQuery>
        );
    }
}
