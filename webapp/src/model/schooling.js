const Schooling = {
    ELEMENTARY_SCHOOL: 'ELEMENTARY_SCHOOL',
    HIGH_SCHOOL: 'HIGH_SCHOOL',
    UNIVERSITY_GRADUATE: 'UNIVERSITY_GRADUATE',
    POSTGRADUATE_STUDIES: 'POSTGRADUATE_STUDIES',
    values: () => [
        Schooling.ELEMENTARY_SCHOOL,
        Schooling.HIGH_SCHOOL,
        Schooling.UNIVERSITY_GRADUATE,
        Schooling.POSTGRADUATE_STUDIES,
    ],
    has: schooling => Schooling.values().includes(schooling),
    translate: schooling => {
        return {
            ELEMENTARY_SCHOOL: '1º Grau (Fundamental)',
            HIGH_SCHOOL: '2º Grau (Ensino Médio)',
            UNIVERSITY_GRADUATE: 'Ensino Superior (Graduação)',
            POSTGRADUATE_STUDIES: 'Pós-Graduação'
        }[schooling];
    }
}

export default Schooling;