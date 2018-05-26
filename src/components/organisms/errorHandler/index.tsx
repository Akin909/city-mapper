import * as React from 'react';

import Loading from './../../atoms/loading';

interface ErrorHandlerProps<T> {
    data: T;
    error: object;
    loading: boolean;
    loaded: boolean;
    render: (data: T) => React.ReactElement<T>;
}

const ErrorHandler = (props: ErrorHandlerProps<any>) => {
    const { loading, data, loaded } = props;
    if (loading) {
        return <Loading />;
    }
    if (data && loaded) {
        return props.render(data);
    }
    return <div>No data</div>;
};

export default ErrorHandler;
