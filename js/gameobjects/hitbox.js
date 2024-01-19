/****************************************************************
 CLASS: HitBox (of circular shape)
 ****************************************************************/
class HitBox{

    constructor(masterX, masterY, masterOrientation, xOffset, yOffset, size){
        // position
        this.x = masterX;
        this.y = masterY;

        // offset
        this.xOffset = xOffset;
        this.yOffset = yOffset;

        // stats
        this.size = size;        // radius in pixels. TODO: % relative to canvas size

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

    //TODO: public attributes should not have method getters and setters
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
            ctx.globalAlpha = 0.3;
            ctx.fill();
        }
        ctx.restore();
    }
}