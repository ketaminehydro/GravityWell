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
        this._keyPressed[event.key] = true;    

        // prevent standard browser behaviour of scrolling the page when pressing the space bar
        if(event.keyCode == 32 && event.target == document.body) {
            event.preventDefault();
          }    
    }

    #handleKeyUp(event) { 
        // Set the corresponding key to false when released
        this._keyPressed[event.key] = false;
    }

   /************************ INPUT HANDLING ******************************************/
    handleInput(gameState){
        switch (gameState) {

            case GAME_STATE.TITLESCREEN:
                // player 1 fire button
                if (this._keyPressed[CONTROLS.PLAYER1_FIRE]) {
                    stage.getPlayers().getElement(0).activate();
                    // don't drag over any fire keypress to the level
                    delete this._keyPressed[CONTROLS.PLAYER1_FIRE];
                }
                
                // player 2 fire button
                if (this._keyPressed[CONTROLS.PLAYER2_FIRE]) {
                    stage.getPlayers().getElement(1).activate();
                    // don't drag over any fire keypress to the level
                    delete this._keyPressed[CONTROLS.PLAYER2_FIRE];
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
                        delete this._keyPressed[CONTROLS.PLAYER1_FIRE];
                    }
                }
                else{
                    if (this._keyPressed[CONTROLS.PLAYER1_FIRE]) {
                        game.joinPlayer(PLAYER1);
                        delete this._keyPressed[CONTROLS.PLAYER1_FIRE];
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
                        delete this._keyPressed[CONTROLS.PLAYER2_FIRE];
                    }
                }
                else{
                    if (this._keyPressed[CONTROLS.PLAYER2_FIRE]) {
                        game.joinPlayer(PLAYER2);
                        delete this._keyPressed[CONTROLS.PLAYER2_FIRE];
                    }                 
                }

                /*********************** DEBUG CONTROLS **************************************/
        
                // Player: Hitbox + Stats 
                if (this._keyPressed['h']) {
                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['h'] = false;

                    stage.getPlayingPlayers().toggleShowDebugInfo();
                    stage.getPlayingPlayers().toggleShowDebugGfx();            
                }

                // Objects: Hitbox
                if (this._keyPressed['j']) {
                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['j'] = false;

                    stage.getEnemies().toggleShowDebugGfx();
                    stage.getProjectiles().toggleShowDebugGfx();      // FIXME: this only works on EXISTING objects
                    stage.getExplosions().toggleShowDebugGfx();
                }

                // Objects: Stats
                if (this._keyPressed['k']) {
                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['k'] = false;

                    stage.getEnemies().toggleShowDebugInfo();
                    stage.getProjectiles().toggleShowDebugInfo();
                    stage.getExplosions().toggleShowDebugInfo();
                }    

                // Special triggers // debug
                if (this._keyPressed['g']){
                    stage.setStageState(STAGE_STATE.COMPLETED_ONGOING);  
                }
                if (this._keyPressed['f']){
                    stage.setStageState(STAGE_STATE.GAME_OVER_ONGOING);
                }
                if (this._keyPressed['b']){
                    stage.getPlayingPlayers().getElement(0).takeDamage(1);
                    this._keyPressed['b'] = false;
                }
                if (this._keyPressed['v']){
                    game.setGameState(game.getGameState()+1);       

                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['v'] = false;
                }
        
            default:
                break;
        }
    }
}