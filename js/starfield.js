/****************************************************************
 CLASS: Starfield
 ****************************************************************/
class Starfield{
    constructor(){
        // generate an array that contains 10% of the canvas size pixels
        this.stars = [];

    }

    // fill the array with pixels in three different colors
    fillStarfield(){
        for (let y=0; y < canvas.height; y++) {
            for (let x=0; x < canvas.width; x++){
                this.fillMethod2(x, y);
            }
        }
    }

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
            ctx.fillStyle = this.stars[i].color;
            // Rectangles
            //ctx.fillRect(this.stars[i].x, this.stars[i].y, this.stars[i].size,  this.stars[i].size);

            // Circles
            ctx.beginPath();
            ctx.arc(this.stars[i].x, this.stars[i].y, this.stars[i].size, 0, 2 * Math.PI, true);
            ctx.fill();
        }
    }
}