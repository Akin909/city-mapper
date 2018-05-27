import styled from 'styled-components';

const Title = styled.h1`
    display: flex;
`;

export const SmallTitle = Title.withComponent('h3');

export default Title;
