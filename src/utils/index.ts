import {
    compose,
    map,
    match,
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

const wordRegex = /(\w+)/g;
const hyphenate = join('-');

export const kebabCase = compose(hyphenate, map(toLower), match(wordRegex));

const ampersandRegex = /[&]/g;

export const replaceAmpersand = (word: string) =>
    word.replace(ampersandRegex, 'and');

export const camelize = (word: string) => {
    const [beginning, ...rest] = word.split(' ');
    const upperCaseWords = rest.map(capitalize);
    return [beginning, ...upperCaseWords].join('');
};

export const normalize = compose(camelize, replaceAmpersand, toLower);
