import * as React from 'react';
import styled, { css } from 'styled-components';
import { format, compareAsc } from 'date-fns';
import { sort, isEmpty, groupBy, slice, compose, not, keys } from 'ramda';

import {
    Arrival,
    GetArrivalsData,
    GET_STOP_ARRIVALS,
    GetArrivalsQuery,
} from './../../../graphql/queries/tfl';

import TrainStation from './../../../components/atoms/trainStation';
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

const ArrivalDetail = styled.span`
    display: block;
    text-align: left;
    margin-bottom: 0.2em;
    ${padding};
`;

const ArrivalListItem = styled.li`
    color: black;
    list-style-type: none;
    background-color: whitesmoke;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    margin: 0.5em;
    width: 15em;
    height: 16em;
    overflow: auto;
`;

const ArrivalName = styled.span`
    background-color: #427c31;
    color: white;
    display: block;
    width: 100%;
    min-height: 3em;
    ${padding};
`;

const sortByDate = (arrivals: Arrival[]) =>
    sort((prev, next) => compareAsc(prev.expectedArrival, next.expectedArrival), arrivals);

const ArrivalsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const AllArrivals = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
`;

const PlatformName = SmallTitle.extend`
    text-decoration: underline;
`;

const ArrivalsList = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
        > li {
            width: 100%;
        }
    }
`;

const ArrivalItem = ({ arrival }: ArrivalItemProps) => (
    <ArrivalListItem key={arrival.id}>
        <ArrivalName>
            <strong>{arrival.destinationName || 'Check front of the train'}</strong>
        </ArrivalName>
        <ArrivalDetail>
            Arriving in
            <strong>
                <em>{format(arrival.expectedArrival, ' hh:mm')}</em>
            </strong>
        </ArrivalDetail>
        <ArrivalDetail>Currently: {arrival.currentLocation}</ArrivalDetail>
        <ArrivalDetail>Heading towards {arrival.towards}</ArrivalDetail>
    </ArrivalListItem>
);

const notEmpty = compose(not, isEmpty);
const groupByPlatform = groupBy((arrival: Arrival) => arrival.platformName);

// CREDIT: https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
const orderAlphanumericObject = compose(sort(collator.compare), keys);
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
                    const platforms = orderAlphanumericObject(sorted);
                    const limitToThree = slice(0, limit);
                    return notEmpty(arrivals) ? (
                        <ArrivalsContainer>
                            <SmallTitle>Next Depatures</SmallTitle>
                            {platforms.map((platform, index) => (
                                <AllArrivals key={`${platform}-${index}`}>
                                    <PlatformName>
                                        <TrainStation height={30} width={30} color="#FFFFFF" />
                                        <div>{platform}</div>
                                    </PlatformName>
                                    <ArrivalsList>
                                        {notEmpty(sorted[platform]) &&
                                            limitToThree(sorted[platform]).map((arrival, i) => (
                                                <ArrivalItem
                                                    key={`${arrival.id}-${i}`}
                                                    arrival={arrival}
                                                />
                                            ))}
                                    </ArrivalsList>
                                </AllArrivals>
                            ))}
                        </ArrivalsContainer>
                    ) : (
                        <p>No departure information available</p>
                    );
                }}
            />
        )}
    </GetArrivalsQuery>
);

export default Arrivals;
