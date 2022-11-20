import TransportationUnit from "../abstract/TransportationUnit.js";
export default class Truck extends TransportationUnit {
    constructor(id, speed) {
        super(id, speed);
    }
    display() {
        alert(`Hello from Truck with id [${this.id}] and speed [${this.speed}]!`);
    }
    load() {
        alert(`Truck with id [${this.id}] is loading!`);
    }
    unloading() {
        alert(`Truck with id [${this.id}] is unloading!`);
    }
}
