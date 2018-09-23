import Address from './address';
import User from './user';
import Roles from './role';
import Status from './status';

export default class {
    constructor(codSchool, name = '', phone = '', schoolType = '', address = new Address(), responsible = new User()) {
        this.codSchool = codSchool;
        this.name = name
        this.phone = phone;
        this.schoolType = schoolType;
        this.address = address;
        responsible.role = Roles.SCHOOL_ADMIN;
        responsible.status = Status.APPROVED
        this.responsible = responsible
    }
}