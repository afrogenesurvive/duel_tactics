export function checkForwardBarrier(app, direction, cell) {
  let fwdBarrier = false;
  if (cell.barrier.state === true) {
    if (direction === app.getOppositeDirection(cell.barrier.position)) {
      fwdBarrier = true;
    }
  }
  return fwdBarrier;
}
