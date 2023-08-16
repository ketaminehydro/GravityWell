/****************************************************************
 CLASS: GameObject
 ****************************************************************/
class GameObject{
    constructor(x, y, orientation){

        // position in pixel        TODO: this should be % relative to canvas
        this.x = x;
        this.y = y;

        // velocity in pixels/second
        this.vx = 0;
        this.vy = 0;

        // angular speed in degrees/seconds. Clockwise is positive.
        this.angularSpeed = 0;

        // hitpoints
        this.hitPoints = 100;

        // maximum angular speed in degrees / second
        this._maxAngularSpeed = 360*1;

        // maximum velocity in pixels/second
        this._maxSpeed = 100;        

        // size in pixels
        this._width = 100;      // TODO: % relative to canvas size
        this._height = 100;

        // image
        this._sprite = new Image;
        this._sprite.src = "img/placeholder.png";

        // mass in kg
        this._mass = 1;

        // orientation in degrees. O° is North. Clockwise is positive.
        this._orientation = orientation;

        // coefficient of resititution (aka. how "bouncy" the object is)
        this._cor = 0.8;

        // settings
        this._boundaryHandlingSetting = ON_BOUNDARY_HIT.BOUNCE;
        this._isDeleted = false;
        this._isShowDebugInfo = false;
        this._isShowDebugStats = false;

        // hitbox
        this.hitBox = new HitBox(this.x, this.y, this._orientation, 0, 0, 100);
    }

    getSize(){
        let width = this._width;
        let height = this._height;
        return { width, height};
    }

    setSize(width, height){
        this._width = width;
        this._height = height;
    }

    setSpriteImage(src){
        this._sprite.src = src;
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
        this.hitBox.setPosition(this.x, this.y, this._orientation);
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
        return this._maxSpeed;
    }

    setMaximumSpeed(speed){
        this._maxSpeed = speed;
    }

    getOrientation(){
        return this._orientation * 180 / Math.PI;
    }

    setOrientation(orientation){
        this._orientation = orientation;

        // position the hitbox
        this.hitBox.setPosition(this.x, this.y, this._orientation);
    }

    getOrientationInRadians(){
        return this._orientation;
    }

    getAngularSpeed(){
        return this.angularSpeed;
    }

    getMaximumAngularSpeed(){
        return this.getMaximumAngularSpeed;
    }

    setMaximumAngularSpeed(speed){
        this.setMaximumAngularSpeed = speed;
    }

    getCOR(){
        return this._cor;
    }

    setCOR(cor){
        this._cor = cor;
    }

    getMass(){
        return this._mass;
    }

    setMass(mass){
        this._mass = mass;
    }

    setBoundaryHandlingSetting(setting){
        this._boundaryHandlingSetting = setting;
    }

    setDisplayDebugStats(bool){
        this._isShowDebugStats = bool;
    }

    getIsDeleted(){
        return this._isDeleted;
    }

    update(milliSecondsPassed){
        
        // limit the speed
        let newMagnitude = VectorMath.calculateMagnitude(this.vx, this.vy);
        if( newMagnitude >= this._maxSpeed){
            this.vx = this.vx / newMagnitude * this._maxSpeed;
            this.vy = this.vy / newMagnitude * this._maxSpeed;
        }   

        // update position
        this.x += this.vx * milliSecondsPassed / 1000;
        this.y += this.vy * milliSecondsPassed / 1000;

        // limit angular speed
        if(Math.abs(this.angularSpeed) >= this._maxAngularSpeed){
            this.angularSpeed = this._maxAngularSpeed * Math.sign(this.angularSpeed);
        }

        // update orientation
        let orientationIncrease = (this.angularSpeed * milliSecondsPassed / 1000)*Math.PI/180;
        this._orientation = (this._orientation + orientationIncrease)% 6.28;

        // update hitbox position
        this.hitBox.setPosition(this.x, this.y, this._orientation);

        // handle boundaries
        // TODO: should depend on hitbox boundaries
        switch (this._boundaryHandlingSetting){
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
                if (this.x < 0 || this.x > canvas.width){
                    this.vx *= -1;
                }

                if (this.y < 0 || this.y > canvas.height){
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
                    this._isDeleted = true;
                }

                if (this.y < -CANVAS_MARGIN || this.y >= canvas.height + CANVAS_MARGIN){
                    this._isDeleted = true;
                }
        }
    }

    draw(){
        // draw object
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this._orientation);
        ctx.drawImage(this._sprite, -(this._width/2), -(this._height/2), this._width, this._height);
        ctx.restore();

        // display debug info
        if(this._isShowDebugInfo) {
            this.displayDebugInfo();
        }

        // display debug stats
        if(this._isShowDebugStats) {
            this.displayDebugDot();
            this.displayDebugOrientation();
            this.displayDebugVelocity();
            this.displayDebugHitBox();
        }
    }


    /***********************************************************************/
    toggleShowDebugInfo(){
        this._isShowDebugInfo = !(this._isShowDebugInfo);
    }

    toggleShowDebugStats(){
        this._isShowDebugStats = !(this._isShowDebugStats);
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
        ctx.fillText("Speed: "+this.getSpeed().toFixed(1)+" px/s", 10, 90);
        ctx.fillText("Orientation: "+this.getOrientation().toFixed(1)+"°", 10, 110);
        ctx.fillText("("+this.getOrientationInRadians().toFixed(1)+" radians)", 150, 110);
        ctx.fillText("sin("+this.getOrientation().toFixed(1)+"°) = "+Math.sin(this.getOrientationInRadians()).toFixed(1)
                     +"  cos("+this.getOrientation().toFixed(1)+"°) = "+Math.cos(this.getOrientationInRadians()).toFixed(1),10,130);
        ctx.fillText("Angular speed: "+this.getAngularSpeed().toFixed(1)+" °/s", 10, 150);
        ctx.restore();
    }

    displayDebugOrientation(){
        ctx.save();

        // draw orientation line
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.moveTo(0,0);
        let x = DEBUG_INFO_SIZE * Math.sin(this._orientation);
        let y = -DEBUG_INFO_SIZE * Math.cos(this._orientation);
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
 
        // velocity background line
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
        let length = VectorMath.calculateMagnitude(this.vx, this.vy) * DEBUG_INFO_SIZE / this._maxSpeed;
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