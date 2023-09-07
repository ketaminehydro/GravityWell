/****************************************************************
 CLASS: InputHandler
 ****************************************************************/
class InputHandler{
    constructor(){
        this._keyPressed = {};  

        document.addEventListener('keydown', this.#handleKeyDown.bind(this));
        document.addEventListener('keyup', this.#handleKeyUp.bind(this));


        // context on which to apply the input to
        this._context = null;
    }

    #handleKeyDown(event) {
        // Set the corresponding key to true when pressed
        this._keyPressed[event.key] = true;    
    }

    
    #handleKeyUp(event) { 
        // Set the corresponding key to false when released
        this._keyPressed[event.key] = false;
    }

    handleInputDuringLevel(context) {   

        // player 1
        if (this._keyPressed['w']) {
            context.getPlayers().getElement(0).move(PLAYER_ACTION.THRUST_FORWARD);
        }

        if (this._keyPressed['a']) {
            context.getPlayers().getElement(0).move(PLAYER_ACTION.YAW_LEFT);
        }

        if (this._keyPressed['s']) {
            context.getPlayers().getElement(0).move(PLAYER_ACTION.REDUCE_SPEED);
        }

        if (this._keyPressed['d']) {
            context.getPlayers().getElement(0).move(PLAYER_ACTION.YAW_RIGHT);
        }

        if (this._keyPressed[' ']) {
            context.getPlayers().getElement(0).fire(context);
        }


        // player 2
        if (this._keyPressed['ArrowUp']) {
            context.getPlayers().getElement(1).move(PLAYER_ACTION.THRUST_FORWARD);
        }

        if (this._keyPressed['ArrowLeft']) {
            context.getPlayers().getElement(1).move(PLAYER_ACTION.YAW_LEFT);
        }

        if (this._keyPressed['ArrowDown']) {
            context.getPlayers().getElement(1).move(PLAYER_ACTION.REDUCE_SPEED);
        }

        if (this._keyPressed['ArrowRight']) {
            context.getPlayers().getElement(1).move(PLAYER_ACTION.YAW_RIGHT);
        }

        if (this._keyPressed['Shift']) {
            context.getPlayers().getElement(1).fire(context);
        }


        /*********************** DEBUG CONTROLS **************************************/
        
        // Player: Hitbox + Stats 
        if (this._keyPressed['h']) {
            // this action a toggle switch, i.e. a one-time execution
            this._keyPressed['h'] = false;

            context.getPlayers().toggleShowDebugInfo();
            context.getPlayers().toggleShowDebugGfx();            
        }

        // Objects: Hitbox
        if (this._keyPressed['j']) {
            // this action a toggle switch, i.e. a one-time execution
            this._keyPressed['j'] = false;

            context.getAsteroids().toggleShowDebugGfx();
            context.getProjectiles().toggleShowDebugGfx();      // FIXME: this only works on EXISTING objects
            context.getExplosions().toggleShowDebugGfx();
        }

        // Objects: Stats
        if (this._keyPressed['k']) {
            // this action a toggle switch, i.e. a one-time execution
            this._keyPressed['k'] = false;

            context.getAsteroids().toggleShowDebugInfo();
            context.getProjectiles().toggleShowDebugInfo();
            context.getExplosions().toggleShowDebugInfo();
        }    

        // Special triggers // debug
        if (this._keyPressed['g']){
           context._levelState = LEVEL_STATE.COMPLETED;  
        }
        if (this._keyPressed['f']){
            context._levelState = LEVEL_STATE.PLAY;  
        }
        if (this._keyPressed['b']){
            game._gameState = GAME_STATE.TITLESCREEN;  
        }
        if (this._keyPressed['v']){
            game._gameState = GAME_STATE.LEVEL_RUN; 
        }
    }

    handleInputDuringTitleScreen() {   

        // player 1 fire button
        if (this._keyPressed[' ']) {
            game._gameState = GAME_STATE.LEVEL_RUN;

            // don't drag over any fire keypress to the level
            delete this._keyPressed[' '];
        }
    }
}