import Address from './address';

export default class{
    constructor(cpf, name, email, password, role, status, birth, job, phone, company, school, answers, ratings, address=new Address() ) {
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
        this.birth = birth;
        this.job = job;
        this.phone = phone;
        this.company = company;
        this.school = school;
        this.answers = answers;
        this.ratings = ratings;
        this.address = address;
    }
}