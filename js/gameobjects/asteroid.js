/****************************************************************
 CLASS: Asteroid
 ****************************************************************/
class Asteroid extends GameObject{
    constructor(x, y, orientation){
        super(x, y, orientation);

        this._asteroidSize;
        this.setAsteroidSize(ASTEROID_SIZE.LARGE);
        this.setBoundaryHandlingSetting(ON_BOUNDARY_HIT.TELEPORT);
        
        // FIXME: just now, just for fun
        let min = 1;
        let max = 7;
        let r = Math.floor(Math.random()* (max-min+1))+1; 
        switch(r){
            case 1:
                this.setSpriteImage("img/asteroid.png");
                break;
            case 2:
                this.setSpriteImage("img/astronaut.png");
                break;
            case 3:
                this.setSpriteImage("img/bee.png");
                break;
            case 4:
                this.setSpriteImage("img/quadropus.png");
                break;
            case 5:
                this.setSpriteImage("img/sleeper.png");
                break;             
            case 6:
                this.setSpriteImage("img/placeholder.png");
                break;     
            case 7:
                this.setSpriteImage("img/placeholder_explosion.png");
                break;                                                 
            }

        this._gameObjectType = GAMEOBJECT_TYPE.ASTEROID;
    }

    setAsteroidSize(size){
        switch(size){
            case ASTEROID_SIZE.SMALL:
                this._asteroidSize = ASTEROID_SIZE.SMALL;
                this.setSize(50,50);   
                this.hitBox.setSize(20);
                this._mass = 1;
                this._hitPoints = 10;
                break;
            case ASTEROID_SIZE.MEDIUM:
                this._asteroidSize = ASTEROID_SIZE.MEDIUM;
                this.setSize(100,100);
                this.hitBox.setSize(50);
                this._mass = 5;
                this._hitPoints = 10;
                break;
            case ASTEROID_SIZE.LARGE:
                this._asteroidSize = ASTEROID_SIZE.LARGE;
                this.setSize(150,150);
                this.hitBox.setSize(75);
                this._mass = 10;
                this._hitPoints = 10;
                break;
        }
    }

    getAsteroidSize(){
        return this._asteroidSize;
    }

    randomSpawn(){
        this.x = Math.floor(Math.random()*canvas.width);
        this.y = Math.floor(Math.random()*canvas.height);
        this.vx = Math.floor(Math.random()*(100+50+1))-50;    
        this.vy = Math.floor(Math.random()*(100+50+1))-50;    
        this._orientation = Math.floor(Math.random()*360);
        this.angularSpeed = Math.floor(Math.random()*(30+30+1))-30;
        this.setAsteroidSize(ASTEROID_SIZE.LARGE);
        this.hitBox.x = this.x;
        this.hitBox.y = this.y;
    }

    // override
    update(milliSecondsPassed){
        super.update(milliSecondsPassed);
        
        // asteroid destroyed
        if(this._hitPoints <= 0){

            // if this is not a small Asteroid, split into 3
            if(this._asteroidSize !== ASTEROID_SIZE.SMALL){

                // generate 3 asteroids, smaller size
                let newSize = this._asteroidSize - 1;
                let angle = 0;

                for(let i=1; i<= 3; i++){
            
                    angle += Math.PI*2/ 3;

                    // position 
                    let x = (Math.sin(angle)) * (this._width-50 +3) + this.x;
                    let y = (-Math.cos(angle)) * (this._width-50 +3) + this.y;

                    // velocity
                    let speed = Math.floor(Math.random()*(100+50+1))-50;                   
                    let vx = (Math.sin(angle)) * speed + this.vx;
                    let vy = (-Math.cos(angle)) * speed + this.vy;

                    // orientation
                    let orientation = Math.floor(Math.random()*360);

                    // create asteroid            
                    let asteroid = objectFactory.generateAsteroid(x, y, orientation);
                    asteroid.setAsteroidSize(newSize);
                    asteroid.vx = vx;
                    asteroid.vy = vy;
                    let angularSpeed = Math.floor(Math.random()*(30+30+1))-30;
                    asteroid.angularSpeed = angularSpeed;
                }
            }

            // generate particle effect
            objectFactory.generateParticleEffect(this.x, this.y, PARTICLE_EFFECT.CIRCULAR_EXPLOSION_BIG);

            // delete the asteroid
            this._isDeleted = true;
        }
    }
}
