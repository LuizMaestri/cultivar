const Roles = {
    ADMIN: 'ADMIN',
    VOLUNTEER: 'VOLUNTEER',
    COMPANY_ADMIN: 'COMPANY_ADMIN',
    SCHOOL_ADMIN: 'SCHOOL_ADMIN',
    values: () => [
        Roles.ADMIN,
        Roles.VOLUNTEER,
        Roles.COMPANY_ADMIN,
        Roles.SCHOOL_ADMIN
    ],
    has: role => Roles.values().includes(role)
};

export default Roles;