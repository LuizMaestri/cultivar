import Address from './address';
import User from './user';
import Roles from './role';
import Status from './status';

export default class{
    constructor(cnpj, name, phone, address = new Address(), responsible = new User()) {
        this.cnpj = cnpj;
        this.name = name
        this.phone = phone;
        this.address = address;
        responsible.role = Roles.COMPANY_ADMIN;
        responsible.status = Status.APPROVED
        this.responsible = responsible
    }
}