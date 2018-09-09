import User from './user';
import Roles from './role';
import Status from './status';
import Company from './company';
import School from './school';

export default class{
    constructor(user = new User(), company = new Company(), school = new School(),
        schooling = '', conclusion = false, course ='', rg = '', answers = [], ratings = []) {
        user.role = Roles.VOLUNTEER;
        user.status = Status.REGISTER;
        this.user = user;
        this.company = company;
        this.schooling = schooling;
        this.conclusion = conclusion;
        this.course = course;
        this.rg = rg;
        this.answers = answers;
        this.ratings = ratings;
        this.school = school;
    }
}