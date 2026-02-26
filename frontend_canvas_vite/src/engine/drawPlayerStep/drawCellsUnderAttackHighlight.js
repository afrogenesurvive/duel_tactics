export function drawCellsUnderAttackHighlight(app, x, y, floor) {
  // CELLS UNDER ATTACK & PREATTACK!!
  if (app.cellsUnderAttack.length > 0) {
    for (const cll of app.cellsUnderAttack) {
      if (cll.number.x === x && cll.number.y === y) {
        floor = app.floorAttackRef.current;
      }
    }
  }
  if (app.cellsUnderPreAttack.length > 0) {
    for (const cll2 of app.cellsUnderPreAttack) {
      if (cll2.number.x === x && cll2.number.y === y) {
        floor = app.floorAttack2Ref.current;
      }
    }
  }
  // CELLS TO HIGHLIGHT
  if (app.cellsToHighlight.length > 0) {
    for (const cll2 of app.cellsToHighlight) {
      if (cll2.x === x && cll2.y === y) {
        floor = app.floorVoidRef.current;
      }
    }
  }
  // CELLS TO HIGHLIGHT V2!!
  if (app.cellsToHighlight2.length > 0) {
    for (const cll3 of app.cellsToHighlight2) {
      if (cll3.number.x === x && cll3.number.y === y) {
        floor = app.floorHighlightRef.current;
      }
    }
  }
}
