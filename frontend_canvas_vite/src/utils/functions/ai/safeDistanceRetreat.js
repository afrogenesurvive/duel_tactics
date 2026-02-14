export function safeDistanceRetreat(app, plyr, cell) {
  let isSafeDistance = false;
  let safeRetreatDistance = 2;
  if (
    cell.x <= plyr.currentPosition.cell.number.x + safeRetreatDistance ||
    cell.x >= plyr.currentPosition.cell.number.x - safeRetreatDistance ||
    cell.y <= plyr.currentPosition.cell.number.y + safeRetreatDistance ||
    cell.y >= plyr.currentPosition.cell.number.y - safeRetreatDistance
  ) {
    isSafeDistance = false;
  } else {
    isSafeDistance = true;
  }
  return isSafeDistance;
}
