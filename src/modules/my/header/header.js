import {LightningElement, track} from "lwc";

export default class Header extends LightningElement{
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded
    @track isModalOpen = false;
    @track fractalActiveCss = "slds-button header-button btn-active";
    @track colorActiveCss = "slds-button header-button";
    @track moveActiveCss = "slds-button header-button";
    @track fractalActive = true;
    @track colorActive = false;
    @track moveActive = false;

    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }

    callFractalParent(event){
        this.fractalActiveCss = "slds-button header-button btn-active";
        this.colorActiveCss = "slds-button header-button";
        this.moveActiveCss = "slds-button header-button";
        this.fractalActive = true;
        this.colorActive = false;
        this.moveActive = false;

        let data = {fractalIsShown: true, colorIsShown: false, moveIsShown: false};
        let ev = new CustomEvent('childmethod', {detail: data});
        this.dispatchEvent(ev);
    }

    callColorParent(event){
        this.fractalActiveCss = "slds-button header-button";
        this.colorActiveCss = "slds-button header-button btn-active";
        this.moveActiveCss = "slds-button header-button";
        this.fractalActive = false;
        this.colorActive = true;
        this.moveActive = false;

        let data = {fractalIsShown: false, colorIsShown: true, moveIsShown: false};
        let ev = new CustomEvent('childmethod', {detail: data});
        this.dispatchEvent(ev);
    }

    callMoveParent(event){
        this.fractalActiveCss = "slds-button header-button";
        this.colorActiveCss = "slds-button header-button";
        this.moveActiveCss = "slds-button header-button btn-active";
        this.fractalActive = false;
        this.colorActive = false;
        this.moveActive = true;

        let data = {fractalIsShown: false, colorIsShown: false, moveIsShown: true};
        let ev = new CustomEvent('childmethod', {detail: data});
        this.dispatchEvent(ev);
    }
}