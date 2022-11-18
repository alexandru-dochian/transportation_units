import TransportationUnit from "../abstract/TransportationUnit.js";
export default class Car extends TransportationUnit {
    static SPEED = 40;
    constructor(id) {
        super(id, Car.SPEED);
    }
}
