/****************************************************************
 CLASS: Torpedo v1
 ****************************************************************/
class Torpedo_v1 {
    constructor(x, y, dx, dy){
        // stats
        this.color = "rgb(255,0,0)";
        this.size = 7;                      // todo: define unit
        this.speed = 10;                    // todo: define unit

        // start position
        this.x = x;
        this.y = y;

        let magnitude = Math.sqrt(dx * dx + dy * dy);

        this.vx = dx/magnitude * this.speed ;
        this.vy = dy/magnitude * this.speed;


        this.isDestroyed = false;
    }

    handleBoundaries(){
        if(this.x >= canvas.width){
            this.isDestroyed = true;
        }
        else if(this.x <= 0){
            this.isDestroyed = true;
        }

        if(this.y >= canvas.height){
            this.isDestroyed = true;
        }
        else if(this.y <= 0){
            this.isDestroyed = true;
        }
    }

    update(milliSecondsPassed){
        // update position
        this.x += this.vx;
        this.y += this.vy;

        this.handleBoundaries();
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}