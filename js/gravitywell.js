/****************************************************************
 GLOBAL VARIABLES
 ****************************************************************/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


/****************************************************************
 SCRIPT
****************************************************************/
// canvas: make the canvas as big as the window
function setCanvasSize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // FIXME: this doesn't work with the stars background which has 
    // to be recreated. And objects outside perimeter get "stuck"
}

window.addEventListener("resize",setCanvasSize);

setCanvasSize();
let game = new Game();
game.gameLoop(0);