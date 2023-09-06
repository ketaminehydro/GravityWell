/****************************************************************
 GLOBAL VARIABLES
 ****************************************************************/
const canvas = document.getElementById("gamecanvas");
const ctx = gamecanvas.getContext("2d");

const backgroundCanvas = document.getElementById("backgroundcanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");

const uiCanvas = document.getElementById("uicanvas");
const uiCtx = uiCanvas.getContext("2d");

/****************************************************************
 SCRIPT
****************************************************************/

// load google fonts
WebFont.load({
    google: {
        families: ['Share Tech Mono: 400',
                   'Fugaz One: 400'
        ]
    }
});


function setCanvasSize(canvas){
    // scale the canvas (up or down) to window size 
    // by using CSS transforms which should (hopfully) use GPU
    canvas.width = 1920;
    canvas.height = 1080;

    const scaleX = window.innerWidth / canvas.width;
    const scaleY = window.innerHeight / canvas.height;

    const scaleToFit = Math.min(scaleX, scaleY);

    stage.style.transformOrigin = "0 0"; //scale from top left
    stage.style.transform = `scale(${scaleToFit})`;
 
}

// add listener to react when user resizes the screen
window.addEventListener("resize",setCanvasSize);

// make the canvases fit the available window
setCanvasSize(canvas);
setCanvasSize(uiCanvas);
setCanvasSize(backgroundCanvas);

// start the game and the gameloop
let game = new Game();
game.gameLoop(0);