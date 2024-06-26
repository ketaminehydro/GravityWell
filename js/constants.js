/****************************************************************
   Game related
 ****************************************************************/
const MAX_NUMBER_OF_PLAYERS = 2;  

const PLAYER1 = 1;
const PLAYER2 = 2;
const PLAYER3 = 3;
const PLAYER4 = 4;

const GAME_MODE = Object.freeze({
  CLASSIC: 1,
  STORY: 2
});

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
   States                           
 *****************************************/
const GAME_STATE = Object.freeze({
  LOADING: 1,
  TITLESCREEN: 2,
  STAGE_LOADING: 3,
  STAGE_RUNNING: 4,
  STAGE_ENDED: 5,
  GAME_OVER: 6,
  GAME_COMPLETED: 7,
  ENTER_HIGHSCORE: 8,
  PAUSE_MENU : 9  
});

const DEBUG_GAME_STATE = Object.freeze({
  // this is the easiest way to track the states,
  // however this list needs to be manually synched
  1: "LOADING",
  2: "TITLESCREEN",
  3: "STAGE_LOADING",
  4: "STAGE_RUNNING",
  5: "STAGE_ENDED",
  6: "GAME_OVER",
  7: "GAME_COMPLETED",
  8: "ENTER_HIGHSCORE",
  9: "PAUSE_MENU" 
});

const STAGE_STATE = Object.freeze({
  TITLE: 1,
  RUNNING: 2,
  COMPLETED_ONGOING: 3,
  COMPLETED_ENDED: 4,
  GAME_OVER_ONGOING: 5,
  GAME_OVER_ENDED: 6
});

const DEBUG_STAGE_STATE = Object.freeze({
  // this is the easiest way to track the states,
  // however this list needs to be manually synched
  1: "TITLE",
  2: "RUNNING",
  3: "COMPLETED_ONGOING",
  4: "COMPLETED_ENDED",
  5: "GAME_OVER_ONGOING",
  6: "GAME_OVER_ENDED"
});


 /******************************************
   Game Object related                           
 *****************************************/
const ASTEROID_SIZE = Object.freeze({
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3
});


const GAMEOBJECT_TYPE = Object.freeze({
  // binary enumeration makes collisions easier
  // see COLLISION_BETWEEN
  ENEMY: 1,
  PROJECTILE: 2,
  PLAYER: 4,
  POWERUP: 8,
  GRAVITYWELL: 16,
  EXPLOSION: 32,
  SATELLITE: 64,
  FIXED: 128
});


const ENEMY_BEHAVIOUR = Object.freeze({
  DRIFT: 1
});

/******************************************
   Collision related                           
 *****************************************/
const ON_BOUNDARY_HIT = Object.freeze({
    DELETE: 1,
    BOUNCE: 2,
    TELEPORT: 3,
    STOP: 4
 });

const COLLISION_BETWEEN = Object.freeze({
  // number = GAMEOBJECT_TYPE1 + GAMEOBJECT_TYPE2
  // (binary)
  ENEMY_AND_ENEMY: 2,
  ENEMY_AND_PROJECTILE: 3, 
  ENEMY_AND_PLAYER: 5,
  ENEMY_AND_POWERUP: 9,
  ENEMY_AND_GRAVITYWELL: 17,
  ENEMY_AND_EXPLOSION: 33,
  ENEMY_AND_SATELLITE: 65,
  ENEMY_AND_FIXED: 129,
  PROJECTILE_AND_PROECTILE: 4,
  PROJECTILE_AND_PLAYER: 6, 
  PROJECTILE_AND_POWERUP: 10,
  PROJECTILE_AND_GRAVITYWELL: 18,
  PROJECTILE_AND_EXPLOSION: 34,
  PROJECTILE_AND_SATELLITE: 66,
  PROJECTILE_AND_FIXED: 130,
  PLAYER_AND_PLAYER: 8,
  PLAYER_AND_POWERUP: 12,
  PLAYER_AND_GRAVITYWELL: 20,
  PLAYER_AND_EXPLOSION: 36,
  PLAYER_AND_SATELLITE: 68,
  PLAYER_AND_FIXED: 132,
  POWERUP_AND_POWERUP: 16,
  POWERUP_AND_GRAVITYWELL: 24,
  POWERUP_AND_EXPLOSION: 40,
  POWERUP_AND_SATELLITE: 72, 
  POWERUP_AND_FIXED: 136,
  GRAVITYWELL_AND_SATELLITE: 80,
  EXPLOSION_AND_SATELLITE: 96,
  SATELLITE_AND_SATELLITE: 128, 
  SATELITTE_AND_FIXED: 192
});

const COLLISION_TYPE = Object.freeze({
  PHYSICS: 1,
  PROJECTILE: 2,
  SIMPLE: 3,
  GRAVITY: 4,
  EXPLOSION: 5,
  POWERUP: 6
});


 /******************************************
   Particle effect related                           
 *****************************************/
   const PARTICLE_EFFECT = Object.freeze({
    NONE: 0,
    SPARKS: 1,
    PURPLE_EXPLOSION: 2
});


