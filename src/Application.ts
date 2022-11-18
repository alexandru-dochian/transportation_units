import TransportationUnit from "./abstract/TransportationUnit.js";
import * as transportationUnitsService from "./services/transportationUnitsService.js";

export class Application {
    transportationUnits: TransportationUnit[];
    
    constructor() {
        this.transportationUnits = transportationUnitsService.getInitialTransportationUnits()
    }

    public start(): void {
        this.transportationUnits.forEach(transportationUnit => transportationUnit.start())
        setInterval(() => this.updateDom(), 1000)
    }

    private updateDom(): void {
        document.getElementById("screen");
    }
}