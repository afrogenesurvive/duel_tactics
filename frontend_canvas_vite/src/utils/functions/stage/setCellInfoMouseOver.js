export function setCellInfoMouseOver(app, state, origin) {
  // console.log("setCellInfoMouseOver", state, origin);

  app.cellInfoMouseOver = state;
  if (state === true) {
    app.showCellInfoBox = true;
    if (app.mouseOverCellSwitchOff.state === true) {
      app.mouseOverCellSwitchOff.state = false;
    }
    if (app.mouseOverCell.cell && app.mouseOverCell.state !== true) {
      app.mouseOverCell = {
        state: false,
        cell: undefined,
        count: 0,
        threshold: app.mouseOverCell.threshold,
      };
    }
  } else {
  }
}
