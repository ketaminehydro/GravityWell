/****************************************************************
 CLASS: IntroScreen
 ****************************************************************/
class IntroScreen {
    constructor (){
        // draw on the foreground (ui) canvas
        this._ctx = uiCtx;
    }  

    draw(){
        this.#drawTitle();
        this.#drawPressFire();
        this.#drawControls();
    }
    
    #drawTitle(){
        // title
        let title = "GRAVITYWELL";

        // position
        let x = canvas.width/2;
        let y = canvas.height/2-200;   //200

        // draw 3 texts on top of each other, slighty offset each time
        this.#drawText(title, x, y, "15em Fugaz One", "center", "#ffffff", "#0033ff");
        this.#drawText(title, x-4, y-4, "15em Fugaz One", "center", "#0080EC", "#0033ff");
        this.#drawText(title, x-8, y-8, "15em Fugaz One", "center", "#032974", "#0033ff");
    }

    #drawPressFire(){
        // Push fire to play              
        let text = "PRESS <FIRE> TO PLAY";

        // position
        let x = canvas.width/2;
        let y = canvas.height/2+30;

        // draw
        this.#drawText(text, x, y, "4em Share Tech Mono", "center", "#ffffff", "#0033ff");
    }

    #drawControls(){
        // position
        let x = canvas.width/2;
        let y = canvas.height/2;

        // draw Player 1
        this.#drawText("PLAYER 1 CONTROLS", x-600, y+200, "3em Share Tech Mono", "left", "#1553CE", "#001155");
        this.#drawText("Movement:  W A S D", x-600, y+250, "3em Share Tech Mono", "left",  "#ffffff", "#001155");
        this.#drawText("Fire:      Spacebar", x-600, y+300, "3em Share Tech Mono", "left",  "#ffffff", "#001155");

        // draw Player 2
        this.#drawText("PLAYER 2 CONTROLS", x+100, y+200, "3em Share Tech Mono", "left", "#1553CE", "#001155");
        this.#drawText("Movement:  Arrow keys", x+100, y+250, "3em Share Tech Mono", "left",  "#ffffff", "#001155");
        this.#drawText("Fire:      Right Shift", x+100, y+300, "3em Share Tech Mono", "left",  "#ffffff", "#001155");
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