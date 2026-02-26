export function directionalActionAnimLineCrementer(app, ownerType, owner, elem) {
  let percent = elem.counter.count / elem.counter.limit;
  let startPt;
  let endPt;
  let rearCellNo = app.getCellFromDirection(1, elem.locationCell, app.getOppositeDirection(elem.ownerDirection));
  let ownerCenter = undefined;
  let targetCenter = undefined;
  if (ownerType === "player") {
    ownerCenter = owner.currentPosition.cell.center;
    targetCenter = owner.target.cell1.center;
  } else {
    const ref = app.gridInfo.find((x) => {
      return x.number.x === elem.locationCell.x && x.number.y === elem.locationCell.y;
    });
    ownerCenter = ref.center;
    const pretargetCenter = ref[ownerType].trap.target;
    targetCenter = app.gridInfo.find((x) => {
      return x.number.x === pretargetCenter.x && x.number.y === pretargetCenter.y;
    })?.center;
  }

  if (elem.phase === "pullback") {
    startPt = ownerCenter;
    if (rearCellNo.x > -1 && rearCellNo.y > -1) {
      endPt = app.gridInfo.find((x) => x.number.x === rearCellNo.x && x.number.y === rearCellNo.y)?.center;
    } else {
      endPt = app.getVoidCenter(1, app.getOppositeDirection(elem.ownerDirection), ownerCenter);
    }
  }
  if (elem.phase === "release") {
    if (rearCellNo.x > -1 && rearCellNo.y > -1) {
      startPt = app.gridInfo.find((x) => x.number.x === rearCellNo.x && x.number.y === rearCellNo.y)?.center;
    } else {
      startPt = app.getVoidCenter(1, app.getOppositeDirection(elem.ownerDirection), ownerCenter);
    }
    endPt = targetCenter;
  }
  let dx = endPt.x - startPt.x;
  let dy = endPt.y - startPt.y;
  let X = startPt.x + dx * percent;
  let Y = startPt.y + dy * percent;
  let result = { color: elem.color, x: Math.round(X), y: Math.round(Y) };

  elem.points.push(result);
  if (ownerType === "player") {
    let el = owner.actionDirectionAnimationArray.find((x) => x.id === elem.id);
    el = elem;
  } else {
    owner = elem;
  }

  return owner;
}
