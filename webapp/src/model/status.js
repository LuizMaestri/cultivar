const Status = {
    APPROVED: 'APPROVED',
    WAIT_RECOMMEND: 'WAIT_RECOMMEND',
    RECOMMEND: 'RECOMMEND',
    WAIT_TR: 'WAIT_TR',
    WAIT_TV: 'WAIT_TV',
    values: () => [
        Status.APPROVED,
        Status.WAIT_RECOMMEND,
        Status.RECOMMEND,
        Status.WAIT_TR,
        Status.WAIT_TV
    ],
    has: status => Status.values().includes(status)
}

export default Status;