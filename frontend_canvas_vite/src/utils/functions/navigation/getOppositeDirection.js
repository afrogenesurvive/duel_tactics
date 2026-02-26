export function getOppositeDirection(app, originalDirection) {
  let oppositeDirection = "";
  switch (originalDirection) {
    case "north":
      oppositeDirection = "south";
      break;
    case "south":
      oppositeDirection = "north";
      break;
    case "east":
      oppositeDirection = "west";
      break;
    case "west":
      oppositeDirection = "east";
      break;
    default:
  }
  return oppositeDirection;
}
