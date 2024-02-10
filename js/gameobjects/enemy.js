/****************************************************************
 CLASS: Enemy
 ****************************************************************/
class Enemy extends GameObject{
    constructor(x, y, orientation, enemyType){
        super(x, y, orientation);

        // gameobject type
        this._gameObjectType = GAMEOBJECT_TYPE.ENEMY; 

        // read and set inherited values
        this._enemyType = enemyType;
        this._fullHitPoints = gameData.enemies[enemyType].fullHitPoints;
        this._hitPoints = gameData.enemies[enemyType].hitPoints;
        this._maxSpeed = gameData.enemies[enemyType].maxSpeed;
        this._maxAngularSpeed = gameData.enemies[enemyType].maxAngularSpeed;
        this._width = gameData.enemies[enemyType].width;
        this._height = gameData.enemies[enemyType].height;
        this._mass = gameData.enemies[enemyType].mass;
        this._cor = gameData.enemies[enemyType].cor;
        this._boundaryHandlingSetting = ON_BOUNDARY_HIT[gameData.enemies[enemyType].boundaryHandlingSetting];
        this.hitBox.size = gameData.enemies[enemyType].hitBox.size;
        this.hitBox.xOffset = gameData.enemies[enemyType].hitBox.xOffset;
        this.hitBox.yOffset = gameData.enemies[enemyType].hitBox.yOffset;
        Object.assign(this._particleEffects, gameData.enemies[enemyType].particleEffects);        
        this.sprites.initialise(gameData.enemies[enemyType].sprites);
        this.sprites.setState("defaultSprite", "defaultState");

        // read and set class-specific values        
        this._behaviour = ENEMY_BEHAVIOUR[gameData.enemies[enemyType].behaviour];         //TODO: create a behaviour class

        this._splitsInto = [];
        for (let element in gameData.enemies[enemyType].splitsInto){
            this._splitsInto.push(gameData.enemies[enemyType].splitsInto[element]);
        };
    }

    getEnemyType(){
        return this._enemyType;
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

    update(milliSecondsPassed){
        super.update(milliSecondsPassed);
        
        // enemy destroyed
        if(this._hitPoints <= 0){

            // split according to specifications
            for (let i=0; i<this._splitsInto.length; i++){
                
                let angle = 0;            
                angle += (Math.PI*2 / this._splitsInto.length) * i ;

                // child position 
                let x = (Math.sin(angle)) * (this._width-50 +3) + this.x;
                let y = (-Math.cos(angle)) * (this._width-50 +3) + this.y;

                // child velocity
                let speed = Math.floor(Math.random()*(100+50+1))-50;                   
                let vx = (Math.sin(angle)) * speed + this.vx;
                let vy = (-Math.cos(angle)) * speed + this.vy;

                // child orientation
                let orientation = Math.floor(Math.random()*360);

                // create child             
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
