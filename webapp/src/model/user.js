import Address from './address';

export default class{
    constructor(cpf, name, email, password, role, status, birth, job, phone, address=new Address() ) {
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
        this.birth = birth;
        this.job = job;
        this.phone = phone;
        this.address = address;
    }
}