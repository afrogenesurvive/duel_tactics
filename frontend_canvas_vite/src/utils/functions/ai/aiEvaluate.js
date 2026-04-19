export function aiEvaluate(app, plyr) {
  // console.log('aiEvaluate',plyr.ai.upgradeWeapon);
  // console.log('aiEvaluate',plyr.ai.organizing.dropped.state);
  const logEval = (message, data = {}) => {
    app.globalLogger("ai.evaluate", message, { plyr_no: plyr.number, ...data }, { fn: "aiEvaluate" });
  };

  plyr = app.aiEvaluateCheckJumpDestination(plyr);

  plyr = app.aiEvaluateTargetReset(app, plyr);

  checkJumpDestination();

  if (app.allPlayersDead === true) {
    for (const plyr2 of app.players) {
      if (plyr2.dead.state !== true && plyr2.respawn !== true && plyr2.ai.state !== true) {
        app.aiTarget = plyr2.number;
        app.allPlayersDead = false;
        app.resetAiTarget.player = 0;

        if (!plyr2.popups.find((x) => x.msg === "thinking")) {
          plyr2.popups.push({
            state: false,
            count: 0,
            limit: 25,
            type: "",
            position: "",
            msg: "thinking",
            img: "",
          });
        }
      }
    }
  }

  if (app.allPlayersDead === true) {
    logEval("still no targets availible for ai!!", {});
  }

  if (plyr.ai.mission !== "engage" && app.aiDeflectedCheck.includes(plyr.number === true)) {
    // console.log('!! AI DEFLECTED BUT NOT ENGAGED, CHECK CIRCUMSTANCES AND BEHAVIOR !!');
  }

  plyr = app.aiEvaluateItemLogic(plyr);

  // PATHFIND ERROR/ PREVENT SUICIDE!
  if (plyr.ai.resetInstructions === true) {
    logEval("pathfindingReset");
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
    if (!plyr.popups.find((x) => x.msg === "pathSwitch")) {
      plyr.popups.push({
        state: false,
        count: 0,
        limit: 30,
        type: "",
        position: "",
        msg: "pathSwitch",
        img: "",
      });
    }
    // console.log('reset instructions','set',plyr.ai.targetSet,'acquired',plyr.ai.targetAcquired,'mission',plyr.ai.mission);
    plyr.ai.currentInstruction = 0;
    plyr.ai.instructions = [];
    plyr.ai.targetAcquired = false;
    plyr.ai.resetInstructions = false;

    if (plyr.ai.mission === "retreat") {
      logEval("retreatPathReset");
      plyr.ai.retreating.checkin = undefined;
      plyr.ai.retreating.state = false;
    }
    if (plyr.ai.mission === "retrieve") {
      logEval("retrievePathReset");
      plyr.ai.retrieving.checkin = undefined;
      plyr.ai.retrieving.state = false;
    }
    if (plyr.ai.mission === "patrol") {
      logEval("patrolPathReset");
      plyr.ai.patrolling.checkin = undefined;
      plyr.ai.patrolling.state = false;
    }
  }

  plyr = app.aiEvaluateTargeting(plyr);

  plyr = app.aiEvaluateMission(plyr);

  let chargeIntent = "quick";
  const targetPlayer = app.players?.[plyr.ai?.targetPlayer?.number - 1];
  if (targetPlayer) {
    if (targetPlayer.defending.state === true || targetPlayer.defending.decay.state === true) {
      chargeIntent = "full";
    } else if (targetPlayer.attacking.state === true) {
      chargeIntent = "quick";
    } else if (plyr.ai.safeRange === true) {
      chargeIntent = "medium";
    }
  }
  plyr.ai.chargeIntent = chargeIntent;

  // AI CAN'T ACT IF FLANKING OR MOVING!

  if (
    plyr.flanking.state !== true &&
    plyr.flanking.step !== 1 &&
    plyr.flanking.step !== 2 &&
    plyr.moving.state !== true &&
    // plyr.attacking.state !== true &&
    plyr.defending.state !== true &&
    plyr.success.deflected.state !== true &&
    plyr.action !== "deflected" &&
    plyr.pushBack.state !== true &&
    plyr.dead.state !== true &&
    plyr.falling.state !== true
  ) {
    app.aiDecide(plyr);
  }
}
