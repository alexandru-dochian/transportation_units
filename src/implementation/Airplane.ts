import TransportationUnit from "../abstract/TransportationUnit.js";

export default class Airplane extends TransportationUnit implements Printable {
    constructor(id: number, speed: number) {
        super(id, speed);
    }

    display(): void {
        alert(
            `Hello from Airplane with id [${this.id}] and speed [${this.speed}]!`
        );
    }

    public rising(): void {
        alert(`Airplane with id [${this.id}] is rising!`);
    }

    public dropping(): void {
        alert(`Airplane with id [${this.id}] is dropping!`);
    }
}
