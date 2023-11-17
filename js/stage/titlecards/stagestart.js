/****************************************************************
 CLASS: StageStart
 ****************************************************************/
class StageStart extends ITitle{
    constructor (){
        let duration = 5000;   // ms
        
        super(duration);

        this._text = "STAGE UNDEFINED";

        // animation
        this._gfx = new GFXImplosion(duration);
        this._fontColor = "#000033";
        this._colorShadow = "#3366ff";
        this._r = 51;
        this._g = 102;
        this._b = 255;
    }  

    setStageNumber(stageNumber){
        this._text = "STAGE "+stageNumber;
    }

    reset(){
        super.reset();

        // animation
        this._gfx = new GFXImplosion(5000);
        this._fontColor = "#000033";
        this._colorShadow = "#3366ff";
        this._r = 51;
        this._g = 102;
        this._b = 255;     
    }
    update(milliSecondsPassed){
        super.update(milliSecondsPassed);

        // star animation
        this._gfx.update(milliSecondsPassed);
        
        
        // font animation
        if (this._remainingLifeTime > 4500){
            this._colorShadow = "rgb("+this._r+", "+this._g+", "+this._b+")"; // #3366ff
        }
        else if (this._remainingLifeTime > 2600){
            const colorStep = 150/(5000-2600);
            this._r += colorStep * milliSecondsPassed*2;
            this._g += colorStep * milliSecondsPassed;
            //this._b += colorStep * milliSecondsPassed;
            this._colorShadow = "rgb("+this._r+", "+this._g+", "+this._b+")";
        }
        else if (this._remainingLifeTime > 2450){
            const colorStep = 150/(6000-3300);
            this._r += colorStep * milliSecondsPassed*2;
            this._g += colorStep * milliSecondsPassed;
            //this._b += colorStep * milliSecondsPassed;
            this._colorShadow = "rgb("+this._r+", "+this._g+", "+this._b+")";
            this._fontColor = "#ffffff";
        }
        else if (this._remainingLifeTime <= 2300){
            this._fontColor = "#ffffff";
            this._colorShadow = "#0033ff";
            this._text = "GET READY";
        }
        
        
        return this._animationHasEnded;
    }
    draw(){
        this.#drawMessage();
        this._gfx.draw();
    }

    #drawMessage(){          
        // position
        let x = canvas.width/2;
        let y = canvas.height/2;

        // draw
        this.#drawText(this._text, x, y, "4em Share Tech Mono", "center", this._fontColor, this._colorShadow);
    }

    #drawText(text, x, y, font, alignment, colorFont, colorShadow){      

        // font style
        this._ctx.font         = font;        
        this._ctx.fillStyle    = colorFont;
        this._ctx.textAlign    = alignment;
        this._ctx.textBaseline = "middle"; 

        // shadow style
        this._ctx.miterLimit = 2;
        this._ctx.lineJoin = "circle";
        this._ctx.strokeStyle  = colorShadow;

        // draw
        this._ctx.lineWidth = 7;
        this._ctx.strokeText(text, x, y);
        this._ctx.lineWidth = 1;
        this._ctx.fillText(text,x, y);
    }
}