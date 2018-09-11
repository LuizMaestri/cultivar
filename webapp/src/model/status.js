const Status = {
    APPROVED: 'APPROVED',
    WAIT_STATEMENT: 'WAIT_STATEMENT',
    WAIT_COMPANY: 'WAIT_COMPANY',
    WAIT_TRAINING: 'WAIT_TRAINING',
    REGISTER: 'REGISTER',
    values: () => [
        Status.APPROVED,
        Status.WAIT_STATEMENT,
        Status.WAIT_COMPANY,
        Status.WAIT_TRAINING,
        Status.REGISTER
    ],
    has: status => Status.values().includes(status),
    translate: status => {
        return {
            APPROVED: 'Aprovado',
            WAIT_STATEMENT: 'Aguardando envio do termo de resposabilidade',
            WAIT_COMPANY: 'Aguardando recomendação da empresa',
            WAIT_TRAINING: 'Aguardando treinamento',
            REGISTER: 'Registrado',
        }[status];
    },
    next: status => {
        return {
            APPROVED: Status.APPROVED,
            WAIT_STATEMENT: Status.WAIT_TRAINING,
            WAIT_COMPANY: Status.WAIT_STATEMENT,
            WAIT_TRAINING: Status.APPROVED,
            REGISTER: Status.WAIT_COMPANY,
        }[status];
    }
};

export default Status;