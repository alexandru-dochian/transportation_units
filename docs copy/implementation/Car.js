import TransportationUnit from "../abstract/TransportationUnit.js";
export default class Car extends TransportationUnit {
    constructor(id, speed) {
        super(id, speed);
    }
}
