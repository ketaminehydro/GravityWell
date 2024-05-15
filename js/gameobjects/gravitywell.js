/****************************************************************
 CLASS: GravityWell
 ****************************************************************/
class GravityWell extends GameObject {
    constructor(x, y, size, force) {
        super(x, y, 0);

        // gameobject type
        this._gameObjectType = GAMEOBJECT_TYPE.GRAVITYWELL;

        // stats
        this._force = force;
        this.setSize(size, size);
        this.hitBox.setSize(size/2);       

        // images 
        this._imageDataSource = backgroundCtx.getImageData(0, 0, canvas.width, canvas.height);
        this._imageDataDestination = ctx.createImageData(this._width, this._height);
        this._srcdata = this._imageDataSource.data;
        this._dstdata = this._imageDataDestination.data;
 
        // debug
        this.vx = 100;
        this.vy = 50;

        // settings for debugger
        this._isShowDebugGfx = false;
        this._isShowDebugInfo = false;
    }

    getForce(){
        return this._force;
    }


    smootherstep(t) {
        //return 1/(Math.exp(-5*t+Math.E)) - Math.exp(-Math.E);
        //return 1 / (Math.exp(-6 * t + 3)) - Math.exp(-3);
        return 1 / (Math.exp(-4 * t + 3)) - Math.exp(-3);
    }

    update(milliSecondsPassed){
        super.update(milliSecondsPassed);

        this.calculateDistortion();
    }

    calculateDistortion(){    

        // define the area of effect
        let r = this._height/2;

        //console.log("s: "+this._width+", "+this._height);
    
        // calculate distortion
        var tol = -15;
        var maxSize = canvas.width * (canvas.height - 1) + canvas.width - 1;
    
        for (let y = 0; y < this._height; y++) {
            let indexDst = (0 + y * this._height) * 4;      
            for (let x = 0; x < this._width; x++) {

                let x1 = x - this._width/2;
                let y1 = y - this._height/2;
                let d = Math.sqrt(x1 * x1 + y1 * y1);       // Pythagoras: distance to center
                if (d <= r) {                               // only draw if within circular area

                    // displacement factor
                    let sc = 1 - this.smootherstep((r - d) / r);                                
                    let xx = Math.floor(this.x + x1 * sc);
                    let yy = Math.floor(this.y + y1 * sc);
    
                    // antialiasing
                    if (sc < tol * 0.9 && sc > tol * 1.1)
                        sc = 0.9;
                    else if (sc < tol)
                        sc = 0.1;
                    else
                        sc = 1;

                    // create new image              
                    let indexSrc = ((xx + yy * canvas.width) % maxSize) * 4; // pixel position on canvas multiplied by 4 (as in 4 channels, i.e. 4 bytes)
                    this._dstdata[indexDst++] = sc * this._srcdata[indexSrc + 0];            // r
                    this._dstdata[indexDst++] = sc * this._srcdata[indexSrc + 1];            // g
                    this._dstdata[indexDst++] = sc * this._srcdata[indexSrc + 2];            // b

                    // for debugging
                    let transparency = 255 * (r-(Math.sqrt(d)*10))/r;
                    this._dstdata[indexDst++] = transparency;                    

                    //this._dstdata[indexDst++] = 255 * (r-d*1)/r;                               // a
                                    
                } else {
                    indexDst = indexDst + 4;
                }
            }
        }
    }

    //override
     draw(){       
    
        // draw distorted image     
        ctx.putImageData(this._imageDataDestination, this.x-this._width/2, this.y-this._height/2);

        // move origin
        ctx.save();
        ctx.translate(this.x, this.y);

        // draw circle
        ctx.beginPath();
        ctx.arc(0, 0, this._width/2, 0, Math.PI * 2);
        ctx.strokeStyle = "#101044";
        ctx.stroke();

        // draw disk
        ctx.beginPath();
        ctx.arc(0,0,this._width/20,0,Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();

        ctx.restore();


        // display debug info
        if(this._isShowDebugInfo) {
            this.displayDebugInfo();
        }

        // display debug graphics
        if(this._isShowDebugGfx) {
            //this.displayDebugDot();
            //this.displayDebugOrientation();
            //this.displayDebugVelocity();
            this.displayDebugHitBox();
        }  
    }
}