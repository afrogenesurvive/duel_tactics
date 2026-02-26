export function plyrStartPosCheckCell(app, cell) {
  let cellFree = true;
  let cell2 = app.gridInfo.find(
    (elem) => elem.number.x === cell.x && elem.number.y === cell.y,
  );
  // if (
  //   cell2.levelData.charAt(0) ===  'z' ||
  //   cell2.levelData.charAt(0) ===  'y'
  // ) {
  //   cellFree = false;
  // }
  // if (cell2.item.name !== '') {
  //   cellFree = false;
  // }
  // if (
  //   cell2.terrain.type === 'deep' ||
  //   cell2.terrain.type === 'hazard'
  // ) {
  //   cellFree = false;
  // }

  if (
    cell2.obstacle.state === true ||
    // cell2.barrier.state === true ||
    cell2.item.name !== "" ||
    cell2.terrain.type === "deep" ||
    cell2.terrain.type === "hazard"
  ) {
    cellFree = false;
  }

  // PLAYERS 1&2 ALT RESPAWN POINTS!
  if (cell.x === app.gridWidth && cell.y === app.gridWidth) {
    cellFree = false;
  }
  if (cell.x === app.gridWidth && cell.y === 0) {
    cellFree = false;
  }

  return cellFree;
}
