/****************************************************************
 CLASS: UI
 ****************************************************************/
 class inGameUI{
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
            "Player 1 Score" : -1,
            "Player 2 Score" : -1
        };
    }

    update(milliSecondsPassed){
        this._elapsedTime += milliSecondsPassed;

        // refresh at least every 500 ms
        if (this._elapsedTime >= 500){
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

        // Reset refresh flag
        this._isDrawRefreshNeeded = false;
    }
}