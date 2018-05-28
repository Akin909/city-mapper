import * as React from 'react';
import styled, { css } from 'styled-components';
import { format, compareAsc } from 'date-fns';
import { sort, slice, length } from 'ramda';

import {
    Arrival,
    GetArrivalsData,
    GET_STOP_ARRIVALS,
    GetArrivalsQuery,
} from './../../../graphql/queries/tfl';

import Grid from './../../../components/atoms/grid';
import ErrorHandler from './../../../components/organisms/errorHandler';
import { SmallTitle } from './../../../components/atoms/title';

interface ArrivalProps {
    stopId: string;
    limit?: number;
}

interface ArrivalItemProps {
    arrival: Arrival;
}

const padding = css`
    padding: 0.4em;
`;

const ArrivalsBoard = Grid.withComponent('ul').extend`
  padding: 1em;
  grid-column-gap: 0.5em;
  grid-row-gap: 0.5em;
  overflow-y: scroll;
`;

const ArrivalDetail = styled.span`
    display: block;
    text-align: left;
    margin-bottom: 0.2em;
    ${padding};
`;

const ArrivalContainer = styled.li`
    color: black;
    list-style-type: none;
    background-color: whitesmoke;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    overflow: auto;
`;

const ArrivalName = styled.span`
    background-color: #6200ee;
    color: white;
    display: block;
    width: 100%;
    ${padding};
`;

const sortByDate = (arrivals: Arrival[]) =>
    sort(
        (prev, next) => compareAsc(prev.expectedArrival, next.expectedArrival),
        arrivals,
    );

const NextThreeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media (max-width: 700px) {
        flex-direction: column;
    }

    > li {
        margin: 0.5em;
    }
`;

const ArrivalItem = ({ arrival }: ArrivalItemProps) => (
    <ArrivalContainer key={arrival.id}>
        {arrival.destinationName && (
            <ArrivalName>
                <strong>{arrival.destinationName}</strong>
            </ArrivalName>
        )}
        <ArrivalDetail>
            Arriving in
            <strong>
                <em>{format(arrival.expectedArrival, ' hh:mm')}</em>
            </strong>
        </ArrivalDetail>
        <ArrivalDetail>{arrival.currentLocation}</ArrivalDetail>
        <ArrivalDetail>Heading towards {arrival.towards}</ArrivalDetail>
    </ArrivalContainer>
);

const NextArrivals = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const LaterArrivals = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
`;

const AllArrivals = styled.div`
    height: 80%;
`;

const Arrivals = ({ stopId, limit = 3 }: ArrivalProps) => (
    <GetArrivalsQuery query={GET_STOP_ARRIVALS} variables={{ stopId }}>
        {({ data, error, loading }) => (
            <ErrorHandler
                data={data}
                loading={loading}
                error={error}
                loaded={Boolean(data && data.arrivals)}
                render={({ arrivals }: GetArrivalsData) => {
                    const sorted = sortByDate(arrivals);
                    const nextThree = slice(0, limit, sorted);
                    const remaining = slice(limit, length(sorted), sorted);
                    return arrivals.length ? (
                        <AllArrivals>
                            {Boolean(nextThree.length) && (
                                <NextArrivals>
                                    <SmallTitle>Next Depatures</SmallTitle>
                                    <NextThreeContainer>
                                        {nextThree.map(arrival => (
                                            <ArrivalItem arrival={arrival} />
                                        ))}
                                    </NextThreeContainer>
                                </NextArrivals>
                            )}
                            {Boolean(remaining.length) && (
                                <LaterArrivals>
                                    <SmallTitle>Upcoming Depatures</SmallTitle>
                                    <ArrivalsBoard>
                                        {remaining.map(arrival => (
                                            <ArrivalItem arrival={arrival} />
                                        ))}
                                    </ArrivalsBoard>
                                </LaterArrivals>
                            )}
                        </AllArrivals>
                    ) : (
                        <p>No Upcoming Arrivals</p>
                    );
                }}
            />
        )}
    </GetArrivalsQuery>
);

export default Arrivals;
