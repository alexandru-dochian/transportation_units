import CreateTransportationUnitModal from "./components/CreateTransportationUnitModal.js";
import MainTable from "./components/MainTable.js";
export class Application {
    mainTable;
    constructor() {
        this.mainTable = new MainTable();
        new CreateTransportationUnitModal((modalValues) => this.handleCreateTransportationUnitModalSuccess(modalValues));
    }
    handleCreateTransportationUnitModalSuccess(modalValues) {
        this.mainTable.handleCreateTransportationUnit(modalValues);
    }
}
