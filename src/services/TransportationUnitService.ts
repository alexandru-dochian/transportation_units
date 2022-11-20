import TransportationUnit from "../abstract/TransportationUnit.js";
import ModalValuesDTO from "../components/resources/ModalValuesDTO.js";
import Airplane from "../implementation/Airplane.js";
import Car from "../implementation/Car.js";
import Truck from "../implementation/Truck.js";

export default class TransportationUnitService {
    private transporationUnits: TransportationUnit[];
    private generator: Generator<Number>;

    constructor() {
        this.generator = this.idGenerator();
        this.transporationUnits = this.getInitialTransportationUnits();
    }

    public findAll(): TransportationUnit[] {
        return this.transporationUnits;
    }

    public findAllStarted(): TransportationUnit[] {
        return this.transporationUnits.filter(
            (transporationUnit: TransportationUnit) =>
                transporationUnit.isStarted()
        );
    }

    public findById(transportationUnitId: number): TransportationUnit {
        return <TransportationUnit>(
            this.transporationUnits.find(
                (transportationUnit) =>
                    transportationUnit.id === transportationUnitId
            )
        );
    }

    public createNewTransportationUnit(
        modalValuesDTO: ModalValuesDTO
    ): TransportationUnit {
        const newTransportationUnit =
            this.getTransportationUnit(modalValuesDTO);
        this.transporationUnits.push(newTransportationUnit);
        return newTransportationUnit;
    }

    private getInitialTransportationUnits(): TransportationUnit[] {
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

    private getTransportationUnit(
        modalValuesDTO: ModalValuesDTO
    ): TransportationUnit {
        switch (modalValuesDTO.transportationUnitType) {
            case "Car":
                return new Car(
                    this.generator.next().value,
                    modalValuesDTO.speed
                );
            case "Truck":
                return new Truck(
                    this.generator.next().value,
                    modalValuesDTO.speed
                );
            case "Airplane":
                return new Airplane(
                    this.generator.next().value,
                    modalValuesDTO.speed
                );
            default:
                throw new Error("Transportation type does not exist!");
        }
    }

    private *idGenerator() {
        let startId = 0;
        while (true) {
            yield startId;
            startId += 1;
        }
    }
}
