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
    has: role => Roles.values().includes(role),
    translate: role =>{
        return {
            ADMIN: 'Administrador',
            VOLUNTEER: 'Voluntário',
            COMPANY_ADMIN: 'Responsavel na empresa',
            SCHOOL_ADMIN: 'Responsavel da escola',
        }[role]
    }
};

export default Roles;