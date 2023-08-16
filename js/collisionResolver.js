/****************************************************************
 CLASS: CollisionResolver
 ****************************************************************/
class CollisionResolver{
    resolvePhysics(obj1, obj2){

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
        const collisionAngle = Math.atan2(collisionNormal.y, collisionNormal.x);
        const perpendicularDistance1 = (obj1.hitBox.getSize() + obj2.hitBox.getSize()) * Math.sin(collisionAngle);
        const perpendicularDistance2 = (obj2.hitBox.getSize() + obj1.hitBox.getSize()) * Math.sin(collisionAngle);
        obj1.angularSpeed += impulse.y * (perpendicularDistance1/(100*obj1.getMass()));
        obj2.angularSpeed -= impulse.y * (perpendicularDistance2/(100*obj2.getMass()));
    }

    resolveGameLogic(obj1, obj2){
        // this difficult
    }
}