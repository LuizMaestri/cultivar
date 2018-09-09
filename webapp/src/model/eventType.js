const EventType = {
    TRAINING: 'TRAINING',
    TUTORING: 'TUTORING',
    MEETING: 'MEETING',
    values: () => [
        EventType.TRAINING,
        EventType.TUTORING,
        EventType.MEETING
    ],
    has: type => EventType.values().includes(type),
    translate: type => {
        return {
            TRAINING: 'Treinamento',
            TUTORING: 'Mentoria',
            MEETING: 'Reunião'
        }[type];
    }
}

export default EventType;