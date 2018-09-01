export default class {
    constructor(codAddress, city, neighborhood, street, number) {
        this.codAddress = codAddress;
        this.city = city;
        this.neighborhood = neighborhood;
        this.street = street;
        this.number = number;
    }
    toString(){
        return `${this.street}, ${this.number}, ${this.neighborhood}  - ${this.city}`;
    }
}