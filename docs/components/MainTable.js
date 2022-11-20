import TransportationUnitService from "../services/TransportationUnitService.js";
import DOMHelper from "./DOMHelper.js";
export default class MainTable {
    mainTableHTMLElement;
    transportationUnitService;
    constructor() {
        this.mainTableHTMLElement = (document.getElementById("mainTable"));
        this.transportationUnitService = new TransportationUnitService();
        this.initDefaultData();
    }
    handleCreateTransportationUnit(modalValuesDTO) {
        const transportationUnit = this.transportationUnitService.createNewTransportationUnit(modalValuesDTO);
        this.addToTable(transportationUnit);
    }
    initDefaultData() {
        this.transportationUnitService
            .findAll()
            .forEach((transportationUnit) => {
            transportationUnit.start();
            this.addToTable(transportationUnit);
        });
        setInterval(() => this.updateTable(), 120);
    }
    addToTable(transportationUnit) {
        const htmlTableRowElement = (this.mainTableHTMLElement?.insertRow());
        htmlTableRowElement.id = transportationUnit.id.toString();
        let htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "id";
        htmlTableCellElement.appendChild(DOMHelper.getHTMLText(transportationUnit.id.toString()));
        htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "name";
        htmlTableCellElement.appendChild(DOMHelper.getHTMLText(transportationUnit.constructor.name));
        htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "title";
        htmlTableCellElement.appendChild(DOMHelper.getHTMLText(transportationUnit.speed.toString()));
        htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "distance";
        htmlTableCellElement.appendChild(DOMHelper.getHTMLText(transportationUnit.distance.toString()));
        htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "action";
        htmlTableCellElement.appendChild(this.getTransportationUnitActionButton(transportationUnit));
        htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "display";
        htmlTableCellElement.appendChild(this.getTransportationUnitDisplay(transportationUnit));
    }
    getTransportationUnitActionButton(transportationUnit) {
        const iconClass = transportationUnit.isStarted()
            ? "fa-pause"
            : "fa-play-circle";
        const buttonClass = `button-${iconClass}`;
        const icon = document.createElement("i");
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
    getTransportationUnitDisplay(transportationUnit) {
        if (!transportationUnit.isPrintable()) {
            return document.createElement("div");
        }
        const iconClass = "fa-eye";
        const buttonClass = `button-${iconClass}`;
        const icon = document.createElement("i");
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
    handleTransportationUnitDisplayAction(transportationUnitId) {
        const transportationUnit = this.transportationUnitService.findById(transportationUnitId);
        alert(`[${transportationUnit.constructor.name}] with id [${transportationUnit.id}] and speed [${transportationUnit.speed}] says Hello!`);
    }
    handleTransporationUnitAction(transportationUnitId) {
        const transportationUnit = this.transportationUnitService.findById(transportationUnitId);
        if (transportationUnit.isStarted()) {
            transportationUnit.stop();
        }
        else {
            transportationUnit.start();
        }
        this.synchronizeTransportationUnit(transportationUnit, true);
    }
    updateTable() {
        this.transportationUnitService
            .findAllStarted()
            .forEach((transportationUnit) => this.synchronizeTransportationUnit(transportationUnit));
    }
    synchronizeTransportationUnit(transportationUnit, updateButton = false) {
        const htmlTableRowElement = (document.getElementById(transportationUnit.id.toString()));
        Array.from(htmlTableRowElement.cells).forEach((htmlTableCellElement) => {
            switch (htmlTableCellElement.title) {
                case "distance":
                    htmlTableCellElement.textContent =
                        transportationUnit.distance.toString();
                    break;
                case "action":
                    if (!updateButton) {
                        break;
                    }
                    const newButton = this.getTransportationUnitActionButton(transportationUnit);
                    htmlTableCellElement.replaceChildren(...[newButton]);
                    break;
                default:
                    break;
            }
        });
    }
}
