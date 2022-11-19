import TransportationUnit from "../abstract/TransportationUnit.js";
export default class Airplane extends TransportationUnit {
    constructor(id, speed) {
        super(id, speed);
    }
    display() {
        throw new Error("Method not implemented.");
    }
}
