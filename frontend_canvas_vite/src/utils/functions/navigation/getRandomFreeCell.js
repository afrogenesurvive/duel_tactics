export function getRandomFreeCell(app) {
  let cell = {
    number: { x: undefined, y: undefined },
    center: { x: undefined, y: undefined },
  };
  let randomFreeCellChosen = false;
  let noMoreCells = false;
  let trashCells = [];

  while (randomFreeCellChosen !== true) {
    cell.number.x = app.rnJesus(0, app.gridWidth);
    cell.number.y = app.rnJesus(0, app.gridWidth);
    randomFreeCellChosen = app.checkCell(cell.number, ["all"]);

    if (randomFreeCellChosen !== true) {
      // console.log('getRandomFreeCell: not free',cell.number);
      trashCells.push(cell);
      if (
        trashCells.length +
          app.gridInfo.filter(
            (x) =>
              x.obstacle.state === true ||
              x.terrain.type === "deep" ||
              // x.terrain.type === "void" ||
              x.void.state === true,
          ).length +
          app.playerNumber >=
        app.gridInfo.length
      ) {
        // console.log('getRandomFreeCell. no more cells!');
        noMoreCells = true;
        // randomFreeCellChosen = true
        cell = {
          number: { x: undefined, y: undefined },
          center: { x: undefined, y: undefined },
        };
        break;
      }
    }
    if (randomFreeCellChosen === true) {
      // console.log('getRandomFreeCell: free cell',cell.number);

      break;
    }
  }

  if (noMoreCells === true) {
    // console.log('no more cells 2');
    return null;
  }

  if (randomFreeCellChosen === true) {
    // console.log('getRandomFreeCell: set free cell',cell.number);
    let refCell = app.gridInfo.find((x) => x.number.x === cell.number.x && x.number.y === cell.number.y);
    cell.number = refCell.number;
    cell.center = refCell.center;
    return cell;
  }
}
