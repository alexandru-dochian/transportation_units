import TransportationUnit from "../abstract/TransportationUnit.js";

export default class Car extends TransportationUnit {
    private static SPEED = 40;
    
    constructor(id: number) {
        super(id, Car.SPEED)
    }
}