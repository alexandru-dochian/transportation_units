export default class CreateTransportationUnitModal {
    modalHTMLElement;
    overlayHTMLelement;
    onModalSuccess;
    constructor(onModalSuccess) {
        this.modalHTMLElement = (document.getElementById("createTransportationUnitModal"));
        this.overlayHTMLelement = (document.getElementById("overlay"));
        this.onModalSuccess = onModalSuccess;
        this.initEventListeners();
    }
    initEventListeners() {
        document
            .getElementById("addButton")
            ?.addEventListener("click", (e) => this.handleAddButton(e));
        document
            .getElementById("cancelModal")
            ?.addEventListener("click", (e) => this.handleCancelModal(e));
        document
            .getElementById("createTransportationUnit")
            ?.addEventListener("click", (e) => this.handleCreateTransportationUnit(e));
    }
    handleAddButton(e) {
        e.preventDefault();
        if (this.modalHTMLElement && this.overlayHTMLelement) {
            this.modalHTMLElement.classList.add("active");
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
        this.onModalSuccess(modalValuesDTO);
        this.closeModal();
    }
    closeModal() {
        if (this.modalHTMLElement && this.overlayHTMLelement) {
            this.modalHTMLElement.classList.remove("active");
            this.overlayHTMLelement.classList.remove("active");
        }
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
}
