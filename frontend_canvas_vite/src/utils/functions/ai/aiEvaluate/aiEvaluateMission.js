export function aiEvaluateMission(app, plyr) {
  const logEval = (message, data = {}) => {
    app.globalLogger("ai.evaluate", message, { plyr_no: plyr.number, ...data }, { fn: "aiEvaluateMission" });
  };

  // if (plyr.ai.mission === 'retrieve' && plyr.ai.retrieving.state !== true) {
  if (plyr.ai.mission === "retrieve") {
    // console.log('retrieve @  ai evaluate', plyr.ai.retrieving);

    let targetSafeData = app.scanTargetAreaThreat({
      player: plyr.number,
      point: {
        x: plyr.ai.retrieving.point.x,
        y: plyr.ai.retrieving.point.y,
      },
      range: 3,
    });

    plyr.ai.retrieving.safe = targetSafeData.isSafe;

    if (targetSafeData.isSafe !== true) {
      // console.log('target area is under threat');
      if (plyr.ai.mode === "aggressive") {
        // console.log('threats',targetSafeData.threats);
        plyr.ai.mission = "pursue";

        if (!plyr.popups.find((x) => x.msg === "missionPursue")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionPursue",
            img: "",
          });
        }
        if (!plyr.popups.find((x) => x.msg === "aggressiveMode")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "aggressiveMode",
            img: "",
          });
        }

        for (const threat of targetSafeData.threats) {
          logEval("retrieveThreat", { threat: threat });
          if (threat.distVal === 0) {
            logEval("retrieveThreats", { threats: targetSafeData.threats });

            plyr.ai.targetSet = true;
            plyr.ai.targetAquired = false;
            let threat2 = app.players[threat.player - 1];
            plyr.ai.targetPlayer = {
              number: 1,
              currentPosition: {
                x: threat2.currentPosition.cell.number.x,
                y: threat2.currentPosition.cell.number.y,
              },
              target: {
                number1: {
                  x: threat2.target.cell1.x,
                  y: threat2.target.cell1.y,
                },
                number2: {
                  x: threat2.target.cell2.x,
                  y: threat2.target.cell2.y,
                },
              },
              action: threat.action,
            };
          }
        }
      }
      if (plyr.ai.mode === "careful" && plyr.ai.retrieving.checkin === "enroute") {
        logEval("retrieveEnrouteRetreat");

        if (!plyr.popups.find((x) => x.msg === "passiveMode")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "passiveMode",
            img: "",
          });
        }

        plyr.ai.mission = "retreat";

        if (!plyr.popups.find((x) => x.msg === "missionRetreat")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionRetreat",
            img: "",
          });
        }
      }
    } else {
      // console.log('target area clear. proceed w/ retrieval');
      plyr.ai.retrieving.safe = true;
    }

    if (plyr.ai.retrieving.checkin === "complete") {
      plyr.ai.mission = plyr.ai.primaryMission;
      app.aiResetRanges(plyr);

      if (!plyr.popups.find((x) => x.msg === "missionComplete")) {
        plyr.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "missionComplete",
          img: "",
        });
      }

      // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
      //   plyr.popups.push(
      //     {
      //       state: false,
      //       count: 0,
      //       limit: 30,
      //       type: '',
      //       position: '',
      //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
      //       img: '',
      //
      //     }
      //   )
      // }

      plyr.ai.retrieving.checkin = undefined;
      plyr.ai.retrieving.safe = false;
      plyr.ai.targetAcquired = false;
      // console.log('retrieval complete. revert mission',plyr.ai.mission,plyr.ai.targetSet,plyr.ai.targetPlayer.currentPosition,plyr.ai.targetAcquired,plyr.ai.targetPlayer);

      let itemRetrieved;

      if (plyr.ai.retrieving.targetItem.type !== "item") {
        if (plyr.ai.retrieving.targetItem.type === "weapon") {
          if (plyr.currentWeapon.name === plyr.ai.retrieving.targetItem.name) {
            itemRetrieved = true;
          }
          for (const item of plyr.items.weapons) {
            if (item.name === plyr.ai.retrieving.targetItem.name) {
              itemRetrieved = true;
              plyr.currentWeapon = {
                name: plyr.ai.retrieving.targetItem.name,
                type: plyr.ai.retrieving.targetItem.subType,
                effect: plyr.ai.retrieving.targetItem.effect,
              };
            }
          }
        }
        if (plyr.ai.retrieving.targetItem.type === "armor") {
          if (plyr.currentArmor.name === plyr.ai.retrieving.targetItem.name) {
            itemRetrieved = true;
          }
          for (const item of plyr.items.armor) {
            if (item.name === plyr.ai.retrieving.targetItem.name) {
              itemRetrieved = true;
              plyr.currentArmor = {
                name: plyr.ai.retrieving.targetItem.name,
                type: plyr.ai.retrieving.targetItem.subType,
                effect: plyr.ai.retrieving.targetItem.effect,
              };
            }
          }
        }
      }

      if (itemRetrieved === true) {
        plyr.ai.retrieving = {
          checkin: undefined,
          state: false,
          point: { x: undefined, y: undefined },
          targetItem: {
            name: "",
            type: "",
            subType: "",
            effect: "",
          },
          safe: false,
        };
      }

      if (plyr.ai.organizing.dropped.state === true) {
        plyr.ai.organizing.dropped.state = false;
      }
    }

    if (plyr.ai.retrieving.checkin === "abort") {
      plyr.ai.retrieving = {
        checkin: undefined,
        state: false,
        point: { x: undefined, y: undefined },
        targetItem: {
          name: "",
          type: "",
          subType: "",
          effect: "",
        },
        safe: false,
      };
    }
  }

  if (plyr.ai.mission === "retreat") {
    // console.log('retreating @ ai evaluate');

    if (!plyr.ai.retreating.checkin) {
      let isSafeDistance = false;

      let cell = { x: 0, y: 0 };
      let checkCell = false;
      let safeTarget = false;
      while (checkCell === false && safeTarget !== true && isSafeDistance !== true) {
        cell.x = app.rnJesus(0, app.gridWidth);
        cell.y = app.rnJesus(0, app.gridWidth);
        checkCell = app.checkCell(cell, ["all"]);
        safeTarget = app.scanTargetAreaThreat({
          player: plyr.number,
          point: {
            x: cell.x,
            y: cell.y,
          },
          range: 3,
        }).isSafe;
        isSafeDistance = app.safeDistanceRetreat(plyr, cell);
      }

      if (checkCell === true && safeTarget === true && isSafeDistance !== true) {
        plyr.ai.retreating.point = cell;
        plyr.ai.retreating.safe = safeTarget;
        logEval("retreatLocationFound", { point: cell });
      }
    }

    if (plyr.ai.retreating.checkin && plyr.ai.retreating.state !== true) {
      let targetSafeData = app.scanTargetAreaThreat({
        player: plyr.number,
        point: {
          x: plyr.ai.retreating.point.x,
          y: plyr.ai.retreating.point.y,
        },
        range: 3,
      });

      plyr.ai.retrieving.safe = targetSafeData.isSafe;

      if (targetSafeData.isSafe !== true) {
        logEval("retreatTargetUnsafe");
        plyr.ai.retreating.checkin = undefined;
        plyr.ai.retreating.safe = false;
      }

      if (plyr.ai.retreating.checkin === "complete") {
        plyr.ai.retreating.checkin = undefined;
        plyr.ai.retreating.safe = false;
        plyr.ai.mission = plyr.ai.primaryMission;
        app.aiResetRanges(plyr);

        switch (plyr.ai.primaryMission) {
          case "defend":
            plyr.ai.defending.checkin = undefined;
            break;
          case "patrol":
            plyr.ai.patrolling.checkin = undefined;
            break;
          default:
        }

        // console.log('gg',plyr.ai.targetPlayer);

        if (!plyr.popups.find((x) => x.msg === "missionComplete")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionComplete",
            img: "",
          });
        }

        // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
        //   plyr.popups.push(
        //     {
        //       state: false,
        //       count: 0,
        //       limit: 30,
        //       type: '',
        //       position: '',
        //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
        //       img: '',
        //
        //     }
        //   )
        // }

        // plyr.ai.targetSet = false
        plyr.ai.targetAcquired = false;
      }
    }

    // plyr.ai.retreating.level pick a spot further away depending on levelData
  }

  return plyr;
}
