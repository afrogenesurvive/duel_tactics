function aiEvaluateCheckJumpDestination(app, plyr, destinationCell) {
  const logEval = (message, data = {}) => {
    app.globalLogger("ai.evaluate", message, { plyr_no: plyr.number, ...data }, { fn: "aiEvaluateCheckJumpDestination" });
  };

  const getCell = (x, y) => app.gridInfo.find((cell) => cell.number.x === x && cell.number.y === y);
  const checkJumpDestination = () => {
    const currentInstruction = plyr.ai.instructions?.[plyr.ai.currentInstruction];
    if (!currentInstruction || !currentInstruction.keyword || !currentInstruction.keyword.startsWith("jump_")) {
      return;
    }

    const dir = currentInstruction.keyword.split("_")[1];
    const offsets = {
      north: { x: 0, y: -1 },
      south: { x: 0, y: 1 },
      east: { x: 1, y: 0 },
      west: { x: -1, y: 0 },
    };
    const offset = offsets[dir];
    if (!offset) {
      return;
    }

    const originCell = getCell(plyr.currentPosition.cell.number.x, plyr.currentPosition.cell.number.y);
    const cell1 = getCell(plyr.currentPosition.cell.number.x + offset.x, plyr.currentPosition.cell.number.y + offset.y);
    const cell2 = getCell(plyr.currentPosition.cell.number.x + offset.x * 2, plyr.currentPosition.cell.number.y + offset.y * 2);

    if (!originCell || !cell1 || !cell2) {
      plyr.ai.resetInstructions = true;
      logEval("jumpDestInvalid", { dir: dir });
      return;
    }

    if (plyr.stamina.current < app.staminaCostRef.jump) {
      plyr.ai.resetInstructions = true;
      logEval("jumpNoStamina", { stamina: plyr.stamina.current });
      return;
    }

    const blockedByBarrier =
      (originCell.barrier.state === true && originCell.barrier.position === dir) ||
      (cell1.barrier.state === true && cell1.barrier.position === app.getOppositeDirection(dir)) ||
      (cell2.barrier.state === true && cell2.barrier.position === app.getOppositeDirection(dir));

    if (blockedByBarrier === true) {
      plyr.ai.resetInstructions = true;
      logEval("jumpDestBlockedBarrier", { dir: dir, cell2: cell2.number });
      return;
    }

    if (cell2.obstacle.state === true) {
      plyr.ai.resetInstructions = true;
      logEval("jumpDestBlockedObstacle", { dir: dir, cell2: cell2.number });
      return;
    }

    if (cell2.void.state === true || cell2.terrain.type === "deep") {
      plyr.ai.resetInstructions = true;
      logEval("jumpDestUnsafe", { dir: dir, cell2: cell2.number });
    }
  };

  return plyr;
}
