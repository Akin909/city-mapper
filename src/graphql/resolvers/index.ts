export default {
    Query: {
        lineStatuses: (_, { lines }, { cache }) => {
            const data = {
                lineStatuses: {
                    __typename: 'Line',
                    lines,
                },
            };
            cache.writeData({ data });
            return lines;
        },
    },
};
