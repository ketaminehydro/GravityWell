/****************************************************************
 CLASS: Display
 ****************************************************************/
class Display{
    constructor(){
        this._fps = 0;
        this._numberOfGameObjects = 0;
        this._numberOfCollisionChecks = 0;
        this._numberOfCollisions = 0;

        // debug information
        this._isShowDebugStats = true;
    }

    update(milliSecondsPassed, context){
        this._fps = Math.round(1 / milliSecondsPassed*1000);

        this._numberOfGameObjects = context.getNumberOfGameObjects();
        this._numberOfCollisionChecks = context.getNumberOfCollisionChecks();
        this._numberOfCollisions = context.getNumberOfCollisions();
    }

    draw(milliSecondsPassed){

        // display debug information
        if(this._isShowDebugStats){
            ctx.fillStyle = "white";
            ctx.font = "1em Monospace";
            ctx.fillText("FPS: "+this._fps,10,30);
            ctx.fillText("Game objects: "+this._numberOfGameObjects,10,50);
            ctx.fillText("Collision checks: "+this._numberOfCollisionChecks,10,70);
            ctx.fillText("Collisions: "+this._numberOfCollisions,10,90);
        }
    }
}