import * as transportationUnitsService from "./services/transportationUnitsService.js";
export class Application {
    transportationUnits;
    constructor() {
        this.transportationUnits = transportationUnitsService.getInitialTransportationUnits();
    }
    start() {
        this.transportationUnits.forEach(transportationUnit => transportationUnit.start());
        setInterval(() => this.updateDom(), 1000);
    }
    updateDom() {
        document.getElementById("screen");
    }
}
