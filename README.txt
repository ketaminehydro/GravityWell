/**************************
   PROJECT PLAN
***************************/
https://www.notion.so/ketaminehydro/GravityWell-35267e0c3c6943a0b24dc5c7a7f6511b?pvs=4



/**************************
   ARCHITECTURE NOTES
***************************/
Script 
   Event listeners
      --> players

   game  
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