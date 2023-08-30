/****************************************************************
 CLASS: Torpedo
 ****************************************************************/
class Torpedo extends GameObject {
    constructor(x, y, orientation, objectFactory) {
        super(x, y, orientation, objectFactory);

        // stats
        this.speed = 300;       // in px/s
        this._maxSpeed = 300;   
        this.yield = 5000;      // in Newton
        this.setSize(10,10);
        this.hitBox.setSize(10);
        this._mass = 1;
        this.setBoundaryHandlingSetting(ON_BOUNDARY_HIT.DELETE);

        // img
        this.setSpriteImage("img/torpedo.png");

        // set velocity
        this.vx = Math.sin(orientation) * this.speed;
        this.vy = -Math.cos(orientation) * this.speed;

        // type
        this._gameObjectType = GAMEOBJECT_TYPE.PROJECTILE;

        // debug
        this._isShowDebugStats = false;
    }
}