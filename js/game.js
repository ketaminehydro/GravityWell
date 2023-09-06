/****************************************************************
 CLASS: Game
 ****************************************************************/
 class Game{
    #inputHandler;
    #previousTimeStamp;
    
    constructor(){
        // Game State
        this._gameState = GAME_STATE.LEVEL;

        // Player input handler
        this.#inputHandler = new InputHandler();
        
        // timestamp for gameloop
        this.#previousTimeStamp = 0;

        // Elements
        this._display = new InGameUI();
        this._introScreen = new IntroScreen();
        this._background = new Starfield();
        this._currentLevel = new Level();


        // ************* INITIALIZE ***************************
        
        // Background
        this._background.fillStarfield();
        this._background.draw();
    }


    startLevel(level){
        // TODO: level construction logic goes here
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
        
     
        switch(this._gameState) {

            case GAME_STATE.TITLESCREEN:
                // handle player input // debug
                this.#inputHandler.handleInputDuringPlay(this._currentLevel);

                // clear the canvas // debug
                uiCtx.clearRect(0,0, canvas.width, canvas.height);

                // update introscreen: switch between controls / enemies / highscore
                
                // draw // debug: draw only when needed
                this._introScreen.draw();  

                break;
            
            case GAME_STATE.LEVEL:
                // handle player input 
                this.#inputHandler.handleInputDuringPlay(this._currentLevel);

                // update 
                this._currentLevel.update(milliSecondsPassed);
                this._display.update(milliSecondsPassed, this._currentLevel);
                
                // draw
                this._currentLevel.draw();
                this._display.draw();

                break;
            
            case GAME_STATE.LEVEL_COMPLETED:
                // TODO:
                // generate next level

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