/****************************************************************
 CLASS: UI
 ****************************************************************/
 class InGameUI{
    constructor(){
        // draw on the foreground (ui) canvas
        this._ctx = uiCtx;

        // Refresh flag
        this._isDrawRefreshNeeded = false; 

        // elapsed time between updates in milliseconds
        this._elapsedTime = 0;
        
        // information
        this._information = {
            "credits" : -1,
            "player1" : {
                "score" : -1,
                "lives" : -1,
            }
        };
    }

    update(milliSecondsPassed){
        this._elapsedTime += milliSecondsPassed;

        // refresh at least every 1000 ms
        if (this._elapsedTime >= 1000){
            this._isDrawRefreshNeeded = true;
            this._elapsedTime = 0;
        }
    }

    updateInformation(element, value){
        this._information[element] = value;
        
        
        this._isDrawRefreshNeeded = true;
    }

    draw(){
        // only draw on the canvas when needed
        if(!this._isDrawRefreshNeeded){
            return;
        }

        // clear the canvas
        this._ctx.clearRect(0,0, canvas.width, canvas.height); 

        // display
        this._ctx.fillStyle = "#ffaaaa";
        this._ctx.font = "2em Monospace";
        this._ctx.fillText("Credits: "+this._information["credits"],500,30);
        this._ctx.fillText("Player 1 Lives: "+this._information["player1.lives"],500,50);    
        this._ctx.fillText("Player 2 Lives: "+this._information["player2.lives"],500,70);  

        // debug : to visually check refresh rate
        const currentTime = new Date();
        this._ctx.fillText("Update from: "+currentTime.getTime(),500,90);  
        

        // Reset refresh flag
        this._isDrawRefreshNeeded = false;
    }
}