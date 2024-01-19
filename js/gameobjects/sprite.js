/****************************************************************
 CLASS: Sprite
 ****************************************************************/
 class Sprite{
 
    constructor(){

        // as a failsafe, let's give an default object        
        this._sprites = {
            "file" : "img/placeholder.png",
            "spriteWidth" : 225,
            "spriteHeight" : 225,
            "states" : {
                "default" : {
                    "frame1" : 1000,
                },                                         
            }
        }    
        
       
        this._timecounter = 0;     // in ms
        this._currentState = "default";   
        this._currentStateNumber = 0;
        this._currentFrameNumber = 1;
        this._hasImage = false;
        this._image = new Image();
        this._image.src = "img/placeholder.png";     // placeholder image
        
    }


    initialise(sprites){    
        this._sprites = { ...sprites };
        this._image.src = this._sprites.file;
        this._hasImage = true;
    }

    setState(state){
        this._currentState = state; 
        this._currentStateNumber = Object.keys(this._sprites.states).indexOf(state);
        this._timecounter = 0;
    }

    update(milliSecondsPassed) {
        this._timecounter += milliSecondsPassed;

        // set the currentFrame according to the elapsed time
        this._currentFrameNumber = 0;
        let animationDuration = 0;
        for(const frame in this._sprites.states[this._currentState]){
            if(this._timecounter > this._sprites.states[this._currentState][frame]){
                this._currentFrameNumber++;
            }
            animationDuration = this._sprites.states[this._currentState][frame];
        } 

        // if timecounter is larger than the animatino duration, reset
        if (this._timecounter > animationDuration){
            this._timecounter = 0;
            this._currentFrameNumber = 0;
        }
  
    }

    draw(width, height){
        // debug
        if (this._sprites.file = "img/rocket_idle.png"){
                    
        }

        if (this._hasImage){
            ctx.drawImage(this._image,
                this._currentFrameNumber * this._sprites.spriteWidth, this._currentStateNumber * this._sprites.spriteHeight,
                this._sprites.spriteWidth, this._sprites.spriteHeight,
                -(width/2), -(height/2), 
                width, height);
        }
    }
}