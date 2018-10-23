const Enjoy = {
    VERY_FUNNY: 'VERY_FUNNY',
    FUNNY: 'FUNNY',
    BORED: 'BORED',
    VERY_BORED: 'VERY_BORED',
    values: () => [
        Enjoy.VERY_FUNNY,
        Enjoy.FUNNY,
        Enjoy.BORED,
        Enjoy.VERY_BORED,
    ],
    has: enjoy => Enjoy.values().includes(enjoy),
    translate: enjoy => {
        return {
            VERY_FUNNY: 'Muito Divertida',
            FUNNY: 'Divertida',
            BORED: 'Chata',
            VERY_BORED: 'Muito Chata'
        }[enjoy];
    }
}

export default Enjoy;