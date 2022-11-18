import TransportationUnit from "../abstract/TransportationUnit.js";
import ModalValuesDTO from "../dto/ModalValuesDTO.js";
import Airplane from "../implementation/Airplane.js";
import Car from "../implementation/Car.js";
import Truck from "../implementation/Truck.js";

export default class TransportationUnitFactory {
    public static getTransportationUnit(modalValuesDTO: ModalValuesDTO): TransportationUnit {
        switch (modalValuesDTO.transportationUnitType) {
            case "Car":
                return new Car(123);
            case "Truck":
                return new Truck(123);
            case "Airplane":
                return new Airplane(123);
            default:
                throw new Error("Transportation type does not exist!")
        }
    }
}