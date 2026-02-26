export function startHalfPushBack(app, object, blockType, direction, data) {
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
    } else {
      console.log("player already being 1/2 pushed back!!");
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
    } else {
      console.log("obsatcle already being 1/2 pushed back!!");
    }
    // console.log("app.halfPushBackObstacles", app.halfPushBackObstacles);
  }
}
