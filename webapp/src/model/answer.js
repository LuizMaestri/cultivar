import Question from './question';
export default class {
    constructor(question = new Question(), answer = false, comment = '') {
        this.question = question;
        this.answer = answer;
        this.comment = comment;
    }
}