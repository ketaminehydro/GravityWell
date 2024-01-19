/****************************************************************
 CLASS: Player
 ****************************************************************/
class Player extends GameObject {
    constructor(x, y, orientation, playerNumber) {
        super(x, y, orientation);

        // gameobject type
        this._gameObjectType = GAMEOBJECT_TYPE.PLAYER;

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
        this.thrust = 10;        // in pixel / sec
        this._maxSpeed = 200;    // in pixel / sec

        // player number
        this._playerNumber = playerNumber;

        // hitpoints
        this._fullHitPoints = 3;
        this._hitPoints = -1;

        // score
        this._score = -1;

        // lives
        this._lives = -1;

        // player is in game
        this._isPlaying = false;

        //
        this.selectShip(PLAYER_SHIP_TYPE.DEFAULT);
        this.deactivate();

        // weapon
        this.weaponCoolDown = 500;                          // in milliseconds
        this.weaponCoolDownTimer = this.weaponCoolDown;     // in milliseconds
        this.isWeaponCoolDown = false;

        // TODO: players need to have different sprites
        this.sprite.initialise(
            {
                "file" : "img/rocket_idle.png",
                "spriteWidth" : 600,
                "spriteHeight" : 600,
                "states" : {
                    "default" : {
                        "frame1" : 1000,
                    }                                         
                }
            }
        );    

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
        if(this.isWeaponCoolDown || (stage.getStageState() !== STAGE_STATE.RUNNING) ){
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

    selectShip(shipType){
        // TODO: read stats from GameData via switch (type)    
    }

    activate(){
        this._isPlaying = true;
        //stage.getPlayingPlayers().push(stage.getAllPlayers().getElement(0));
        //console.log(stage.getPlayingPlayers());
        this._hitPoints = this._fullHitPoints;
        this._score = 0;
        this._lives = 3;
    }

    deactivate(){
        this._isPlaying = false;
        this.setPosition(-1000, -1000);
        this.setVelocity(0,0);
        this.setAngularSpeed(0);
    }

    isActive(){
        return this._isPlaying;
    }
    resetPosition(){
        this.setPosition(   canvas.width/2 -(NUMBER_OF_PLAYERS-1)/2*100 + (this._playerNumber-1)*100, 
                            this.y = canvas.height/2+100);
        this.setVelocity(0,0);
        this.setAngularSpeed(0);
        this.setOrientation(0);
    }

    resetHitPoints(){
        this._hitPoints = this._fullHitPoints;
    }

    destroyShip(){
        // generate explosion particle effect
        objectFactory.generateParticleEffect(this.x, this.y, PARTICLE_EFFECT.PURPLE_EXPLOSION);

        this._lives--;

        // if no more lives: make player inactive
        if(this._lives <= 0){
            this.deactivate();
        }
        // else: reset the player
        else {
            this.resetHitPoints();
            this.resetPosition();
            // TODO: explosion animation, wait, appear animatino, grace period
        }
    }

    update(milliSecondsPassed){
        if(!this._isPlaying){
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
        if(!this._isPlaying){
            return;
        }
 
        // draw states
        if(this.isForwardThrust){
            this.setSpriteImage("img/rocket_forwardthrust.png");
        }
        super.draw();
    }
}