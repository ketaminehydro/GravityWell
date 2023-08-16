/****************************************************************
   Game related
 ****************************************************************/
const NUMBER_OF_PLAYERS = 1;
const NUMBER_OF_ASTEROIDS = 15;


/****************************************************************
   Controls related
 ****************************************************************/
const PLAYER_ACTION = Object.freeze({
    YAW_LEFT: 0,
    YAW_RIGHT: 1,
    THRUST_FORWARD: 2,
    REDUCE_SPEED: 3
});


/******************************************
   Drawing related                           
 *****************************************/
 const CANVAS_MARGIN = 100;
 const DEBUG_INFO_SIZE = 100;
 

/******************************************
   Collision related                           
 *****************************************/
const ON_BOUNDARY_HIT = Object.freeze({
    DELETE: 1,
    BOUNCE: 2,
    TELEPORT: 3,
    STOP: 4
 });
 


 /******************************************
   Game Object related                           
 *****************************************/
const ASTEROID_SIZE = Object.freeze({
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3
});