/****************************************************************
 CLASS: CollisionResolver
 ****************************************************************/
class CollisionResolver{
    
    #objectFactory;
    
    constructor(){
        this.#objectFactory = null;
    }

    resolve(collisionPairs, objectFactory){
        this.#objectFactory = objectFactory;

        collisionPairs.forEach(element => {
            this.#resolveCollision(element.obj1, element.obj2);
        });
    }

    #resolveCollision(obj1, obj2){
        // determine collision type
        let collisionType = obj1.getGameObjectType() + obj2.getGameObjectType();
        
        // resolve the collision
        switch(collisionType){
            case COLLISION_BETWEEN.ASTEROID_AND_ASTEROID:
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ASTEROID_AND_PROJECTILE:
                this.#resolvePhysics(obj1, obj2);
                this.#resolveSimple(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ASTEROID_AND_PLAYER:
                this.#resolvePhysics(obj1, obj2);
                this.#resolveSimple(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ASTEROID_AND_POWERUP:
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ASTEROID_AND_GRAVITYWELL: 
                this.#resolveGravity(obj1, obj2);            
                break;
            case COLLISION_BETWEEN.ASTEROID_AND_EXPLOSION:
                this.#resolveExplosion(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ASTEROID_AND_SATELLITE: 
                this.#resolvePhysics(obj1, obj2);
                this.#resolveSimple(obj1, obj2);
                break;
            case COLLISION_BETWEEN.ASTEROID_AND_FIXED:
                this.#resolvePhysics(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_PROECTILE:
                this.#resolveProjectile(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_PLAYER:
                this.#resolvePhysics(obj1, obj2);
                this.#resolveProjectile(obj1, obj2);
                 break;
            case COLLISION_BETWEEN.PROJECTILE_AND_POWERUP: 
                this.#resolveProjectile(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_GRAVITYWELL: 
                this.#resolveGravity(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_EXPLOSION: 
                this.#resolveProjectile(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_SATELLITE: 
                this.#resolvePhysics(obj1, obj2);
                this.#resolveProjectile(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PROJECTILE_AND_FIXED: 
                this.#resolveProjectile(obj1, obj2);         
                break;
            case COLLISION_BETWEEN.PLAYER_AND_PLAYER:
                this.#resolvePhysics(obj1, obj2);
                this.#resolveSimple(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PLAYER_AND_POWERUP:
                this.#resolvePowerUp(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PLAYER_AND_GRAVITYWELL: 
                this.#resolveGravity(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PLAYER_AND_EXPLOSION: 
                this.#resolveExplosion(obj1, obj2);
                break;
            case COLLISION_BETWEEN.PLAYER_AND_SATELLITE: 
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
                this.#resolveGravity(obj1, obj2);
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

        // update angular speed 
        // in a (frictionless) circle vs circle collision there is no transmission of angular momentum
        // hence we invent it. The factor "1000" has been randomly chosen.
        const collisionAngle = Math.atan2(collisionNormal.y, collisionNormal.x);
        const perpendicularDistance1 = (obj1.hitBox.getSize() + obj2.hitBox.getSize()) * Math.sin(collisionAngle);
        const perpendicularDistance2 = (obj2.hitBox.getSize() + obj1.hitBox.getSize()) * Math.sin(collisionAngle);
        obj1.angularSpeed += impulse.y * (perpendicularDistance1/(1000*obj1.getMass()));
        obj2.angularSpeed -= impulse.y * (perpendicularDistance2/(1000*obj2.getMass()));
    }

    #resolveProjectile(obj1, obj2){
        // TODO:
        // generate explosion
        // delete projectile
    
    }

    #resolveSimple(obj1, obj2){
        // TODO:
        // apply damage to both objects
    }

    #resolveGravity(obj1, obj2){
        // TODO:
        // apply gravity to non gravitywell object
    }

    #resolveExplosion(obj1, obj2){
        // TODO:
        // apply explosion forces
        // apply damage according to distance to explosion center

    }

    #resolvePowerUp(obj1, obj2){
        // TODO:
        // player object gets power up
    }
}