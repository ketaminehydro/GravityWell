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
        if (event.key === 'u') {
            console.log("up U");
        }

        // Set the corresponding key to false when released
        this._keyPressed[event.key] = false;
    }

    handleInputDuringPlay(context) {   // TODO: context for input handling needs to be standard interface

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

        if (this._keyPressed['-']) {
            context.getPlayers().getElement(1).fire(context);
        }


        // debug
        if (this._keyPressed['h']) {
            // this action a toggle switch, i.e. a one-time execution
            this._keyPressed['h'] = false;

            context.getPlayers().toggleShowDebugInfo();
            context.getPlayers().toggleShowDebugGfx();            
        }

        if (this._keyPressed['j']) {
            // this action a toggle switch, i.e. a one-time execution
            this._keyPressed['j'] = false;

            context.getAsteroids().toggleShowDebugGfx();
            context.getProjectiles().toggleShowDebugGfx();      // FIXME: this only works on EXISTING objects
            context.getExplosions().toggleShowDebugGfx();
        }

        if (this._keyPressed['k']) {
            // this action a toggle switch, i.e. a one-time execution
            this._keyPressed['k'] = false;

            context.getAsteroids().toggleShowDebugInfo();
            context.getProjectiles().toggleShowDebugInfo();
            context.getExplosions().toggleShowDebugInfo();
        }    
    }
}