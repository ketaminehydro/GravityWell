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
                    game.setGameState(GAME_STATE.STAGE_LOADING);

                    // don't drag over any fire keypress to the level
                    delete this._keyPressed[' '];
                }
            break;

            case GAME_STATE.STAGE_RUNNING:
                // player 1
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
                }


                // player 2
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
                }

                /*********************** DEBUG CONTROLS **************************************/
        
                // Player: Hitbox + Stats 
                if (this._keyPressed['h']) {
                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['h'] = false;

                    stage.getPlayers().toggleShowDebugInfo();
                    stage.getPlayers().toggleShowDebugGfx();            
                }

                // Objects: Hitbox
                if (this._keyPressed['j']) {
                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['j'] = false;

                    stage.getAsteroids().toggleShowDebugGfx();
                    stage.getProjectiles().toggleShowDebugGfx();      // FIXME: this only works on EXISTING objects
                    stage.getExplosions().toggleShowDebugGfx();
                }

                // Objects: Stats
                if (this._keyPressed['k']) {
                    // this action a toggle switch, i.e. a one-time execution
                    this._keyPressed['k'] = false;

                    stage.getAsteroids().toggleShowDebugInfo();
                    stage.getProjectiles().toggleShowDebugInfo();
                    stage.getExplosions().toggleShowDebugInfo();
                }    

                // Special triggers // debug
                if (this._keyPressed['g']){
                    stage.setStageState(STAGE_STATE.COMPLETED_ONGOING);  
                }
                /*if (this._keyPressed['f']){
                    stage._levelState = LEVEL_STATE.GAME_OVER_BEGIN;
                    console.log("LEVEL_STATE.GAME_OVER_BEGIN");
                }*/
                if (this._keyPressed['b']){
                    stage.getPlayers().getElement(1).takeDamage(1);
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