export function checkMyCellBarrier(app, direction, myCell) {
  let myCellBarrier = false;
  if (myCell.barrier.state === true) {
    if (myCell.barrier.position === direction) {
      myCellBarrier = true;
    }
  }

  return myCellBarrier;
}
