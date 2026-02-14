export function closeCellInfoBox(app) {
  app.cellInfoMouseOver = false;
  app.showCellInfoBox = !app.showCellInfoBox;
  if (app.mouseOverCellSwitchOff.state === true) {
    app.mouseOverCellSwitchOff.state = false;
  }

  if (app.mouseOverCell.cell && app.mouseOverCell.state !== true) {
    // app.mouseOverCell.cell = {
    //   state: false,
    //   cell: undefined,
    //   count: 0,
    //   threshold: app.mouseOverCell.threshold,
    // };
  }
}
