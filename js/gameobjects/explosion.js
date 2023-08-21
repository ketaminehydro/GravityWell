/****************************************************************
 CLASS: Explosion
 ****************************************************************/
class Explosion extends GameObject {
    constructor(x, y, orientation) {
        super(x, y, orientation);

        // stats
        this.setSize(100,100);
        this.hitBox.setSize(100);

        // img
        this.setSpriteImage("img/placeholder_explosion.png");

        // type
        this._gameObjectType = GAMEOBJECT_TYPE.EXPLOSION;

        // debug
        this._isShowDebugStats = false;
    }
}