import TransportationUnitService from "./services/TransportationUnitService.js";
export class Application {
    transportationUnitService;
    modalHTMLelement;
    overlayHTMLelement;
    table;
    constructor() {
        this.transportationUnitService = new TransportationUnitService();
        this.modalHTMLelement = document.getElementById("modal");
        this.overlayHTMLelement = (document.getElementById("overlay"));
        this.table = document.getElementById("mainTable");
        this.initEventListeners();
    }
    start() {
        this.transportationUnitService
            .findAll()
            .forEach((transportationUnit) => {
            transportationUnit.start();
            this.addToMainTable(transportationUnit);
        });
        setInterval(() => this.updateDom(), 120);
    }
    initEventListeners() {
        const addButtonHandler = document.getElementById("addButton");
        addButtonHandler?.addEventListener("click", (e) => this.handleAddButton(e));
        const cancelModalButtonHandler = document.getElementById("cancelModal");
        cancelModalButtonHandler?.addEventListener("click", (e) => this.handleCancelModal(e));
        const createTransportationUnitButtonHandler = document.getElementById("createTransportationUnit");
        createTransportationUnitButtonHandler?.addEventListener("click", (e) => this.handleCreateTransportationUnit(e));
    }
    addToMainTable(transportationUnit) {
        const htmlTableRowElement = (this.table?.insertRow());
        htmlTableRowElement.id = transportationUnit.id.toString();
        let htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "id";
        htmlTableCellElement.appendChild(this.getHTMLText(transportationUnit.id.toString()));
        htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "name";
        htmlTableCellElement.appendChild(this.getHTMLText(transportationUnit.constructor.name));
        htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "title";
        htmlTableCellElement.appendChild(this.getHTMLText(transportationUnit.speed.toString()));
        htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "distance";
        htmlTableCellElement.appendChild(this.getHTMLText(transportationUnit.distance.toString()));
        htmlTableCellElement = (htmlTableRowElement.insertCell());
        htmlTableCellElement.title = "action";
        htmlTableCellElement.appendChild(this.getTransportationUnitActionButton(transportationUnit));
    }
    getHTMLText(textString) {
        return document.createTextNode(textString);
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
    handleAddButton(e) {
        e.preventDefault();
        if (this.modalHTMLelement && this.overlayHTMLelement) {
            this.modalHTMLelement.classList.add("active");
            this.overlayHTMLelement.classList.add("active");
        }
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
    handleCancelModal(e) {
        e.preventDefault();
        this.closeModal();
    }
    handleCreateTransportationUnit(e) {
        e.preventDefault();
        const modalValuesDTO = this.getModalValuesDTO();
        const transportationUnit = this.transportationUnitService.createNewTransportationUnit(modalValuesDTO);
        this.addToMainTable(transportationUnit);
        this.closeModal();
    }
    getModalValuesDTO() {
        let transportationUnitType = this.getInputValue("transportationUnitType");
        let speed = this.getInputValue("speed");
        return {
            transportationUnitType: transportationUnitType,
            speed: speed,
        };
    }
    getInputValue(inputId) {
        let input = document.getElementById(inputId);
        return input?.value;
    }
    closeModal() {
        if (this.modalHTMLelement && this.overlayHTMLelement) {
            this.modalHTMLelement.classList.remove("active");
            this.overlayHTMLelement.classList.remove("active");
        }
    }
    updateDom() {
        this.transportationUnitService
            .findAll()
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
