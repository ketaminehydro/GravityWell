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
            case PARTICLE_EFFECT.SPARKS:
                this.#generateSparks(x, y);
                break;
            case PARTICLE_EFFECT.PURPLE_EXPLOSION:
                this.#generatePurpleExplosion(x, y);
                break;                    
            }
    }


    update(milliSecondsPassed){
        // every effect Type has its own update method
        switch(this._effectType){
            case PARTICLE_EFFECT.SPARKS:
                this.#updateSparks(milliSecondsPassed);
                break;    
            case PARTICLE_EFFECT.PURPLE_EXPLOSION:
                this.#updatePurpleExplosion(milliSecondsPassed);
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

    /****************************************************************
                 EFFECTS
    ****************************************************************/
    
    // PARTICLE_EFFECT.SPARKS 
    #generateSparks(x, y){
        let angle = 0;

        let numberOfParticles = 10;
        for(let i=1; i<= numberOfParticles; i++){
            
            // the particles should all be equally spread across the center
            let magnitude = Math.PI*2/numberOfParticles * 0.5;   
            let randomDeviation = Math.floor(Math.random()*(magnitude +1))-(magnitude/2);
            angle += Math.PI*2/numberOfParticles + randomDeviation;

            let speed = Math.random()*300;
            let vx = Math.sin(angle) * speed;
            let vy = -Math.cos(angle) * speed;
            let size = Math.random() * 2;
            let lifetime = Math.floor(Math.random()*(400-50+1))+50;
            let particle = new Particle(x, y, vx, vy, "#ADBCE9", size, lifetime);
            this._particles.push(particle);
        }
    }

    #updateSparks(milliSecondsPassed){

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

    // ==========================================================
    // PARTICLE_EFFECT.PURPLE_EXPLOSION 
    #generatePurpleExplosion(x, y){
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

    #updatePurpleExplosion(milliSecondsPassed){
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
