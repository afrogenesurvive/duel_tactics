export function pushBack(app, player, hitByPlayerDirection) {
  const logPushBackInput = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("player.pushBack.input", message, data, { fn: "pushBack" });
    }
  };
  const logPushBackExec = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("player.pushBack.execution", message, data, { fn: "pushBack" });
    }
  };
  const logPushBackCount = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("player.pushBack.count", message, data, { fn: "pushBack" });
    }
  };
  const logPushBackHalf = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("player.pushBack.halfPushBack", message, data, { fn: "pushBack" });
    }
  };

  logPushBackInput("start", {
    playerId: player.number,
    direction: hitByPlayerDirection,
  });

  app.attackedCancel(player);

  let canPushBack = false;
  let halfPushBack = false;
  let halfPushBackType = "";
  let myCellBlock = false;
  let myCell = app.gridInfo.find((x) => x.number.x === player.currentPosition.cell.number.x && x.number.y === player.currentPosition.cell.number.y);

  player.pushBack.prePushMoveSpeed = player.speed.move;
  player.speed.move = 0.125;

  if (player.stamina.current - app.staminaCostRef.pushBack < 0) {
    player.stamina.current = 0;
  } else {
    player.stamina.current = player.stamina.current - app.staminaCostRef.pushBack;
  }

  let pushBackDirection = hitByPlayerDirection;
  player.strafing = {
    state: true,
    direction: pushBackDirection,
  };
  let target = app.getTarget(player);
  let targetCell = app.gridInfo.find((x) => x.number.x === target.cell1.number.x && x.number.y === target.cell1.number.y);

  if (myCell.barrier.state === true && myCell.barrier.position === pushBackDirection) {
    canPushBack = false;
    halfPushBack = true;
    myCellBlock = true;
    logPushBackInput("blockedByBarrier", {
      playerId: player.number,
      direction: pushBackDirection,
    });
  }

  if (target.cell1.free === false || myCellBlock === true) {
    // console.log('Pushback target is NOT free. Half push back?',myCellBlock);

    if (target.cell1.occupant.type === "obstacle") {
      canPushBack = false;
      halfPushBack = true;
      halfPushBackType = "obstacle";
    }

    if (target.cell1.occupant.type === "player") {
      canPushBack = false;
      halfPushBack = true;
      halfPushBackType = "player";
    }

    if (target.cell1.occupant.type === "higherElevation") {
      canPushBack = false;
      halfPushBack = true;
      halfPushBackType = "higherElevation";
    }

    if (myCellBlock === true || target.cell1.occupant.type === "barrier") {
      canPushBack = false;
      halfPushBack = true;
      halfPushBackType = "barrier";
    }

    player.pushBack.state = false;
    player.strafing = {
      state: false,
      direction: "",
    };
    logPushBackExec("blocked", {
      playerId: player.number,
      occupant: target.cell1.occupant.type,
    });
  } else {
    canPushBack = true;
  }

  if (player.target.cell1.free === true && canPushBack === true) {
    // console.log('proceed with pushback',player.number,'to',target.cell1.number);

    if (player.target.cell1.void === true) {
      // console.log('pushback target is VOID!!',target.cell1.center.x,target.cell1.center.y);
    }

    player.pushBack.state = true;
    player.action = "strafe moving";
    player.moving = {
      state: true,
      step: 0,
      course: "",
      origin: {
        number: player.currentPosition.cell.number,
        center: player.currentPosition.cell.center,
      },
      destination: target.cell1.center,
    };
    let nextPosition = app.lineCrementer(player);
    player.nextPosition = nextPosition;
    logPushBackExec("success", {
      playerId: player.number,
      destination: target.cell1.number,
    });

    logPushBackCount("move", {
      playerId: player.number,
      count: player?.pushBack?.count ?? 0,
    });

    if (!player.popups.find((x) => x.msg === "pushedBack")) {
      player.popups.push({
        state: false,
        count: 0,
        limit: 30,
        type: "",
        position: "",
        msg: "pushedBack",
        img: "",
      });
      if (app?.addEventLog) {
        app.addEventLog("P" + player.number + " pushed back", "combat");
      }
    }
  }

  if (halfPushBack === true) {
    let dir = pushBackDirection;

    app.unsetDeflection(player);

    player.success.deflected.predeflect = false;
    logPushBackHalf("start", {
      playerId: player.number,
      halfPushBackType,
      direction: dir,
    });
    app.startHalfPushBack("player", halfPushBackType, dir, player);
  }

  app.getTarget(player);

  app.players[player.number - 1] = player;
  return canPushBack;
}
