/****************************************************************
 CLASS: BackgroundPicture
 ****************************************************************/
class BackgroundPicture{
    constructor(){
        // draw on the background canvas
        this._ctx = backgroundCtx;

        this._image = new Image();
        this._image.src = "img/background_pixelart.jpg";
    }


    draw(){
        this._ctx.drawImage(this._image,0,0,canvas.width,canvas.height);
    }
}