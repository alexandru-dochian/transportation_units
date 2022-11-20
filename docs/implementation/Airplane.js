import TransportationUnit from "../abstract/TransportationUnit.js";
export default class Airplane extends TransportationUnit {
    constructor(id, speed) {
        super(id, speed);
    }
    display() {
        alert(`Hello from Airplane with id [${this.id}] and speed [${this.speed}]!`);
    }
    rising() {
        alert(`Airplane with id [${this.id}] is rising!`);
    }
    dropping() {
        alert(`Airplane with id [${this.id}] is dropping!`);
    }
}
