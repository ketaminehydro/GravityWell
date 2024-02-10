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

        this._isShowDebugGfx = true;
        this._isShowDebugInfo = true;

    }

    update(milliSecondsPassed){
    }

    getForce(){
        return this._force;
    }

    //override
    draw(){           
        // move origin
        ctx.save();
        ctx.translate(this.x, this.y);

        // draw circle
        ctx.beginPath();
        ctx.arc(0, 0, this._width/2, 0, Math.PI * 2);
        ctx.strokeStyle = "#A8A3F1";
        ctx.stroke();

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