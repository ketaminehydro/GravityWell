/****************************************************************
 CLASS: ObjectFactory
 This class generates new objects
 ****************************************************************/
 class ObjectFactory{
       
    generateAsteroid(x, y, orientation){
        let asteroid = new Asteroid(x, y, orientation);            
        stage.enemies.push(asteroid);    

        // return to allow further modification by requestor
        return asteroid;
    }

    generateEnemy(x, y, orientation, type){
        let enemy = new Enemy(x, y, orientation, type);
        stage.enemies.push(enemy);

        // return to allow further modification by requestor
        return enemy;
    }
    generateTorpedo(x, y, orientation){
        let torpedo = new Torpedo(x, y, orientation);
        stage.projectiles.push(torpedo);
        
        // return to allow further modification by requestor
        return torpedo;
    }

    generateExplosion(x, y, orientation, force){
        let explosion = new Explosion(x, y, orientation, force);
        stage.explosions.push(explosion);   

        // return to allow further modification by requestor
        return explosion;
    }

    generateParticleEffect(x, y, effectType){
        let particleEffect = new ParticleEffect(x, y, effectType);
        stage.particleEffects.push(particleEffect);
    }
 }