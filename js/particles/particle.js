/****************************************************************
 CLASS: Particle
 ****************************************************************/
class Particle{
    constructor(x, y, vx, vy, color, size, lifespan){
        // position
        this.x = x;
        this.y = y;

        // velocity
        this.vx = vx;
        this.vy = vy;

        // color
        this.color = color;

        // size
        this.size = size;     // in px
        
        // lifespan
        this._lifespan = lifespan // in ms
        this._lifetime = 0;        

        this._isDeleted = false;
    }

    getIsDeleted(){
        return this._isDeleted;
    }

    advanceLifeCycle(milliSecondsPassed){
        // diminish lifetime
         this._lifetime += milliSecondsPassed;     

         // At end of lifetime: die
        if(this._lifetime >= this._lifespan){
            this._isDeleted = true;
        }    
    }

    draw(){
        ctx.fillStyle = this.color;

        // Circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}