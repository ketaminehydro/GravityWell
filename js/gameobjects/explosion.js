/****************************************************************
 CLASS: Explosion
 ****************************************************************/
class Explosion extends GameObject {
    constructor(x, y, orientation, force) {
        super(x, y, orientation);

        // stats
        this._maxExplosionSize = 100;
        this._force = force;       // in Newton
        this.setSize(10,10);
        this.hitBox.setSize(10);

        // img
        // debug
        //this.setSpriteImage("img/placeholder_explosion.png");
        //this.setSpriteImage("");
        //this.sprite.initialiseEmpty();

        // type
        this._gameObjectType = GAMEOBJECT_TYPE.EXPLOSION;

        // lifespan
        this._lifespan = 500 // in ms
        this._lifetime = 0;

        // already collided with these objects
        this._collidedWith = [];

        // debug
        this._isShowDebugGfx = false;
    }

    getForce(){
        return this._force;
    }

    getMaxExplosionSize(){
        return this._maxExplosionSize;
    }

    markCollidedWith(obj){
        this._collidedWith.push(obj);
    }

    hasCollidedWith(obj){
        let hasCollided = false;
        let i = 0;

        while (!hasCollided && i < this._collidedWith.length){
            
            if(this._collidedWith[i] == obj){
                hasCollided = true;
            }

            i++;
        }
        return hasCollided;
    }

    // override
    update(milliSecondsPassed){
        // diminish lifetime
        this._lifetime += milliSecondsPassed;

        // first 20% of lifetime: blow up explosion (and hitbox)
        if( (this._lifetime / (this._lifespan/5)) <= 1){
            let size = this._lifetime / (this._lifespan / 5) * this._maxExplosionSize;   
            this.setSize(size*2, size*2);
            this.hitBox.setSize(size);
        }
        else{
            this.setSize(this._maxExplosionSize*2, this._maxExplosionSize*2);
            this.hitBox.setSize(this._maxExplosionSize);
        }

        // At end of lifetime: die
        if(this._lifetime >= this._lifespan){
            this._isDeleted = true;
        }

    }

    // override
    draw(){           
        super.draw();
        
        // move origin
        ctx.save();
        ctx.translate(this.x, this.y);

        // draw circles (inner to outer);
        ctx.beginPath();
        ctx.arc(0, 0, this._width/16, 0, Math.PI * 2);
        ctx.strokeStyle = "#000000";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this._width/8, 0, Math.PI * 2);
        ctx.strokeStyle = "#000000";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this._width/4, 0, Math.PI * 2);
        ctx.strokeStyle = "#333300";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this._width/3, 0, Math.PI * 2);
        ctx.strokeStyle = "#999900";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this._width/2, 0, Math.PI * 2);
        ctx.strokeStyle = "#aaaa00";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this._width/1.5, 0, Math.PI * 2);
        ctx.strokeStyle = "#ffff00";
        ctx.stroke();

        ctx.restore();
    }
}