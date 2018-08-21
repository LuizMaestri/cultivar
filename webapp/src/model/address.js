export default class {
    constructor({id, city, neighborhood, street, number}) {
        this.id = id;
        this.city = city;
        this.neighborhood = neighborhood;
        this.street = street;
        this.number = number;
    }
    toString(){
        return `${this.street}, ${this.number}, ${this.neighborhood}  - ${this.city}`;
    }
}