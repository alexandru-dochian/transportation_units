import Airplane from "../implementation/Airplane.js";
import Car from "../implementation/Car.js";
import Truck from "../implementation/Truck.js";
export default class TransportationUnitFactory {
    static getTransportationUnit(modalValuesDTO) {
        switch (modalValuesDTO.transportationUnitType) {
            case "Car":
                return new Car(123);
            case "Truck":
                return new Truck(123);
            case "Airplane":
                return new Airplane(123);
            default:
                throw new Error("Transportation type does not exist!");
        }
    }
}
