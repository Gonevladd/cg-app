
import {LightningElement} from "lwc";

const WIDTH = 650, HEIGHT = 500, ITERATIONS = 80, ZOOM_INDEX = 0.2, MOVE_INDEX = 50, COLOR_INDEX = 1;
let zoom = 1, moveX = 0, moveY = 0, colorChange = 1, x = 0, y = 0;
let fractalType = 1;


let colors = {
    ORANGE: 1,
    LIGHT_GREEN: 2,
    GREEN: 3,
    LIGHT_BLUE: 6,
    BLUE: 7,
    PURPLE: 8,
    PINK: 9,
    RED: 11,
}




//Complex Number object
function ComplexNumber(re, im) {
    this.re = re;
    this.im = im;
}

ComplexNumber.prototype.add = function(other){
    return new ComplexNumber(this.re + other.re, this.im + other.im);
}

ComplexNumber.prototype.mul = function(other){
    return new ComplexNumber(this.re * other.re - this.im * other.im, this.re * other.im + this.im * other.re);
}

ComplexNumber.prototype.abs = function(){
    return Math.sqrt(this.re * this.re + this.im * this.im);
}

ComplexNumber.prototype.sin = function(other){
    let xr = this.re,
        xi = this.im,
        wr = other.re,
        wi = other.im,
        ta = Math.cos(xr),
        tb = Math.sin(xr),
        tc = Math.exp(xi),
        td = Math.exp(-xi),
        te = 0.5 * tb * (tc + td),
        tf = 0.5 * ta * (tc - td),
        zr = wr * te - wi * tf,
        zi = wi * te + wr * tf;

    return new ComplexNumber(zr, zi);
}

ComplexNumber.prototype.cos = function (other){
    let xr = this.re,
        xi = this.im,
        wr = other.re,
        wi = other.im,
        ta = Math.cos(xr),
        tb = Math.sin(xr),
        tc = Math.exp(xi),
        td = Math.exp(-xi),
        te = 0.5 * ta * (tc + td),
        tf = 0.5 * tb * (tc - td),
        zr = wr * te + wi * tf,
        zi = wi * te - wr * tf;

    return new ComplexNumber(zr, zi);
}

let canvas, ctx;

export default class Fractal extends LightningElement {

    // constructor(){
    //     super();
        // this.template.addEventListener('mouseup', this.handleMouseUp.bind(this));
        // this.template.addEventListener('mousedown', this.handleMouseDown.bind(this));
        // this.template.addEventListener('mouseclick', this.handleMouseDown.bind(this));
    // }

    handleMouseUp(event){

        let rect = canvas.getBoundingClientRect(),
            newX = event.clientX - rect.left,
            newY = event.clientY - rect.top;
        if(newX <= 325 && newX >= 0){
            this.moveRight()
            console.log('Left');
        }
        if(newX > 325 && newX <= 650){
            this.moveLeft();
            console.log('Right');
        }
        if(newY >= 10 && newY <= 250){
            this.moveUp();
            console.log('Up');
        }
        if(newY > 250 && newY <= 500){
            this.moveDown();
            console.log('Down');
        }

        x = newX, y = newY;
        console.log(x + " " + y);
        this.draw(WIDTH, HEIGHT, ITERATIONS);
        // console.log(event);
    }

    handleMouseDown(event){
        console.log('Down');
    }

    //Check if this pixel belongs fractal or not
    belongs(re, im, iterations){
        let z, c = new ComplexNumber(re, im), i = 0;


        if(fractalType == 1){
            z = new ComplexNumber(Math.PI/2,Math.PI/20);
            // z = new ComplexNumber(Math.PI/2,Math.PI/2);
        }else if(fractalType == 2){
            z = new ComplexNumber(0,0);
        }else if(fractalType == 3){
            z = new ComplexNumber(Math.PI/4,Math.PI/4);
        }


        while(z.abs() < 100  && i < iterations){

            if(fractalType == 1){
                z = c.mul(z.sin(c));
            }else if(fractalType == 2){
                z = c.mul(z.cos(c));
            }else if(fractalType == 3){
                z = c.mul(z.sin(c)).mul(c.mul(z.cos(c)));
            }

            i++;
        }
        return i;
    }

    //Fill pixel 1 by 1 by color
    pixel(x, y, color){
        ctx.fillStyle = color;
        ctx.fillRect(x*zoom + moveX, y*zoom + moveY, 8*zoom, 8*zoom);
    }

    //Main function that paint fractal
    draw(width, height, maxIterations){
        let minRe = -3, maxRe = 3, minIm = -3, maxIm = 3, re = minRe,
            reStep = (maxRe - minRe) / width, imStep = (maxIm - minIm) / height;

        while(re < maxRe){
            let im = minIm;
            while(im < maxIm){
                let result = this.belongs(re, im, maxIterations);
                let x = (re - minRe) / reStep, y = (im - minIm) / imStep;

                if(result === maxIterations){
                    this.pixel(x, y, 'black');
                }else{
                    let h = 30 + Math.round(120 * result * 1.0 / maxIterations),
                        color = 'hsl(' + h * colorChange + ', 100%, 50%)';
                    this.pixel(x, y, color);
                }
                im += imStep/zoom;
            }
            re += reStep/zoom;
        }
    }

    //Setting up components
    renderedCallback() {
        // super.connectedCallback();
        canvas = this.template.querySelector('canvas'),  ctx = canvas.getContext("2d");
        this.draw(WIDTH, HEIGHT, ITERATIONS);
    }


    downloadImage() {
        let data = canvas.toDataURL("image/jpeg", 1.0), filename = 'fractal.jpeg';

        let a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }


    zoomIn(){
        zoom += ZOOM_INDEX;
        this.draw(WIDTH, HEIGHT, ITERATIONS);
    }

    zoomOut(){
        zoom -= ZOOM_INDEX;
        this.draw(WIDTH, HEIGHT, ITERATIONS);
    }

    moveRight(){
        moveX += MOVE_INDEX;
        this.draw(WIDTH, HEIGHT, ITERATIONS);
    }

    moveLeft(){
        moveX -= MOVE_INDEX;
        this.draw(WIDTH, HEIGHT, ITERATIONS);
    }

    moveDown(){
        moveY -= MOVE_INDEX;
        this.draw(WIDTH, HEIGHT, ITERATIONS);
    }

    moveUp(){
        moveY += MOVE_INDEX;
        this.draw(WIDTH, HEIGHT, ITERATIONS);
    }


    handleGetSelectedColor(event){
        colorChange = colors[event.target.value];
        this.draw(WIDTH, HEIGHT, ITERATIONS);
    }

    handleGetSelectedFractal(event){
        fractalType = event.target.value;
        this.draw(WIDTH, HEIGHT, ITERATIONS);
    }
}
