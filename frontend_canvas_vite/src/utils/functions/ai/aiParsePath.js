export function aiParsePath(app, path, aiPlayer) {
  // console.log('parsing path',path);
  // ..
  let instructions = [];
  let init = true;
  let initDirection = app.players[aiPlayer - 1].direction;
  let direction;

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

  for (const [key, value] of Object.entries(path)) {
    let currentCell = path[key - 1];
    let nextCell = path[key];
    // console.log(key-1,'currentCell',currentCell,'nextCell',nextCell);
    if (currentCell) {
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

  app.players[aiPlayer - 1].ai.pathArray = path;
  app.players[aiPlayer - 1].ai.instructions = instructions;
  app.players[aiPlayer - 1].ai.currentInstruction = 0;
}
