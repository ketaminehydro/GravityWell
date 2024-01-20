/****************************************************************
 CLASS: Enemy
 ****************************************************************/
class Enemy extends GameObject{
    constructor(x, y, orientation, type){
        super(x, y, orientation);

        this._gameObjectType = GAMEOBJECT_TYPE.ASTEROID; //TODO: replace ASTEROID by ENEMY

        // read and set inherited values
        this._type = type;
        this._fullHitPoints = gameData.enemies[type].fullHitPoints;
        this._hitPoints = gameData.enemies[type].hitPoints;
        this._maxSpeed = gameData.enemies[type].maxSpeed;
        this._maxAngularSpeed = gameData.enemies[type].maxAngularSpeed;
        this._width = gameData.enemies[type].width;
        this._height = gameData.enemies[type].height;
        this._mass = gameData.enemies[type].mass;
        this._cor = gameData.enemies[type].cor;
        this._boundaryHandlingSetting = ON_BOUNDARY_HIT[gameData.enemies[type].boundaryHandlingSetting];
        this.hitBox.size = gameData.enemies[type].hitBox.size;
        this.hitBox.xOffset = gameData.enemies[type].hitBox.xOffset;
        this.hitBox.yOffset = gameData.enemies[type].hitBox.yOffset;

        // read and set class-specific values        
        this._behaviour = ENEMY_BEHAVIOUR[gameData.enemies[type].behaviour];         //TODO: create a behaviour class

        this._splitsInto = [];
        for (let element in gameData.enemies[type].splitsInto){
            this._splitsInto.push(gameData.enemies[type].splitsInto[element]);
        };

        this._particleEffects = {};
        Object.assign(this._particleEffects, gameData.enemies[type].particleEffects);        

        this.sprites.initialise(gameData.enemies[type].sprites);
    }

    getType(){
        return this._type;
    }

    randomSpawn(){
        this.x = Math.floor(Math.random()*canvas.width);
        this.y = Math.floor(Math.random()*canvas.height);
        this.vx = Math.floor(Math.random()*(100+50+1))-50;    
        this.vy = Math.floor(Math.random()*(100+50+1))-50;    
        this.orientation = Math.floor(Math.random()*360);
        this.angularSpeed = Math.floor(Math.random()*(30+30+1))-30;
        this.hitBox.x = this.x;
        this.hitBox.y = this.y;
    }

    // override
    update(milliSecondsPassed){
        super.update(milliSecondsPassed);
        
        // enemy destroyed
        if(this._hitPoints <= 0){

            // split according to specifications
            for (let i=0; i<this._splitsInto.length; i++){
                
                let angle = 0;            
                angle += (Math.PI*2 / this._splitsInto.length) * i ;

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
                let childEnemy = objectFactory.generateEnemy(x, y, orientation, this._splitsInto[i]);
                childEnemy.vx = vx;
                childEnemy.vy = vy;
                let angularSpeed = Math.floor(Math.random()*(30+30+1))-30;
                childEnemy.angularSpeed = angularSpeed;
            }

            // generate destroyed particle effect
            objectFactory.generateParticleEffect(this.x, this.y, PARTICLE_EFFECT[this._particleEffects.destroyed]);

            // delete the enemy
            this._isDeleted = true;
        }
    }
}
