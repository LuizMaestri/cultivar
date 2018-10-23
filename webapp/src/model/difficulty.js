const Difficulty = {
    VERY_EASY: 'VERY_EASY',
    EASY: 'EASY',
    HARD: 'HARD',
    VERY_HARD: 'VERY_HARD',
    values: () => [
        Difficulty.VERY_EASY,
        Difficulty.EASY,
        Difficulty.HARD,
        Difficulty.VERY_HARD,
    ],
    has: difficulty => Difficulty.values().includes(difficulty),
    translate: difficulty => {
        return {
            VERY_EASY: 'Muito Fácil',
            EASY: 'Fácil',
            HARD: 'Difícil',
            VERY_HARD: 'Muito Difícil'
        }[difficulty];
    }
}

export default Difficulty;