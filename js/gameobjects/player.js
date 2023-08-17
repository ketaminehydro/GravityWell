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

        // type
        this._gameObjectType = GAMEOBJECT_TYPE.PLAYER;

        // debug
        this._isShowDebugInfo = true;
        this._isShowDebugStats = true;
    }

    move(input){
        let magnitude, newMagnitude;

        switch (input){
            case PLAYER_ACTION.THRUST_FORWARD:
                // calculate new velocity
                this.vx += this.thrust * Math.sin(this._orientation);
                this.vy += this.thrust * Math.cos(this._orientation) * (-1);

                // set state
                this.isForwardThrust = true;

                break;

            case PLAYER_ACTION.YAW_LEFT:
                this._orientation -= this.yawSpeed  * Math.PI / 180; // into radians
                this.angularSpeed = 0; 
                break;

            case PLAYER_ACTION.YAW_RIGHT:
                this._orientation += this.yawSpeed  * Math.PI / 180; // into radians
                this.angularSpeed = 0; 
                break;

            case PLAYER_ACTION.REDUCE_SPEED:           
                // reduce the speed
                magnitude = VectorMath.calculateMagnitude(this.vx, this.vy);
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
            // torpedo needs to spawn outside of player's hitbox 
            let tox = Math.sin(this._orientation) * (this.hitBox.getSize()+30);  // torpedosize = 20:
            let toy = Math.cos(this._orientation) * (this.hitBox.getSize()+30);
            let tx = this.x + tox;
            let ty = this.y - toy;

            let torpedo = new Torpedo(tx, ty, this._orientation);
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
}