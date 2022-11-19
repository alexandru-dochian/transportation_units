import Airplane from "../implementation/Airplane.js";
import Car from "../implementation/Car.js";
import Truck from "../implementation/Truck.js";
export default class TransportationUnitService {
    transporationUnits;
    constructor() {
        this.transporationUnits = this.getInitialTransportationUnits();
    }
    findAll() {
        return this.transporationUnits;
    }
    findById(transportationUnitId) {
        return (this.transporationUnits.find((transportationUnit) => transportationUnit.id === transportationUnitId));
    }
    getInitialTransportationUnits() {
        return [new Car(1), new Truck(2), new Airplane(3)];
    }
}
