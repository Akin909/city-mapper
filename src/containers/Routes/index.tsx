import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import TubeLines from './../../containers/TubeLines';
import Line from './../../containers/Line';
import Stops from './../../containers/Stops';

const Home = () => (
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={TubeLines} />
            <Route path="/lines/:line" component={Line} />
            <Route path="/stops/:stopId" component={Stops} />
        </React.Fragment>
    </BrowserRouter>
);

export default Home;
