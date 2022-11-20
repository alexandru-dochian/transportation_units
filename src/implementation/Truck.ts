import TransportationUnit from "../abstract/TransportationUnit.js";

export default class Truck extends TransportationUnit implements Printable {
    constructor(id: number, speed: number) {
        super(id, speed);
    }

    display(): void {
        alert(
            `Hello from Truck with id [${this.id}] and speed [${this.speed}]!`
        );
    }

    public load(): void {
        alert(`Truck with id [${this.id}] is loading!`);
    }

    public unloading(): void {
        alert(`Truck with id [${this.id}] is unloading!`);
    }
}
