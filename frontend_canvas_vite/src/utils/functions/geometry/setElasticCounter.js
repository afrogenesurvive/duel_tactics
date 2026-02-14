export function setElasticCounter(app, type, subType, pause, player) {
  // console.log('setElasticCounter');

  if (type === "deflected") {
    let point = {
      x: player.currentPosition.cell.center.x,
      y: player.currentPosition.cell.center.y,
    };

    let countCalcPause = player.success.deflected.limit / 2;
    let countCalc = countCalcPause / 2;

    if (countCalc > 6) {
      countCalc = 6;
      countCalcPause = player.success.deflected.limit - 12;
    }

    player.elasticCounter = {
      state: true,
      direction: app.getOppositeDirection(player.direction),
      type: "deflected",
      subType: "",
      countUp: {
        state: false,
        count: 0,
        limit: countCalc,
      },
      countDown: {
        state: false,
        count: 0,
        limit: countCalc,
      },
      coords: {
        // x: point.x - app.playerDrawWidth / 2,
        // y: point.y - app.playerDrawHeight / 2,
        x: player.nextPosition.x - app.floorImageHeight / 2,
        y: player.nextPosition.y - app.floorImageHeight,
      },
      pause: {
        preState: pause,
        state: false,
        type: "peak",
        count: 0,
        limit: countCalcPause,
      },
    };
  }

  if (type === "dodging") {
    let point = {
      x: player.currentPosition.cell.center.x,
      y: player.currentPosition.cell.center.y,
    };

    let startMod = player.crits.dodge;
    let endMod = player.crits.dodge;
    if (player.crits.dodge > 5) {
      player.crits.dodge = 5;
    }
    if (player.dodging.peak.start - startMod < 2) {
      startMod = player.dodging.peak.start - 2;
    }
    if (player.dodging.peak.end + endMod > player.dodging.limit - 2) {
      endMod = player.dodging.limit - (2 + player.dodging.peak.end);
    }

    // console.log('count up: ',player.dodging.peak.start - startMod);
    // console.log('pause: ',(player.dodging.peak.end + endMod)-(player.dodging.peak.start - startMod));
    // console.log('count down',player.dodging.limit-(player.dodging.peak.end + endMod));
    // console.log('limit',player.dodging.limit);

    let countCalcPause = player.dodging.peak.end + endMod - (player.dodging.peak.start - startMod);
    let countCalcUp = player.dodging.peak.start - startMod;
    let countCalcDown = player.dodging.limit - (player.dodging.peak.end + endMod);

    // if (countCalc > 6) {
    //   countCalc = 6;
    //   countCalcPause = (player.success.deflected.limit-12);
    // }

    player.elasticCounter = {
      state: true,
      direction: player.dodging.direction,
      type: "dodging",
      subType: "",
      countUp: {
        state: false,
        count: 0,
        limit: countCalcUp,
      },
      countDown: {
        state: false,
        count: 0,
        limit: countCalcUp,
        // limit: countCalcDown,
      },
      coords: {
        // x: point.x - app.playerDrawWidth / 2,
        // y: point.y - app.playerDrawHeight / 2,
        x: player.nextPosition.x - app.floorImageHeight / 2,
        y: player.nextPosition.y - app.floorImageHeight,
      },
      pause: {
        preState: pause,
        state: false,
        type: "peak",
        count: 0,
        limit: countCalcPause,
      },
    };
  }

  if (type === "attacking") {
    let point = {
      x: player.currentPosition.cell.center.x,
      y: player.currentPosition.cell.center.y,
    };

    let countCalcUp = Math.floor((player.attacking.limit - player.attacking.count) / 2);
    // console.log("beep", countCalcUp);
    // if (countCalcUp > 10) {
    //   countCalcUp = 10;
    // }
    if (subType === "windup") {
      let dirInputThresh = Math.ceil(player[type].animRef.peak.unarmed.thrust.normal / 2);
      countCalcUp = Math.floor(dirInputThresh / 2);
    }

    let direction = player.attacking.direction;
    if (direction === "none") {
      direction = player.direction;
    }

    player.elasticCounter = {
      state: true,
      direction: direction,
      type: "attacking",
      subType: subType,
      countUp: {
        state: false,
        count: 0,
        limit: countCalcUp,
      },
      countDown: {
        state: false,
        count: 0,
        limit: countCalcUp,
      },
      coords: {
        // x: point.x - app.playerDrawWidth / 2,
        // y: point.y - app.playerDrawHeight / 2,
        x: player.nextPosition.x - app.floorImageHeight / 2,
        y: player.nextPosition.y - app.floorImageHeight,
      },
      pause: {
        preState: pause,
        state: false,
        type: "",
        count: 0,
        limit: 0,
      },
    };
  }

  if (type === "defending") {
    let direction = player.defending.direction;

    if (subType === "windup") {
      let countCalcUp = Math.floor((player.defending.peakCount - player.defending.count) / 2);
      // Math.floor(
      //   (player.defending.limit - player.defending.peakCount) / 2
      // );

      if (direction === "none") {
        direction = player.direction;
      }

      player.elasticCounter = {
        state: true,
        direction: direction,
        type: "defending",
        subType: subType,
        countUp: {
          state: false,
          count: 0,
          limit: countCalcUp,
        },
        countDown: {
          state: false,
          count: 0,
          limit: countCalcUp,
        },
        coords: {
          // x: point.x - app.playerDrawWidth / 2,
          // y: point.y - app.playerDrawHeight / 2,
          x: player.nextPosition.x - app.floorImageHeight / 2,
          y: player.nextPosition.y - app.floorImageHeight,
        },
        pause: {
          preState: pause,
          state: false,
          type: "",
          count: 0,
          limit: 0,
        },
      };
    }
    if (subType === "peak") {
      let point = {
        x: player.currentPosition.cell.center.x,
        y: player.currentPosition.cell.center.y,
      };

      let countCalcUp = Math.floor((player.defending.limit - player.defending.peakCount) / 2);
      // let countCalcUp = Math.floor(
      //   (player.defending.limit - (defendPeak + player.defending.decay.limit)) / 2
      // );
      // console.log("beep", countCalcUp);
      // if (countCalcUp > 10) {
      //   countCalcUp = 10;
      // }

      if (direction === "none") {
        direction = player.direction;
      }

      player.elasticCounter = {
        state: true,
        direction: direction,
        type: "defending",
        subType: subType,
        countUp: {
          state: false,
          count: 0,
          limit: countCalcUp,
        },
        countDown: {
          state: false,
          count: 0,
          limit: countCalcUp,
        },
        coords: {
          // x: point.x - app.playerDrawWidth / 2,
          // y: point.y - app.playerDrawHeight / 2,
          x: player.nextPosition.x - app.floorImageHeight / 2,
          y: player.nextPosition.y - app.floorImageHeight,
        },
        pause: {
          preState: pause,
          state: false,
          type: "",
          count: 0,
          limit: 0,
        },
      };
    }

    if (subType === "decay") {
      let remainder = player.defending.limit - (player.defending.peakCount + player.defending.decay.count);

      if (direction === "none") {
        direction = player.direction;
      }
      if (player.elasticCounter.direction !== direction) {
        let countCalcDown;
        let countCalcUp = Math.floor(remainder / 2);
        if (player.elasticCounter.direction === app.getOppositeDirection(direction)) {
          // console.log("opposite direction!!");
          countCalcUp = Math.floor(remainder * 0.75); //0.66
          countCalcDown = Math.floor(remainder * 0.25); //0.33
        } else {
          countCalcDown = countCalcUp;
        }

        player.elasticCounter.direction = direction;
        player.elasticCounter.subType = subType;

        // console.log(
        //   "count",
        //   player.defending.count,
        //   "limit",
        //   player.defending.limit,
        //   "remainder",
        //   remainder,
        //   "calc up/dwn",
        //   countCalcUp,
        //   countCalcDown,
        //   "dir",
        //   player.elasticCounter.direction
        // );
        player.elasticCounter.countUp.limit = countCalcUp;
        player.elasticCounter.countDown.limit = countCalcDown;
        player.elasticCounter.countUp.count = 0;
        player.elasticCounter.countDown.count = 0;
        if (player.elasticCounter.countDown.state === true) {
          player.elasticCounter.countUp.state = true;
          player.elasticCounter.countDown.state = false;
        }
      }
    }
  }

  if (type === "test") {
    player.elasticCounter = {
      state: true,
      direction: player.direction,
      type: "attacking",
      subType: "",
      countUp: {
        state: false,
        count: 0,
        limit: 15,
      },
      countDown: {
        state: false,
        count: 0,
        limit: 15,
      },
      coords: {
        x: player.nextPosition.x - app.floorImageHeight / 2,
        y: player.nextPosition.y - app.floorImageHeight,
      },
      pause: {
        preState: pause,
        state: false,
        type: subType, //start, peak, end
        count: 0,
        limit: 0,
      },
    };
  }

  return player;
  // console.log("player elasticCounter set", player.elasticCounter);
}
