import Address from './address';
import User from './user';
import Roles from './role';
import Status from './status';

export default class {
    constructor(codSchool, name, phone, address = new Address(), responsible = new User()) {
        this.codSchool = codSchool;
        this.name = name
        this.phone = phone;
        this.address = address;
        responsible.role = Roles.SCHOOL_ADMIN;
        responsible.status = Status.APPROVED
        this.responsible = responsible
    }
}