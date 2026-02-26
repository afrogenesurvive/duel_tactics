export function isBoltInCell(app, cellNumber) {
  let bolt = false;
  for (const bolt2 of app.projectiles) {
    if (cellNumber.x === bolt2.currentPosition.number.x && cellNumber.y === bolt2.currentPosition.number.y) {
      bolt = true;
    }
  }

  return bolt;
}
