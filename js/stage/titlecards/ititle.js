/****************************************************************
 CLASS: ITitle [Interface]
 ****************************************************************/
class ITitle {
    constructor (displayTimeInMs){
        // part of the level logic -> draw on the main canvas
        this._ctx = ctx;

        // timer
        this._lifeTime = displayTimeInMs;
        this._remainingLifeTime = displayTimeInMs;
        this._animationHasEnded = false;
    }  

    update(milliSecondsPassed){
        this._remainingLifeTime -= milliSecondsPassed;
        this._animationHasEnded = (this._remainingLifeTime < 0);
        return this._animationHasEnded;
    }
    reset(){
        this._remainingLifeTime = this._lifeTime;
        this._animationHasEnded = false;
    }

    hasAnimationEnded(){
        return this._animationHasEnded;
    }
    draw(){
        // to be implemented by the subclass
        throw new Error("Subclass must implement draw method.");
    }
}