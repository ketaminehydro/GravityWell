/****************************************************************
 CLASS: Player
 ****************************************************************/
class Player extends GameObject {
    constructor(x, y, orientation) {
        super(x, y, orientation);

        // img
        this.setSpriteImage("img/rocket_idle.png");

        // hitbox
        this.hitBox.setSize(40);
        this.hitBox.setPositionOffset(0, -15);

        // animation images
        this.playerShipImageForwardThrust = new Image;
        this.playerShipImageForwardThrust.src ="img/rocket_forwardthrust.png";

        // animation transitions and timers
        this.animationDuration = 500;                          // in milliseconds
        this.forwardThrustTimer = this.animationDuration;       // in milliseconds
        this.isForwardThrust = false;

        // weapon
        this.weaponCoolDown = 500;                          // in milliseconds
        this.weaponCoolDownTimer = this.weaponCoolDown;     // in milliseconds
        this.isWeaponCoolDown = false;

        // specs
        this.yawSpeed = 10;     // in degrees / sec
        this.thrust = 5;        // in pixel / sec

        // debug
        this.isShowDebugInfo = true;
        this.isShowDebugStats = true;
    }

    move(input){
        let magnitude, newvx, newvy, newMagnitude;

        switch (input){
            case THRUST_FORWARD:
                // calculate new velocity
                this.vx += this.thrust * Math.sin(this.orientation);
                this.vy += this.thrust * Math.cos(this.orientation) * (-1);

                // set state
                this.isForwardThrust = true;

                break;

            case YAW_LEFT:
                this.orientation -= this.yawSpeed  * Math.PI / 180; // into radians
                this.angularSpeed = 0; 
                break;

            case YAW_RIGHT:
                this.orientation += this.yawSpeed  * Math.PI / 180; // into radians
                this.angularSpeed = 0; 
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
        if(this.isWeaponCoolDown){
            return null;
        }
        else {
            let torpedo = new Torpedo(this.x, this.y, this.orientation);
            this.isWeaponCoolDown = true;
            return torpedo;
       }
    }

    update(milliSecondsPassed){
        super.update(milliSecondsPassed);

        // animation timer
        if(this.isForwardThrust){
            this.forwardThrustTimer -= milliSecondsPassed;
            if(this.forwardThrustTimer <= 0) {
                this.isForwardThrust = false;
                this.setSpriteImage("img/rocket_idle.png");
                this.forwardThrustTimer = this.animationDuration;
            }
        }

        // weapon cooldown timer
        if(this.isWeaponCoolDown){
            this.weaponCoolDownTimer -= milliSecondsPassed;
            if(this.weaponCoolDownTimer <= 0){
                this.isWeaponCoolDown = false;
                this.weaponCoolDownTimer = this.weaponCoolDown;
            }    
        }
    }

    draw(){
        // draw states
        if(this.isForwardThrust){
            this.setSpriteImage("img/rocket_forwardthrust.png");
        }
        super.draw();
    }

    // override: speed is limited for the player. this.maxSpeed = DEBUG_INFO_SIZE
    displayDebugVelocity(){
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.moveTo(0,0);
        let x = this.vx  * DEBUG_INFO_SIZE  / this.maxSpeed;
        let y = this.vy  * DEBUG_INFO_SIZE  / this.maxSpeed;
        ctx.lineTo(x,y);
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();
        ctx.restore();
    }
}