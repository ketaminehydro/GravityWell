/****************************************************************
 CLASS: VectorMath
 ****************************************************************/
 class VectorMath {
    static calculateMagnitude(x, y){
        return Math.sqrt(x*x+y*y);
    }

    static calculateAngleBetween(x1, y1, x2, y2) {
        const angle1 = Math.atan2(y1, x1);  // angle v1 and x axis
        const angle2 = Math.atan2(y2, x2);  // angle v2 and x axis
        let angle = angle2 - angle1;
      
        if (angle < 0) {
          angle += 2 * Math.PI;
        }
      
        return angle;
    }

    static toDegrees(angleInRadians){
        return angleInRadians * 180 / Math.PI;
    }

    static toRadians(angleInDegrees){
        return angleInDegrees * Math.PI / 180;
    }

}