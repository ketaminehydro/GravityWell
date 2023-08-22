/****************************************************************
 CLASS: Game
 ****************************************************************/
 class Game{
    #inputHandler;
    #previousTimeStamp;
    
    constructor(){
        // Player input handler
        this.#inputHandler = new InputHandler();
        
        // timestamp for gameloop
        this.#previousTimeStamp = 0;

        // Elements
        this._display = new Display();
        this._currentLevel = new Level();
    }


    startLevel(level){
        // TODO: level construction logic goes here
    }

    gameLoop(timeStamp){
        // TODO: if (this._isRunning != true) return;

        // Elapsed time:
        // calculate the number of seconds passed since the last frame
        // limit this so that in case of lag we are doing 100ms steps
        // even though the time between updates might be longer
        let milliSecondsPassed;
        milliSecondsPassed = (timeStamp - this.#previousTimeStamp);
        milliSecondsPassed = Math.min(milliSecondsPassed, 100);
        this.#previousTimeStamp = timeStamp;  
        
        // handle player input
        this.#inputHandler.handleInputDuringPlay(this._currentLevel);

        // update 
        this._currentLevel.update(milliSecondsPassed);
        this._display.update(milliSecondsPassed);

        // clear the canvas
        ctx.clearRect(0,0, canvas.width, canvas.height);
        
        // draw
        this._currentLevel.draw();
        this._display.draw();

        // loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }
 }