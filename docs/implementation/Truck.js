import TransportationUnit from "../abstract/TransportationUnit.js";
export default class Truck extends TransportationUnit {
    static SPEED = 40;
    constructor(id) {
        super(id, Truck.SPEED);
    }
    display() {
        throw new Error("Method not implemented.");
    }
}
