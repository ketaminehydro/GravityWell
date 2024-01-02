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

const debuggerCanvas = document.getElementById("debuggercanvas");
const debuggerCtx = debuggerCanvas.getContext("2d");

// JSON loader
const gameData = new GameData();

// Global objects
const inputHandler = new InputHandler();
const stage = new Stage();
const objectFactory = new ObjectFactory();
const game = new Game();

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
    debuggerCanvas.style.transformOrigin = "0 0"; //scale from top left
    debuggerCanvas.style.transform = `scale(${scaleToFit})`;
}

// add listener to react when user resizes the screen
window.addEventListener("resize",setCanvasSize);

// make the canvases fit the available window
setCanvasSize();



//--------------------------------------------------------------
//  load and start the game/gameloop
//--------------------------------------------------------------
gameData.loadGeneral("./js/data/general.json");
gameData.loadEnemies("./js/data/enemies.json");
gameData.loadPlayerShips("./js/data/playerships.json");
gameData.loadStages("./js/data/stages.json");

game.gameLoop(0);