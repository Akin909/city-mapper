import * as React from 'react';
import { ApolloError } from 'apollo-client';

import Loading, { LoadingMessage } from './../../atoms/loading';

interface ErrorHandlerProps<T> {
    data: T;
    error: ApolloError | undefined;
    loading: boolean;
    loaded: boolean;
    render: (data: T) => React.ReactElement<T>;
    loadingMessage?: string;
}

const ErrorHandler = (props: ErrorHandlerProps<any>) => {
    const { loading, loadingMessage, data, loaded } = props;
    if (loading) {
        return loadingMessage ? (
            <LoadingMessage>{props.loadingMessage}</LoadingMessage>
        ) : (
            <Loading />
        );
    }
    if (data && loaded) {
        return props.render(data);
    }
    return <div>No data</div>;
};

export default ErrorHandler;
