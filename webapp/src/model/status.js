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
    has: status => Status.values().includes(status)
};

export default Status;