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
   Game Object related                           
 *****************************************/
   const ASTEROID_SIZE = Object.freeze({
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3
});


const GAMEOBJECT_TYPE = Object.freeze({
  // binary enumeration makes collisions easier
  ASTEROID: 1,
  PROJECTILE: 2,
  PLAYER: 4,
  POWERUP: 8,
  GRAVITYWELL: 16,
  EXPLOSION: 32,
  SATELLITE: 64,
  FIXED: 128
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
  // see also GAMEOBJECT_TYPE
  ASTEROID_AND_ASTEROID: 2,
  ASTEROID_AND_PROJECTILE: 3, 
  ASTEROID_AND_PLAYER: 5,
  ASTEROID_AND_POWERUP: 9,
  ASTEROID_AND_GRAVITYWELL: 17,
  ASTEROID_AND_EXPLOSION: 33,
  ASTEROID_AND_SATELLITE: 65,
  ASTEROID_AND_FIXED: 129,
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

