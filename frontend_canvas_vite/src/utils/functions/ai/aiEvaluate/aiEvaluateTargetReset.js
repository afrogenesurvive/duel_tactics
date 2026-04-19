function aiEvaluateTargetReset(app, plyr, hitByPlayerDirection) {
  const logEval = (message, data = {}) => {
    app.globalLogger("ai.evaluate", message, { plyr_no: plyr.number, ...data }, { fn: "aiEvaluateTargetReset" });
  };

  // SOMEONE DIED, RESET AI TARGETS

  if (app.resetAiTarget.state === true) {
    logEval("someoneDiedResetTargets", { reset_player: app.resetAiTarget.player });
    if (!plyr.popups.find((x) => x.msg === "thinking")) {
      plyr.popups.push({
        state: false,
        count: 0,
        limit: 30,
        type: "",
        position: "",
        msg: "thinking",
        img: "",
      });
    }
    for (const plyr of app.players) {
      if (plyr.ai.state === true && plyr.ai.targetSet === true && plyr.ai.targetPlayer.number === app.resetAiTarget.player) {
        app.aiResetRanges(plyr);

        if (plyr.attacking.state === true) {
          plyr.attacking.state = false;
          plyr.action = "idle";
          // app.attackedCancel(plyr)
          plyr.ai.targetSet = false;
          plyr.ai.targetAcquired = false;
          plyr.ai.mission = plyr.ai.primaryMission;
          plyr.ai.currentInstruction = 0;
          plyr.ai.pathArray = [];
          plyr.ai.instructions = [];

          // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
          //   plyr.popups.push(
          //     {
          //       state: false,
          //       count: 0,
          //       limit: 25,
          //       type: '',
          //       position: '',
          //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
          //       img: '',
          //
          //     }
          //   )
          // }
        }

        plyr.ai.targetSet = false;
        plyr.ai.targetPlayer = {
          number: undefined,
          currentPosition: {
            x: undefined,
            y: undefined,
          },
          target: {
            number1: {
              x: undefined,
              y: undefined,
            },
            number2: {
              x: undefined,
              y: undefined,
            },
          },
          action: "",
        };

        if (plyr.ai.mission === "pursue") {
          plyr.ai.targetSet = false;
          plyr.ai.targetAcquired = false;
          plyr.ai.mission = plyr.ai.primaryMission;
          plyr.ai.currentInstruction = 0;
          plyr.ai.pathArray = [];
          plyr.ai.instructions = [];

          // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
          //   plyr.popups.push(
          //     {
          //       state: false,
          //       count: 0,
          //       limit: 25,
          //       type: '',
          //       position: '',
          //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
          //       img: '',
          //
          //     }
          //   )
          // }
        }
      }
    }

    if (app.playerNumber > 1) {
      if (app.resetAiTarget.player === 1) {
        if (app.players[1].dead.state !== true && app.players[1].falling.state !== true && app.players[1].respawn !== true) {
          logEval("retargetPlayer", { target: 2 });
          app.aiTarget = 2;
          app.resetAiTarget.player = 0;
        } else {
          app.allPlayersDead = true;
        }
      }

      if (app.resetAiTarget.player === 2) {
        if (app.players[0].dead.state !== true && app.players[0].falling.state !== true && app.players[0].respawn !== true) {
          logEval("retargetPlayer", { target: 1 });
          app.aiTarget = 1;
          app.resetAiTarget.player = 0;
        } else {
          app.allPlayersDead = true;
        }
      }
    } else {
      app.allPlayersDead = true;
    }

    // app.resetAiTarget.state2 = true;
    app.resetAiTarget.state = false;
  }

  return plyr;
}
