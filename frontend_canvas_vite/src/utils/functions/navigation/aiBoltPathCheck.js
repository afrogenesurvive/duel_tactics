export function aiBoltPathCheck(app, aiPlayer) {
  // console.log('aiPlayer.ai.targetPlayer',aiPlayer.ai.targetPlayer);
  let rangeElemCells2 = [];
  let rangeElem = aiPlayer.currentPosition.cell.number;
  let targetPos = aiPlayer.ai.targetPlayer.currentPosition;

  let dirToFire;
  let diff = 0;
  if (rangeElem.x === targetPos.x && rangeElem.y > targetPos.y) {
    dirToFire = "north";
    diff = rangeElem.y - targetPos.y;
    for (var i = 0; i < diff; i++) {
      rangeElemCells2.push({ x: rangeElem.x, y: rangeElem.y - i });
      // app.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y - i})
    }
  }
  if (rangeElem.x > targetPos.x && rangeElem.y === targetPos.y) {
    dirToFire = "west";
    diff = rangeElem.x - targetPos.x;
    for (var i = 0; i < diff; i++) {
      rangeElemCells2.push({ x: rangeElem.x - i, y: rangeElem.y });
      // app.cellsToHighlight.push({x:rangeElem.x - i, y: rangeElem.y})
    }
  }
  if (rangeElem.x === targetPos.x && rangeElem.y < targetPos.y) {
    dirToFire = "south";
    diff = targetPos.y - rangeElem.y;
    for (var i = 0; i < diff; i++) {
      rangeElemCells2.push({ x: rangeElem.x, y: rangeElem.y + i });
      // app.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y + i})
    }
  }
  if (rangeElem.x < targetPos.x && rangeElem.y === targetPos.y) {
    dirToFire = "east";
    diff = targetPos.x - rangeElem.x;
    for (var i = 0; i < diff; i++) {
      rangeElemCells2.push({ x: rangeElem.x + i, y: rangeElem.y });
      // app.cellsToHighlight.push({x:rangeElem.x + i, y: rangeElem.y})
    }
  }

  // IS SIGHT OBSTRUCTED?
  // let clearToShoot = true;
  let obstructions = [];
  for (const cellx of rangeElemCells2) {
    // console.log('cellx',cellx);
    let cellRef4 = app.gridInfo.find((elemb) => elemb.number.x === cellx.x && elemb.number.y === cellx.y);
    if (cellRef4.obstacle.state === true && cellRef4.obstacle.height >= 1) {
      // clearToShoot = false;
      obstructions.push(cellx);
    }
    if (cellRef4.barrier.state === true) {
      // clearToShoot = false;
      obstructions.push(cellx);
    }

    if (
      // cellRef4.levelData.charAt(0) !==  'y' &&
      // cellRef4.levelData.charAt(0) !==  'z'
      (cellRef4.obstacle.state !== true && cellRef4.barrier.state !== true) ||
      (cellRef4.obstacle.state === true && cellRef4.obstacle.height < 1)
    ) {
      // clearToShoot = true;
      // obstructions.push(cellx)
    }
  }

  // console.log('aiBoltPathCheck obstructions',obstructions);
  if (obstructions.length === 0) {
    return true;
  } else {
    return false;
  }

  // return clearToShoot
}
