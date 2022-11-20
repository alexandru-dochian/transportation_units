import TransportationUnit from "../abstract/TransportationUnit.js";
import TransportationUnitService from "../services/TransportationUnitService.js";
import DOMHelper from "./DOMHelper.js";
import ModalValuesDTO from "./resources/ModalValuesDTO.js";

export default class MainTable {
    private mainTableHTMLElement: HTMLTableElement;
    private transportationUnitService: TransportationUnitService;

    constructor() {
        this.mainTableHTMLElement = <HTMLTableElement>(
            document.getElementById("mainTable")
        );
        this.transportationUnitService = new TransportationUnitService();
        this.initDefaultData();
    }

    public handleCreateTransportationUnit(
        modalValuesDTO: ModalValuesDTO
    ): void {
        const transportationUnit: TransportationUnit =
            this.transportationUnitService.createNewTransportationUnit(
                modalValuesDTO
            );
        this.addToTable(transportationUnit);
    }

    private initDefaultData(): void {
        this.transportationUnitService
            .findAll()
            .forEach((transportationUnit) => {
                transportationUnit.start();
                this.addToTable(transportationUnit);
            });

        setInterval(() => this.updateTable(), 120);
    }

    private addToTable(transportationUnit: TransportationUnit): void {
        const htmlTableRowElement = <HTMLTableRowElement>(
            this.mainTableHTMLElement?.insertRow()
        );
        htmlTableRowElement.id = transportationUnit.id.toString();

        let htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "id";
        htmlTableCellElement.appendChild(
            DOMHelper.getHTMLText(transportationUnit.id.toString())
        );

        htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "name";
        htmlTableCellElement.appendChild(
            DOMHelper.getHTMLText(transportationUnit.constructor.name)
        );

        htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "title";
        htmlTableCellElement.appendChild(
            DOMHelper.getHTMLText(transportationUnit.speed.toString())
        );

        htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "distance";
        htmlTableCellElement.appendChild(
            DOMHelper.getHTMLText(transportationUnit.distance.toString())
        );

        htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "action";
        htmlTableCellElement.appendChild(
            this.getTransportationUnitActionButton(transportationUnit)
        );

        htmlTableCellElement = <HTMLTableCellElement>(
            htmlTableRowElement.insertCell()
        );
        htmlTableCellElement.title = "display";
        htmlTableCellElement.appendChild(
            this.getTransportationUnitDisplay(transportationUnit)
        );
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

    private getTransportationUnitDisplay(
        transportationUnit: TransportationUnit
    ): HTMLElement {
        if (!transportationUnit.isPrintable()) {
            return document.createElement("div");
        }

        const iconClass = "fa-eye";
        const buttonClass = `button-${iconClass}`;

        const icon = <HTMLElement>document.createElement("i");
        icon.classList.add("fa", iconClass);
        icon.setAttribute("aria-hidden", "true");
        const button = document.createElement("button");
        button.classList.add(buttonClass);
        button.appendChild(icon);
        button.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleTransportationUnitDisplayAction(transportationUnit.id);
        });
        return button;
    }

    private handleTransportationUnitDisplayAction(
        transportationUnitId: number
    ) {
        const transportationUnit: TransportationUnit =
            this.transportationUnitService.findById(transportationUnitId);
        alert(
            `[${transportationUnit.constructor.name}] with id [${transportationUnit.id}] and speed [${transportationUnit.speed}] says Hello!`
        );
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

    private updateTable() {
        this.transportationUnitService
            .findAllStarted()
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

                        break;
                    default:
                        break;
                }
            }
        );
    }
}
