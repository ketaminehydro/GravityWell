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
            players.getElement(0).move(PLAYER_ACTION.THRUST_FORWARD);
            break;
        case "s":
            players.getElement(0).move(PLAYER_ACTION.REDUCE_SPEED);
            break;
        case "d":
            players.getElement(0).move(PLAYER_ACTION.YAW_RIGHT);
            break;
        case "a":
            players.getElement(0).move(PLAYER_ACTION.YAW_LEFT);
            break;
        case " ":
            let newTorpedo = players.getElement(0).shootTorpedo();
            if(newTorpedo != null){
                torpedoes.push(newTorpedo);
            }
            break;

        case "ArrowUp":
            players.getElement(1).move(PLAYER_ACTION.THRUST_FORWARD);
            break;
        case "ArrowDown":
            players.getElement(1).move(PLAYER_ACTION.REDUCE_SPEED);
            break;
        case "ArrowRight":
            players.getElement(1).move(PLAYER_ACTION.YAW_RIGHT);
            break;
        case "ArrowLeft":
            players.getElement(1).move(PLAYER_ACTION.YAW_LEFT);
            break;

        // debug
        case "h":
            players.toggleShowDebugInfo();
            players.toggleShowDebugStats();
            break;
        case "j":
            asteroids.toggleShowDebugStats();
            break;
        case "k":
            asteroids.toggleShowDebugInfo();
            break;
    }
});




/****************************************************************
 FUNCTIONS
 ****************************************************************/
 function gameLoop(timeStamp){

    // ************* ELAPSED TIME *******************************
    // calculate the number of seconds passed since the last frame
    // limit this so that in case of lag we are doing 100ms steps
    // even though the time between updates might be longer
    let secondsPassed;
    milliSecondsPassed = (timeStamp - previousTimeStamp);
    milliSecondsPassed = Math.min(milliSecondsPassed, 100);
    previousTimeStamp = timeStamp;


    // ************* UPDATE *************************************
    // update individual gameobjects
    //      -> spawn new ones, add to the arrays
    //      -> mark to-be-deleted
    // prune the arrays of the deleted objects

    asteroids.update(milliSecondsPassed);
    torpedoes.update(milliSecondsPassed);
    torpedoes.removeDeleted();

    players.update(milliSecondsPassed);
    display.update(milliSecondsPassed);


    // ************* COLLISION CHECK *****************************
    // reset all debug hitbox display flags
    // for each collision type: 
    //      fill the collision checker
    //      collision check: 
    //          -> flag collided gameobjects (hitbox display flag)
    //          -> return collision-pairs 
    // for each collision type: 
    //      collision-pairs 
    //          -> resolve physics
    //          -> resolve gamelogic (different for each pair)


    // reset all debug hitbox display flags
    asteroids.clearIsHit();
    torpedoes.clearIsHit();    
    players.clearIsHit();
    
    // initialize collision checker
    collisionChecker.reset();
    collisionChecker.fill(asteroids);
    collisionChecker.fill(torpedoes);
    collisionChecker.fill(players);

    // check for collisions
    let collisionPairs;
    collisionPairs = collisionChecker.markCollisions();

    // resolve collisions
    collisionResolver.resolve(collisionPairs);


    // ************* DRAW ****************************************

    // clear the canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    background.draw();
    asteroids.draw();
    torpedoes.draw();
    players.draw();
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
let players = new GameObjectArray();
for(let i=1; i<=NUMBER_OF_PLAYERS; i++){
    let player = new Player(canvas.width/2, canvas.height/2, 0);
    players.push(player);
}

// asteroids
let asteroids = new GameObjectArray();
for(let i=1; i<=NUMBER_OF_ASTEROIDS; i++){
    let asteroid = new Asteroid(canvas.width/2, canvas.height/2, 0);
    asteroids.push(asteroid);
}

// torpedoes
let torpedoes = new GameObjectArray();


// collision handler
const collisionChecker = new CollisionChecker();
const collisionResolver = new CollisionResolver();

// start the gameloop
requestAnimationFrame(gameLoop);