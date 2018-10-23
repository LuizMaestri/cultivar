const Expectation = {
    ALL: 'ALL',
    SOME: 'SOME',
    NOTHING: 'NOTHING',
    values: () => [
        Expectation.ALL,
        Expectation.SOME,
        Expectation.NOTHING
    ],
    has: expectation => Expectation.values().includes(expectation),
    translate: expectation => {
        return {
            ALL: 'Todas',
            SOME: 'Algumas',
            NOTHING: 'Nenhuma'
        }[expectation];
    }
}

export default Expectation;


