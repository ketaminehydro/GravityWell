/****************************************************************
 CLASS: Background
 ****************************************************************/
class Background{
    // wrapper class for the backgrounds
    constructor(){
        this._nebublas = new Nebulas();
        this._starfield = new Starfield();
        this._picture = new BackgroundPicture();
    }
    draw(){
        //this._nebublas.draw();
        //this._picture.draw();
        this._starfield.draw();
    }
}