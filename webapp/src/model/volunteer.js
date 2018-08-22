import User from './user';
import Roles from './role';
import Status from './status';
import Place from './place';
import Address from './address';

export default class extends User {
    constructor(id = '', name = '', status = Status.WAIT_TV, email = '', password = '', phone = '',
        birth = new Date().toISOString(), createAt = new Date().toISOString(), address = new Address({}), company = new Place(),
        job = '', pathTV = '', pathTR = '') {
        super(id, name,Roles.VOLUNTEER, status, email, password, phone, birth, createAt);
        this.address = address;
        this.company = company;
        this.job = job;
        this.pathTV = pathTV;
        this.pathTR = pathTR;
    }
}