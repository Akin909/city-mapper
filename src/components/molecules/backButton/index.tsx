import * as React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';

const Previous = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10%;
    background-color: whitesmoke;
    position: absolute;
    height: 1.5em;
    width: 1.5em;
    font-size: 1.5em;
    text-align: center;
    top: 2em;
    left: 2em;
`;

interface Props {
    onClick: () => void;
}

const Back = (props: Props) => (
    <Previous onClick={props.onClick}>
        <span>&#8249;</span>
    </Previous>
);

export default Back;
