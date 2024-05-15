JUST TO GET YOU AN IDEA ON HOW STUFF IS GENERALLY STRUCTURED. 
CERTAINLY NOT UP TO DATE.




/**************************
   ARCHITECTURE NOTES
***************************/
Script 
   canvas

   game  
      inputHandler
         Event listeners
      display
      level
         players  
            player
               hitbox
               weapon?
         asteroids   
            asteroid
               hitbox
         projectiles 
            torpedo
               hitbox
         'gameobjects'
         
         starfield

         collisionChecker
            --> 'gameobjectarray'.'gameobject'.hitbox
         collisionResolver ('gameobject'-pairs)
            --> level

         -> generate asteroid (type)
         -> generate projectile (type)
         -> generate explosion () 
         -> generate powerup ()
         -> generate gravitywell () 
         -> generate ...all gameobject-types


      gameloop
         update level ()
         update display ()
         draw level ()
         draw display ()