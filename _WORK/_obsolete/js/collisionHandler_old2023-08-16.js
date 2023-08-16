const TYPE1 = 1;
const TYPE2 = 2;

/****************************************************************
 CLASS: CollisionHandler
 ****************************************************************/
class CollisionHandler{
    constructor(){
        this._entitiesType1 = [];
        this._entitiesType2 = [];
        this._collisionPairs = [];
    }

    pushEntityType1(element){
        this._entitiesType1.push(element);
    }

    pushEntityType2(element){
        this._entitiesType2.push(element);
    }

    fill(gameObjectArray, type){
        switch(type){
            case TYPE1:
                for(let i=0; i< gameObjectArray.getLength(); i++){
                    this._entitiesType1.push(gameObjectArray.getElement(i));
                }    
                break;
            case TYPE2:
                for(let i=0; i< gameObjectArray.getLength(); i++){
                    this._entitiesType2.push(gameObjectArray.getElement(i));
                }    
                break;                        
        }
    }

    reset(){
        // deletes the arrays
        this._entitiesType1.splice(0, this._entitiesType1.length);
        this._entitiesType2.splice(0, this._entitiesType2.length);
        this._collisionPairs.splice(0, this._collisionPairs.length);
    }

    /****************************************************
       HitBox collision detection algorithms
    *****************************************************/
    static isHitBoxIntersect(obj1, obj2){

        // TODO: switch statement for different collision types 
        // currently only circle-vs-circle is available()

        let x1 = obj1.hitBox.getPosition().x;
        let y1 = obj1.hitBox.getPosition().y;
        let r1 = obj1.hitBox.getSize();
        let x2 = obj2.hitBox.getPosition().x;
        let y2 = obj2.hitBox.getPosition().y;
        let r2 = obj2.hitBox.getSize();

        return CollisionHandler.isCirclesIntersect(x1,y1,r1,x2,y2,r2);
    }

    static isCirclesIntersect(x1, y1, r1, x2, y2, r2){

        // Calculate the distance between the two circles
        let distance = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

        // distance smaller than hitbox 1 + hitbox 2?
        let result = distance <= (r1 + r2);

        return result;
    }

    /****************************************************
       Collision handling
    *****************************************************/
    handleCollisions(){
        // mark collisions
        // determine if collision between same entities or set of two different entities
        if(this._entitiesType2.length === 0){
            this.markCollisionsType1Only();  //
        } 
        else {
            this.markCollisions();
        }

        // resolve collisions
        this._collisionPairs.forEach(element =>{
            this.resolvePhysics(element.obj1, element.obj2);
            this.resolveGameLogic(element.obj1, element.obj2);
        });

    }
    
    markCollisions(){
        for (let i = 0; i < this._entitiesType1.length; i++) {
            for (let j = 0; j < this._entitiesType2.length; j++) {

                if (CollisionHandler.isHitBoxIntersect(this._entitiesType1[i], this._entitiesType2[j])) {

                    // flag collisions (TODO: add an if: this is only used to in the debug hitbox display
                    this._entitiesType1[i].hitBox.setIsHit(true);     // TODO: inefficient: this will get set too many times.
                    this._entitiesType2[j].hitBox.setIsHit(true);

                    // add collision pair
                    this._collisionPairs.push({
                        obj1: this._entitiesType1[i],
                        obj2: this._entitiesType2[j]
                    });
                }
            }
        }
        return this._collisionPairs;
    }
    
    markCollisionsType1Only() {
        for (let i = 0; i < this._entitiesType1.length; i++) {
            for (let j = i + 1; j < this._entitiesType1.length; j++) {

                if (CollisionHandler.isHitBoxIntersect(this._entitiesType1[i], this._entitiesType1[j])) {

                    // flag collisions (TODO: add an if: this is only used to in the debug hitbox display)
                    this._entitiesType1[i].hitBox.setIsHit(true);
                    this._entitiesType1[j].hitBox.setIsHit(true);

                    // add collision pair
                    this._collisionPairs.push({
                        obj1: this._entitiesType1[i],
                        obj2: this._entitiesType1[j]
                    })
                }
            }
        }
        return this._collisionPairs;
    }

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