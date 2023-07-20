// I CHANGED SOMETINOG more
/****************************************************************
 CONSTANTS
 ****************************************************************/
const YAW_LEFT = 0;
const YAW_RIGHT = 1;
const THRUST_FORWARD = 2;
const THRUST_BACKWARDS = 3;



/****************************************************************
 GLOBAL VARIABLES
 ****************************************************************/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let previousTimeStamp = 0;


/****************************************************************
  EVENT LISTENERS
 ****************************************************************/
document.addEventListener('keydown', function(event) {
    switch (event.key){
        // controls
        case "w":
            player1.move(THRUST_FORWARD);
            break;
        case "s":
            player1.move(THRUST_BACKWARDS);
            break;
        case "d":
            player1.move(YAW_RIGHT);
            break;
        case "a":
            player1.move(YAW_LEFT);
            break;
        case " ":
            torpedos.push(player1.shootTorpedo());
            break;

        case "ArrowUp":
            player2.move(THRUST_FORWARD);
            break;
        case "ArrowDown":
            player2.move(THRUST_BACKWARDS);
            break;
        case "ArrowRight":
            player2.move(YAW_RIGHT);
            break;
        case "ArrowLeft":
            player2.move(YAW_LEFT);
            break;

        // debug
        case "h":
            player1.toggleShowDebugInfo();
            player1.toggleShowDebugStats();
            break;
        case "j":
            asteroids.forEach(element => {
                element.toggleShowDebugStats();
            });
            break;
        case "k":
            asteroids.forEach(element => {
                element.toggleShowDebugInfo();
            });
            break;
    }
});




/****************************************************************
 FUNCTIONS
 ****************************************************************/
function gameLoop(timeStamp){

    // calculate the number of seconds passed since the last frame
    // limit this so that in case of lag we are doing 100ms steps
    // even though the time between updates might be longer
    let secondsPassed;
    milliSecondsPassed = (timeStamp - previousTimeStamp);
    millSecondsPassed = Math.min(milliSecondsPassed, 100);
    previousTimeStamp = timeStamp;

    // ************* UPDATE *************************************

    asteroids.forEach(element => {
        element.update(milliSecondsPassed);
    });

    let garbageTorpedos = [];
    // update torpedos and gather the to be deleted torpedos
    for(let i=0; i<torpedos.length; i++){
        torpedos[i].update(milliSecondsPassed);
        if(torpedos[i].getIsDeleted()){
            garbageTorpedos.push(i);
        }
    }
    // prune the torpedos and delete the purged ones
    for (let i=0; i<garbageTorpedos.length; i++){
        delete torpedos[i];
        torpedos.splice(i,1);
    }

    player1.update(milliSecondsPassed);
    player2.update(milliSecondsPassed);
    display.update(milliSecondsPassed);


    // ************* COLLISION CHECK *****************************

    // reset the collision handler
    collisionHandler.clear();

    // fill the collision handler
    asteroids.forEach(element =>{
        element.hitBox.setIsHit(false);
        collisionHandler.push(element);
    });
    player1.hitBox.setIsHit(false);
    collisionHandler.push(player1);
    player2.hitBox.setIsHit(false);
    collisionHandler.push(player2);

    // run through the collision collector and handle the collisions
    collisionHandler.handleCollisions();



    // ************* DRAW ****************************************

    // clear the canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    background.draw();
    asteroids.forEach(element => {
        element.draw();
    });
    torpedos.forEach(element => {
        element.draw();
    });
    player1.draw();
    player2.draw();
    display.draw();


    // request next frame
    requestAnimationFrame(gameLoop);
}





/****************************************************************
 SCRIPT
****************************************************************/
// sizes: make the canvas as big as the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create the objects
let display = new Display();
let background = new Starfield();
background.fillStarfield();
let player1 = new Player(canvas.width/2-400, canvas.height/2, 0);
let player2 = new Player(canvas.width/2+500, canvas.height/2, 0);
const asteroids = [...Array(14).fill().map(() => new Asteroid(canvas.width/2, canvas.height/2, 0))];
const torpedos = [];

// create a collision handler
const collisionHandler = new CollisionHandler();

// start the gameloop
requestAnimationFrame(gameLoop);


