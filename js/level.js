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

        this._collisionChecker = new CollisionChecker();
        this._collisionResolver = new CollisionResolver();

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
            let asteroid = new Asteroid(canvas.width/2, canvas.height/2, 0);
            this._asteroids.push(asteroid);
        }

        // debug: explosion
        let explosion = new Explosion(canvas.width/2+60, canvas.height/2+60, 0);
        this._explosions.push(explosion);
    }


    getPlayers(){
        // returns the players object for player input handling
        return this._players;
    }

    getAsteroids(){
        // returns the asteroids object for player input handling
        return this._asteroids;
    }

    generateTorpedo(x, y, orientation){
        let torpedo = new Torpedo(x, y, orientation);
        this._projectiles.push(torpedo);
    }

    generateExplosion(x, y, size, force){

    }


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

        // remove deleted objects
        this._asteroids.removeDeleted();
        this._projectiles.removeDeleted();
        this._explosions.removeDeleted();
        this._players.removeDeleted();


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
    }

    draw(){
        this._background.draw();
        this._asteroids.draw();
        this._projectiles.draw();
        this._explosions.draw();
        this._players.draw();
    }
}