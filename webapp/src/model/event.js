import Address from './address'; 
export default class{
    constructor(codEvent, startOccurrence, endOccurrence, createAt, type, allDay,
         address = new Address(), trainings = [], participants = [], ratings = []) {
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
    }
}