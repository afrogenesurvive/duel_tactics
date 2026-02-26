export function checkCell(app, cell, include) {
  // console.log('check cell',cell);
  // include = ["void", "deep", "hazard", "all"];

  let cellFree = true;
  let cell2 = app.gridInfo.find((elem) => elem.number.x === cell.x && elem.number.y === cell.y);
  if (
    // cell2.levelData.charAt(0) ===  'z' ||
    // cell2.levelData.charAt(0) ===  'y'
    cell2.obstacle.state === true
  ) {
    cellFree = false;
  }
  if (cell2.item.name !== "") {
    cellFree = false;
  }
  if (include.includes("void")) {
    if (cell2.void.state === true || cell2.terrain.type === "void") {
      cellFree = false;
    }
  }
  if (include.includes("deep")) {
    if (cell2.terrain.type === "deep") {
      cellFree = false;
    }
  }
  if (include.includes("hazard")) {
    if (cell2.terrain.type === "hazard") {
      cellFree = false;
    }
  }
  if (include.includes("all")) {
    if (cell2.void.state === true || cell2.terrain.type === "void" || cell2.terrain.type === "deep" || cell2.terrain.type === "hazard") {
      cellFree = false;
    }
  }

  // PLAYERS 1&2 ALT RESPAWN POINTS!
  if (app.gridWidth > 6) {
    if (cell.x === app.gridWidth && cell.y === app.gridWidth) {
      cellFree = false;
    }
    if (cell.x === app.gridWidth && cell.y === 0) {
      cellFree = false;
    }
  }

  for (const player of app.players) {
    if (app.init === true) {
      if (player.startPosition.cell.number.x === cell.x && player.startPosition.cell.number.y === cell.y) {
        cellFree = false;
      }
    } else {
      if (player.currentPosition.cell.number.x === cell.x && player.currentPosition.cell.number.y === cell.y) {
        cellFree = false;
      }
    }
  }

  return cellFree;
}
