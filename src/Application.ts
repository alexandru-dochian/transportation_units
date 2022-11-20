import CreateTransportationUnitModal from "./components/CreateTransportationUnitModal.js";
import MainTable from "./components/MainTable.js";
import ModalValuesDTO from "./components/resources/ModalValuesDTO.js";

export class Application {
    private mainTable: MainTable;

    constructor() {
        this.mainTable = new MainTable();
        new CreateTransportationUnitModal((modalValues: ModalValuesDTO) =>
            this.handleCreateTransportationUnitModalSuccess(modalValues)
        );
    }

    private handleCreateTransportationUnitModalSuccess(
        modalValues: ModalValuesDTO
    ): void {
        this.mainTable.handleCreateTransportationUnit(modalValues);
    }
}
