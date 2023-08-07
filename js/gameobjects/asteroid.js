const ASTEROID_SIZE = Object.freeze({
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3
});

/****************************************************************
 CLASS: Asteroid
 ****************************************************************/
class Asteroid extends GameObject{
    constructor(x, y, orientation){
        super(x, y, orientation);

        this.setAsteroidSize(ASTEROID_SIZE.SMALL);
        this.setBoundaryHandlingSetting(ON_BOUNDARY_HIT.TELEPORT);
        this.setSpriteImage("img/asteroid.png");
        this.randomSpawn();

        // debug
        this.isShowDebugInfo = false;
        this.isShowDebugStats = true;
    }

    setAsteroidSize(size){
        switch(size){
            case ASTEROID_SIZE.SMALL:
                this.setSize(50,50);   // todo: relative to canvas sizes
                this.hitBox.setSize(20);
                this.mass = 1;
                break;
            case ASTEROID_SIZE.MEDIUM:
                this.setSize(100,100);
                this.hitBox.setSize(50);
                this.mass = 5;
                break;
            case ASTEROID_SIZE.LARGE:
                this.setSize(150,150);
                this.hitBox.setSize(75);
                this.mass = 10;
                break;
        }
    }

    randomSpawn(){
        this.x = Math.floor(Math.random()*canvas.width);
        this.y = Math.floor(Math.random()*canvas.height);
        this.vx = Math.floor(Math.random()*(100+50+1))-50;    // TODO: speed relative to canvas size?
        this.vy = Math.floor(Math.random()*(100+50+1))-50;    // TODO: speed relative to canvas size?
        this.orientation = Math.floor(Math.random()*360);
        this.angularSpeed = Math.floor(Math.random()*(30+30+1))-30;
        this.setAsteroidSize(Math.floor(Math.random()*(3-1+1))+1);
    }
}
