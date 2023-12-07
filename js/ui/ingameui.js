/****************************************************************
 CLASS: UI
 ****************************************************************/
 class inGameUI{
    constructor(){
        // draw on the foreground (ui) canvas
        this._ctx = uiCtx;
        this._isDrawRefreshNeeded = true;  
    }

    update(milliSecondsPassed){
        // TODO: here needs to go a real logic
        this._isDrawRefreshNeeded = true;
    }

    draw(){
        // only draw on the canvas when needed
        if(!this._isDrawRefreshNeeded){
            return;
        }

        // clear the canvas
        this._ctx.clearRect(0,0, canvas.width, canvas.height); 
        console.log("HELLO");

        // Reset refresh flag
        this._isDrawRefreshNeeded = false;
    }
}