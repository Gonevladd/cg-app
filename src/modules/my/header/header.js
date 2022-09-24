import {LightningElement, track} from "lwc";

export default class Header extends LightningElement{
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded
    @track isModalOpen = false;
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
        let data = {fractalIsShown: true, colorIsShown: false, moveIsShown: false};
        let ev = new CustomEvent('childmethod', {detail: data});
        this.dispatchEvent(ev);
    }

    callColorParent(event){
        let data = {fractalIsShown: false, colorIsShown: true, moveIsShown: false};
        let ev = new CustomEvent('childmethod', {detail: data});
        this.dispatchEvent(ev);
    }

    callMoveParent(event){
        let data = {fractalIsShown: false, colorIsShown: false, moveIsShown: true};
        let ev = new CustomEvent('childmethod', {detail: data});
        this.dispatchEvent(ev);
    }
}