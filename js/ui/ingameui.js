/****************************************************************
 CLASS: UI
 ****************************************************************/
 class InGameUI{
    constructor(){
        // draw on the foreground (ui) canvas
        this._ctx = uiCtx;

        // refresh settings
        this._isDrawRefreshNeeded = false; 
        this._elapsedTime = 0;                      // elapsed time between refreshes in ms
        this._minimumRefreshInterval = 1000;        // in ms

        this._isAnimation = false;
        this._animationInterval = 2000;             // in ms
        this._animationTimer = 0;
        
        // information
        this._information = {
            "credits" : -1,
            "player1" : {
                "score" : -1,
                "lives" : -1,
            },
            "player2" : {
                "lives" : -1
            }
        };
    }

    update(milliSecondsPassed){
        this._elapsedTime += milliSecondsPassed;
        this._animationTimer += milliSecondsPassed;

        // mandatory refresh
        if (this._elapsedTime >= this._minimumRefreshInterval){
            this._isDrawRefreshNeeded = true;
            this._elapsedTime = 0;
        }

        // mandatory animations
        if (this._animationTimer >= this._animationInterval){
            this._isAnimation = true;
            this._animationTimer = 0;
            this.animationUpdate(); 
        }
    }

    updateInformation(element, value){
        this._information[element] = value;
        this._isDrawRefreshNeeded = true;
    }

    animationUpdate(){
        // swap "Game Over" with "Press Fire to Start"

        if (this._information["player1.lives"] === "Game Over") {
            if (game.getCredits() !== 0){
                this._information["player1.lives"] = "Press Fire To Start";
            }
        } 
        else if (this._information["player1.lives"] === "Press Fire To Start"){
            this._information["player1.lives"] = "Game Over";
        }

        if (this._information["player2.lives"] === "Game Over") {
            if (game.getCredits() !== 0){
                this._information["player2.lives"] = "Press Fire To Start";
            }
        } 
        else if (this._information["player2.lives"] === "Press Fire To Start"){
            this._information["player2.lives"] = "Game Over";
        }

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
        //const currentTime = new Date();
        //this._ctx.fillText("Update from: "+currentTime.getTime(),500,90);  
        

        // Reset refresh flag
        this._isDrawRefreshNeeded = false;
    }
}