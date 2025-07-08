export function cartesianToIsometric (context, cartPt) {
    console.log("Converting Cartesian to Isometric:", cartPt);
    
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    }

    var tempPt = new Point();
    tempPt.x = cartPt.x - cartPt.y;
    tempPt.y = (cartPt.x + cartPt.y) / 2;
    return tempPt;
};