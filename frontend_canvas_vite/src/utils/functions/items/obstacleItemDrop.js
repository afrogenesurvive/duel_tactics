export function obstacleItemDrop(app, targetCell, player) {
  const logDrop = (message, data = {}) => {
    if (app?.globalLogger) {
      app.globalLogger("items.drop", message, data, { fn: "obstacleItemDrop" });
    }
  };
  // console.log("obstacleItemDrop");

  let itemCount = targetCell.obstacle.items.length;
  let itemCount2 = itemCount;
  let availibleCells = [];
  let baseDirs = ["south", "west", "north", "east"];
  let multiple = 1;
  let baseDirIndx = 0;
  let refPos = {
    x: targetCell.number.x,
    y: targetCell.number.y,
  };
  let cellToCheck = {
    x: undefined,
    y: undefined,
  };
  let instructions = [];
  let instructionRef = {
    north: {
      x: 0,
      y: -1,
    },
    south: {
      x: 0,
      y: 1,
    },
    east: {
      x: 1,
      y: 0,
    },
    west: {
      x: -1,
      y: 0,
    },
  };
  let stepsA = 0;
  let stepsB = 0;

  while (availibleCells.length < itemCount) {
    for (let i = 0; i < multiple; i++) {
      instructions.push(baseDirs[baseDirIndx]);
      // console.log('set instructions baseDirIndx',baseDirIndx,'multiple',multiple,'baseDir',baseDirs[baseDirIndx]);
    }
    // console.log('item drop instructions',instructions);

    for (const instruct of instructions) {
      cellToCheck = {
        x: refPos.x + instructionRef[instruct].x,
        y: refPos.y + instructionRef[instruct].y,
      };
      // console.log('ctc instruct ',instruct,instructionRef[instruct],'cell to check',cellToCheck,'steps',stepsA,stepsB);

      let ctcRef = app.gridInfo.find((x) => x.number.x === cellToCheck.x && x.number.y === cellToCheck.y);

      let cellFree = true;

      // if (
      //   ctcRef.number.x < 0 ||
      //   ctcRef.number.x > app.gridWidth-1 ||
      //   ctcRef.number.y < 0 ||
      //   ctcRef.number.y > app.gridWidth-1
      // ) {
      //   cellFree = false;
      // }
      if (ctcRef) {
        if (
          ctcRef.obstacle.state === true ||
          ctcRef.void.state === true ||
          ctcRef.terrain.type === "deep" ||
          ctcRef.terrain.name === "lava" ||
          ctcRef.item.name !== "" ||
          ctcRef.rubble === true
        ) {
          cellFree = false;
        }

        for (const plyr of app.players) {
          if (plyr.currentPosition.cell.number.x === ctcRef.number.x && plyr.currentPosition.cell.number.y === ctcRef.number.y) {
            cellFree = false;
          }
        }
      } else {
        cellFree = false;
      }

      if (cellFree === true) {
        itemCount2--;
        availibleCells.push(cellToCheck);
        // console.log('cell free',cellToCheck,'item count1',itemCount,'item count2',itemCount2,'availibleCells',availibleCells.length,'steps',stepsA,stepsB);
        // console.log('availibleCells',availibleCells.length,availibleCells);
      } else {
        // console.log('cell not free',cellToCheck,'availibleCells',availibleCells.length,'steps',stepsA,stepsB);
        // console.log('availibleCells',availibleCells.length,availibleCells);
      }
      refPos = {
        x: cellToCheck.x,
        y: cellToCheck.y,
      };
      stepsA++;
      stepsB++;

      if (availibleCells.length === itemCount) {
        break;
      }
    }

    instructions = [];

    // if (steps%2 === 0) {
    //   stepsA = 0;
    //   multiple++;
    // }
    if (stepsB === multiple * 2) {
      multiple++;
      stepsB = 0;
    }
    if (baseDirIndx >= 3) {
      // console.log('a');
      baseDirIndx = 0;
    } else {
      baseDirIndx++;
    }
  }

  if (availibleCells.length === itemCount) {
    // console.log('break loop. have free cell for each item');
    for (const cell of availibleCells) {
      let indx = availibleCells.indexOf(cell);
      let item = targetCell.obstacle.items[indx];
      app.gridInfo.find((x) => x.number.x === cell.x && x.number.y === cell.y).item = item;

      logDrop("placed", {
        origin: targetCell.number,
        cell,
        itemName: item.name,
        itemType: item.type,
      });

      app.cellsToHighlight2.push({
        number: {
          x: cell.x,
          y: cell.y,
        },
        count: 0,
        limit: 50,
      });

      app.obstacleItemsToDrop.push({
        origin: targetCell.number,
        target: cell,
        item: item,
        state: true,
        count: 0,
        limit: 30,
        position: {
          x: undefined,
          y: undefined,
        },
      });
    }
  }
}
