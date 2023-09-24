/****************************************************************
 CLASS: Game
 ****************************************************************/
 class Game{
    #inputHandler;
    #previousTimeStamp;
    
    constructor(){
        // Game State
        this._gameState = GAME_STATE.TITLESCREEN;

        // Player input handler
        this.#inputHandler = new InputHandler();
        
        // timestamp for gameloop
        this.#previousTimeStamp = 0;

        // Elements
        this._display = new InGameUI();
        this._introScreen = new IntroScreen();
        this._background = new Starfield();
        this._currentLevel = null;
        this._currentLevelNumber = 1;


        // ************* INITIALIZE ***************************
        
        // Background
        this._background.fillStarfield();
        this._background.draw();

        // generate first level
        this.generateLevel(1);
    }

    generateLevel(levelNumber){
        // TODO: level construction logic goes here
        this._currentLevel = new Level(levelNumber);
    }

    gameLoop(timeStamp){
        // Elapsed time:
        // calculate the number of seconds passed since the last frame
        // limit this so that in case of lag we are doing 100ms steps
        // even though the time between updates might be longer
        let milliSecondsPassed;
        milliSecondsPassed = (timeStamp - this.#previousTimeStamp);
        milliSecondsPassed = Math.min(milliSecondsPassed, 100);
        this.#previousTimeStamp = timeStamp;  
        
     
        // Do different things according to the game state
        switch(this._gameState) {

            case GAME_STATE.TITLESCREEN:
                // handle player input
                this.#inputHandler.handleInputDuringTitleScreen();

                // update introscreen: switch between controls / enemies / highscore
                
                // draw // TODO: draw only when needed
                this._introScreen.draw();  
                break;
            
            case GAME_STATE.LEVEL_RUNNING:
                // handle player input 
                this.#inputHandler.handleInputDuringLevel(this._currentLevel);

                // update 
                this._currentLevel.update(milliSecondsPassed);
                this._display.update(milliSecondsPassed);
                
                // draw
                this._currentLevel.draw();
                this._display.draw();

                // check if game state needs to be changed 
                switch(this._currentLevel.getState()){
                    case LEVEL_STATE.COMPLETED_END:
                        this._gameState = GAME_STATE.LEVEL_ENDED;
                        break;
                    case LEVEL_STATE.GAME_OVER_END:
                        this._gameState = GAME_STATE.GAME_OVER;
                        break;
                }
                break;
            
            case GAME_STATE.LEVEL_ENDED:
                // TODO:
                // is there a next level?
                // if yes, 
                //      generate next level 
                        this._currentLevelNumber++;
                        this.generateLevel(this._currentLevelNumber);
                        this._gameState = GAME_STATE.LEVEL_RUNNING;
                // if no: 
                        //this._gameState = GAME_STATE.GAME_COMPLETED;

                break;           

                
            case GAME_STATE.GAME_OVER:
                    // TODO:
                    // special gameover screen    
                    // follow up with highscore
                    break;    


            case GAME_STATE.GAME_COMPLETED:

                // TODO:
                // congratulations screen
                // follow up with highscore

                break;
            
            case GAME_STATE.ENTER_HIGHSCORE:

                // TODO:
                // highscore
                // follow up with titlescreen

                break;
        }
     
        // loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }
 }