class Display{
    constructor(){
        this.fps = 0;
    }

    update(milliSecondsPassed){
        this.fps = Math.round(1 / milliSecondsPassed*1000);
    }

    draw(milliSecondsPassed){
        ctx.fillStyle = "white";
        ctx.font = "1em Monospace";
        ctx.fillText("FPS: "+this.fps,10,30);
    }
}