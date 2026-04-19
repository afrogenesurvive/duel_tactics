export function checkMoveCancel(app, player, nextPosition) {
  const logMove = (message, data = {}) => {
    app.globalLogger("player.movement", message, data, { fn: "checkMoveCancel" });
  };
  const logMoveCount = (message, data = {}) => {
    app.globalLogger("player.movement_count", message, data, { fn: "checkMoveCancel" });
  };

  if (player.moving.state === true) {
    // console.log("player ", player.number, " ", player.action, " : ", player.moving.step);
    let canCancelMove = false;

    if (
      app.keyPressed[player.number - 1].north === true ||
      app.keyPressed[player.number - 1].south === true ||
      app.keyPressed[player.number - 1].east === true ||
      app.keyPressed[player.number - 1].west === true
    ) {
      let oldDirection;
      let newDirection;
      if (app.keyPressed[player.number - 1].north === true) {
        newDirection = "north";
      }
      if (app.keyPressed[player.number - 1].south === true) {
        newDirection = "south";
      }
      if (app.keyPressed[player.number - 1].east === true) {
        newDirection = "east";
      }
      if (app.keyPressed[player.number - 1].west === true) {
        newDirection = "west";
      }
      if (player.strafing.state === true) {
        if (newDirection === app.getOppositeDirection(player.strafing.direction)) {
          canCancelMove = true;
        }
        oldDirection = player.strafing.direction;
      } else {
        if (newDirection === app.getOppositeDirection(player.direction)) {
          canCancelMove = true;
        }
        oldDirection = player.direction;
      }

      if (
        player.drowning === true ||
        player.pushBack.state === true ||
        player.falling.state === true ||
        player.pushing.state === true ||
        player.pulling.state === true ||
        player.pushed.state === true ||
        player.pulled.state === true
      ) {
        canCancelMove = false;
        console.log("cannot cancel move when being pushed back, falling, drowning, pulling, pushing, and being pushed or pulled");
      }

      if (player.moveCancel.state !== true && canCancelMove === true) {
        // console.log("new input direction", newDirection, player.moving.step);
        // player.speed.move = 0.2;
        let inTime = false;
        let inTimeThresh;
        let threshIndx;
        if (player.jumping.state === true) {
          inTimeThresh = 0.4;
        } else {
          let indx3 = player.speed.range_1.indexOf(player.speed.move);
          threshIndx = Math.ceil(app.moveStepRef[indx3].length / 2);
          // inTimeThresh = app.moveStepRef[indx3][threshIndx];
          inTimeThresh = app.moveStepRef[indx3][threshIndx + 1];
          // console.log("inTimeThresh", inTimeThresh, "step", player.moving.step);
        }
        if (player.moving.step < inTimeThresh) {
          inTime = true;
        }

        if (inTime === true) {
          if (player.stamina.current - app.staminaCostRef.move >= 0) {
            player.stamina.current -= app.staminaCostRef.move;

            if (player.jumping.state === true) {
              player.jumping = {
                checking: false,
                state: false,
              };
            }
            if (player.flanking.state === true) {
              player.flanking = {
                checking: false,
                preFlankDirection: "",
                direction: "",
                state: false,
                step: 0,
                target1: { x: 0, y: 0 },
                target2: { x: 0, y: 0 },
              };
            }
            let originalDest = player.target.cell1;

            player.moveCancel = {
              state: true,
              oldDirection: oldDirection,
              newDirection: newDirection,
              returningTo: {},
              returningFrom: {},
            };

            logMove("moveCancelStart", {
              plyr_no: player.number,
              old_direction: oldDirection,
              new_direction: newDirection,
              step: player.moving.step,
              move_speed: player.speed.move,
              jumping: player.jumping.state,
              strafing: player.strafing.state,
            });

            if (player.strafing.state !== true) {
              player.strafing.state = true;
              player.strafing.direction = newDirection;
            } else {
              if (player.strafing.direction === app.getOppositeDirection(player.direction)) {
                player.strafing.state = false;
                player.strafing.direction = "";
              } else {
                player.strafing.direction = newDirection;
              }
            }

            let newTarget = app.getTarget(player);

            let indx3 = player.speed.range_1.indexOf(player.speed.move);
            let indx4 = app.moveStepRef[indx3].indexOf(player.moving.step);
            let newIndx = app.moveStepRef[indx3].length - (indx4 + 1);
            let newStep = app.moveStepRef[indx3][newIndx - 1];

            // // move speeds
            // [0.05, 0.1, 0.125, 0.2],
            // // Move speed step indices
            // [
            //   0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8,
            //   0.85, 0.9, 0.95, 1,
            // ],
            // [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            // [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
            // [0.2, 0.4, 0.6, 0.8, 1],

            player.action = "moving";
            player.moving = {
              state: true,
              step: newStep,
              course: "",
              origin: {
                number: originalDest.number,
                center: originalDest.center,
              },
              destination: newTarget.cell1.center,
            };

            nextPosition = app.lineCrementer(player);
            player.nextPosition = nextPosition;
            // console.log(
            //   "can move cancel/ return: starting"
            //   // originalDest.number,
            //   // newTarget.cell1.number,
            // );

            if (
              app.mouseOverCell.state === true &&
              app.mouseOverCell.cell.number.x === player.currentPosition.cell.number.x &&
              app.mouseOverCell.cell.number.y === player.currentPosition.cell.number.y
            ) {
              app.clicked.player = player;
            }
          } else {
            player.stamina.current = 0;
            player.statusDisplay = {
              state: true,
              status: "Out of Stamina",
              count: 0,
              limit: player.statusDisplay.limit,
            };
          }
        } else {
          console.log("too late to move cancel. move step is", player.moving.step);
        }
      } else if (player.moveCancel.state === true) {
        // console.log("already move cancelling");
      }
    }
  }
}
