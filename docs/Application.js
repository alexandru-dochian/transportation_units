import * as transportationUnitsService from "./services/transportationUnitsService.js";
export class Application {
    transportationUnits;
    modalHTMLelement;
    overlayHTMLelement;
    constructor() {
        this.transportationUnits = transportationUnitsService.getInitialTransportationUnits();
        this.modalHTMLelement = document.getElementById("modal");
        this.overlayHTMLelement = document.getElementById("overlay");
        this.initEventListeners();
    }
    initEventListeners() {
        const addButtonHandler = document.getElementById("addButton");
        addButtonHandler?.addEventListener("click", (e) => this.handleAddButton(e));
        const cancelModalButtonHandler = document.getElementById("cancelModal");
        cancelModalButtonHandler?.addEventListener("click", (e) => this.handleCancelModal(e));
        const createTransportationUnitButtonHandler = document.getElementById("createTransportationUnit");
        createTransportationUnitButtonHandler?.addEventListener("click", (e) => this.handleCreateTransportationUnit(e));
    }
    start() {
        this.transportationUnits.forEach(transportationUnit => transportationUnit.start());
        setInterval(() => this.updateDom(), 1000);
    }
    handleAddButton(e) {
        e.preventDefault();
        if (this.modalHTMLelement && this.overlayHTMLelement) {
            this.modalHTMLelement.classList.add("active");
            this.overlayHTMLelement.classList.add("active");
        }
    }
    handleCancelModal(e) {
        e.preventDefault();
        this.closeModal();
    }
    handleCreateTransportationUnit(e) {
        e.preventDefault();
        const modalValuesDTO = this.getModalValuesDTO();
        this.closeModal();
    }
    getModalValuesDTO() {
        let transportationUnitType = this.getInputValue("transportationUnitType");
        let speed = this.getInputValue("speed");
        return {
            "transportationUnitType": transportationUnitType,
            "speed": speed
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
    }
}
