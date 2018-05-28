import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
    border: 1em solid #f3f3f3;
    border-top: 1em solid #356327;
    border-radius: 50%;
    height: 6em;
    width: 6em;
    animation: ${spin} 2s linear infinite;
`;

const Loading = () => <Spinner />;

export default Loading;
