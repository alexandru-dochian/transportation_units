import TransportationUnit from "../abstract/TransportationUnit.js";

export default class Truck extends TransportationUnit implements Printable {
    private static SPEED = 40;
    
    constructor(id: number) {
        super(id, Truck.SPEED)
    }

    display(): void {
        throw new Error("Method not implemented.");
    }
}