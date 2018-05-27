import { compose, juxt, join, head, toUpper, tail, isNil, unless } from 'ramda';

export const capitalizeStr = compose(
    join(''),
    juxt([compose(toUpper, head), tail]),
);

export const capitalize = unless(isNil, capitalizeStr);
