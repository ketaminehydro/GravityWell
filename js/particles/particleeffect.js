/****************************************************************
 CLASS: ParticleEffect
 ****************************************************************/
class ParticleEffect{
    constructor(x, y, effectType){
        this._particles = [];

        // effect origin
        this.x = x;
        this.y = y;

        // effect type
        this._effectType = effectType;
        this.#generateEffect(x, y, effectType);

        this._isDeleted = false;

    }


    getIsDeleted(){
        return this._isDeleted;
    }


    #generateEffect(x, y, effectType){
        switch(effectType){
            case PARTICLE_EFFECT.CIRCULAR_EXPLOSION:
                this.#generateCircularExplosion(x, y);
                break;
            case PARTICLE_EFFECT.CIRCULAR_EXPLOSION_BIG:
                this.#generateCircularExplosionBig(x, y);
                break;    
            }
    }


    update(milliSecondsPassed){
        // every effect Type has its own update method
        switch(this._effectType){
            case PARTICLE_EFFECT.CIRCULAR_EXPLOSION:
                this.#updateCircularExplosion(milliSecondsPassed);
                break;
            case PARTICLE_EFFECT.CIRCULAR_EXPLOSION_BIG:
                this.#updateCircularExplosionBig(milliSecondsPassed);
                break;    
            }

        // delete the effect if it contains no particles anymore
        if(this._particles.length <= 0){
            this._isDeleted = true;
        }
    }

    draw(){
        this._particles.forEach(element =>{
            element.draw();
        });
    }

    /********************** EFFECTS *******************************/

    // PARTICLE_EFFECT.CIRCULAR_EXPLOSION
    #generateCircularExplosion(x, y){
        let angle = 0;

        for(let i=1; i<= 20; i++){
            
            angle += Math.PI*2/20;
            let speed = Math.random()*300;
            let vx = Math.sin(angle) * speed;
            let vy = -Math.cos(angle) * speed;
            let size = Math.random() * 2;
            let lifetime = Math.floor(Math.random()*(400-50+1))+50;
            let particle = new Particle(x, y, vx, vy, "#ADBCE9", size, lifetime);
            this._particles.push(particle);
        }
    }

    #updateCircularExplosion(milliSecondsPassed){

        for(let i=0; i<this._particles.length; i++){

            // slow down velocity
            this._particles[i].vx -= 50 * milliSecondsPassed / 1000;
            this._particles[i].vy -= 50 * milliSecondsPassed / 1000;

            // update position
            this._particles[i].x += this._particles[i].vx * milliSecondsPassed / 1000;
            this._particles[i].y += this._particles[i].vy * milliSecondsPassed / 1000;         

            // avance particle's lifecycle
            this._particles[i].advanceLifeCycle(milliSecondsPassed);

            // if at end-of-life, remove
            if(this._particles[i].getIsDeleted()){
                delete this._particles[i];
                this._particles.splice(i,1);
            }
        }
    }

        // PARTICLE_EFFECT.CIRCULAR_EXPLOSION_BIG
        #generateCircularExplosionBig(x, y){
            let angle = 0;
    
            for(let i=1; i<= 30; i++){
                
                angle += Math.PI*2/30;
                let speed = Math.random()*200;
                let vx = Math.sin(angle) * speed;
                let vy = -Math.cos(angle) * speed;
                let size = Math.random() * 3;
                let lifetime = Math.floor(Math.random()*(600-200+1))+200;
                let particle = new Particle(x, y, vx, vy, "#CC29D2", size, lifetime);
                this._particles.push(particle);
            }
        }
    
        #updateCircularExplosionBig(milliSecondsPassed){
            for(let i=0; i<this._particles.length; i++){
    
                // slow down velocity
                this._particles[i].vx -= 50 * milliSecondsPassed / 1000;
                this._particles[i].vy -= 50 * milliSecondsPassed / 1000;
    
                // update position
                this._particles[i].x += this._particles[i].vx * milliSecondsPassed / 1000;
                this._particles[i].y += this._particles[i].vy * milliSecondsPassed / 1000;         
    
                // avance particle's lifecycle
                this._particles[i].advanceLifeCycle(milliSecondsPassed);
    
                // if at end-of-life, remove
                if(this._particles[i].getIsDeleted()){
                    delete this._particles[i];
                    this._particles.splice(i,1);
                }
            }
        }    
}
