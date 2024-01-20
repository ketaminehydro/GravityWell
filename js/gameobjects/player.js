/****************************************************************
 CLASS: Player
 ****************************************************************/
class Player extends GameObject {
    constructor(x, y, orientation, playerNumber) {
        super(x, y, orientation);

        // gameobject type
        this._gameObjectType = GAMEOBJECT_TYPE.PLAYER;

        // hitbox
        this.hitBox.setSize(40);
        this.hitBox.setPositionOffset(0, -15);

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

        // player ship
        this.selectShip(PLAYER_SHIP_TYPE.DEFAULT);
        
        // deactivate the player
        this.deactivate();

        // weapon
        this.weaponCoolDown = 500;                          // in milliseconds
        this.weaponCoolDownTimer = this.weaponCoolDown;     // in milliseconds
        this.isWeaponCoolDown = false;

        // TODO: this should be loaded. Quick fix for now. 

        if (playerNumber === 1){
            this.sprites.initialise(
                {
                    "idle" : {
                        "file" : "img/rocket_body.png",
                        "spriteWidth" : 600,
                        "spriteHeight" : 600,
                        "states" : {
                            "defaultState" : {
                                "frame1" : 1000
                            }     
                        }                                    
                    },
                    "engine" : {
                        "file" : "img/rocket_engine.png",
                        "spriteWidth" : 600,
                        "spriteHeight" : 600,
                        "states" : {
                            "noThrust" : {
                                "frame1" : 400
                            },     
                            "thrust" : {
                                "frame1" : 400
                            }     

                        }                                    
                    }
                }
            );
        }    
        else if (playerNumber === 2){
            this.sprites.initialise(
                {
                    "idle" : {
                        "file" : "img/rocket_body_green.png",
                        "spriteWidth" : 600,
                        "spriteHeight" : 600,
                        "states" : {
                            "defaultState" : {
                                "frame1" : 1000
                            }     
                        }                                    
                    },
                    "engine" : {
                        "file" : "img/rocket_engine.png",
                        "spriteWidth" : 600,
                        "spriteHeight" : 600,
                        "states" : {
                            "noThrust" : {
                                "frame1" : 400
                            },     
                            "thrust" : {
                                "frame1" : 400
                            }     

                        }                                    
                    }
                }
            );
        }    


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
                this.sprites.setState("engine", "thrust");

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
            // TODO: explosion animation, wait, appear animation, grace period
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
                this.forwardThrustTimer = this.animationDuration;
                this.sprites.setState("engine", "noThrust");
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
        super.draw();
    }
}