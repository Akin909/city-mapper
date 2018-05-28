import * as React from 'react';
import styled from 'styled-components';

interface StyleProps {
    width?: string;
    height?: string;
}

const Circle = styled.div`
    height: 90%;
    width: 85%;
    border-radius: 50%;
    border: 0.5em solid red;
`;

const Bar = styled.div`
    height: 0.8em;
    width: 100%;
    position: absolute;
    z-index: 2;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: blue;
`;

const Container = styled<StyleProps, 'div'>('div')`
  width: ${p => p.width || '3em'}
  height: ${p => p.height || '3em'}
  margin: 0.5em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TflLogo = (props: { showText?: boolean }) => {
    return (
        <Container>
            <Circle />
            <Bar>{props.showText && 'UNDERGROUND'}</Bar>
        </Container>
    );
};

export default TflLogo;
