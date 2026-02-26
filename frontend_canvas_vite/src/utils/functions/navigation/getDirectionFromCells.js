export function getDirectionFromCells(app, cell1Number, cell2Number) {
  // console.log(`getDirectionFromCells cell1Number ${cell1Number?.x},${cell1Number?.y} cell2Number ${cell2Number?.x},${cell2Number?.y}`);

  let direction = "";

  if (cell2Number.x === cell1Number.x && cell2Number.y === cell1Number.y - 1) {
    direction = "north";
  }
  if (cell2Number.x === cell1Number.x - 1 && cell2Number.y === cell1Number.y - 1) {
    direction = "northWest";
  }
  if (cell2Number.x === cell1Number.x - 1 && cell2Number.y === cell1Number.y) {
    direction = "west";
  }
  if (cell2Number.x === cell1Number.x - 1 && cell2Number.y === cell1Number.y + 1) {
    direction = "southWest";
  }
  if (cell2Number.x === cell1Number.x && cell2Number.y === cell1Number.y + 1) {
    direction = "south";
  }
  if (cell2Number.x === cell1Number.x + 1 && cell2Number.y === cell1Number.y + 1) {
    direction = "southEast";
  }
  if (cell2Number.x === cell1Number.x + 1 && cell2Number.y === cell1Number.y) {
    direction = "east";
  }
  if (cell2Number.x === cell1Number.x + 1 && cell2Number.y === cell1Number.y - 1) {
    direction = "northEast";
  }
  if (direction === "") {
    if (cell1Number.x === cell2Number.x && cell1Number.y > cell2Number.y) {
      direction = "north";
    }
    if (cell1Number.x === cell2Number.x && cell1Number.y < cell2Number.y) {
      direction = "south";
    }
    if (cell1Number.x > cell2Number.x && cell2Number.y === cell1Number.y) {
      direction = "west";
    }
    if (cell1Number.x < cell2Number.x && cell1Number.y === cell2Number.y) {
      direction = "east";
    }
  }

  return direction;
}
