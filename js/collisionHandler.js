/****************************************************************
 CLASS: CollisionHandler
 ****************************************************************/
class CollisionHandler{
    constructor(){
        this.list = [];
    }

    push(element){
        this.list.push(element);
    }

    clear(){
        this.list.splice(0,this.list.length);
    }

    resetCollisionFlags(){
        this.list.forEach(element =>{
            element.hitBox.setIsHit(false);
        });
    }

    handleCollisions() {
        for (let i = 0; i < this.list.length; i++) {
            for (let j = i + 1; j < this.list.length; j++) {
                if (HitBox.isHitBoxIntersect(this.list[i], this.list[j])) {

                    // resolve the collisions
                    this.resolveCollision(this.list[i], this.list[j]);

                    // flag collisions
                    this.list[i].hitBox.setIsHit(true);
                    this.list[j].hitBox.setIsHit(true);
                }
            }
        }
    }

    resolveCollision(obj1, obj2){

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
        const speed =  relativeVelocity.x * collisionNormal.x + relativeVelocity.y * collisionNormal.y;
        const impulse = {
            x: collisionNormal.x * speed,
            y: collisionNormal.y * speed
        }

        // only update velocities if the objects move away from each other
        if(speed < 0) {

            let totalMass = obj1.mass + obj2.mass;
            obj1.vx += impulse.x * (obj2.mass / totalMass);
            obj1.vy += impulse.y * (obj2.mass / totalMass);
            obj2.vx -= impulse.x * (obj1.mass / totalMass);
            obj2.vy -= impulse.y * (obj2.mass / totalMass);
        }

        // update angular speed
        const collisionAngle = Math.atan2(collisionNormal.y, collisionNormal.x);
        const perpendicularDistance1 = (obj1.hitBox.getSize() + obj2.hitBox.getSize()) * Math.sin(collisionAngle);
        const perpendicularDistance2 = (obj2.hitBox.getSize() + obj1.hitBox.getSize()) * Math.sin(collisionAngle);
        obj1.angularSpeed += impulse.y * (perpendicularDistance1/(100*obj1.mass));
        obj2.angularSpeed -= impulse.y * (perpendicularDistance2/(100*obj2.mass));

    }
}