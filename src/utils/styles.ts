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
    bakerloo: '#B36305',
    piccadilly: '#003688',
    circle: '#FFD300',
    central: '#E32017',
    jubilee: '#A0A5A9',
    metropolitan: '#9B0056',
    district: '#00782A',
    northern: '#000000',
    victoria: '#0098D4',
    hammersmithAndCity: '#F3A9BB',
    waterlooAndCity: '#95CDBA',
};
