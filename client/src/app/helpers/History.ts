const History = {
    navigate: [],
    push: (page: any, ...rest: any) => {
        // @ts-ignore
        History.navigate(page, ...rest)
    },
};

export default History;