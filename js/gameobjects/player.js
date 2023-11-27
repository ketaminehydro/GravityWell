/****************************************************************
 CLASS: Player
 ****************************************************************/
class Player extends GameObject {
    constructor(x, y, orientation, playerNumber) {
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

        // ship handling
        this.yawSpeed = 5;     // in degrees / sec
        this.thrust = 5;        // in pixel / sec

        // player number
        this._playerNumber = playerNumber;
        // TODO: players need to have different sprites

        // hitpoints
        this._fullHitPoints = 3;
        this._hitPoints = 3;

        // score
        this._score = 0;

        // lives
        this._lives = 3;

        // player is in game
        this.isPlaying = false;

        // set all the values
        this.reset();

        // weapon
        this.weaponCoolDown = 500;                          // in milliseconds
        this.weaponCoolDownTimer = this.weaponCoolDown;     // in milliseconds
        this.isWeaponCoolDown = false;

        // gameobject type
        this._gameObjectType = GAMEOBJECT_TYPE.PLAYER;
    }

    move(input){
        let magnitude, newMagnitude;

        switch (input){
            case PLAYER_ACTION.THRUST_FORWARD:
                // calculate new velocity
                this.vx += this.thrust * Math.sin(this.orientation);
                this.vy += this.thrust * Math.cos(this.orientation) * (-1);

                // set state
                this.isForwardThrust = true;

                break;

            case PLAYER_ACTION.YAW_LEFT:
                this.orientation -= this.yawSpeed  * Math.PI / 180; // into radians
                this.angularSpeed = 0; 
                break;

            case PLAYER_ACTION.YAW_RIGHT:
                this.orientation += this.yawSpeed  * Math.PI / 180; // into radians
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
    fire(){
        if(this.isWeaponCoolDown){
            return null;
        }
        else {
            // torpedo needs to spawn outside of player's hitbox 
            let tox = Math.sin(this.orientation) * (this.hitBox.getSize()+30);  // torpedosize = 20:
            let toy = Math.cos(this.orientation) * (this.hitBox.getSize()+30);
            let tx = this.x + tox;
            let ty = this.y - toy;

            objectFactory.generateTorpedo(tx, ty, this.orientation);
            
            this.isWeaponCoolDown = true;
       }
    }

    resetPosition(){
        this.setPosition(   canvas.width/2 -(NUMBER_OF_PLAYERS-1)/2*100 + (this._playerNumber-1)*100, 
                            this.y = canvas.height/2+100);
        this.setVelocity(0,0);
        this.angularSpeed = 0;
        this.setOrientation(0);
    }

    reset(){
        this._hitPoints = this._fullHitPoints;
        this._score = 0;
        this._lives = 3;
    }

    destroyShip(){
        // generate explosion particle effect
        objectFactory.generateParticleEffect(this.x, this.y, PARTICLE_EFFECT.CIRCULAR_EXPLOSION_BIG);

        this._lives--;

        // if no more lives: make player inactive
        if(this._lives < 0){
            this.isPlaying = false;
            this.setPosition(-1000, -1000);
            this.setVelocity(0,0);
        }
        // else: reset the player
        else {
            this._hitPoints = this._fullHitPoints;
            // TODO: explosion animation, wait, appear animatino, grace period
            this.resetPosition();
        }
    }

    update(milliSecondsPassed){
        if(!this.isPlaying){
            return;
        }

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

        // ship destroyed
        if(this._hitPoints <= 0){
            this.destroyShip();
        }

    }

    draw(){
        if(!this.isPlaying){
            return;
        }
 
        // draw states
        if(this.isForwardThrust){
            this.setSpriteImage("img/rocket_forwardthrust.png");
        }
        super.draw();
    }
}