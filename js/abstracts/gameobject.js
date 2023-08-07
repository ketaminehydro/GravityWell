const ON_BOUNDARY_HIT = Object.freeze({
   DELETE: 1,
   BOUNCE: 2,
   TELEPORT: 3,
   STOP: 4
});

const CANVAS_MARGIN = 200;
const DEBUG_INFO_SIZE = 100;

/****************************************************************
 CLASS: GameObject
 ****************************************************************/
class GameObject{
    constructor(x, y, orientation){

        // size
        this.width = 100;      // TODO: % relative to canvas size
        this.height = 100;

        // image
        this.sprite = new Image;
        this.sprite.src = "img/placeholder.png";

        // mass
        this.mass = 1;

        // position in pixel        TODO: this should be % relative to canvas
        this.x = x;
        this.y = y;

        // velocity in pixels/second
        this.vx = 0;
        this.vy = 0;

        // maximum velocity in pixels/second
        this.maxSpeed = 100;        

        // orientation in degrees. O° is North. Clockwise is positive.
        this.orientation = orientation;

        // angular speed in degrees/seconds. Clockwise is positive.
        this.angularSpeed = 0;

        // maximum angular speed in degrees / second
        this.maxAngularSpeed = 360*2;

        // coefficient of resititution (how "bouncy" the object is)
        this.cor = 0.8;

        // settings
        this.boundaryHandlingSetting = ON_BOUNDARY_HIT.BOUNCE;
        this.isDeleted = false;
        this.isShowDebugInfo = false;
        this.isShowDebugStats = false;

        // hitbox
        this.hitBox = new HitBox(this.x, this.y, this.orientation, 100);
    }

    getSize(){
        let width = this.width;
        let height = this.height;
        return { width, height};
    }

    setSize(width, height){
        this.width = width;
        this.height = height;
    }

    setSpriteImage(src){
        this.sprite.src = src;
    }

    getPosition(){
        let x = this.x;
        let y = this.y;
        return {x, y};
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;

        // move hitbox
        this.hitBox.setPosition(this.x, this.y, this.orientation);
    }

    getVelocity(){
        let vx = this.vx;
        let vy = this.vy;
        return {vx , vy};
    }

    setVelocity(vx, vy){
        this.vx = vx;
        this.vy = vy;
    }

    getSpeed(){
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    getMaximumSpeed(){
        return this.maxSpeed;
    }

    setMaximumSpeed(speed){
        this.maxSpeed = speed;
    }

    getOrientation(){
        return this.orientation * 180 / Math.PI;
    }

    setOrientation(orientation){
        this.orientation = orientation;

        // position the hitbox
        this.hitBox.setPosition(this.x, this.y, this.orientation);
    }

    getOrientationInRadians(){
        return this.orientation;
    }

    getAngularSpeed(){
        return this.angularSpeed;
    }

    setAngularSpeed(angularSpeed){
        this.angularSpeed = angularSpeed;
    }

    getMaximumAngularSpeed(){
        return this.getMaximumAngularSpeed;
    }

    setMaximumAngularSpeed(speed){
        this.setMaximumAngularSpeed = speed;
    }

    getCOR(){
        return this.cor;
    }

    setCOR(cor){
        this.cor = cor;
    }

    setBoundaryHandlingSetting(setting){
        this.boundaryHandlingSetting = setting;
    }

    setDisplayDebugStats(bool){
        this.isShowDebugStats = bool;
    }

    getIsDeleted(){
        return this.isDeleted;
    }

    update(milliSecondsPassed){
        
        // limit the speed
        let newMagnitude = VectorMath.calculateMagnitude(this.vx, this.vy);
        if( newMagnitude >= this.maxSpeed){
            this.vx = this.vx / newMagnitude * this.maxSpeed;
            this.vy = this.vy / newMagnitude * this.maxSpeed;
        }   

        // update position
        this.x += this.vx * milliSecondsPassed / 1000;
        this.y += this.vy * milliSecondsPassed / 1000;

        // limit angular speed
        if(this.angularSpeed >= this.maxAngularSpeed){
            this.angularSpeed = this.maxAngularSpeed;
        }

        // update orientation
        let orientationIncrease = (this.angularSpeed * milliSecondsPassed / 1000)*Math.PI/180;
        this.orientation = (this.orientation + orientationIncrease)% 6.28;

        // update hitbox position
        this.hitBox.setPosition(this.x, this.y, this.orientation);

        // handle boundaries
        // TODO: should depend on hitbox
        switch (this.boundaryHandlingSetting){
            case ON_BOUNDARY_HIT.STOP:
                if(this.x < 0 || this.x >= canvas.width){
                    this.x = canvas.width;
                    this.vx = 0;
                    this.vy = 0;
                }

                if (this.y < 0 || this.y >= canvas.height){
                    this.y = canvas.height;
                    this.vx = 0;
                    this.vy = 0;
                }
                break;

            case ON_BOUNDARY_HIT.BOUNCE:
                if (this.hitBox.x < 0 || this.hitBox.x > canvas.width){
                    this.vx *= -1;
                }

                if (this.hitBox.y < 0 || this.hitBox.y > canvas.height){
                    this.vy *= -1;
                }
                break;

            case ON_BOUNDARY_HIT.TELEPORT:
                if (this.x < -CANVAS_MARGIN) {
                    this.x = canvas.width + CANVAS_MARGIN;
                    this.y = canvas.height-this.y + CANVAS_MARGIN;
                }
                else if (this.x > canvas.width + CANVAS_MARGIN) {
                    this.x = - CANVAS_MARGIN;
                    this.y = canvas.height-this.y + CANVAS_MARGIN;
                }
                if (this.y < -CANVAS_MARGIN) {
                    this.x = canvas.width - this.x + CANVAS_MARGIN;
                    this.y = canvas.height + CANVAS_MARGIN;
                }
                else if (this.y > canvas.height + CANVAS_MARGIN) {
                    this.x = canvas.width - this.x + CANVAS_MARGIN;
                    this.y = - CANVAS_MARGIN;
                }
                break;

            case ON_BOUNDARY_HIT.DELETE:
                if(this.x < -CANVAS_MARGIN || this.x >= canvas.width + CANVAS_MARGIN){
                    this.isDeleted = true;
                }

                if (this.y < -CANVAS_MARGIN || this.y >= canvas.height + CANVAS_MARGIN){
                    this.isDeleted = true;
                }
        }
    }

    draw(){
        // draw object
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.orientation);
        ctx.drawImage(this.sprite, -(this.width/2), -(this.height/2), this.width, this.height);
        ctx.restore();

        // display debug info
        if(this.isShowDebugInfo) {
            this.displayDebugInfo();
        }

        // display debug stats
        if(this.isShowDebugStats) {
            this.displayDebugDot();
            this.displayDebugOrientation();
            this.displayDebugVelocity();
            this.displayDebugHitBox();
        }
    }


    /***********************************************************************/
    toggleShowDebugInfo(){
        this.isShowDebugInfo = !(this.isShowDebugInfo);
    }

    toggleShowDebugStats(){
        this.isShowDebugStats = !(this.isShowDebugStats);
    }

    displayDebugInfo(){
        ctx.save();                                     // because we are changing the coordinate origins
        ctx.translate(this.x, this.y);
        ctx.fillStyle = "white";
        ctx.font = "1em Monospace";
        ctx.fillText("x: "+this.x.toFixed(1), 10, 50);
        ctx.fillText("y: "+this.y.toFixed(1), 80, 50);
        ctx.fillText("vx: "+this.vx.toFixed(1), 10, 70);
        ctx.fillText("vy: "+this.vy.toFixed(1), 80, 70);
        ctx.fillText("Speed: "+this.getSpeed().toFixed(1), 10, 90);
        ctx.fillText("Orientation: "+this.getOrientation().toFixed(1)+"°", 10, 110);
        ctx.fillText("("+this.getOrientationInRadians().toFixed(1)+" radians)", 150, 110);
        ctx.fillText("sin("+this.getOrientation().toFixed(1)+"°) = "+Math.sin(this.getOrientationInRadians()).toFixed(1)
                     +"  cos("+this.getOrientation().toFixed(1)+"°) = "+Math.cos(this.getOrientationInRadians()).toFixed(1),10,130);
        ctx.fillText("Angular speed: "+this.getAngularSpeed().toFixed(1), 10, 150);
        ctx.restore();
    }

    displayDebugOrientation(){
        ctx.save();

        // draw orientation line
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.moveTo(0,0);
        let x = DEBUG_INFO_SIZE * Math.sin(this.orientation);
        let y = -DEBUG_INFO_SIZE * Math.cos(this.orientation);
        ctx.lineTo(x,y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        ctx.restore();
    }

    displayDebugVelocity(){        
        // do not show anything, if no speed
        if(VectorMath.calculateMagnitude(this.vx, this.vy) === 0){
            return;
        }

        ctx.save();
        let angle = VectorMath.calculateAngleBetween(1,0,this.vx,this.vy);
        ctx.translate(this.x, this.y);
        ctx.moveTo(0,0);
        ctx.rotate(angle);
 
        // Velocity background line
        ctx.strokeStyle = '#009900';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(DEBUG_INFO_SIZE, 0);
        ctx.stroke();
      
        // Arrow 
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;

        // Arrow body
        let length = VectorMath.calculateMagnitude(this.vx, this.vy) * DEBUG_INFO_SIZE / this.maxSpeed;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(length-10, 0);
        ctx.stroke();
      
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(length, 0);
        ctx.lineTo(length - 10, -5);
        ctx.lineTo(length - 10, 5);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    displayDebugDot(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, DEBUG_INFO_SIZE/28, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
    }

    displayDebugHitBox(){
        this.hitBox.draw();
    }
}