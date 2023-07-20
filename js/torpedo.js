/****************************************************************
 CLASS: Torpedo
 ****************************************************************/
class Torpedo extends GameObject {
    constructor(x, y, orientation) {
        super(x, y, orientation);

        // stats
        this.speed = 300;
        this.setSize(20,20);
        this.setBoundaryHandlingSetting(ON_BOUNDARY_HIT.DELETE);

        // img
        this.setSpriteImage("img/torpedo.png");

        // set velocity
        this.vx = Math.sin(orientation) * this.speed;
        this.vy = -Math.cos(orientation) * this.speed;
    }
}