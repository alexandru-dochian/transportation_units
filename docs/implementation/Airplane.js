import TransportationUnit from "../abstract/TransportationUnit.js";
export default class Airplane extends TransportationUnit {
    static SPEED = 250;
    constructor(id) {
        super(id, Airplane.SPEED);
    }
    display() {
        throw new Error("Method not implemented.");
    }
}
