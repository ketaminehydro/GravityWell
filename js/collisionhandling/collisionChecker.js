/****************************************************************
 CLASS: CollisionChecker
 ****************************************************************/
class CollisionChecker{
    constructor(){
        this._entities = [];
        this._collisionPairs = [];

       // information for the debugger
        this._debugCollisionChecksCounter;
    }

    push(element){
        this._entities.push(element);
    }

    fill(gameObjectArray){
        for(let i=0; i< gameObjectArray.getLength(); i++){
            this.push(gameObjectArray.getElement(i));
        }    
    }

    clear(){
        // deletes the arrays
        this._entities.splice(0, this._entities.length);
        this._collisionPairs.splice(0, this._collisionPairs.length);
    }

    markCollisions() {
        // information for the debugger
        this._debugCollisionChecksCounter = 0;

        for (let i = 0; i < this._entities.length; i++) {
            for (let j = i + 1; j < this._entities.length; j++) {

                if (CollisionChecker.isHitBoxIntersect(this._entities[i], this._entities[j])) {

                    // flag collisions for debug hitbox display
                    this._entities[i].hitBox.setIsHit(true);
                    this._entities[j].hitBox.setIsHit(true);

                    // get collision coordinates
                    let coords = CollisionChecker.calculateCollisionCoordinates(this._entities[i], this._entities[j]);

                    // add collision pair
                    this._collisionPairs.push({
                        obj1: this._entities[i],
                        obj2: this._entities[j],
                        coords: coords
                    })
                }

                this._debugCollisionChecksCounter++;
            }
        }
        return this._collisionPairs;
    }

    // information for the debugger
    getNumberOfCollisionChecks(){
        return this._debugCollisionChecksCounter;
    }

    /****************************************************
       HitBox collision detection algorithms (for circular hitboxes)
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

        return CollisionChecker.isCirclesIntersect(x1,y1,r1,x2,y2,r2);
    }

    static isCirclesIntersect(x1, y1, r1, x2, y2, r2){

        // Calculate the distance between the two circles
        let distance = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

        // distance smaller than hitbox 1 + hitbox 2?
        let result = distance <= (r1 + r2);

        return result;
    }   

    static calculateCollisionCoordinates(obj1, obj2) {
        // define variables for readability
        let x1 = obj1.hitBox.x;
        let y1 = obj1.hitBox.y;
        let r1 = obj1.hitBox.size;
        let x2 = obj2.hitBox.x;
        let y2 = obj2.hitBox.y;
        let r2 = obj2.hitBox.size;
        let x;
        let y;
        
        // Calculate the distance between the centers of the circles
        const distance = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
        
        // Calculate the angle between the line connecting the centers and the x-axis
        const angle = Math.atan2(y2 - y1, x2 - x1);
    
        // determine the smaller hitbox
        if (r1 <= r2){
            x = x1 + r1 * Math.cos(angle);
            y = y1 + r1 * Math.sin(angle);
        }
        else{
            x = x2 - r2 * Math.cos(angle);
            y = y2 - r2 * Math.sin(angle);
        }

        return { x: x, y: y };
    }
}