/****************************************************************
 CLASS: Asteroid v1
 ****************************************************************/
class Asteroid_v1{
    constructor(){
        this.size = Math.random() * 6 + 1;                      // size of dot in pixel

        const angle = Math.floor(Math.random()*360);    // random angle
        this.speed = Math.random()*5;                     // random speed
        this.vx = Math.cos(angle) * this.speed;                 // velociy
        this.vy = Math.sin(angle) * this.speed;

        this.x = Math.random() * width;    // position oin
        this.y = Math.random() * height;

        this.attitude = 0;                  // in radiants

        // just for fun: have them start out in the center of the screen
        this.moveToCenter();
    }

    // set coordinates to middle of canvas
    moveToCenter(){
        this.x = width/2;
        this.y = height/2;
    }

    // calculates the distance to another dot
    calculateDistance(dot){
        let distX = this.x - dot.x;
        let distY = this.y - dot.y;

        return Math.sqrt(distX * distX + distY * distY);            // hypotenuse (Pythagore)
    }


    // inverts direction if canvas border is hit
    rebound(){
        if (this.x < 0 || this.x > width){
            this.vx *= -1;
        }

        if (this.y < 0 || this.y > height){
            this.vy *= -1;
        }
    }

    // applies gravity
    applyGravity(gForceX, gForceY){
        this.vx += gForceX;
        this.vy += gForceY;
    }

    // follows the mouse
    followMouse(){

        // mouse influence
        let impactX = mouse.x - this.x;
        let impactY = mouse.y - this.y;
        let impactMagnitude = Math.sqrt(impactX * impactX + impactY * impactY);
        console.log(impactMagnitude);


        // velocity: some calculation rounding/calculation error
        let velocityMagnitude = Math.sqrt(this.vx * this.vx + this.vy * this.vy);


        // intensity of influence (from 0 to 1)
        let intensity = -0.02;


        // add the two unit vectors together
        this.vx = ( intensity * (impactX/impactMagnitude) + (1-intensity) * (this.vx/velocityMagnitude) ) * this.speed ;
        this.vy = ( intensity * (impactY/impactMagnitude) + (1-intensity) * (this.vy/velocityMagnitude) ) * this.speed;
    }

    // draws the dot
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // updates the dot and draws it
    update(){

        // check for out of bounds
        this.rebound();

        // apply gravity
        //this.applyGravity(0,0.1);

        // follow the mouse
        //this.followMouse();

        // move the dot
        this.x += this.vx;
        this.y += this.vy;

        // draw
        this.draw();
    }
}
