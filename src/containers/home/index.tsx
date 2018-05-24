import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const UPDATE_NETWORK_STATUS = gql`
    mutation updateNetworkStatus($isConnected: Boolean) {
        updateNetworkStatus(isConnected: $isConnected) @client
    }
`;

interface Props {}

const GET_NETWORK_STATUS = gql`
    query {
        networkStatus @client {
            isConnected
        }
    }
`;

class Home extends React.Component<Props> {
    render() {
        return (
            <Query query={GET_NETWORK_STATUS}>
                {({ data: { networkStatus }, error, loading }) => (
                    <div>{JSON.stringify(networkStatus.isConnected)}</div>
                )}
            </Query>
        );
    }
}

export default Home;
