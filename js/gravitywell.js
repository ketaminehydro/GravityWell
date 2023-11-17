/****************************************************************
 GLOBAL VARIABLES
 ****************************************************************/

 // Canvases
const canvasContainer = document.getElementById("canvascontainer");

const canvas = document.getElementById("gamecanvas");
const ctx = gamecanvas.getContext("2d");

const backgroundCanvas = document.getElementById("backgroundcanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");

const uiCanvas = document.getElementById("uicanvas");
const uiCtx = uiCanvas.getContext("2d");

// Global objects
const inputHandler = new InputHandler();
const stage = new Stage();
const objectFactory = new ObjectFactory();
const game = new Game();

// JSON loader
const gameData = new GameData();


/****************************************************************
 SCRIPT
****************************************************************/

//--------------------------------------------------------------
//  load google fonts
//--------------------------------------------------------------
WebFont.load({
    google: {
        families: ['Share Tech Mono: 400',
                   'Fugaz One: 400'
        ]
    }
});


//--------------------------------------------------------------
//  set the right screensize
//--------------------------------------------------------------
function setCanvasSize(){
    // scale the canvas (up or down) to window size 
    // by using CSS transforms which should (hopfully) use GPU
    
    // get the scaling factor
    const scaleX = window.innerWidth / 1920;
    const scaleY = window.innerHeight / 1080;
    const scaleToFit = Math.min(scaleX, scaleY);
    
    
    // adjust the canvases 
    canvas.style.transformOrigin = "0 0"; //scale from top left
    canvas.style.transform = `scale(${scaleToFit})`;
    backgroundCanvas.style.transformOrigin = "0 0"; //scale from top left
    backgroundCanvas.style.transform = `scale(${scaleToFit})`;
    uiCanvas.style.transformOrigin = "0 0"; //scale from top left
    uiCanvas.style.transform = `scale(${scaleToFit})`;
}

// add listener to react when user resizes the screen
window.addEventListener("resize",setCanvasSize);

// make the canvases fit the available window
setCanvasSize();



//--------------------------------------------------------------
//  start the game and the gameloop
//--------------------------------------------------------------
game.gameLoop(0);