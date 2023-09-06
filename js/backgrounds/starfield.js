/****************************************************************
 CLASS: Starfield
 ****************************************************************/
class Starfield{
    constructor(){
        // generate an array that contains the stars
        this.stars = [];

        // draw on the background canvas
        this._ctx = backgroundCtx;
    }

    // fill the array with pixels in three different colors
    fillStarfield(){
        for (let y=0; y < canvas.height; y++) {
            for (let x=0; x < canvas.width; x++){
                this.fillMethod2(x, y);
            }
        }
    }

    // Obsolete method. // FIXME: if not used in the final version of the game, delete this method
    // go through each pixel of the canvas. Randomly decide whether the pixel is a star or not 
    // and at the same time decide upon its color.
    // a second random number decides the size of the star.  
    fillMethod1(x, y){
        let color = Math.floor(Math.random()*(50000-0+1))+0;
        let size = Math.floor(Math.random()*(3-0+1))+0;
        switch(color){
            case 1:
                this.stars.push({x : x, y: y, color : "#fcf46f", size: size});
                break;
            case 2:
                this.stars.push({x : x, y :y, color: "#c8262d", size: size});
                break;
            case 3:
                this.stars.push({x: x, y : y, color: "#4477ff", size: size});
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                this.stars.push({x : x, y : y, color: "#cccccc", size: size});
                break;
            default:
            // do nothing
        }
    }

    // better method: 
    // go through each pixel of the canvas. Randomly decide whether the pixel is a star or not.
    // select a random color for the star: distribution of the 5 possible colors is not equal
    // select a random size for the star: distribution of the 3 possible sizes is not equal
    fillMethod2(x, y){
        let star = Math.random();
        if(star < 0.0002){
            // color
            let randomColor = Math.random();
            let color;

            if(randomColor < 0.6){
                color = "#cccccc";
            }
            else if(randomColor < 0.8){
                color = "#ffffff";
            }
            else if(randomColor < 0.9){
                color = "#fcf46f";
            }
            else if(randomColor < 0.95){
                color = "#c8262d";
            }
            else{
                color = "#4477ff";
            }

            // size
            let randomSize = Math.random();
            let size;

            if(randomSize < 0.7){
                size = 1;
            }
            else if(randomSize < 0.9){
                size = 2;
            }
            else{
                size = 3;
            }

            this.stars.push({x: x , y: y, color: color, size: size});
        }
    }

    draw(){
        for(let i=0; i < this.stars.length; i++){
            this._ctx.fillStyle = this.stars[i].color;

            // Stars are circles
            this._ctx.beginPath();
            this._ctx.arc(this.stars[i].x, this.stars[i].y, this.stars[i].size, 0, 2 * Math.PI, true);
            this._ctx.fill();
        }
    }
}