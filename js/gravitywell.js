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
            let result = player1.shootTorpedo();
            if(result != null){
                torpedos.push(result);
            }
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
    // update individual gameobjects
    //      -> spawn new ones, add to the arrays
    //      -> mark as deleted
    // prune the arrays of the deleted objects



    asteroids.forEach(element => {
        element.update(milliSecondsPassed);
    });

    // Torpedos
    let garbageTorpedos = [];
    // update torpedos and gather the to-be-deleted torpedos
    for(let i=0; i<torpedos.length; i++){
        torpedos[i].update(milliSecondsPassed);
        if(torpedos[i].getIsDeleted()){
            garbageTorpedos.push(i);
        }
    }
    // remove the to-be-deleted torpedoes from the torpedo array
    for (let i=0; i<garbageTorpedos.length; i++){
        delete torpedos[i];
        torpedos.splice(i,1);
    }

    // TODO: better garbage collection

    player1.update(milliSecondsPassed);
    //player2.update(milliSecondsPassed);

    display.update(milliSecondsPassed);


    // ************* COLLISION CHECK *****************************
    // reset all debug hitbox display flags
    // fill the collision handler
    // collision checker: 
    //      -> flag collided gameobjects
    //      -> get collision-pairs back 
    // collision-pair handler
    // 



    // reset all debug hitbox display flags
    asteroids.forEach(element =>{
        element.hitBox.setIsHit(false);
    });
    torpedos.forEach(element =>{
        element.hitBox.setIsHit(false);
    });
    player1.hitBox.setIsHit(false);

    
    // Asteroids vs Asteroids
    collisionHandlerAsteroidsAsteroids.reset();
    asteroids.forEach(element =>{
        collisionHandlerAsteroidsAsteroids.pushEntityType1(element);
    });
    collisionHandlerAsteroidsAsteroids.handleCollisions();


    // Players vs Asteroids
    collisionHandlerPlayersAsteroids.reset();    
    collisionHandlerPlayersAsteroids.pushEntityType1(player1);
    asteroids.forEach(element =>{
        collisionHandlerPlayersAsteroids.pushEntityType2(element);
    });
    collisionHandlerPlayersAsteroids.handleCollisions();
  

    // Torpedoes vs Asteroids
    collisionHandlerTorpedoesAsteroids.reset();
    torpedos.forEach(element =>{
        collisionHandlerTorpedoesAsteroids.pushEntityType1(element);
    });
    asteroids.forEach(element =>{
        collisionHandlerTorpedoesAsteroids.pushEntityType2(element);
    });
    collisionHandlerTorpedoesAsteroids.handleCollisions();
    



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
    //player2.draw();

    display.draw();


    // request next frame
    requestAnimationFrame(gameLoop);
}





/****************************************************************
 SCRIPT
****************************************************************/
// canvas: make the canvas as big as the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// hud
let display = new Display();

// background stars
let background = new Starfield();
background.fillStarfield();

// players
let player1 = new Player(canvas.width/2-400, canvas.height/2, 0);
//let player2 = new Player(canvas.width/2+500, canvas.height/2, 0);

// asteroids
const asteroids = [...Array(15).fill().map(() => new Asteroid(canvas.width/2, canvas.height/2, 0))];

// torpedoes
const torpedos = [];

// collision handler
const collisionHandlerAsteroidsAsteroids = new CollisionHandler();
const collisionHandlerPlayersAsteroids = new CollisionHandler();
const collisionHandlerTorpedoesAsteroids = new CollisionHandler();
const collisionHandlerTorpedoesPlayers= new CollisionHandler();

// start the gameloop
requestAnimationFrame(gameLoop);