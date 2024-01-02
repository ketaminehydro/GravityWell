/****************************************************************
 CLASS: Stage
 This class controls all the gameobjects and their interactions.
 ****************************************************************/
 class Stage{
    
    #stageState;
    constructor(){
        // state
        this.#stageState = STAGE_STATE.RUNNING;
        this._stageNumber = 0;

        // game objects
        this.players = new GameObjectArray();
        //this.playingPlayers = new GameObjectArray();
        this.enemies = new GameObjectArray();
        this.projectiles = new GameObjectArray();
        this.explosions = new GameObjectArray();
        this.particleEffects = new ParticleEffectArray();

        // collision handling
        this._collisionChecker = new CollisionChecker();
        this._collisionResolver = new CollisionResolver();

        // title cards
        this._titleCard_StageStart = new StageStart(99);
        this._titleCard_StageCompleted = new StageCompleted();
        this._titleCard_StageGameOver = new StageGameOver();

        // information for the debugger
        this._debugCollisionChecksCounter;
        this._debugCollisionPairsCounter;

        // create the persistent player objects    
        for(let i=1; i<=NUMBER_OF_PLAYERS; i++){
            let player = new Player(-1000, -1000, 0, i);
            this.players.push(player);
        }
    }

    
    getStageState(){
        return this.#stageState;
    }

    setStageState(stageState){
        if(stageState > Object.keys(STAGE_STATE).length || stageState < 0){
            return;
        }
        this.#stageState = stageState;
    }
    getPlayers(){
        // returns the players object for player input handling
        return this.players;
    }

    /*
    getPlayingPlayers(){
        // returns the players object for player input handling
        return this.playingPlayers;
    }*/

    getEnemies(){
        // returns the enemies object for player input handling
        return this.enemies;
    }

    getProjectiles(){
        // returns the projectiles object for player input handling
        return this.projectiles;
    }

    getExplosions(){
        // returns the explosions object for player input handling
        return this.explosions;
    }

    /************************ STAGE LOADING ******************************************/
    loadStage(stageNumber){

        // empty the gameobject arrays
        this.enemies.clear(); 
        //this.playingPlayers.clear();
        this.projectiles.clear();
        this.explosions.clear(); 
        this.particleEffects.clear();   

        // ******************* SET UP A NEW STAGE ******************
        this._stageNumber = stageNumber;

        // level 0 case (title screen)
        if (stageNumber === 0){ 
            for(let i=1; i<=7; i++){  
                // TODO: could be defined in gameData as well
                let asteroid = objectFactory.generateAsteroid(0,0,0);
                asteroid.randomSpawn();
            }
            this.setStageState(STAGE_STATE.RUNNING);
            return;
        }

        // TODO: gets level number as parameter -> extracts relevant data from the gameData object. console log is proof of concept.
        // console.log(gameData.stages);

        /****************************************************************** */
        // Placeholder

            // asteroids
            for(let i=1; i<=stageNumber; i++){
                let asteroid = objectFactory.generateAsteroid(0,0,0);
                asteroid.randomSpawn();
            }

            // place playing players     
            /*for(let i=0; i<this.allPlayers.getLength(); i++){
                if(this.allPlayers.getElement(i).isPlaying){               
                    this.allPlayers.getElement(i).resetPosition();                
                    this.playingPlayers.push(this.allPlayers.getElement(i));
                }
            }*/

            
            // place the playing player
            for(let i=0; i<this.players.getLength(); i++){
                if(this.players.getElement(i).isActive()){
                    this.players.getElement(i).resetPosition();
                }
            }
            

        /****************************************************************** */

            // adjust the titlecard
        this._titleCard_StageStart.setStageNumber(this._stageNumber);
    }

    startStage(){        
        this.#stageState = STAGE_STATE.TITLE;
    }

    /**************** UPDATE & DRAW *****************************************/


    updateGameObjects(milliSecondsPassed){
        
        // ************* 1. UPDATE GAMEOBJECTS *************************************
        // update individual gameobjects
        //      -> spawn new ones, add to the arrays
        //      -> mark to-be-deleted
        // prune the arrays of the deleted objects

        // update ojects
        this.enemies.update(milliSecondsPassed);
        this.projectiles.update(milliSecondsPassed);
        this.explosions.update(milliSecondsPassed);
        this.players.update(milliSecondsPassed);
        this.particleEffects.update(milliSecondsPassed);

        // remove deleted objects
        this.enemies.removeDeleted();
        this.projectiles.removeDeleted();
        this.explosions.removeDeleted();
        //this.allPlayers.removeDeleted();
        this.particleEffects.removeDeleted();      


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
        this.enemies.clearIsHit();
        this.projectiles.clearIsHit();    
        this.explosions.clearIsHit();
        this.players.clearIsHit();
        
        // initialize collision checker
        this._collisionChecker.clear();
        this._collisionChecker.fill(this.enemies);
        this._collisionChecker.fill(this.projectiles);
        this._collisionChecker.fill(this.explosions);
        // TODO: add only the active players
        this._collisionChecker.fill(this.players);

        // check for collisions
        let collisionPairs;
        collisionPairs = this._collisionChecker.markCollisions();

        // resolve collisions
        this._collisionResolver.resolve(collisionPairs);

        // update counters for debugger
        this._debugCollisionChecksCounter = this._collisionChecker.getNumberOfCollisionChecks();
        this._debugCollisionPairsCounter = collisionPairs.length;
    }

    update(milliSecondsPassed){        

        switch (this.#stageState){
            
            case STAGE_STATE.TITLE:        
                this._titleCard_StageStart.update(milliSecondsPassed);
                        // TODO: immunity for players
                if(this._titleCard_StageStart.hasAnimationEnded()){
                    this.#stageState = STAGE_STATE.RUNNING;    
                    this._titleCard_StageStart.reset();          
                }
                break;

            case STAGE_STATE.RUNNING:                
                this.updateGameObjects(milliSecondsPassed);

                // Completed:
                // right now there is only one winning condition: all asteroids are destroyed        
                if(this.enemies.getLength() <= 0){
                    this.#stageState = STAGE_STATE.COMPLETED_ONGOING;
                }
                
                // if in titlescreen, exit case
                if(this._stageNumber === 0){
                    break;
                }

                // Game over:
                // if no player is playing and credits = 0 and level != 0 then  lvel state = game over
                let isGameStillOn = false;
                for(let i=0; i<this.players.getLength(); i++){
                    isGameStillOn = isGameStillOn || this.players.getElement(i).isActive();
                }
                isGameStillOn = isGameStillOn || (game.getCredits()>0);
                if(!isGameStillOn){                
                    this.#stageState = STAGE_STATE.GAME_OVER_ONGOING;
                }
                break;

            case STAGE_STATE.COMPLETED_ONGOING: 
                this._titleCard_StageCompleted.update(milliSecondsPassed);
                    // TODO: immunity for players
                    // TODO: ship hyperspace animation
                if(this._titleCard_StageCompleted.hasAnimationEnded()){
                    this.#stageState = STAGE_STATE.COMPLETED_ENDED;  
                    this._titleCard_StageCompleted.reset();
                }
                break;

            case STAGE_STATE.GAME_OVER_ONGOING: 
                this._titleCard_StageGameOver.update(milliSecondsPassed);
                if(this._titleCard_StageGameOver.hasAnimationEnded()){
                    this.#stageState = STAGE_STATE.GAME_OVER_ENDED; 
                    this._titleCard_StageGameOver.reset(); 
                }
                break;
        }
    }

    draw(){
        // clear the canvas
        ctx.clearRect(0,0, canvas.width, canvas.height);

        // draw titlecards or gameobjects
        switch (this.#stageState){

            case STAGE_STATE.TITLE:
                this._titleCard_StageStart.draw();
                break;

            case STAGE_STATE.RUNNING:
                this.enemies.draw();
                this.projectiles.draw();
                this.explosions.draw();
                this.players.draw();
                this.particleEffects.draw();                
                break; 
            
            case STAGE_STATE.COMPLETED_ONGOING:
                this._titleCard_StageCompleted.draw();
                break;

            case STAGE_STATE.GAME_OVER_ONGOING:
                this._titleCard_StageGameOver.draw();
                break;    
        }
    }
    
    // ******************** DEBUGGER INFORMATION ********************************
    getNumberOfGameObjects(){
        let counter = 0;
        counter = this.enemies.getLength()
                    + this.projectiles.getLength() 
                    + this.players.getLength()
                    + this.explosions.getLength();
        return counter; 
    }

    getNumberOfCollisionChecks(){
        return this._debugCollisionChecksCounter;
    }

    getNumberOfCollisions(){
        return this._debugCollisionPairsCounter;
    }
}