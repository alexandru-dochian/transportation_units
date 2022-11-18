import TransportationUnit from "../abstract/TransportationUnit.js";
import Airplane from "../implementation/Airplane.js";
import Car from "../implementation/Car.js";
import Truck from "../implementation/Truck.js";

export function getInitialTransportationUnits(): TransportationUnit[] {
    return [
        new Car(1),
        new Truck(2),
        new Airplane(3),
    ];
}