export function obstacleBarrierTrapInitSet(app, superType, type, data) {
  console.log("  obstacleBarrierTrapInitSet", data[type]);
  let trap = data[type].trap;
  let item = app.itemList.find((x) => {
    return x.name === trap.itemNameRef;
  });
  trap.item = {
    name: item.name,
    amount: item.amount,
    total: item.total,
    type: item.type,
    subType: item.subType,
    effect: item.effect,
  };
  if (trap.item.effect.split("+")[0] === "ammo") {
    trap.ammo = parseInt(trap.item.effect.split("+")[1]);
    // trap.ammo = 100;
    // trap.item.effect = "ammo+0";
  }
  if (trap.action === "attack" && trap.acting.limit === 0) {
    trap.acting.peak = app.obstacleBarrierTrapAttackAnimRef.peak[trap.item.subType];
    trap.acting.limit = app.obstacleBarrierTrapAttackAnimRef.limit[trap.item.subType];
    // console.log("setting attack trap windup & cooldown", trap.acting.peak, trap.acting.limit);
  }

  let availibleCells = [];

  if (trap.state === true) {
    if (!trap.target.x || trap.target.x === undefined) {
      if (type === "obstacle") {
        if (trap.direction === "") {
          availibleCells = app.getSurroundingCells(data.number, 45, "walkable", false, false);
          if (availibleCells.length > 0) {
            if (trap.item.subType === "crossbow") {
              trap.target = availibleCells
                .slice()
                .reverse()
                .find((x) => (x.x === data.number.x && x.y === data.number.y + 3) || (x.y === data.number.y && x.x === data.number.x + 3));
            } else {
              if (trap.item.subType === "spear") {
                // trap.target = availibleCells[1];
                trap.target = availibleCells
                  // .slice()
                  // .find((x) => x.x === data.number.x || x.y === data.number.y);
                  .slice()
                  .find(
                    (x) =>
                      (x.x === data.number.x && (x.y === data.number.y + 2 || x.y === data.number.y - 2)) ||
                      (x.y === data.number.y && (x.x === data.number.x + 2 || x.x === data.number.x - 2)),
                  );
              }
              if (trap.item.subType === "sword") {
                // trap.target = availibleCells[0];
                trap.target = availibleCells
                  // .slice()
                  // .find((x) => x.x === data.number.x || x.y === data.number.y);
                  .slice()
                  .find(
                    (x) =>
                      (x.x === data.number.x && (x.y === data.number.y + 1 || x.y === data.number.y - 1)) ||
                      (x.y === data.number.y && (x.x === data.number.x + 1 || x.x === data.number.x - 1)),
                  );
              }
            }
            trap.direction = app.getDirectionFromCells(data.number, trap.target);
            // console.log("availibleCells", data.number, availibleCells, trap.target);
            // console.log("obstacle trap target set", data.number, trap.target, trap.ammo);
          } else {
            trap.state = false;
            console.log(`${type} trap disabled because there is no appropriate target cell`, data.number);
          }
        } else {
          let cell;
          if (trap.item.subType === "crossbow") {
            cell = app.getCellFromDirection(3, data.number, trap.direction);
          }
          if (trap.item.subType === "spear") {
            cell = app.getCellFromDirection(2, data.number, trap.direction);
          }
          if (trap.item.subType === "sword") {
            cell = app.getCellFromDirection(1, data.number, trap.direction);
          }
          if (!app.gridInfo.find((x) => cell.x === x.number.x && cell.y === x.number.y)) {
            trap.state = false;
            console.log(`${type} trap disabled because there is no appropriate target cell`, data.number);
          } else {
            trap.target = cell;
            // console.log("onstacle trap target set", data.number, trap.target, trap.ammo);
          }
        }
      }
      if (type === "barrier") {
        let cell;
        let xDirection;
        if (trap.direction === "") {
          xDirection = app.getOppositeDirection(data[type].position);
        } else {
          xDirection = trap.direction;
        }
        if (trap.item.subType === "crossbow") {
          cell = app.getCellFromDirection(3, data.number, xDirection);
        }
        if (trap.item.subType === "spear") {
          cell = app.getCellFromDirection(2, data.number, xDirection);
        }
        if (trap.item.subType === "sword") {
          cell = app.getCellFromDirection(1, data.number, xDirection);
        }
        if (!app.gridInfo.find((x) => cell.x === x.number.x && cell.y === x.number.y)) {
          trap.state = false;
          console.log(`${type} trap disabled because there is no appropriate target cellx`, data.number);
        } else {
          trap.target = cell;
          trap.direction = app.getDirectionFromCells(data.number, trap.target);
          // console.log("barrier trap target set", data.number, trap.target, trap.ammo);
        }
      }
    } else {
      if (trap.target.x) {
        // console.log("app traps target is already set", trap.target, data.number, type);
      }
    }
  }
  // console.log("trap init set", trap);
  return trap;
}
