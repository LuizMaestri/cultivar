import User from './user';
import Address from './address';
import Roles from './role';
import Status from './status';
export default class {
    constructor(id = '', name = '', phone = '', school = false,
            responsible = new User({role:Roles.COMPANY_ADMIN, status:Status.APPROVED}),
            address=new Address()){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.school = school;
        if(school){
            responsible.role = Roles.SCHOOL_ADMIN;
        }
        this.responsible = responsible;
        this.address = address;
    }
}