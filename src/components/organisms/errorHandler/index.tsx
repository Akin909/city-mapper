import * as React from 'react';

import Loading from './../../atoms/loading';

interface ErrorHandlerProps {
    data: any;
    error: any;
    loading: boolean;
    loaded: boolean;
    render: (data: any) => React.ReactElement<any>;
}

const ErrorHandler = (props: ErrorHandlerProps) => {
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
