import * as React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
    border: 1em solid aquamarine;
    border-radius: 50%;
    height: 6em;
    width: 6em;
`;

const Loading = () => <Spinner>Loading...</Spinner>;

export default Loading;
