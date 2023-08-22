/****************************************************************
 GLOBAL VARIABLES
 ****************************************************************/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


/****************************************************************
 SCRIPT
****************************************************************/
// canvas: make the canvas as big as the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let game = new Game();
game.gameLoop(0);