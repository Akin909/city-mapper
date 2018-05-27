import {
    compose,
    juxt,
    join,
    head,
    toUpper,
    toLower,
    tail,
    isNil,
    unless,
} from 'ramda';

export const capitalizeStr = compose(
    join(''),
    juxt([compose(toUpper, head), tail]),
);

export const capitalize = unless(isNil, capitalizeStr);

export const replaceAmpersand = (word: string) => word.replace(/[&]/g, 'and');
export const camelize = (word: string) => {
    const [beginning, ...rest] = word.split(' ');
    const upperCaseWords = rest.map(capitalize);
    return [beginning, ...upperCaseWords].join('');
};

export const normalize = compose(camelize, replaceAmpersand, toLower);
