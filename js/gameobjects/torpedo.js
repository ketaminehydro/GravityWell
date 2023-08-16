/****************************************************************
 CLASS: Torpedo
 ****************************************************************/
class Torpedo extends GameObject {
    constructor(x, y, orientation) {
        super(x, y, orientation);

        // stats
        this.speed = 300;
        this._maxSpeed = 300;
        this.setSize(10,10);
        this.hitBox.setSize(10);
        this._mass = 1;
        this.setBoundaryHandlingSetting(ON_BOUNDARY_HIT.DELETE);

        // img
        this.setSpriteImage("img/torpedo.png");

        // set velocity
        this.vx = Math.sin(orientation) * this.speed;
        this.vy = -Math.cos(orientation) * this.speed;

        // debug
        this._isShowDebugStats = false;
    }
}