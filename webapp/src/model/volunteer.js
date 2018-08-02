import User from './user';
import Roles from './role';
import Status from './status';
import Place from './place';

export default class extends User {
    constructor(id = '', name = '', status = Status.WAIT_TV, email = '', password = '', phone = '',
        birth = new Date(), createAt = new Date(), address = null, company = new Place(), pathTV = '', pathTR = '') {
        super(id, name,Roles.VOLUNTEER, status, email, password, phone, birth, createAt);
        this.address = address;
        this.company = company;
        this.pathTV = pathTV;
        this.pathTR = pathTR;
    }
}