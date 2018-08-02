import User from './user';
export default class {
    constructor(id = '', name = '', phone = '', school = false,
            responsible = new User(), address=null){
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.school = school;
        this.responsible = responsible;
        this.address = address;
    }
}