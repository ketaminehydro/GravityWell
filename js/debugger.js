/****************************************************************
 CLASS: Debugger
 ****************************************************************/
class Debugger{
    constructor(){
        // draw on its own canvas
        this._ctx = debuggerCtx;

        // Debug stats
        this._fps = 0;
        this._milliSecondsPassed = 0;
        this._updateDuration = 0;
        this._drawDuration = 0;
        this._totalDuration = 0;        
        this._totalDurationTooHighIndicator = " ok ";
        this._numberOfGameObjects = 0;
        this._numberOfCollisionChecks = 0;
        this._numberOfCollisions = 0;
        this._gameState;
        this._stageState;

        // Debugger settings    // FIXME: set to false before releases
        this._isShowDebugStats = false;      
        this._skipToStage = false;           
    }

    translateGameState(state){
        return DEBUG_GAME_STATE[state];
    }

    translateStageState(state){
        return DEBUG_STAGE_STATE[state];
    }

    isSkipToStage(){
        return this._skipToStage;
    }

    update(milliSecondsPassed){
        // update debug information only if needed
        if(this._isShowDebugStats){
            this._fps = Math.round(1 / milliSecondsPassed*1000);
            this._milliSecondsPassed = milliSecondsPassed;

            this._updateDuration = game.debuggerInfo.updateDuration;
            this._drawDuration = game.debuggerInfo.drawDuration;
            this._totalDuration = this._updateDuration + this._drawDuration;
            if(this._totalDuration <= 16) {
                this._totalDurationTooHighIndicator = " ok";
            }
            else{
                this._totalDurationTooHighIndicator = " !!! NOK !!!";
            }
            

            this._numberOfGameObjects = stage.getNumberOfGameObjects();
            this._numberOfCollisionChecks = stage.getNumberOfCollisionChecks();
            this._numberOfCollisions = stage.getNumberOfCollisions();

            this._gameState = game.getGameState();
            this._stageState = stage.getStageState();
        }
    }

    draw(){
        // clear the canvas
        this._ctx.clearRect(0,0, canvas.width, canvas.height);

        // display debug information
        if(this._isShowDebugStats){
            let y = 30;

            this._ctx.fillStyle = "white";
            this._ctx.font = "2em Monospace";
            this._ctx.fillText(this._fps+" fps | "+this._milliSecondsPassed.toFixed(1)+"ms (60fps = 16ms)",10,y); y+=20;
            this._ctx.fillText("Update duration: "+this._updateDuration.toFixed(1)+"ms",10,y); y+=20;
            this._ctx.fillText("Draw duration: "+this._drawDuration.toFixed(1)+"ms",10,y); y+=20;
            this._ctx.fillText("Total duration: "+this._totalDuration.toFixed(1)+"ms " + this._totalDurationTooHighIndicator,10,y); y+=20;
            this._ctx.fillText("Game objects: "+this._numberOfGameObjects,10,y); y+=20;
            this._ctx.fillText("Collision checks: "+this._numberOfCollisionChecks,10,y); y+=20;
            this._ctx.fillText("Collisions: "+this._numberOfCollisions,10,y); y+=20;
            this._ctx.fillText("Game state: "+this.translateGameState(this._gameState),10,y); y+=20;
            this._ctx.fillText("Stage state: "+this.translateStageState(this._stageState),10,y); y+=20;
        }
    }
}