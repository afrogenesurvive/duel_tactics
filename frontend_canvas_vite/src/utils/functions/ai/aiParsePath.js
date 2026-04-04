export function aiParsePath(app, path, aiPlayer) {
  // console.log('parsing path',path);
  // ..
  let instructions = [];
  let init = true;
  let initDirection = app.players[aiPlayer - 1].direction;
  let direction;
  let blockedPath = false;
  const getCell = (x, y) => app.gridInfo.find((cell) => cell.number.x === x && cell.number.y === y);
  const isGapCell = (cell) => cell && (cell.void.state === true || cell.terrain.type === "deep" || cell.terrain.type === "hazard");
  const isUnsafeCell = (cell) =>
    !cell ||
    cell.levelData.split("_")[1] !== "*" ||
    cell.terrain.type === "deep" ||
    cell.terrain.type === "hazard" ||
    cell.void.state === true;
  const getMoveDirection = (fromCell, toCell) => {
    if (toCell.x === fromCell.x && toCell.y === fromCell.y - 1) {
      return "north";
    }
    if (toCell.x === fromCell.x && toCell.y === fromCell.y + 1) {
      return "south";
    }
    if (toCell.x === fromCell.x - 1 && toCell.y === fromCell.y) {
      return "west";
    }
    if (toCell.x === fromCell.x + 1 && toCell.y === fromCell.y) {
      return "east";
    }
    return undefined;
  };
  const canJumpOverGap = (fromCell, gapCell, landingCell) => {
    if (!fromCell || !gapCell || !landingCell) {
      return false;
    }
    if (!isGapCell(getCell(gapCell.x, gapCell.y))) {
      return false;
    }
    if (isUnsafeCell(getCell(fromCell.x, fromCell.y)) || isUnsafeCell(getCell(landingCell.x, landingCell.y))) {
      return false;
    }

    const moveDir = getMoveDirection(fromCell, gapCell);
    const landingDir = getMoveDirection(gapCell, landingCell);
    if (!moveDir || moveDir !== landingDir) {
      return false;
    }

    const gapRef = getCell(gapCell.x, gapCell.y);
    const landingRef = getCell(landingCell.x, landingCell.y);
    if (!gapRef || !landingRef) {
      return false;
    }

    if (landingRef.obstacle.state === true) {
      return false;
    }

    if (landingRef.barrier.state === true && landingRef.barrier.position === app.getOppositeDirection(moveDir)) {
      return false;
    }

    if (gapRef.barrier.state === true && gapRef.barrier.position === app.getOppositeDirection(moveDir)) {
      return false;
    }

    return true;
  };

  if (app.players[aiPlayer - 1].ai.mission !== "patrol" && app.players[aiPlayer - 1].ai.mission !== "defend") {
    if (app.players[aiPlayer - 1].ai.safeRange !== true) {
      path.pop();
    }

    // if (path.length > 1) {
    //   path.pop();
    // }
  }
  if (app.players[aiPlayer - 1].ai.mission === "patrol") {
    // if (path.length > 2) {
    //   path.pop();
    // }
  }
  // if (path.length > 1) {
  //   path.pop();
  // }
  // path.pop();

  for (let index = 1; index < path.length; index++) {
    let currentCell = path[index - 1];
    let nextCell = path[index];
    let nextNextCell = path[index + 1];
    // console.log(key-1,'currentCell',currentCell,'nextCell',nextCell);
    if (currentCell) {
      if (nextNextCell && canJumpOverGap(currentCell, nextCell, nextNextCell)) {
        const jumpDir = getMoveDirection(currentCell, nextCell);
        instructions.push({
          keyword: "jump_" + jumpDir,
          count: 0,
          limit: 6,
        });
        direction = jumpDir;
        index += 1;
        continue;
      }

      if (nextCell && isGapCell(getCell(nextCell.x, nextCell.y))) {
        blockedPath = true;
        break;
      }

      let oldDirection = direction;
      let newDirection;
      if (init === true) {
        oldDirection = initDirection;
        init = false;
      }

      if (nextCell.x === currentCell.x && nextCell.y === currentCell.y - 1) {
        newDirection = "north";
      }
      if (nextCell.x === currentCell.x && nextCell.y === currentCell.y + 1) {
        newDirection = "south";
      }
      if (nextCell.x === currentCell.x - 1 && nextCell.y === currentCell.y) {
        newDirection = "west";
      }
      if (nextCell.x === currentCell.x + 1 && nextCell.y === currentCell.y) {
        newDirection = "east";
      }

      if (oldDirection === newDirection) {
        if (app.players[aiPlayer - 1].ai.mission === "patrol" && app.players[aiPlayer - 1].ai.patrolling.checkin !== "enroute") {
          instructions.push(
            {
              keyword: "move_" + newDirection,
              count: 0,
              limit: 1,
            },
            {
              keyword: "long_wait",
              count: 0,
              limit: 25,
            },
          );
        } else {
          instructions.push({
            keyword: "move_" + newDirection,
            count: 0,
            limit: 1,
          });
        }
      }
      if (oldDirection !== newDirection) {
        if (app.players[aiPlayer - 1].ai.mission === "patrol" && app.players[aiPlayer - 1].ai.patrolling.checkin !== "enroute") {
          instructions.push(
            {
              keyword: "move_" + newDirection,
              count: 0,
              limit: 1,
            },
            {
              keyword: "long_wait",
              count: 0,
              limit: 25,
            },
            {
              keyword: "move_" + newDirection,
              count: 0,
              limit: 1,
            },
            {
              keyword: "long_wait",
              count: 0,
              limit: 25,
            },
          );
        } else {
          instructions.push(
            {
              keyword: "move_" + newDirection,
              count: 0,
              limit: 1,
            },
            {
              keyword: "move_" + newDirection,
              count: 0,
              limit: 1,
            },
          );
        }
      }

      direction = newDirection;
    }
  }
  // instructions.shift();
  // instructions.pop();

  // console.log('app.pathArray',app.pathArray);
  // console.log('path',path,'player',aiPlayer);
  // console.log('parse path instructions',instructions);

  // console.log('player',aiPlayer,app.players[aiPlayer-1].ai.currentInstruction,'mission',app.players[aiPlayer-1].ai.mission,'instructions',instructions);
  // if (app.players[aiPlayer-1].ai.mission === 'retreat') {
  //   console.log('retreat instructions',instructions,'player',aiPlayer,app.players[aiPlayer-1].ai.currentInstruction,'path',path);
  // }
  if (app.players[aiPlayer - 1].ai.mission === "retrieve") {
    console.log("retrieve instructions", instructions, "player", aiPlayer, app.players[aiPlayer - 1].ai.currentInstruction, "path", path);
  }

  if (blockedPath === true) {
    app.players[aiPlayer - 1].ai.instructions = [];
    app.players[aiPlayer - 1].ai.currentInstruction = 0;
    app.players[aiPlayer - 1].ai.resetInstructions = true;
    return;
  }

  app.players[aiPlayer - 1].ai.pathArray = path;
  app.players[aiPlayer - 1].ai.instructions = instructions;
  app.players[aiPlayer - 1].ai.currentInstruction = 0;
}
