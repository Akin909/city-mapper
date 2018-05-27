import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import TubeLines from './../../containers/TubeLines';
import Line from './../../containers/Line';
import Stops from './../../containers/Stops';
import Container from './../../components/atoms/flexContainer';
import Title from './../../components/atoms/title';
import Back from './../../components/molecules/backButton';

const Home = () => (
    <BrowserRouter>
        <Container>
            <Back />
            <Title>Mini Mapper</Title>
            <Route exact path="/" component={TubeLines} />
            <Route path="/lines/:line" component={Line} />
            <Route path="/stops/:stopId" component={Stops} />
        </Container>
    </BrowserRouter>
);

export default Home;
