import TransportationUnit from "./abstract/TransportationUnit.js";
import ModalValuesDTO from "./dto/ModalValuesDTO.js";
import TransportationUnitService from "./services/TransportationUnitService.js";

export class Application {
    transportationUnitService: TransportationUnitService;
    modalHTMLelement: HTMLElement | null;
    overlayHTMLelement: HTMLElement | null;
    table: HTMLTableElement | null;

    constructor() {
        this.transportationUnitService = new TransportationUnitService();

        this.modalHTMLelement = <HTMLElement>document.getElementById("modal");
        this.overlayHTMLelement = <HTMLElement>(
            document.getElementById("overlay")
        );
        this.table = <HTMLTableElement>document.getElementById("mainTable");

        this.initEventListeners();
    }

    public start(): void {
        this.transportationUnitService
            .findAll()
            .forEach((transportationUnit) => {
                transportationUnit.start();
                this.addToMainTable(transportationUnit);
            });

        setInterval(() => this.updateDom(), 120);
    }

    private initEventListeners(): void {
        const addButtonHandler = document.getElementById("addButton");
        addButtonHandler?.addEventListener("click", (e) =>
            this.handleAddButton(e)
        );

        const cancelModalButtonHandler = document.getElementById("cancelModal");
        cancelModalButtonHandler?.addEventListener("click", (e) =>
            this.handleCancelModal(e)
        );

        const createTransportationUnitButtonHandler = document.getElementById(
            "createTransportationUnit"
        );
        createTransportationUnitButtonHandler?.addEventListener("click", (e) =>
            this.handleCreateTransportationUnit(e)
        );
    }

    private addToMainTable(transportationUnit: TransportationUnit): void {
        const htmlTableRowElement = <HTMLTableRowElement>(
            this.table?.insertRow()
        );
        htmlTableRowElement.id = transportationUnit.id.toString();

        let htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "id";
        htmlTableCellElement.appendChild(
            this.getHTMLText(transportationUnit.id.toString())
        );

        htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "name";
        htmlTableCellElement.appendChild(
            this.getHTMLText(transportationUnit.constructor.name)
        );

        htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "title";
        htmlTableCellElement.appendChild(
            this.getHTMLText(transportationUnit.speed.toString())
        );

        htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "distance";
        htmlTableCellElement.appendChild(
            this.getHTMLText(transportationUnit.distance.toString())
        );

        htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "action";
        htmlTableCellElement.appendChild(
            this.getTransportationUnitActionButton(transportationUnit)
        );
    }

    private getHTMLText(textString: string): Text {
        return <Text>document.createTextNode(textString);
    }

    private getTransportationUnitActionButton(
        transportationUnit: TransportationUnit
    ): HTMLElement {
        const iconClass = transportationUnit.isStarted()
            ? "fa-pause"
            : "fa-play-circle";
        const buttonClass = `button-${iconClass}`;

        const icon = <HTMLElement>document.createElement("i");
        icon.classList.add("fa", iconClass);
        icon.setAttribute("aria-hidden", "true");

        const button = document.createElement("button");
        button.classList.add(buttonClass);
        button.appendChild(icon);
        button.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleTransporationUnitAction(transportationUnit.id);
        });
        return button;
    }

    private handleAddButton(e: MouseEvent): void {
        e.preventDefault();
        if (this.modalHTMLelement && this.overlayHTMLelement) {
            this.modalHTMLelement.classList.add("active");
            this.overlayHTMLelement.classList.add("active");
        }
    }

    private handleTransporationUnitAction(transportationUnitId: number) {
        const transportationUnit: TransportationUnit =
            this.transportationUnitService.findById(transportationUnitId);
        if (transportationUnit.isStarted()) {
            transportationUnit.stop();
        } else {
            transportationUnit.start();
        }
        this.synchronizeTransportationUnit(transportationUnit, true);
    }

    private handleCancelModal(e: MouseEvent): void {
        e.preventDefault();
        this.closeModal();
    }

    private handleCreateTransportationUnit(e: MouseEvent): void {
        e.preventDefault();
        const modalValuesDTO: ModalValuesDTO = this.getModalValuesDTO();
        const transportationUnit: TransportationUnit = this.transportationUnitService.createNewTransportationUnit(modalValuesDTO);
        this.addToMainTable(transportationUnit);
        this.closeModal();
    }

    private getModalValuesDTO(): ModalValuesDTO {
        let transportationUnitType = this.getInputValue(
            "transportationUnitType"
        );
        let speed = this.getInputValue("speed");

        return {
            transportationUnitType: transportationUnitType,
            speed: speed,
        };
    }

    private getInputValue(inputId: string): any {
        let input = document.getElementById(inputId) as HTMLInputElement | null;
        return input?.value;
    }

    private closeModal(): void {
        if (this.modalHTMLelement && this.overlayHTMLelement) {
            this.modalHTMLelement.classList.remove("active");
            this.overlayHTMLelement.classList.remove("active");
        }
    }

    private updateDom(): void {
        this.transportationUnitService
            .findAll()
            .forEach((transportationUnit: TransportationUnit) =>
                this.synchronizeTransportationUnit(transportationUnit)
            );
    }

    private synchronizeTransportationUnit(
        transportationUnit: TransportationUnit,
        updateButton: boolean = false
    ) {
        const htmlTableRowElement = <HTMLTableRowElement>(
            document.getElementById(transportationUnit.id.toString())
        );

        Array.from(htmlTableRowElement.cells).forEach(
            (htmlTableCellElement: HTMLTableCellElement) => {
                switch (htmlTableCellElement.title) {
                    case "distance":
                        htmlTableCellElement.textContent =
                            transportationUnit.distance.toString();
                        break;
                    case "action":
                        if (!updateButton) {
                            break;
                        }
                        const newButton =
                            this.getTransportationUnitActionButton(
                                transportationUnit
                            );
                        htmlTableCellElement.replaceChildren(...[newButton]);
                        
                        break            
                    default:
                        break;
                }
            }
        );
    }
}
