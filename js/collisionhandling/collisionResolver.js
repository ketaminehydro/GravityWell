/****************************************************************
 CLASS: CollisionResolver
 ****************************************************************/
class CollisionResolver{
    
    resolve(collisionPairs, milliSecondsPassed){

        collisionPairs.forEach(element => {
            this.#resolveCollision(element.obj1, element.obj2, element.collisionCoords, milliSecondsPassed);
        });
    }

    #resolveCollision(obj1, obj2, collisionCoords, milliSecondsPassed){
        // determine collision type
        let collisionType = obj1.getGameObjectType() + obj2.getGameObjectType();
        
        // resolve the collision
        switch(collisionType){
            case COLLISION_BETWEEN.ENEMY_AND_ENEMY:
                objectFactory.generateParticleEffect(collisionCoords.x, collisionCoords.y, obj1.getParticleEffect("hit"));
                objectFactory.generateParticleEffect(collisionCoords.x, collisionCoords.y, obj2.getParticleEffect("hit"));
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ENEMY_AND_PROJECTILE:
                this.#resolvePhysics(obj1, obj2);
                this.#resolveProjectile(obj1, obj2, collisionCoords);
                break;
            case COLLISION_BETWEEN.ENEMY_AND_PLAYER:
                objectFactory.generateParticleEffect(collisionCoords.x, collisionCoords.y, obj1.getParticleEffect("hit"));
                objectFactory.generateParticleEffect(collisionCoords.x, collisionCoords.y, obj2.getParticleEffect("hit"));
                this.#resolvePhysics(obj1, obj2);
                this.#resolveSimple(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ENEMY_AND_POWERUP:
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ENEMY_AND_GRAVITYWELL: 
                this.#resolveGravity(obj1, obj2, collisionCoords, milliSecondsPassed);            
                break;
            case COLLISION_BETWEEN.ENEMY_AND_EXPLOSION:
                this.#resolveExplosion(obj1, obj2, collisionCoords);
                break;
            case COLLISION_BETWEEN.ENEMY_AND_SATELLITE: 
                this.#resolvePhysics(obj1, obj2);
                this.#resolveSimple(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ENEMY_AND_FIXED:
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_PROECTILE:
                this.#resolvePhysics(obj1, obj2);
                this.#resolveProjectile(obj1, obj2, collisionCoords);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_PLAYER:
                this.#resolvePhysics(obj1, obj2);
                this.#resolveProjectile(obj1, obj2, collisionCoords);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_POWERUP: 
                this.#resolvePhysics(obj1, obj2);
                this.#resolveProjectile(obj1, obj2, collisionCoords);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_GRAVITYWELL: 
                this.#resolveGravity(obj1, obj2, collisionCoords, milliSecondsPassed);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_EXPLOSION: 
                this.#resolveProjectile(obj1, obj2, collisionCoords);
            break;
            case COLLISION_BETWEEN.PROJECTILE_AND_SATELLITE: 
                this.#resolvePhysics(obj1, obj2);
                this.#resolveProjectile(obj1, obj2, collisionCoords);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_FIXED: 
                this.#resolveProjectile(obj1, obj2, collisionCoords);
                break;
            case COLLISION_BETWEEN.PLAYER_AND_PLAYER:
                this.#resolvePhysics(obj1, obj2);
                this.#resolveSimple(obj1, obj2);
                objectFactory.generateParticleEffect(collisionCoords.x, collisionCoords.y, obj1.getParticleEffect("hit"));
                objectFactory.generateParticleEffect(collisionCoords.x, collisionCoords.y, obj2.getParticleEffect("hit"));
                break;
            case COLLISION_BETWEEN.PLAYER_AND_POWERUP:
                this.#resolvePowerUp(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PLAYER_AND_GRAVITYWELL: 
                this.#resolveGravity(obj1, obj2, collisionCoords, milliSecondsPassed);
                break;
            case COLLISION_BETWEEN.PLAYER_AND_EXPLOSION: 
                this.#resolveExplosion(obj1, obj2, collisionCoords);
                break;
            /*case COLLISION_BETWEEN.PLAYER_AND_SATELLITE: 
                this.#resolvePhysics(obj1, obj2);
                this.#resolveSimple(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PLAYER_AND_FIXED: 
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.POWERUP_AND_POWERUP:
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.POWERUP_AND_GRAVITYWELL: 
                this.#resolveGravity(obj1, obj2, collisionCoords, milliSecondsPassed);
                break;
            case COLLISION_BETWEEN.POWERUP_AND_EXPLOSION: 
                this.#resolveExplosion(obj1, obj2);
                break;
            case COLLISION_BETWEEN.POWERUP_AND_SATELLITE: 
                // nothing
                break;
            case COLLISION_BETWEEN.POWERUP_AND_FIXED: 
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.GRAVITYWELL_AND_SATELLITE: 
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.EXPLOSION_AND_SATELLITE: 
                this.#resolveExplosion(obj1, obj2);
                break;
            case COLLISION_BETWEEN.SATELLITE_AND_SATELLITE: 
                this.#resolvePhysics(obj1, obj2);
                this.#resolveSimple(obj1, obj2);
                break; 
            case COLLISION_BETWEEN.SATELITTE_AND_FIXED: 
                this.#resolvePhysics(obj1, obj2);
                break;
            */                
        }
    }

    #resolvePhysics(obj1, obj2){
        // this is an elastic collision

        // calculate the collision normal
        const collisionNormal= {
            x: obj2.x - obj1.x,
            y: obj2.y - obj1.y
        };
        collisionNormal.x /= Math.sqrt(collisionNormal.x**2 + collisionNormal.y**2);
        collisionNormal.y /= Math.sqrt(collisionNormal.x**2 + collisionNormal.y**2);

        // calculate the relative velocity
        const relativeVelocity = {
            x: obj2.vx - obj1.vx,
            y: obj2.vy - obj1.vy
        };

        // calculate the impulse (= collision normal * relative velocity)
        let speed =  relativeVelocity.x * collisionNormal.x + relativeVelocity.y * collisionNormal.y;
        // apply coefficient of resitution (cor)
        speed += Math.min(obj1.getCOR(), obj2.getCOR());
        const impulse = {
            x: collisionNormal.x * speed,
            y: collisionNormal.y * speed
        }

        // only update velocities if the objects will move away from each other
        if(speed < 0) {
            let totalMass = obj1.getMass() + obj2.getMass();
            obj1.vx += impulse.x * (obj2.getMass() / totalMass);
            obj1.vy += impulse.y * (obj2.getMass() / totalMass);
            obj2.vx -= impulse.x * (obj1.getMass() / totalMass);
            obj2.vy -= impulse.y * (obj2.getMass() / totalMass);
        }

        // update angular speed //TODO: check this math again
        // in a (frictionless) circle vs circle collision there is no transmission of angular momentum
        // The factor "1000" has thus been randomly chosen.
        const collisionAngle = Math.atan2(collisionNormal.y, collisionNormal.x);
        const perpendicularDistance1 = (obj1.hitBox.getSize() + obj2.hitBox.getSize()) * Math.sin(collisionAngle);
        const perpendicularDistance2 = (obj2.hitBox.getSize() + obj1.hitBox.getSize()) * Math.sin(collisionAngle);
        obj1.angularSpeed -= impulse.y * (perpendicularDistance1/(1000*obj1.getMass()));
        obj2.angularSpeed -= impulse.y * (perpendicularDistance2/(1000*obj2.getMass()));
    }

    #resolveProjectile(obj1, obj2, coords){

        let explosionForce = 0;

        // get force and delete projectile(s)
        if(obj1.getGameObjectType() === GAMEOBJECT_TYPE.PROJECTILE){
            explosionForce =  obj1.yield;
            obj1.setIsDeleted();
        }
        if(obj2.getGameObjectType() === GAMEOBJECT_TYPE.PROJECTILE){
            explosionForce = Math.max(explosionForce, obj2.yield);
            obj2.setIsDeleted();
        }

        // generate explosion at point of collision
        objectFactory.generateExplosion(coords.x, coords.y, 0, explosionForce);  
    }

    #resolveSimple(obj1, obj2){
        // TODO:
        // apply damage to both objects
    }

    #resolveGravity(obj1, obj2, collisionCoords, milliSecondsPassed){
        // determine who is who
        let gravityWell = obj1;
        let target = obj2;
        if (target.getGameObjectType() === GAMEOBJECT_TYPE.GRAVITYWELL){
            gravityWell = obj2;
            target = obj1; 
        }

        // determine impulse 
        let impulse = VectorMath.calculateVectorBetween(collisionCoords.x, collisionCoords.y, gravityWell.x, gravityWell.y);

        // if distance < DATA pixel destroy target and exit
        
        // determine impulse force
        impulse.x *= gravityWell.getForce() * 1/milliSecondsPassed;
        impulse.y *= gravityWell.getForce() * 1/milliSecondsPassed;
        
        // apply impulse to target velocity
        target.vx += impulse.x;  
        target.vy += impulse.y;    
    }

    #resolveExplosion(obj1, obj2, coords){

        // figure out which one is the explosion object
        let explosion;
        let target;

        if(obj1.getGameObjectType() === GAMEOBJECT_TYPE.EXPLOSION){
            explosion = obj1;
            target = obj2;
        }
        else {
            explosion = obj2;
            target = obj1;
        }

        // if already collided with this explosion: skip
        if(explosion.hasCollidedWith(target)){
            return;
        }

        // mark object as collided with explosion in explosion object
        explosion.markCollidedWith(target);

        // apply explosion force to collided object

            // calculate vector explosioncenter-to-collisionpoint;
            const collisionNormal= {
                x: coords.x - explosion.x,
                y: coords.y - explosion.y
            };            
            let collisionMagnitude = VectorMath.calculateMagnitude(collisionNormal.x, collisionNormal.y);
            
            // calculate the distance to the explosion, relative to the maximum explosion size 
            let explosionSize = explosion.getMaxExplosionSize();
            let factor = 1 - (collisionMagnitude / explosionSize);
            
            // force = magnitude of vector to explosion * force of explosion 
            const force = {
                x: (collisionNormal.x / collisionMagnitude) * explosion.getForce() * factor,
                y: (collisionNormal.y / collisionMagnitude) * explosion.getForce() * factor
            } 

            // apply force to obj.vx
            target.vx += force.x;
            target.vy += force.y;

        // apply damage according to distance to explosion center
        // TODO: should depend on Torpedo, and therefore related to yield (in Newton) and HP
            target.takeDamage(explosion.getForce()/500 * factor);
    }   

    #resolvePowerUp(obj1, obj2){
        // TODO:
        // player object gets power up
    }
}