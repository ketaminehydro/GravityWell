/****************************************************************
 CLASS: Level
 ****************************************************************/
 class Level{
    constructor(){
        this._background = new Starfield();
        this._players = new GameObjectArray();
        this._asteroids = new GameObjectArray();
        this._projectiles = new GameObjectArray();
        this._explosions = new GameObjectArray();
        this._particleEffects = new ParticleEffectArray();

        this._collisionChecker = new CollisionChecker();
        this._collisionResolver = new CollisionResolver();

        // debug information
        this._debugCollisionChecksCounter;
        this._debugCollisionPairsCounter;


        // initialise the level
        this.#initializeLevel();
    }

    #initializeLevel(){
        // stars
        this._background.fillStarfield();

        // players
        for(let i=1; i<=NUMBER_OF_PLAYERS; i++){
            let player = new Player(canvas.width/2, canvas.height/2, 0);
            this._players.push(player);
        }

        // asteroids
        for(let i=1; i<=NUMBER_OF_ASTEROIDS; i++){
            let asteroid = this.generateAsteroid(0,0,0);
            asteroid.randomSpawn();
        }
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
        // ************* UPDATE *************************************
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


        // ************* COLLISION CHECK *****************************
        // reset all debug hitbox display flags
        // for each collision type: 
        //      fill the collision checker
        //      collision check: 
        //          -> flag collided gameobjects (hitbox display flag)
        //          -> return collision-pairs 
        // for each collision type: 
        //      collision-pairs 
        //          -> resolve physics
        //          -> resolve gamelogic (different for each pair)


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

        // debug information
        this._debugCollisionChecksCounter = this._collisionChecker.getNumberOfCollisionChecks();
        this._debugCollisionPairsCounter = collisionPairs.length;
    }

    draw(){
        this._background.draw();
        this._asteroids.draw();
        this._projectiles.draw();
        this._explosions.draw();
        this._players.draw();
        this._particleEffects.draw();
    }

    
    // ******************** debug stats ********************************
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