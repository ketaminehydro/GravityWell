/****************************************************************
 CLASS: GameObject
 ****************************************************************/
class GameObject{
    constructor(x, y, orientation){

        // type
        this._gameObjectType = undefined;

        // position in pixel      
        this.x = x;
        this.y = y;

        // orientation in degrees. O° is North. Clockwise is positive.
        this.orientation = orientation;

        // velocity in pixels/second
        this.vx = 0;
        this.vy = 0;

        // angular speed in degrees/seconds. Clockwise is positive.
        this.angularSpeed = 0;

        // hitbox
        this.hitBox = new HitBox(this.x, this.y, this.orientation, 0, 0, 100);

        // sprites 
        this.sprites = new Sprites();

        // particle effect
        this._particleEffects = {};

        // hitpoints
        this._fullHitPoints = 100;
        this._hitPoints = 100;

        // maximum velocity in pixels/second
        this._maxSpeed = 100;   

        // maximum angular speed in degrees / second
        this._maxAngularSpeed = 360*1;       
        
        // size in pixels
        this._width = 100;      
        this._height = 100;
        
        // mass in kg
        this._mass = 1;

        // coefficient of resititution (aka. how "bouncy" the object is)
        this._cor = 0.8;

        // behaviour at the screen edges
        this._boundaryHandlingSetting = ON_BOUNDARY_HIT.BOUNCE;

        // state
        this._isDeleted = false;

        // settings for debugger
        this._isShowDebugGfx = false;
        this._isShowDebugInfo = false;
        this._showDebugInfoSettings = {
            position:       true,
            velocity:       true,
            speed:          true,
            orientation:    true,
            angularSpeed:   true,
            hitPoints:      true
        }
    }

    getHitPoints(){
        return this._hitPoints;
    }

    takeDamage(damage){
        this._hitPoints -= damage;
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

    getPosition(){
        let x = this.x;
        let y = this.y;
        return {x, y};
    }

    setPosition(x, y){
        // prefer this to the standard setter, due to the dependent hitbox
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

    setAngularSpeed(angularSpeed){
        this.angularSpeed = angularSpeed;
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

    getParticleEffect(event){
        let type = this._particleEffects[event];
        if (typeof type === "undefined"){
            return PARTICLE_EFFECT.NONE;
        }
        return PARTICLE_EFFECT[type];
    }

    setBoundaryHandlingSetting(setting){
        this._boundaryHandlingSetting = setting;
    }

    getIsDeleted(){
        return this._isDeleted;
    }

    setIsDeleted(){
        this._isDeleted = true;
    }

    getGameObjectType(){
        return this._gameObjectType;
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
        this.orientation = (this.orientation + orientationIncrease)% 6.28;

        // update hitbox position
        this.hitBox.setPosition(this.x, this.y, this.orientation);

        // handle boundaries
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
                    this.y = canvas.height-this.y; 
                }
                else if (this.x > canvas.width + CANVAS_MARGIN) {
                    this.x = - CANVAS_MARGIN;
                    this.y = canvas.height-this.y; 
                }
                if (this.y < -CANVAS_MARGIN) {
                    this.x = canvas.width - this.x; 
                    this.y = canvas.height + CANVAS_MARGIN;
                }
                else if (this.y > canvas.height + CANVAS_MARGIN) {
                    this.x = canvas.width - this.x; 
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

        //TODO: failsafe: if enemies are outside bounds for any reason, put them back in

        // update sprites
        this.sprites.update(milliSecondsPassed);
    }

    draw(){
        // draw object
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.orientation);
        this.sprites.draw(this._width, this._height);
        ctx.restore();

        // display debug info
        if(this._isShowDebugInfo) {
            this.displayDebugInfo();
        }

        // display debug graphics
        if(this._isShowDebugGfx) {
            this.displayDebugDot();
            this.displayDebugOrientation();
            this.displayDebugVelocity();
            this.displayDebugHitBox();
        }
    }


    /************************* DEBUG **********************************************/
    toggleShowDebugInfo(){
        this._isShowDebugInfo = !(this._isShowDebugInfo);
    }

    toggleShowDebugGfx(){
        this._isShowDebugGfx = !(this._isShowDebugGfx);
    }

    displayDebugInfo(){
        let y = 30;     // in px

        ctx.save();                                    
        ctx.translate(this.x, this.y);
        ctx.fillStyle = "white";
        ctx.font = "1em Monospace";
        ctx.textAlign = "left";
        if(this._showDebugInfoSettings.position){
            y += 20;
            ctx.fillText("x: "+this.x.toFixed(1), 10, y);
            ctx.fillText("y: "+this.y.toFixed(1), 80, y);
        }
        if(this._showDebugInfoSettings.velocity){
            y += 20;
            ctx.fillText("vx: "+this.vx.toFixed(1), 10, y);
            ctx.fillText("vy: "+this.vy.toFixed(1), 80, y);
        }
        if(this._showDebugInfoSettings.speed){
            y += 20;
            ctx.fillText("Speed: "+this.getSpeed().toFixed(1)+" px/s", 10, y);
        }
        if(this._showDebugInfoSettings.orientation){
            y += 20;
            ctx.fillText("Orientation: "+this.getOrientation().toFixed(1)+"°", 10, y); //110
            ctx.fillText("("+this.getOrientationInRadians().toFixed(1)+" radians)", 150, y); //110
            y += 20;
            ctx.fillText("sin("+this.getOrientation().toFixed(1)+"°) = "+Math.sin(this.getOrientationInRadians()).toFixed(1)
                        +"  cos("+this.getOrientation().toFixed(1)+"°) = "+Math.cos(this.getOrientationInRadians()).toFixed(1),10,y); //130
        }
        if(this._showDebugInfoSettings.angularSpeed){
            y += 20;
            ctx.fillText("Angular speed: "+this.getAngularSpeed().toFixed(1)+" °/s", 10, y);  // 150
        }
        if(this._showDebugInfoSettings.hitPoints){
            y += 20;
            ctx.fillText("Hitpoints: "+this._hitPoints.toFixed(0), 10, y);  // 170
        }
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