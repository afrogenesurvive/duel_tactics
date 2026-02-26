export function getTarget(app, player) {
  // console.log('checking target',player.number,'dir',player.direction);

  let canvas = app.canvasRef.current;
  let context = canvas.getContext("2d");

  let gridInfo = app.gridInfo;
  // let player = app.players[app.currentPlayer-1];
  let currentPosition = player.currentPosition.cell.number;
  let direction = player.direction;
  let voidDirection;
  let target = app.resetTarget();
  let midGridVoid1 = false;
  let midGridVoid2 = false;
  let edgeVoid1 = false;
  let edgeVoid2 = false;

  if (player.moveCancel.state === true) {
    currentPosition = player.target.cell1.number;
  }

  // DIRECTION MOD: STRAFING
  if (player.strafing.state === true && player.strafing.direction !== "") {
    direction = player.strafing.direction;
  }

  // DIRECTION MOD: FLANKING!!
  if (player.flanking.checking === true) {
    if (player.flanking.step === 0) {
      direction = player.flanking.direction;
    }
  }
  if (player.flanking.state === true) {
    if (player.flanking.step === 1) {
      direction = player.flanking.preFlankDirection;
    }
  }
  if (player.flanking.state === true) {
    if (player.flanking.step === 2) {
      direction = player.direction;
      // direction = player.flanking.preFlankDirection;
    }
  }

  if (player.jumping.checking === true) {
    direction = player.direction;
  }
  if (player.pulling.state === true) {
    direction = player.prePull.direction;
  }
  // if (player.pulled.state === true) {
  //   direction = app.players[player.pulled.puller-1].prePull.direction;
  // }

  // SET CELL 1 & 2 NUMBERS

  target.cell1.number = app.getCellFromDirection(1, currentPosition, direction);
  target.cell2.number = app.getCellFromDirection(2, currentPosition, direction);

  let targetCell1Ref = app.gridInfo.find((x) => x.number.x === target.cell1.number.x && x.number.y === target.cell1.number.y);
  let targetCell2Ref = app.gridInfo.find((x) => x.number.x === target.cell2.number.x && x.number.y === target.cell2.number.y);

  // CHECK SET VOID AND CENTERS
  voidDirection = direction;
  if (player.strafing.state === true) {
    voidDirection = player.strafing.direction;
  }
  if (!targetCell1Ref) {
    target.cell1.void = true;
    edgeVoid1 = true;
    target.cell1.center = app.getVoidCenter(1, voidDirection, player.currentPosition.cell.center);
    // app.testDraw.push({color:'red',x:target.cell1.center.x,y:target.cell1.center.y})
  }
  if (targetCell1Ref) {
    target.cell1.center = targetCell1Ref.center;
    if (targetCell1Ref.void.state === true) {
      target.cell1.void = true;
      midGridVoid1 = true;
    }
  }
  if (!targetCell2Ref) {
    target.cell2.void = true;
    edgeVoid2 = true;
    target.cell2.center = app.getVoidCenter(2, voidDirection, player.currentPosition.cell.center);
    // app.testDraw.push({color:'red',x:target.cell2.center.x,y:target.cell2.center.y})
  }
  if (targetCell2Ref) {
    target.cell2.center = targetCell2Ref.center;
    if (targetCell2Ref.void.state === true) {
      target.cell2.void = true;
      midGridVoid2 = true;
    }
  }

  let myCell = app.gridInfo.find(
    (elem2) => elem2.number.x === player.currentPosition.cell.number.x && elem2.number.y === player.currentPosition.cell.number.y,
  );

  target.myCellBlock = app.checkMyCellBarrier(direction, myCell);
  // let fwdBarrier = app.checkForwardBarrier(direction,cellRef);

  for (const plyr of app.players) {
    if (plyr.number !== player.number) {
      if (target.cell1.number.x === plyr.currentPosition.cell.number.x && target.cell1.number.y === plyr.currentPosition.cell.number.y) {
        target.cell1.occupant.type = "player";
        target.cell1.occupant.player = plyr.number;
        target.cell1.free = false;
      }
      if (target.cell2.number.x === plyr.currentPosition.cell.number.x && target.cell2.number.y === plyr.currentPosition.cell.number.y) {
        target.cell2.occupant.type = "player";
        target.cell2.occupant.player = plyr.number;
        target.cell2.free = false;
      }
    }
  }

  if (targetCell1Ref) {
    if (targetCell1Ref.obstacle.state === true) {
      target.cell1.occupant.type = "obstacle";
      target.cell1.free = false;
    }

    if (targetCell1Ref.barrier.state === true) {
      if (targetCell1Ref.barrier.position === app.getOppositeDirection(direction)) {
        target.cell1.occupant.type = "barrier";
        target.cell1.free = false;
      }

      if (targetCell2Ref) {
        if (targetCell1Ref.barrier.position === direction || targetCell2Ref.barrier.position === app.getOppositeDirection(direction)) {
          target.cell2.occupant.type = "barrier";
          target.cell2.free = false;
        }
      }

      if (!targetCell2Ref && targetCell1Ref.barrier.position === direction) {
        // target.cell1.occupant.type = "barrier";
        // target.cell1.free = false;

        target.cell2.occupant.type = "barrier";
        target.cell2.free = false;
      }
    }

    if (targetCell1Ref.item.name !== "" && target.cell1.occupant.type !== "player") {
      target.cell1.occupant.type = "item";
    }

    if (targetCell1Ref.rubble === true) {
      target.cell1.occupant.type = "rubble";
    }

    if (targetCell1Ref.elevation.number > myCell.elevation.number) {
      target.cell1.occupant.type = "higherElevation";
      target.cell1.free = false;
    }
  }
  if (targetCell2Ref) {
    if (targetCell2Ref.obstacle.state === true) {
      target.cell2.occupant.type = "obstacle";
      target.cell2.free = false;
    }

    if (targetCell2Ref.barrier.position === app.getOppositeDirection(direction)) {
      target.cell2.occupant.type = "barrier";
      target.cell2.free = false;
    }

    if (targetCell2Ref.item.name !== "" && target.cell2.occupant.type !== "player") {
      target.cell2.occupant.type = "item";
    }

    if (targetCell2Ref.rubble === true) {
      target.cell2.occupant.type = "rubble";
    }

    if (targetCell2Ref.elevation.number > myCell.elevation.number) {
      target.cell2.occupant.type = "higherElevation";
      target.cell2.free = false;
    }
  }

  // console.log('target',target);
  player.target = target;
  app.players[player.number - 1] = player;

  return target;
}
