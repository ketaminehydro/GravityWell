/****************************************************************
 CLASS: Player
 ****************************************************************/
class Player {
    constructor() {
        // hitbox size
        this.hitboxSize = 7;      // todo: define related to canvas size (in pixel)

        // img
        this.playerShipImage = new Image;
        this.playerShipImage.src = "img/rocket_idle.png";
        this.playerShipImageForwardThrust = new Image;
        this.playerShipImageForwardThrust.src ="img/rocket_forwardthrust.png";

        // image transitions and timers
        this.animationDuration = 500;                          // in milliseconds
        this.forwardThrustTimer = this.animationDuration;       // in milliseconds

        // position
        this.x = canvas.width / 2;   // center of canvas
        this.y = canvas.height / 2;
        this.orientation = 0;          // in radians

        // velocity
        this.vx = 0;
        this.vy = 0;

        // specs
        this.yawSpeed = 10;     // in degrees
        this.thrust = 3;        // todo: define unit
        this.maxSpeed = 10;     // todo: define unit

        // states
        this.isForwardThrust = false;
        this.isShowDebugStats = true;
    }

    handleBoundaries(){
        if(this.x >= canvas.width){
            this.x = canvas.width;
            this.vx = 0;
        }
        else if(this.x <= 0){
            this.x = 0;
            this.vx = 0;
        }

        if (this.y >= canvas.height){
            this.y = canvas.height;
            this.vy = 0;
        }
        else if(this.y <= 0){
            this.y = 0;
            this.vy = 0;
        }
    }

    move(direction){
        let magnitude, newvx, newvy, newMagnitude;

        switch (direction){
            case THRUST_FORWARD:
                // calculate new velocity
                newvx = this.vx + this.thrust * Math.sin(this.attitude);
                newvy = this.vy + this.thrust * Math.cos(this.attitude) * (-1);

                // limit the speed
                newMagnitude = Math.sqrt(newvx * newvx + newvy * newvy);
                if( newMagnitude >= this.maxSpeed){
                    this.vx = newvx / newMagnitude * this.maxSpeed;
                    this.vy = newvy / newMagnitude * this.maxSpeed;
                }
                else{
                    this.vx = newvx;
                    this.vy = newvy;
                }

                // set state
                this.isForwardThrust = true;

                break;

            case YAW_LEFT:
                this.attitude -= this.yawSpeed  * Math.PI / 180; // into radians
                break;

            case YAW_RIGHT:
                this.attitude += this.yawSpeed  * Math.PI / 180; // into radians
                break;

            case THRUST_BACKWARDS:
                // reduce the speed
                magnitude = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                newMagnitude = magnitude - this.thrust/2;
                if( newMagnitude <= 0){
                    this.vx = 0;
                    this.vy = 0;
                }
                else{
                    this.vx = this.vx/magnitude * newMagnitude;
                    this.vy = this.vy/magnitude * newMagnitude;
                }
                break;
        }
    }

    shootTorpedo(){
        console.log("pow");
        let torpedo = new Torpedo(this.x, this.y, Math.sin(this.attitude), -Math.cos(this.attitude));
        return torpedo;
    }

    toggleShowDebugStats(){
        this.isShowDebugStats = !(this.isShowDebugStats);
    }

    update(milliSecondsPassed){
        // update position
        this.x += this.vx;
        this.y += this.vy;

        this.handleBoundaries();

        // animation timer
        if(this.isForwardThrust){
            this.forwardThrustTimer -= milliSecondsPassed;
            if(this.forwardThrustTimer <= 0) {
                this.isForwardThrust = false;
                this.forwardThrustTimer = this.animationDuration;
            }
        }
        //console.log(this.isForwardThrust+" : "+this.forwardThrustTimer);

    }

    draw(){
        // chose draw sizes relative to canvas size
        let shipSpriteSize = Math.floor(Math.min(canvas.width, canvas.height) / 16);

        // display debug statistics
        if(this.isShowDebugStats) {
            this.displayDebugInfo();
            this.displayDebugThrustVector();
            this.displayDebugAttitude();
        }

        // draw ship
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.attitude);
        ctx.drawImage(this.playerShipImage, -Math.floor(shipSpriteSize/2), -Math.floor(shipSpriteSize/2), shipSpriteSize, shipSpriteSize);

        // draw states
        if(this.isForwardThrust){
            ctx.drawImage(this.playerShipImageForwardThrust, -Math.floor(shipSpriteSize/2), -Math.floor(shipSpriteSize/2), shipSpriteSize, shipSpriteSize);
        }
        ctx.restore();


    }

    /***********************************************************************/

    displayDebugInfo(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = "white";
        ctx.font = "1em Monospace";
        ctx.fillText("x: "+this.x.toFixed(1), 10, 50);
        ctx.fillText("y: "+this.y.toFixed(1), 80, 50);
        ctx.fillText("vx: "+this.vx.toFixed(1), 10, 70);
        ctx.fillText("vy: "+this.vy.toFixed(1), 80, 70);
        ctx.fillText("Speed: "+Math.sqrt(this.vx*this.vx+this.vy*this.vy).toFixed(1)+" /"+this.maxSpeed, 10, 90);
        ctx.fillText("Attitude: "+(Math.abs((this.attitude * 180 / Math.PI)%360)).toFixed(1)+"°", 10, 110);
        ctx.restore();
    }

    displayDebugThrustVector(){
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.moveTo(0,0);

        let x = 200 * Math.sin(this.attitude);
        let y = -200 * Math.cos(this.attitude);
        ctx.lineTo(x,y);

        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
    }

    displayDebugAttitude(){
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.moveTo(0,0);
        let x = this.vx * 25;
        let y = this.vy * 25;
        ctx.lineTo(x,y);
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.restore();
    }
}