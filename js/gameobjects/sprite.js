/****************************************************************
 CLASS: Sprite
 ****************************************************************/
 class Sprite{
 
    constructor(){
        this._spriteData = {};

        this._timecounter = 0;     // in ms
        this._currentState = "defaultState";   
        this._currentStateNumber = 0;
        this._currentFrameNumber = 1;
        this._image = new Image();
        this._image.src = "img/placeholder.png";     // placeholder image
    }

    initialise(sprite){    
        this._spriteData = { ...sprite };
        this._image.src = this._spriteData.file;
    }

    setState(state){
        this._currentState = state; 
        this._currentStateNumber = Object.keys(this._spriteData.states).indexOf(state);
        this._timecounter = 0;
    }

    update(milliSecondsPassed) {
        this._timecounter += milliSecondsPassed;

        // set the currentFrame according to the elapsed time
        this._currentFrameNumber = 0;
        let animationDuration = 0;
        for(const frame in this._spriteData.states[this._currentState]){
            if(this._timecounter > this._spriteData.states[this._currentState][frame]){
                this._currentFrameNumber++;
            }
            animationDuration = this._spriteData.states[this._currentState][frame];
        } 

        // if timecounter is larger than the animatino duration, reset
        if (this._timecounter > animationDuration){
            this._timecounter = 0;
            this._currentFrameNumber = 0;
        }
  
    }

    draw(width, height){
        ctx.drawImage(this._image,
            this._currentFrameNumber * this._spriteData.spriteWidth, this._currentStateNumber * this._spriteData.spriteHeight,
            this._spriteData.spriteWidth, this._spriteData.spriteHeight,
            -(width/2), -(height/2), 
            width, height);
    }
}