export function getCellFromDirection(app, range, originCellNumber, direction) {
  let cellNumber = {
    x: undefined,
    y: undefined,
  };

  switch (direction) {
    case "north":
      cellNumber = {
        x: originCellNumber.x,
        y: originCellNumber.y - range,
      };
      break;
    case "east":
      cellNumber = {
        x: originCellNumber.x + range,
        y: originCellNumber.y,
      };
      break;
    case "west":
      cellNumber = {
        x: originCellNumber.x - range,
        y: originCellNumber.y,
      };
      break;
    case "south":
      cellNumber = {
        x: originCellNumber.x,
        y: originCellNumber.y + range,
      };
      break;
    default:
      break;
  }

  return cellNumber;
}
