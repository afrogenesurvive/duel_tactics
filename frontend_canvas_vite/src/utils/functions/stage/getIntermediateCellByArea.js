export function getIntermediateCellByArea(app, pathCoords) {
  let playerOneCell = pathCoords[0];
  let playerTwoCell = pathCoords[pathCoords.length - 1];
  let xPath = {
    start: playerOneCell,
    end: {
      x: playerTwoCell.x,
      y: playerOneCell.y,
    },
  };
  let xMidpoint = {
    // x: Math.floor((Math.abs(xPath.start.x - xPath.end.x) + 1) / 2),
    x: Math.floor((xPath.start.x + xPath.end.x) / 2),
    y: xPath.start.y,
  };
  let yPath = {
    start: playerOneCell,
    end: {
      x: playerOneCell.x,
      y: playerTwoCell.y,
    },
  };
  let yMidpoint = {
    x: yPath.start.x,
    // y: Math.floor((Math.abs(yPath.start.y - yPath.end.y) + 1) / 2),
    y: Math.floor((yPath.start.y + yPath.end.y) / 2),
  };
  let finalCell = {
    x: xMidpoint.x,
    y: yMidpoint.y,
  };

  return {
    x: finalCell.x,
    y: finalCell.y,
  };
}
