/****************************************************************
 CLASS: Torpedo
 ****************************************************************/
class Torpedo extends GameObject {
    constructor(x, y, orientation) {
        super(x, y, orientation);

        // gameobject type
        this._gameObjectType = GAMEOBJECT_TYPE.PROJECTILE;

        // read and set inherited values 
        this.setSize(10,10);
        this.hitBox.setSize(10);
        this.setBoundaryHandlingSetting(ON_BOUNDARY_HIT.DELETE);
        this.speed = 300;               
        this._maxSpeed = 300;   
        this._mass = 1;
        
        // read and set class-specific values
        this.yield = 5000;      // in Newton

        this.sprites.initialise(
            {
                "defaultSprite" : {
                    "file" : "img/torpedo.png",
                    "spriteWidth" : 220,
                    "spriteHeight" : 219,
                    "states" : {
                        "defaultState" : {
                            "frame1" : 1000,
                        }                                         
                    }
                }
            }
        );    

        // set velocity
        this.vx = Math.sin(orientation) * this.speed;
        this.vy = -Math.cos(orientation) * this.speed;


    }
}