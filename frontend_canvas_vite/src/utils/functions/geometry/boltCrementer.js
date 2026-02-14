export function boltCrementer(app, bolt) {
  // console.log('boltCrementer');

  // let index = app.projectiles.findIndex(blt => blt.id === bolt.id);
  let distanceFactor = bolt.target.path.length;
  // if (distanceFactor == 1) {
  //   distanceFactor = 2;
  // }

  let moveSpeed = bolt.speed;
  // moveSpeed = bolt.speed/distanceFactor;
  moveSpeed = bolt.speed / (distanceFactor / 5);
  // moveSpeed = bolt.speed/(distanceFactor/10);

  bolt.moving.step += moveSpeed;
  // console.log('boltCrementer',bolt.moving.step,bolt.speed,moveSpeed,distanceFactor);
  let newPosition;

  // line: percent is 0-1
  let startPt = bolt.moving.origin.center;
  let endPt = bolt.target.path[bolt.target.path.length - 1].center;
  let percent = bolt.moving.step;
  // if (distanceFactor == 1) {
  //   endPt.x+=2
  //   endPt.y+=2
  // }

  // console.log('bolt crement',startPt,endPt,percent);
  // console.log('percent',percent,'time',app.time);
  //
  function getLineXYatPercent(startPt, endPt, percent) {
    let dx = endPt.x - startPt.x;
    let dy = endPt.y - startPt.y;
    let X = startPt.x + dx * percent;
    let Y = startPt.y + dy * percent;
    // newPosition = {
    //   x: X,
    //   y: Y
    // }
    newPosition = {
      x: Math.round(X),
      y: Math.round(Y),
    };
  }
  getLineXYatPercent(startPt, endPt, percent);

  // bolt.nextPosition = newPosition;

  // app.projectiles[index] = bolt;
  // console.log('bolt crementer new position',newPosition);
  return newPosition;
}
