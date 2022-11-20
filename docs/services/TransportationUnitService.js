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
    findAllStarted() {
        return this.transporationUnits.filter((transporationUnit) => transporationUnit.isStarted());
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
        return [
            this.getTransportationUnit({
                transportationUnitType: "Car",
                speed: 50,
            }),
            this.getTransportationUnit({
                transportationUnitType: "Truck",
                speed: 30,
            }),
            this.getTransportationUnit({
                transportationUnitType: "Airplane",
                speed: 200,
            }),
        ];
    }
    getTransportationUnit(modalValuesDTO) {
        switch (modalValuesDTO.transportationUnitType) {
            case "Car":
                return new Car(this.generator.next().value, modalValuesDTO.speed);
            case "Truck":
                return new Truck(this.generator.next().value, modalValuesDTO.speed);
            case "Airplane":
                return new Airplane(this.generator.next().value, modalValuesDTO.speed);
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
