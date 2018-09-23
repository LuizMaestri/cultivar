import Address from './address';
import School from './school';

export default class{
    constructor(codEvent, startOccurrence, endOccurrence, createAt, type = '', allDay,
         address = new Address(), school = new School(), trainings = [],
         participants = [], ratings = []) {
        this.codEvent = codEvent;
        this.startOccurrence = startOccurrence;
        this.endOccurrence = endOccurrence;
        this.createAt = createAt;
        this.type = type;
        this.allDay = allDay;
        this.address = address;
        this.trainings = trainings;
        this.participants = participants;
        this.ratings = ratings;
        this.school = school;
    }
}