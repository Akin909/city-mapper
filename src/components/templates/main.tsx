import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Container from './../../components/atoms/flexContainer';
import Title from './../../components/atoms/title';
import Back from './../../components/molecules/backButton';

interface PassedInProps {
    children: React.ReactNode;
}

type Props = RouteComponentProps<{}> & PassedInProps;

const MainTemplate = (props: Props) => {
    return (
        <Container>
            <Back onClick={() => props.history.goBack()} />
            <Title>Mini Mapper</Title>
            {props.children}
        </Container>
    );
};

export default MainTemplate;
