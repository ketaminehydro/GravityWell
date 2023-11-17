/****************************************************************
 CLASS: GfxImplosion
 ****************************************************************/
class GFXImplosion{
    constructor(duration){
        // part of the level logic -> draw on the main canvas
        this._ctx = ctx;

        // animation
        this._stars = [];
        this._numberOfStarsToAdd = 15;
        this._maxStars = 100;
        this._speed = 0.0001;                // in px/sec
        this._maxSpeed = 1;
        this._acceleration = 0.00006;
        this._duration = duration;

        // initialize
        this.#addStars();
    }
    
    update(milliSecondsPassed){
        this._duration -= milliSecondsPassed;
        
        // constantly add new stars if max speed has not been reached
        if (this._speed < this._maxSpeed){
            this.#addStars();
        }
        
        // increase the speed of every star
        this._speed += this._acceleration;

        // move the star(line)
        for (const star of this._stars){
            star.x1 = star.x2;
            star.x2 += (canvas.width / 2 - star.x1) * (star.speed) * milliSecondsPassed;
            star.y1 = star.y2;
            star.y2 += (canvas.height / 2 - star.y1) * (star.speed * milliSecondsPassed);
        }
    }

    draw(){        
        // star animation
        if (this._duration > 2500){
            this._ctx.save();
            for (const star of this._stars){
                this._ctx.strokeStyle = "white";
                this._ctx.lineWidth = 2;
                this._ctx.beginPath();
                this._ctx.moveTo(star.x1, star.y1);
                this._ctx.lineTo(star.x2, star.y2);
                this._ctx.stroke();     
            }
            this._ctx.restore();    
        }
        // flash white 
        else if (this._duration > 2300){
            this._ctx.fillStyle = "white";
            this._ctx.fillRect(0, 0, canvas.width, canvas.height);
            return;
        }
        // flash transparent 
        else if (this._duration > 2200){
            this._ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            this._ctx.fillRect(0, 0, canvas.width, canvas.height);
            return;
        }  

    }

    #addStars(){
        // a star(line) consists of start and end coordinates, and a speed
        for (let i = 0; i <= this._numberOfStarsToAdd; i++){
            let x1 = Math.floor(Math.random() * canvas.width);
            let x2 = x1;
            let y1 = Math.floor(Math.random() * canvas.height);
            let y2 = y1;
 
            this._stars.push({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                speed: Math.random() * this._speed
             });
        }

        // prune if too many stars // TODO: prune the earliest ones
        if (this._stars.length > this._maxStars){
            this._stars.splice(0, this._stars.length - this._maxStars);
        }
    }
}