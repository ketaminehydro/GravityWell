/****************************************************************
 CLASS: StageCompleted
 ****************************************************************/
 class StageCompleted extends ITitle{
    constructor (){
        super(2000);
    }  

    draw(){
        uiCtx.clearRect(0,0, canvas.width, canvas.height);    
        this.#drawMessage();
    }

    #drawMessage(){          
        let text = "STAGE COMPLETED";

        // position
        let x = canvas.width/2;
        let y = canvas.height/2;

        // draw
        this.#drawText(text, x, y, "4em Share Tech Mono", "center", "#ffffff", "#0033ff");
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