export function checkCellMouseOver(app) {
  if (app.mouseOverCell.cell && app.mouseOverCell.state === false && app.mouseMoving !== true) {
    if (app.mouseOverCell.count < app.mouseOverCell.threshold) {
      app.mouseOverCell.count++;
      // console.log('mouse not moving but moused over cell is counting',app.mouseOverCell.count);
    }
    if (app.mouseOverCell.count >= app.mouseOverCell.threshold) {
      app.mouseOverCell.count = 0;
      app.mouseOverCell.state = true;
      app.clicked.cell = app.mouseOverCell.cell;
      let plyrPresent = false;
      for (const plyr of app.players) {
        if (
          plyr.currentPosition.cell.number.x === app.mouseOverCell.cell.number.x &&
          plyr.currentPosition.cell.number.y === app.mouseOverCell.cell.number.y
        ) {
          app.clicked.player = plyr;
          plyrPresent = true;
        }
      }
      if (plyrPresent !== true) {
        app.clicked.player = undefined;
      }
      app.showCellInfoBox = true;
    }
  }
  // SWITCH OFF ATER TIME IF MOUSE MOVED OUT OF GRID
  if (app.mouseOverCellSwitchOff.state === true) {
    if (app.mouseOverCellSwitchOff.count < app.mouseOverCellSwitchOff.limit) {
      app.mouseOverCellSwitchOff.count++;
    }
    if (app.mouseOverCellSwitchOff.count >= app.mouseOverCellSwitchOff.limit) {
      app.mouseOverCellSwitchOff = {
        state: false,
        count: 0,
        limit: app.mouseOverCellSwitchOff.limit,
      };
      app.showCellInfoBox = false;
      app.mouseOverCell = {
        state: false,
        cell: undefined,
        count: 0,
        threshold: app.mouseOverCell.threshold,
      };
    }
  }
}
