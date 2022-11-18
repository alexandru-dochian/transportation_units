import TransportationUnit from "./abstract/TransportationUnit.js";
import ModalValuesDTO from "./dto/ModalValuesDTO.js";
import * as transportationUnitsService from "./services/transportationUnitsService.js";

export class Application {
    transportationUnits: TransportationUnit[];
    modalHTMLelement: HTMLElement | null;
    overlayHTMLelement: HTMLElement | null;

    constructor() {
        this.transportationUnits = transportationUnitsService.getInitialTransportationUnits();
        this.modalHTMLelement = document.getElementById("modal");
        this.overlayHTMLelement = document.getElementById("overlay");
        this.initEventListeners();
    }

    private initEventListeners(): void {
        const addButtonHandler = document.getElementById("addButton");
        addButtonHandler?.addEventListener("click", (e) => this.handleAddButton(e));

        const cancelModalButtonHandler = document.getElementById("cancelModal")
        cancelModalButtonHandler?.addEventListener("click", (e) => this.handleCancelModal(e));

        const createTransportationUnitButtonHandler = document.getElementById("createTransportationUnit")
        createTransportationUnitButtonHandler?.addEventListener("click", (e) => this.handleCreateTransportationUnit(e));
    }

    public start(): void {
        this.transportationUnits.forEach(transportationUnit => transportationUnit.start());
        setInterval(() => this.updateDom(), 1000);
    }

    private handleAddButton(e: MouseEvent): void {
        e.preventDefault()
        if (this.modalHTMLelement && this.overlayHTMLelement) {
            this.modalHTMLelement.classList.add("active");    
            this.overlayHTMLelement.classList.add("active");     
        }
    }

    private handleCancelModal(e: MouseEvent): void {
        e.preventDefault();
        this.closeModal();
    }

    private handleCreateTransportationUnit(e: MouseEvent): void {
        e.preventDefault();
        const modalValuesDTO: ModalValuesDTO = this.getModalValuesDTO();
        this.closeModal()
    }

    private getModalValuesDTO() : ModalValuesDTO {
        let transportationUnitType = this.getInputValue("transportationUnitType") 
        let speed = this.getInputValue("speed") 
        
        return {
            "transportationUnitType": transportationUnitType,
            "speed": speed
        }
    }

    private getInputValue(inputId: string) : any {
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
    }
}