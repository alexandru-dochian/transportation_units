import TransportationUnit from "../abstract/TransportationUnit.js";

export default class Airplane extends TransportationUnit implements Printable {
    private static SPEED = 250;
    
    constructor(id: number) {
        super(id, Airplane.SPEED)
    }

    display(): void {
        throw new Error("Method not implemented.");
    }
}