export function startHalfPushBack(app, object, blockType, direction, data) {
  const logHalf = (message, data2 = {}) => {
    if (app?.globalLogger) {
      const type = object === "player" ? "player.pushBack.halfPushBack" : "obstacle.halfPushBack";
      app.globalLogger(type, message, data2, { fn: "startHalfPushBack" });
    }
  };
  // console.log('startHalfPushback',object,blockType,direction);

  if (object === "player") {
    if (data.halfPushBack !== true) {
      let point = {
        x: data.currentPosition.cell.center.x,
        y: data.currentPosition.cell.center.y,
      };

      data.halfPushBack = {
        state: true,
        direction: direction,
        type: blockType,
        countUp: {
          state: true,
          count: 0,
          limit: 6,
        },
        countDown: {
          state: false,
          count: 0,
          limit: 6,
        },
        coords: {
          // x: point.x - app.playerDrawWidth / 2,
          // y: point.y - app.playerDrawHeight / 2,
          x: data.nextPosition.x - app.floorImageHeight / 2,
          y: data.nextPosition.y - app.floorImageHeight,
        },
      };

      app.players[data.number - 1] = data;
      logHalf("start", {
        object,
        blockType,
        direction,
        playerId: data.number,
      });
    } else {
      logHalf("blocked", {
        object,
        reason: "player already being 1/2 pushed back",
        playerId: data.number,
      });
    }
  }

  if (object === "obstacle") {
    // if (app.halfPushBackObstacles.find((x) => x.state !== true && x.myCellNo !== data.number)) {
    if (!app.halfPushBackObstacles.find((x) => x.state === true && x.myCellNo === data.number)) {
      app.halfPushBackObstacles.push({
        state: true,
        myCellNo: data.number,
        blockCellNo: app.getCellFromDirection(1, data.number, direction),
        blockType: blockType,
        direction: direction,
        obstacle: data.obstacle,
        countUp: {
          state: true,
          count: 0,
          limit: 10,
        },
        countDown: {
          state: false,
          count: 0,
          limit: 10,
        },
        coords: {
          x: undefined,
          y: undefined,
        },
      });
      logHalf("start", {
        object,
        blockType,
        direction,
        myCellNo: data.number,
      });
    } else {
      logHalf("blocked", {
        object,
        reason: "obstacle already being 1/2 pushed back",
        myCellNo: data.number,
      });
    }
    // console.log("app.halfPushBackObstacles", app.halfPushBackObstacles);
  }
}
