/****************************************************************
 CLASS: Level
 ****************************************************************/
 class Level{
    constructor(){
        // game objects
        this._players = new GameObjectArray();
        this._asteroids = new GameObjectArray();
        this._projectiles = new GameObjectArray();
        this._explosions = new GameObjectArray();
        this._particleEffects = new ParticleEffectArray();

        this._collisionChecker = new CollisionChecker();
        this._collisionResolver = new CollisionResolver();

        // States
        this._levelState = LEVEL_STATE.START;
        this._stageCompleted = new StageCompleted();

        // information for the debugger
        this._debugCollisionChecksCounter;
        this._debugCollisionPairsCounter;


        // initialise the level
        this.#initializeLevel();
    }

    getPlayers(){
        // returns the players object for player input handling
        return this._players;
    }

    getAsteroids(){
        // returns the asteroids object for player input handling
        return this._asteroids;
    }

    getProjectiles(){
        // returns the projectiles object for player input handling
        return this._projectiles;
    }

    getExplosions(){
        // returns the explosions object for player input handling
        return this._explosions;
    }

    /************************ LEVEL CONDITIONS ******************************************/
    #initializeLevel(){

        // TODO: gets level number as parameter -> loads JSON File with information about gameobjects / players

        // players
        for(let i=1; i<=NUMBER_OF_PLAYERS; i++){
            let player = new Player(canvas.width/2 -(NUMBER_OF_PLAYERS-1)/2*100 + (i-1)*100, canvas.height/2+100, 0);
            // TODO: change player color or better: within player select player number
            this._players.push(player);
        }

        // asteroids
        for(let i=1; i<=NUMBER_OF_ASTEROIDS; i++){
            let asteroid = this.generateAsteroid(0,0,0);
            asteroid.randomSpawn();
        }
    }



    /**************** OBJECT FACTORY *****************************************/
    
    generateAsteroid(x, y, orientation){
        let asteroid = new Asteroid(x, y, orientation, this);            
        this._asteroids.push(asteroid);    

        // return to allow further modification by requestor
        return asteroid;
    }
    generateTorpedo(x, y, orientation){
        let torpedo = new Torpedo(x, y, orientation, this);
        this._projectiles.push(torpedo);
        
        // return to allow further modification by requestor
        return torpedo;
    }

    generateExplosion(x, y, orientation, force){
        let explosion = new Explosion(x, y, orientation, this, force);
        this._explosions.push(explosion);   

        // return to allow further modification by requestor
        return explosion;
    }

    generateParticleEffect(x, y, effectType){
        let particleEffect = new ParticleEffect(x, y, effectType);
        this._particleEffects.push(particleEffect);
    }

    /**************** UPDATE & DRAW *****************************************/


    update(milliSecondsPassed){
        // ************* 1. UPDATE GAMEOBJECTS *************************************
        // update individual gameobjects
        //      -> spawn new ones, add to the arrays
        //      -> mark to-be-deleted
        // prune the arrays of the deleted objects

        // update ojects
        this._asteroids.update(milliSecondsPassed);
        this._projectiles.update(milliSecondsPassed);
        this._explosions.update(milliSecondsPassed);
        this._players.update(milliSecondsPassed);
        this._particleEffects.update(milliSecondsPassed);

        // remove deleted objects
        this._asteroids.removeDeleted();
        this._projectiles.removeDeleted();
        this._explosions.removeDeleted();
        this._players.removeDeleted();
        this._particleEffects.removeDeleted();      


        // ************* 2. COLLISION CHECK & RESOLVE *********************
        // reset all debug hitbox display flags
        // for each collision type: 
        //      fill the collision checker
        //      collision check: 
        //          -> flag collided gameobjects (hitbox display flag)
        //          -> return collision-pairs 
        // for each collision pair: 
        //      resolve the collision 


        // reset all debug hitbox display flags
        this._asteroids.clearIsHit();
        this._projectiles.clearIsHit();    
        this._explosions.clearIsHit();
        this._players.clearIsHit();
        
        // initialize collision checker
        this._collisionChecker.reset();
        this._collisionChecker.fill(this._asteroids);
        this._collisionChecker.fill(this._projectiles);
        this._collisionChecker.fill(this._explosions);
        this._collisionChecker.fill(this._players);

        // check for collisions
        let collisionPairs;
        collisionPairs = this._collisionChecker.markCollisions();

        // resolve collisions
        this._collisionResolver.resolve(collisionPairs, this);

        // update counters for debugger
        this._debugCollisionChecksCounter = this._collisionChecker.getNumberOfCollisionChecks();
        this._debugCollisionPairsCounter = collisionPairs.length;


       // ************* 3. CHECK LEVEL STATE  *****************************
       
       // check stage ending conditions

        // right now there is only one winning condition: all asteroids are destroyed        
        if(this._asteroids.getLength() <= 0){
            this._levelState = LEVEL_STATE.STAGE_COMPLETED;
        }
        
        // Game over
        // TODO: if sum of all player hitpoints = 0 then level state = game over


        // ************* 4. EXECUTE LEVEL STATE ELEMENTS *******************
        
        // TODO: Level start
        // message + immunity during level start
        // timer
        // set level state to play

        // TODO: Stage completed
        // message
        // timer
        // return LEVEL_STATE.STAGE_COMPLETED

        // TODO: Game over
        // message 
        // timer
        // return LEVEL_STATE.GAME_OVER
    }

    draw(){
        // clear the canvas
        ctx.clearRect(0,0, canvas.width, canvas.height);

        // draw gameobjects
        this._asteroids.draw();
        this._projectiles.draw();
        this._explosions.draw();
        this._players.draw();
        this._particleEffects.draw();

        // debug
        if(this._levelState === LEVEL_STATE.STAGE_COMPLETED){
            uiCtx.clearRect(0,0, canvas.width, canvas.height);    
            this._stageCompleted.draw();
        }
    }
    
    // ******************** DEBUGGER INFORMATION ********************************
    getNumberOfGameObjects(){
        let counter = 0;
        counter = this._asteroids.getLength()
                    + this._projectiles.getLength() 
                    + this._players.getLength()
                    + this._explosions.getLength();
        return counter; 
    }

    getNumberOfCollisionChecks(){
        return this._debugCollisionChecksCounter;
    }

    getNumberOfCollisions(){
        return this._debugCollisionPairsCounter;
    }
}