const SchoolType = {
    MUNICIPAL: 'MUNICIPAL',
    STATE: 'STATE',
    FEDERAL: 'FEDERAL',
    values: () => [
        SchoolType.MUNICIPAL,
        SchoolType.STATE,
        SchoolType.FEDERAL
    ],
    has: type => SchoolType.values().includes(type),
    translate: type => {
        return {
            MUNICIPAL: 'Municipal',
            STATE: 'Estadual',
            FEDERAL: 'Federal'
        }[type];
    }
}

export default SchoolType;