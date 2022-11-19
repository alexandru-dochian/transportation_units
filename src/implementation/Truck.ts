import TransportationUnit from "../abstract/TransportationUnit.js";

export default class Truck extends TransportationUnit implements Printable {
    constructor(id: number, speed: number) {
        super(id, speed);
    }

    display(): void {
        throw new Error("Method not implemented.");
    }
}