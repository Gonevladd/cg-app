import {LightningElement, track} from "lwc";

export default class Color extends LightningElement{
    @track path;
    @track showImage = false;
    image;
    // imgCanvas;

    changePhoto(){

    }

    uploadPhoto(event){
        console.log(event.target.files[0].name);
        this.showImage = true;
        this.path = "../../../resources/" + event.target.files[0].name;
    }

    renderedCallback() {
        this.image = this.template.querySelector('img');
    }

    downloadImage() {
        let imgCanvas = document.createElement('canvas');
        let imgContext = imgCanvas.getContext("2d");
        // Make sure canvas is as big as the picture
        imgCanvas.width = this.image.width;
        imgCanvas.height = this.image.height;

        // Draw image into canvas element
        imgContext.drawImage(this.image, 0, 0, this.image.width, this.image.height);

        // Get canvas contents as a data URL
        let data = imgCanvas.toDataURL("image/jpeg", 1.0), filename = 'image.jpeg';

        let a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }
}