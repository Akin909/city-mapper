import styled from 'styled-components';

const Title = styled.h1`
    display: block;
    text-align: center;
`;

export const SmallTitle = Title.withComponent('h3');

export default Title;
