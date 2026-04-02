export function trapActionCancel(app, entity) {
  console.log("trapActionCancel");

  for (let elem of app.obstacleBarrierActionAnimationArray) {
    if (elem.ownerNumber === entity.id) {
      let trapIndex = app.obstacleBarrierActionAnimationArray.findIndex((x) => x.ownerNumber === elem.ownderNumber);

      if (trapIndex > -1) {
        app.obstacleBarrierActionAnimationArray.splice(trapIndex, 1);
      }
    }
  }

  entity.trap.acting = {
    state: false,
    count: 0,
    peak: entity.trap.acting.peak,
    limit: entity.trap.acting.limit,
    direction: "",
    directionType: "",
  };

  return entity;
}
