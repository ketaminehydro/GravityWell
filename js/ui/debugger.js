/****************************************************************
 CLASS: Debugger
 ****************************************************************/
class Debugger{
    constructor(){
        // draw on its own canvas
        this._ctx = debuggerCtx;

        // Debug stats
        this._fps = 0;
        this._numberOfGameObjects = 0;
        this._numberOfCollisionChecks = 0;
        this._numberOfCollisions = 0;
        this._gameState;
        this._stageState;

        // Debug information is not shown by default 
        this._isShowDebugStats = true;      // FIXME: set to false in final game.
    }

    translateGameState(state){
        return DEBUG_GAME_STATE[state];
    }

    translateStageState(state){
        return DEBUG_STAGE_STATE[state];
    }

    update(milliSecondsPassed){
        // update debug information only if needed
        if(this._isShowDebugStats){
            this._fps = Math.round(1 / milliSecondsPassed*1000);

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
            this._ctx.fillStyle = "white";
            this._ctx.font = "2em Monospace";
            this._ctx.fillText("FPS: "+this._fps,10,30);
            this._ctx.fillText("Game objects: "+this._numberOfGameObjects,10,50);
            this._ctx.fillText("Collision checks: "+this._numberOfCollisionChecks,10,70);
            this._ctx.fillText("Collisions: "+this._numberOfCollisions,10,90);
            this._ctx.fillText("Game state: "+this.translateGameState(this._gameState),10,110);
            this._ctx.fillText("Stage state: "+this.translateStageState(this._stageState),10,130);
        }
    }
}