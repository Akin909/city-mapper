import * as React from 'react';
import styled, { css } from 'styled-components';
import { format, compareAsc } from 'date-fns';
import { sort, isEmpty, groupBy, slice, compose, not } from 'ramda';

import {
    Arrival,
    GetArrivalsData,
    GET_STOP_ARRIVALS,
    GetArrivalsQuery,
} from './../../../graphql/queries/tfl';

import TrainStation from './../../../components/atoms/trainStation';
import Grid from './../../../components/atoms/grid';
import ErrorHandler from './../../../components/organisms/errorHandler';
import { SmallTitle } from './../../../components/atoms/title';

interface ArrivalProps {
    stopId: string;
    limit?: number;
    loadingMessage?: string;
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
    background-color: #427c31;
    color: white;
    display: block;
    width: 100%;
    ${padding};
`;

const sortByDate = (arrivals: Arrival[]) =>
    sort((prev, next) => compareAsc(prev.expectedArrival, next.expectedArrival), arrivals);

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

const AllArrivals = styled.div`
    height: 80%;
`;

const PlatformName = SmallTitle.extend`
    text-decoration: underline;
`;
const Platform = styled.div``;

const notEmpty = compose(not, isEmpty);
const groupByPlatform = groupBy((arrival: Arrival) => arrival.platformName);
const listByTimeAndPlatform = compose(groupByPlatform, sortByDate);

const Arrivals = ({ stopId, loadingMessage, limit = 3 }: ArrivalProps) => (
    <GetArrivalsQuery query={GET_STOP_ARRIVALS} variables={{ stopId }}>
        {({ data, error, loading }) => (
            <ErrorHandler
                data={data}
                error={error}
                loading={loading}
                loadingMessage={loadingMessage}
                loaded={Boolean(data && data.arrivals)}
                render={({ arrivals }: GetArrivalsData) => {
                    const sorted = listByTimeAndPlatform(arrivals);
                    const platforms = Object.keys(sorted);
                    const limitToThree = slice(0, limit);
                    return notEmpty(arrivals) ? (
                        <AllArrivals>
                            <NextArrivals>
                                <SmallTitle>Next Depatures</SmallTitle>
                                <NextThreeContainer>
                                    {platforms.map((platform, index) => (
                                        <Platform key={`${platform}-${index}`}>
                                            <PlatformName>
                                                <TrainStation
                                                    height={30}
                                                    width={30}
                                                    color="#FFFFFF"
                                                />
                                                <div>{platform}</div>
                                            </PlatformName>
                                            <ArrivalsBoard>
                                                {notEmpty(sorted[platform]) &&
                                                    limitToThree(sorted[platform]).map(
                                                        (arrival, i) => (
                                                            <ArrivalItem
                                                                key={`${arrival.id}-${i}`}
                                                                arrival={arrival}
                                                            />
                                                        ),
                                                    )}
                                            </ArrivalsBoard>
                                        </Platform>
                                    ))}
                                </NextThreeContainer>
                            </NextArrivals>
                        </AllArrivals>
                    ) : (
                        <p>No departure information available</p>
                    );
                }}
            />
        )}
    </GetArrivalsQuery>
);

export default Arrivals;
