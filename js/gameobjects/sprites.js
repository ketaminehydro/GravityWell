/****************************************************************
 CLASS: Sprites
 ****************************************************************/
 class Sprites{
 
    constructor(){
        this._hasImageFile = false;

        this._sprites = {};
    }

    initialise(sprites){    
        for (const [key, value] of Object.entries(sprites)) {
            const instance = new Sprite();
            instance.initialise(value);
            this._sprites[key] = instance;
        }

        this._hasImageFile = true;
    }

    setState(sprite, state){
        this._sprites[sprite].setState(state);

        

        if (sprite === "forwardthrust") console.log("forward");
        if (sprite === "idle") console.log("idle");
    }

    update(milliSecondsPassed) {
        for(const sprite in this._sprites){
            this._sprites[sprite].update(milliSecondsPassed);
        }
    }

    draw(width, height){
        if (this._hasImageFile){
            for(const sprite in this._sprites){
                this._sprites[sprite].draw(width, height);
            }
        }
    }
}