interface StringMap {
    [line: string]: string;
}

export const statusReactions: StringMap = {
    goodService: '😀',
    minorDelays: '😣',
    severeDelays: '🤬',
    partClosure: '😱',
    serviceClosed: '😴',
    partSuspended: '😤',
};

export const lineColors: StringMap = {
    bakerloo: '#996633',
    piccadilly: '#000099',
    circle: '#FFCC00',
    central: '#CC3333',
    jubilee: '#868F98',
    metropolitan: '#660066',
    district: '#006633',
    northern: '#000000',
    victoria: '#0099CC',
    hammersmithAndCity: '#CC9999',
    waterlooAndCity: '#66CCCC',
};
