import Roles from './role';
import Status from './status';

export default class{
    constructor(id= '', name='', role=Roles.VOLUNTEER, status=Status.WAIT_TV, email='',
            password = '', phone = '', birth = '', createAt = new Date().toISOString()) {
        this.id = id;
        if (Roles.has(role)) {
            this.role = role;
        }
        this.name = name;
        if(Status.has(status)){
            this.status = status;
        }
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.birth = birth;
        this.createAt = createAt;
    }
}