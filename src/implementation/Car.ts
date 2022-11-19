import TransportationUnit from "../abstract/TransportationUnit.js";

export default class Car extends TransportationUnit {
    constructor(id: number, speed: number) {
        super(id, speed)
    }
}