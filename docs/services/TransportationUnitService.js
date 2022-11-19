import Airplane from "../implementation/Airplane.js";
import Car from "../implementation/Car.js";
import Truck from "../implementation/Truck.js";
export default class TransportationUnitService {
    transporationUnits;
    generator;
    constructor() {
        this.generator = this.idGenerator();
        this.transporationUnits = this.getInitialTransportationUnits();
    }
    findAll() {
        return this.transporationUnits;
    }
    findById(transportationUnitId) {
        return (this.transporationUnits.find((transportationUnit) => transportationUnit.id === transportationUnitId));
    }
    createNewTransportationUnit(modalValuesDTO) {
        const newTransportationUnit = this.getTransportationUnit(modalValuesDTO);
        this.transporationUnits.push(newTransportationUnit);
        return newTransportationUnit;
    }
    getInitialTransportationUnits() {
        return [this.getTransportationUnit({
                "transportationUnitType": "Car",
                "speed": 40
            }), this.getTransportationUnit({
                "transportationUnitType": "Truck",
                "speed": 40
            }), this.getTransportationUnit({
                "transportationUnitType": "Airplane",
                "speed": 40
            })];
    }
    getTransportationUnit(transportationUnitDTO) {
        switch (transportationUnitDTO.transportationUnitType) {
            case "Car":
                return new Car(this.generator.next().value, transportationUnitDTO.speed);
            case "Truck":
                return new Truck(this.generator.next().value, transportationUnitDTO.speed);
            case "Airplane":
                return new Airplane(this.generator.next().value, transportationUnitDTO.speed);
            default:
                throw new Error("Transportation type does not exist!");
        }
    }
    *idGenerator() {
        let startId = 0;
        while (true) {
            yield startId;
            startId += 1;
        }
    }
}
