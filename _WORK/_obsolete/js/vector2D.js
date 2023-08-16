/****************************************************************
 CLASS: Vector2D
 ****************************************************************/
class Vector2D{
    constructor(x=0, y=0) {
        this.x =x;
        this.y = y;
    }

    getMagnitude(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    getUnitVector(){
        let unitVector = new Vector2D();

        unitVector.x = this.x / this.getMagnitude();
        unitVector.y = this.y / this.getMagnitude();

        return unitVector;
    }

    normalize(){
        this.x = this.x / this.getMagnitude();
        this.y = this.y / this.getMagnitude();
    }


    draw(){

    }
}