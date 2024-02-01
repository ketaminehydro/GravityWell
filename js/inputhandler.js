/****************************************************************
 CLASS: InputHandler
 ****************************************************************/
class InputHandler{
    constructor(){
        this._keyPressed = {};  

        document.addEventListener('keydown', this.#handleKeyDown.bind(this));
        document.addEventListener('keyup', this.#handleKeyUp.bind(this));
    }

    #handleKeyDown(event) {
        // Set the corresponding key to true when pressed
        this._keyPressed[event.code] = true;    

        // prevent standard browser behaviour of scrolling the page when pressing the space bar
        if(event.code == "Space" && event.target == document.body) {
            event.preventDefault();
          }    
    }

    #handleKeyUp(event) { 
        // Set the corresponding key to false when released
        this._keyPressed[event.code] = false;
    }

   /************************ INPUT HANDLING ******************************************/
    handleInput(gameState){
        switch (gameState) {

            case GAME_STATE.TITLESCREEN:
                // player 1 fire button
                if (this._keyPressed[CONTROLS.PLAYER1_FIRE]) {
                    stage.getPlayers().getElement(0).activate();
                    // don't drag over any fire keypress to the next state
                    this._keyPressed[CONTROLS.PLAYER1_FIRE] = false;
                }
                
                // player 2 fire button
                if (this._keyPressed[CONTROLS.PLAYER2_FIRE]) {
                    stage.getPlayers().getElement(1).activate();
                    // don't drag over any fire keypress to the next state
                    this._keyPressed[CONTROLS.PLAYER2_FIRE] = false;
                }

                break;

            case GAME_STATE.STAGE_RUNNING:

                // player 1
                if(stage.getPlayers().getElement(0).isActive()){
                    if (this._keyPressed[CONTROLS.PLAYER1_UP]) {
                        stage.getPlayers().getElement(0).move(PLAYER_ACTION.THRUST_FORWARD);
                    }

                    if (this._keyPressed[CONTROLS.PLAYER1_LEFT]) {
                        stage.getPlayers().getElement(0).move(PLAYER_ACTION.YAW_LEFT);
                    }

                    if (this._keyPressed[CONTROLS.PLAYER1_DOWN]) {
                        stage.getPlayers().getElement(0).move(PLAYER_ACTION.REDUCE_SPEED);
                    }

                    if (this._keyPressed[CONTROLS.PLAYER1_RIGHT]) {
                        stage.getPlayers().getElement(0).move(PLAYER_ACTION.YAW_RIGHT);
                    }

                    if (this._keyPressed[CONTROLS.PLAYER1_FIRE]) {
                        stage.getPlayers().getElement(0).fire();
                        //this._keyPressed[CONTROLS.PLAYER1_FIRE] = false;
                    }
                }
                else{
                    if (this._keyPressed[CONTROLS.PLAYER1_FIRE]) {
                        game.joinPlayer(PLAYER1);
                        this._keyPressed[CONTROLS.PLAYER1_FIRE] = false;
                    }                 
                }


                // player 2
                if(stage.getPlayers().getElement(1).isActive()){
                    if (this._keyPressed[CONTROLS.PLAYER2_UP]) {
                        stage.getPlayers().getElement(1).move(PLAYER_ACTION.THRUST_FORWARD);
                    }

                    if (this._keyPressed[CONTROLS.PLAYER2_LEFT]) {
                        stage.getPlayers().getElement(1).move(PLAYER_ACTION.YAW_LEFT);
                    }

                    if (this._keyPressed[CONTROLS.PLAYER2_DOWN]) {
                        stage.getPlayers().getElement(1).move(PLAYER_ACTION.REDUCE_SPEED);
                    }

                    if (this._keyPressed[CONTROLS.PLAYER2_RIGHT]) {
                        stage.getPlayers().getElement(1).move(PLAYER_ACTION.YAW_RIGHT);
                    }

                    if (this._keyPressed[CONTROLS.PLAYER2_FIRE]) {
                        stage.getPlayers().getElement(1).fire();
                        //this._keyPressed[CONTROLS.PLAYER2_FIRE] = false;
                    }
                }
                else{
                    if (this._keyPressed[CONTROLS.PLAYER2_FIRE]) {
                        game.joinPlayer(PLAYER2);
                        this._keyPressed[CONTROLS.PLAYER2_FIRE] = false;
                    }                 
                }

                /*********************** DEBUG CONTROLS **************************************/
        
                // Player: Hitbox + Stats 
                if (this._keyPressed['KeyH']) {
                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['KeyH'] = false;

                    stage.getPlayers().toggleShowDebugInfo();
                    stage.getPlayers().toggleShowDebugGfx();            
                }

                // Objects: Hitbox
                if (this._keyPressed['KeyJ']) {
                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['KeyJ'] = false;

                    stage.getEnemies().toggleShowDebugGfx();
                    stage.getProjectiles().toggleShowDebugGfx();      
                    stage.getExplosions().toggleShowDebugGfx();
                }

                // Objects: Stats
                if (this._keyPressed['KeyK']) {
                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['KeyK'] = false;

                    stage.getEnemies().toggleShowDebugInfo();
                    stage.getProjectiles().toggleShowDebugInfo();
                    stage.getExplosions().toggleShowDebugInfo();
                }    

                // Special triggers // debug
                if (this._keyPressed['KeyG']){
                    stage.setStageState(STAGE_STATE.COMPLETED_ONGOING);  
                }
                if (this._keyPressed['f']){
                    stage.setStageState(STAGE_STATE.GAME_OVER_ONGOING);
                }
                if (this._keyPressed['b']){
                    stage.getPlayers().getElement(0).takeDamage(1);
                    this._keyPressed['b'] = false;
                }
                if (this._keyPressed['v']){
                    game.setGameState(game.getGameState()+1);       

                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['v'] = false;
                }
                break;
        
            default:

                break;
        }
        if (this._keyPressed[CONTROLS.PAUSE]){
            game.togglePause();
            // this action a toggle switch, i.e. a one-time execution
            this._keyPressed[CONTROLS.PAUSE] = false;
        }
    }
}