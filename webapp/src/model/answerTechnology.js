const AnswerTechnology = {
    NOTHING: 'NOTHING',
    BEGINNER: 'BEGINNER',
    PROFICIENT: 'PROFICIENT',
    EXPERT: 'EXPERT',
    values: () => [
        AnswerTechnology.NOTHING,
        AnswerTechnology.BEGINNER,
        AnswerTechnology.PROFICIENT,
        AnswerTechnology.EXPERT,
    ],
    has: answerTechnology => AnswerTechnology.values().includes(answerTechnology),
    translate: answerTechnology => {
        return {
            NOTHING: 'Nenhuma',
            BEGINNER: 'Iniciante',
            PROFICIENT: 'Proficiente',
            EXPERT: 'Expert'
        }[answerTechnology];
    }
}

export default AnswerTechnology;