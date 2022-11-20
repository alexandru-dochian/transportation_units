import ModalValuesDTO from "./resources/ModalValuesDTO.js";

export default class CreateTransportationUnitModal {
    private modalHTMLElement: HTMLElement | undefined;
    private overlayHTMLelement: HTMLElement | null;
    private onModalSuccess: (modalValuesDTO: ModalValuesDTO) => void;

    constructor(onModalSuccess: (modalValuesDTO: ModalValuesDTO) => void) {
        this.modalHTMLElement = <HTMLElement>(
            document.getElementById("createTransportationUnitModal")
        );
        this.overlayHTMLelement = <HTMLElement>(
            document.getElementById("overlay")
        );
        this.onModalSuccess = onModalSuccess;
        this.initEventListeners();
    }

    private initEventListeners(): void {
        document
            .getElementById("addButton")
            ?.addEventListener("click", (e) => this.handleAddButton(e));
        document
            .getElementById("cancelModal")
            ?.addEventListener("click", (e) => this.handleCancelModal(e));
        document
            .getElementById("createTransportationUnit")
            ?.addEventListener("click", (e) =>
                this.handleCreateTransportationUnit(e)
            );
    }

    private handleAddButton(e: MouseEvent): void {
        e.preventDefault();
        if (this.modalHTMLElement && this.overlayHTMLelement) {
            this.modalHTMLElement.classList.add("active");
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
        this.onModalSuccess(modalValuesDTO);
        this.closeModal();
    }

    private closeModal(): void {
        if (this.modalHTMLElement && this.overlayHTMLelement) {
            this.modalHTMLElement.classList.remove("active");
            this.overlayHTMLelement.classList.remove("active");
        }
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
}
