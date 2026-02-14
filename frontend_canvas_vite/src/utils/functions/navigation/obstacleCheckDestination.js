export function obstacleCheckDestination(app, targetCell, player) {
  // let targetCell = app.gridInfo.find(
  //   (x) => x.number.x === cell.number.x && x.number.y === cell.number.y
  // );
  let damage = 0;
  if (targetCell.terrain.name === "lava") {
    damage = targetCell.obstacle.hp;
  }
  if (targetCell.terrain.type === "hazard" || targetCell.rubble === true) {
    if (targetCell.terrain.name !== "lava") {
      damage = app.rnJesus(1, targetCell.obstacle.hp - 1);
      if (damage === 0) {
        damage = 1;
      }
    }
  }
  if (targetCell.obstacle.trap.state === true) {
    // if (!targetCell.obstacle.trap.target.x || targetCell.obstacle.trap.target.x === undefined) {

    // }
    let availibleCells = [];
    if (targetCell.obstacle.trap.direction === "") {
      availibleCells = app.getSurroundingCells(targetCell.number, 30, "walkable", false, false);
      if (availibleCells.length > 0) {
        if (targetCell.obstacle.trap.item.subType === "crossbow") {
          targetCell.obstacle.trap.target = availibleCells
            .slice()
            .reverse()
            .find((x) => x.x === targetCell.number.x || x.y === targetCell.number.y);
        } else {
          if (targetCell.obstacle.trap.item.subType === "spear") {
            // targetCell.obstacle.trap.target = availibleCells[1];
            targetCell.obstacle.trap.target = availibleCells
              .slice()
              .find(
                (x) =>
                  (x.x === targetCell.number.x && (x.y === targetCell.number.y + 2 || x.y === targetCell.number.y - 2)) ||
                  (x.y === targetCell.number.y && (x.x === targetCell.number.x + 2 || x.x === targetCell.number.x - 2)),
              );
          }
          if (targetCell.obstacle.trap.item.subType === "sword") {
            // targetCell.obstacle.trap.target = availibleCells[0];
            targetCell.obstacle.trap.target = availibleCells
              // .slice()
              // .find((x) => x.x === targetCell.number.x || x.y === targetCell.number.y);
              .slice()
              .find(
                (x) =>
                  (x.x === targetCell1.number.x && (x.y === targetCell.number.y + 1 || x.y === targetCell.number.y - 1)) ||
                  (x.y === targetCell.number.y && (x.x === targetCell.number.x + 1 || x.x === targetCell.number.x - 1)),
              );
          }
        }
        console.log("trap target reset after moving trap");
      } else {
        targetCell.obstacle.trap.state = false;
        console.log(`Obstacle trap disables because there is no appropriate target cell`);
      }
    } else {
      let cell;
      if (targetCell.obstacle.trap.item.subType === "crossbow") {
        cell = app.getCellFromDirection(3, targetCell.number, targetCell.obstacle.trap.direction);
      }
      if (targetCell.obstacle.trap.item.subType === "spear") {
        cell = app.getCellFromDirection(2, targetCell.number, targetCell.obstacle.trap.direction);
      }
      if (targetCell.obstacle.trap.item.subType === "sword") {
        cell = app.getCellFromDirection(1, targetCell.number, targetCell.obstacle.trap.direction);
      }
      if (!app.gridInfo.find((x) => cell.x === x.number.x && cell.y === x.number.y)) {
        targetCell.obstacle.trap.state = false;
        console.log(`obstacletrap disabled because there is no appropriate target cell`, data.number);
      } else {
        targetCell.obstacle.trap.target = cell;
        // console.log("trap target set", data.number, targetCell.obstacle.trap.target, targetCell.obstacle.trap.ammo);
      }
    }
  }

  // DAMAGE/DESTROY OBSTACLE?
  if (targetCell.obstacle.destructible.state === true && damage > 0) {
    // WEAPON CHECK
    if (targetCell.obstacle.hp - damage > 0) {
      let hp = targetCell.obstacle.hp - damage;

      targetCell.obstacle = {
        id: targetCell.obstacle.id,
        trap: targetCell.obstacle.trap,
        state: targetCell.obstacle.state,
        name: targetCell.obstacle.name,
        type: targetCell.obstacle.type,
        hp: hp,
        destructible: targetCell.obstacle.destructible,
        locked: targetCell.obstacle.locked,
        weight: targetCell.obstacle.weight,
        height: targetCell.obstacle.height,
        items: targetCell.obstacle.items,
        effects: targetCell.obstacle.effects,
        moving: targetCell.obstacle.moving,
      };
      app.obstacleBarrierToDestroy.push({
        type: "obstacle",
        action: "damage",
        count: 0,
        limit: 30,
        complete: false,
        cell: targetCell,
      });
    }

    // DESTROY OBSTACLE W/ OR W/O RUBBLE
    else if (targetCell.obstacle.hp - damage <= 0) {
      let itemsToDrop = [];
      if (targetCell.obstacle.destructible.leaveRubble === true && targetCell.rubble !== true) {
        // console.log('leave rubble on ',targetCell.number,'removing obstacle');
        if (targetCell.obstacle.items[0]) {
          itemsToDrop = targetCell.obstacle.items;
        }
        // let cellRef = app.gridInfo.find(elem => elem.number.x === targetCell.number.x && elem.number.y === targetCell.number.y);
        targetCell.rubble = true;
        // targetCell.terrain.type = 'hazard';

        targetCell.obstacle = {
          id: targetCell.obstacle.id,
          trap: targetCell.obstacle.trap,
          state: false,
          name: targetCell.obstacle.name,
          type: targetCell.obstacle.type,
          hp: 0,
          destructible: targetCell.obstacle.destructible,
          locked: targetCell.obstacle.locked,
          weight: targetCell.obstacle.weight,
          height: targetCell.obstacle.height,
          items: targetCell.obstacle.items,
          effects: targetCell.obstacle.effects,
          moving: targetCell.obstacle.moving,
        };

        app.players[player.number - 1].statusDisplay = {
          state: true,
          status: "Destroyed " + targetCell.obstacle.name + "!",
          count: 1,
          limit: app.players[player.number - 1].statusDisplay.limit,
        };

        if (!player.popups.find((x) => x.msg === "destroyedItem")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "destroyedItem",
            img: "",
          });
        }
      } else {
        // console.log('no rubble. Just remove obstacle');
        if (targetCell.obstacle.items[0]) {
          itemsToDrop = targetCell.obstacle.items;
        }

        targetCell.obstacle = {
          id: targetCell.obstacle.id,
          trap: targetCell.obstacle.trap,
          state: false,
          name: targetCell.obstacle.name,
          type: targetCell.obstacle.type,
          hp: 0,
          destructible: targetCell.obstacle.destructible,
          locked: targetCell.obstacle.locked,
          weight: targetCell.obstacle.weight,
          height: targetCell.obstacle.height,
          items: targetCell.obstacle.items,
          effects: targetCell.obstacle.effects,
          moving: targetCell.obstacle.moving,
        };

        app.players[player.number - 1].statusDisplay = {
          state: true,
          status: "Destroyed " + targetCell.obstacle.name + "!",
          count: 1,
          limit: app.players[player.number - 1].statusDisplay.limit,
        };

        if (!player.popups.find((x) => x.msg === "destroyedItem")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "destroyedItem",
            img: "",
          });
        }
      }

      // DROP OBSTACLE ITEMS?
      if (itemsToDrop[0]) {
        // console.log('dropping obstacle items bolt',itemsToDrop);

        app.obstacleItemDrop(targetCell, player);
      }
      app.obstacleBarrierToDestroy.push({
        type: "obstacle",
        action: "destroy",
        count: 0,
        limit: 30,
        complete: false,
        cell: targetCell,
      });
    }
  }

  // DESTROY ITEM?
  if (targetCell.item.name !== "") {
    targetCell.item = {
      name: "",
      type: "",
      subType: "",
      effect: "",
      initDrawn: false,
    };
  }
  if (targetCell.rubble === true) {
    targetCell.rubble = false;
  }
}
