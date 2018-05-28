import * as React from 'react';
import styled from 'styled-components';

import { propExists } from '../../../utils';

import {
    StopDetails,
    GET_STOP_DETAILS,
    GetStopDetailsQuery,
} from './../../../graphql/queries/tfl';

import Bus from './../../../components/atoms/bus';
import Train from './../../../components/atoms/train';
import { SmallTitle } from './../../../components/atoms/title';
import ErrorHandler from './../../../components/organisms/errorHandler';

interface StopDetailsProps {
    stopId: string;
    loadingMessage?: string;
}

const TransfersList = styled.ul`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    flex-wrap: wrap;
    padding-left: 0;
    justify-content: center;
`;

const TransferStation = styled.li`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 0.5em 1em;

    &:hover {
        text-decoration: underline;
    }
`;

const ChangeFor = styled.span`
    display: block;
    text-align: center;
`;

const isABus = (name: string) => /\d/.test(name);

const Transfers = ({ stopId, loadingMessage }: StopDetailsProps) => (
    <GetStopDetailsQuery query={GET_STOP_DETAILS} variables={{ stopId }}>
        {({ data, error, loading }) => (
            <ErrorHandler
                data={data}
                error={error}
                loading={loading}
                loadingMessage={loadingMessage}
                loaded={Boolean(data && data.stop)}
                render={({ stop }: { stop: StopDetails }) => (
                    <div>
                        <SmallTitle>{stop.commonName}</SmallTitle>
                        <ChangeFor>Change For: </ChangeFor>
                        <TransfersList>
                            {stop.lines.map((transfer, idx: number) => (
                                <TransferStation key={name + idx}>
                                    <div>
                                        {isABus(transfer.name) ? (
                                            <Bus height={20} width={20} />
                                        ) : (
                                            <Train height={20} width={20} />
                                        )}
                                    </div>
                                    <div>{transfer.name}</div>
                                </TransferStation>
                            ))}
                        </TransfersList>
                    </div>
                )}
            />
        )}
    </GetStopDetailsQuery>
);

export default Transfers;
