/****************************************************************
 CLASS: Display
 ****************************************************************/
class InGameUI{
    constructor(){
        // draw on the foreground (ui) canvas
        this._ctx = uiCtx;

        // Debug stats
        this._fps = 0;
        this._numberOfGameObjects = 0;
        this._numberOfCollisionChecks = 0;
        this._numberOfCollisions = 0;

        // Debug information is not shown by default 
        this._isShowDebugStats = true;      // FIXME: set to false in final game.

        // Refresh flag
        this._isDrawRefreshNeeded = true;
    }

    update(milliSecondsPassed, context){
        // update debug information only if needed
        if(this._isShowDebugStats){
            this._fps = Math.round(1 / milliSecondsPassed*1000);

            this._numberOfGameObjects = context.getNumberOfGameObjects();
            this._numberOfCollisionChecks = context.getNumberOfCollisionChecks();
            this._numberOfCollisions = context.getNumberOfCollisions();

            this._isDrawRefreshNeeded = true;
        }
    }

    draw(){
        // only draw on the canvas when needed
        if(!this._isDrawRefreshNeeded){
            return;
        }

        // clear the canvas
        this._ctx.clearRect(0,0, canvas.width, canvas.height);

        // display debug information
        if(this._isShowDebugStats){
            this._ctx.fillStyle = "white";
            this._ctx.font = "1em Monospace";
            this._ctx.fillText("FPS: "+this._fps,10,30);
            this._ctx.fillText("Game objects: "+this._numberOfGameObjects,10,50);
            this._ctx.fillText("Collision checks: "+this._numberOfCollisionChecks,10,70);
            this._ctx.fillText("Collisions: "+this._numberOfCollisions,10,90);
        }

        // Reset refresh flag
        this._isDrawRefreshNeeded = false;
    }
}