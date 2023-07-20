/****************************************************************
 CLASS: HitBox (circular)
 ****************************************************************/
class HitBox{

    static isHitBoxIntersect(obj1, obj2){
        let x1 = obj1.hitBox.getPosition().x;
        let y1 = obj1.hitBox.getPosition().y;
        let r1 = obj1.hitBox.getSize();
        let x2 = obj2.hitBox.getPosition().x;
        let y2 = obj2.hitBox.getPosition().y;
        let r2 = obj2.hitBox.getSize();

        return HitBox.isCirclesIntersect(x1,y1,r1,x2,y2,r2);
    }

    static isCirclesIntersect(x1, y1, r1, x2, y2, r2){

        // Calculate the distance between the two circles
        let distance = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

        // distance smaller than hitbox 1 + hitbox 2?
        let result = distance <= (r1 + r2);

        return result;
    }

    /*******************************************************************************/

    // standard hitbox is a circle
    constructor(masterX, masterY, masterOrientation, size){
        // position (only true, because offset = 0)
        this.x = masterX;
        this.y = masterY;

        // offset
        this.xOffset = 0;
        this.yOffset = 0;

        // stats
        this.size = size;        // in pixels. todo: % relative to canvas size

        // states
        this.isHit = false;
    }

    getSize(){
        return this.size;
    }

    setSize(size){
        this.size = size;
    }

    getIsHit(){
        return this.isHit;
    }
    setIsHit(bool){
        this.isHit = bool;
    }

    getPosition(){
        let x = this.x;
        let y = this.y;
        return {x, y};
    }
    setPosition(masterX, masterY, masterOrientation){
        let angle = masterOrientation;          // to radians

        this.x = masterX - Math.sin(angle) * this.yOffset - Math.cos(angle) * this.xOffset;
        this.y = masterY - Math.sin(angle) * this.xOffset + Math.cos(angle)*this.yOffset;

    }

    getPositionOffset(){
        let x = this.xOffset;
        let y = this.yOffset;
        return {x, y};
    }

    setPositionOffset(x, y){
        this.xOffset = x;
        this.yOffset = y;
    }

    draw(){
        // move origin
        ctx.save();
        ctx.translate(this.x, this.y);

        // draw circle
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.strokeStyle = "#00aaff";
        ctx.stroke();

        // draw orientation (to prove that a circle doesn't move)
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(0, -this.size+10);
        ctx.stroke();

        // fill circle if hit
        if(this.isHit){
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "#00aaff";
            ctx.fill();
        }
        ctx.restore();
    }
}