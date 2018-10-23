const AnswerAgree = {
    TOTALLY_AGREE: 'TOTALLY_AGREE',
    AGREE: 'AGREE',
    DISAGREE: 'DISAGREE',
    TOTALLY_DISAGREE: 'TOTALLY_DISAGREE',
    values: () => [
        AnswerAgree.TOTALLY_AGREE,
        AnswerAgree.AGREE,
        AnswerAgree.DISAGREE,
        AnswerAgree.TOTALLY_DISAGREE,
    ],
    has: answerAgree => AnswerAgree.values().includes(answerAgree),
    translate: answerAgree => {
        return {
            TOTALLY_AGREE: 'Concordo Plenamente',
            AGREE: 'Concordo',
            DISAGREE: 'Discordo',
            TOTALLY_DISAGREE: 'Discordo Plenamente'
        }[answerAgree];
    }
}

export default AnswerAgree;