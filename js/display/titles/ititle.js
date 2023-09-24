/****************************************************************
 CLASS: ITitle [Interface]
 ****************************************************************/
class ITitle {
    constructor (displayTimeInMs){
        // draw on the foreground (ui) canvas
        this._ctx = ctx;

        // timer
        this._lifeTime = displayTimeInMs;
        this._animationHasEnded = false;
    }  

    update(milliSecondsPassed){
        this._lifeTime -= milliSecondsPassed;
        this._animationHasEnded = (this._lifeTime < 0);
        return this._animationHasEnded;
    }

    hasAnimationEnded(){
        return this._animationHasEnded;
    }
    draw(){
        // to be implemented by the subclass
        throw new Error("Subclass must implement draw method.");
    }
}