/****************************************************************
 CLASS: CollisionChecker
 ****************************************************************/
class CollisionChecker{
    constructor(){
        this._entities = [];
        this._collisionPairs = [];
    }

    push(element){
        this._entities.push(element);
    }

    fill(gameObjectArray){
        for(let i=0; i< gameObjectArray.getLength(); i++){
            this.push(gameObjectArray.getElement(i));
        }    
    }

    reset(){
        // deletes the arrays
        this._entities.splice(0, this._entities.length);
        this._collisionPairs.splice(0, this._collisionPairs.length);
    }

    markCollisions() {
        let debugCounter = 0;

        for (let i = 0; i < this._entities.length; i++) {
            for (let j = i + 1; j < this._entities.length; j++) {

                if (CollisionChecker.isHitBoxIntersect(this._entities[i], this._entities[j])) {

                    // flag collisions for debug hitbox display
                    this._entities[i].hitBox.setIsHit(true);
                    this._entities[j].hitBox.setIsHit(true);

                    // add collision pair
                    this._collisionPairs.push({
                        obj1: this._entities[i],
                        obj2: this._entities[j],
                        type: 0
                    })
                }

                debugCounter++;
            }
        }
        
        // debug
        //console.log("Number of collision checks this gameloop cycle: "+debugCounter);
        // TODO: stat goes to debugger display

        return this._collisionPairs;
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

        return CollisionChecker.isCirclesIntersect(x1,y1,r1,x2,y2,r2);
    }

    static isCirclesIntersect(x1, y1, r1, x2, y2, r2){

        // Calculate the distance between the two circles
        let distance = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

        // distance smaller than hitbox 1 + hitbox 2?
        let result = distance <= (r1 + r2);

        return result;
    }   
}