export function customCellToVoid(app, cell) {
  console.log("void specific cell");

  app.cellToVoid.state = true;
  app.cellToVoid.x = cell.x;
  app.cellToVoid.y = cell.y;
  app.cellToVoid.count = 1;

  app.openVoid = true;
  app.voidCustomCell = true;
}
