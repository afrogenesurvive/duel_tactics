export function checkFeintsCancels(mode, app, player) {
  const logAttackFeint = (message, data = {}) => {
    app.globalLogger("player.attacking.feint", message, data, { fn: "checkFeintsCancels" });
  };
  const logAttackCount = (message, data = {}) => {
    app.globalLogger("player.attacking.count", message, data, { fn: "checkFeintsCancels" });
  };
  const logDefend = (message, data = {}, variant = "off_peak") => {
    app.globalLogger(`player.defending.${variant}`, message, data, { fn: "checkFeintsCancels" });
  };
  const logDefendCount = (message, data = {}) => {
    app.globalLogger("player.defending.count", message, data, { fn: "checkFeintsCancels" });
  };
  const logDodge = (message, data = {}) => {
    app.globalLogger("player.dodging.execution", message, data, { fn: "checkFeintsCancels" });
  };
  const logMove = (message, data = {}) => {
    app.globalLogger("player.movement", message, data, { fn: "checkFeintsCancels" });
  };
  const logPull = (message, data = {}) => {
    app.globalLogger("player.pulling.execution", message, data, { fn: "checkFeintsCancels" });
  };
  const logPush = (message, data = {}) => {
    app.globalLogger("player.pushing.execution", message, data, { fn: "checkFeintsCancels" });
  };

  if (mode === "") {
    // DEFEND FEINT
    if (app.keyPressed[player.number - 1].defend === false && player.defending.state === true) {
      // console.log('player',player.number,' defend key release');
      let canFeint = false;

      let defendType = player.currentWeapon.type;
      if (player.currentWeapon.name === "") {
        defendType = "unarmed";
      }

      if (player.defending.decay.state !== true) {
        if (player.defending.count < player.defending.peakCount) {
          canFeint = true;
        }
      } else {
        if (player.defending.decay.count < player.defending.decay.limit && player.defending.peak !== true) {
          canFeint = true;
        }
      }
      if (canFeint === true) {
        logDefend("defendFeintEligible", {
          plyr_no: player.number,
          count: player.defending.count,
          peakCount: player.defending.peakCount,
          decayCount: player.defending.decay.count,
          decayLimit: player.defending.decay.limit,
        });
        let dir = player.defending.direction;
        player.defending = {
          state: false,
          count: 0,
          limit: player.defending.limit,
          animRef: player.defending.animRef,
          peak: false,
          peakCount: 0,
          decay: {
            state: false,
            count: 0,
            limit: app.defendAnimRef.limit[player.currentWeapon.type].slash - app.defendAnimRef.peak[player.currentWeapon.type].slash,
          },
          direction: "",
          directionType: "", //thrust or slash
        };
        player.action = "idle";

        player.stamina.current += app.staminaCostRef.defend.pre;

        let popup;
        let popupsToRemove = ["defending", "noDirection3", "northDirection", "southDirection", "eastDirection", "westDirection"];
        for (const pop of popupsToRemove) {
          popup = player.popups.find((x) => x.msg === pop);
          if (popup) {
            player.popups.splice(
              player.popups.findIndex((x) => x.msg === pop),
              1,
            );
          }
        }

        if (player.falling.state !== true && player.moving.state !== true) {
          player.action = "idle";
        }

        // RESET ELASTIC COUNTER
        if (player.elasticCounter.state === true && player.elasticCounter.type === "defending") {
          player.elasticCounter.state = false;
          player.elasticCounter.type = "";
          player.elasticCounter.subType = "";
        }

        if (app.camera.customView.state !== true && player.ai.state !== true) {
          app.setAutoCamera("defendFocusBreak", player);
        }

        player.actionDirectionAnimationArray = [];
        logDefend("defendFeinted", {
          plyr_no: player.number,
          prevDirection: dir,
        });
      } else {
        if (player.defending.peak === true) {
          logDefend(
            "defendFeintBlockedPeak",
            {
              plyr_no: player.number,
              count: player.defending.count,
              peakCount: player.defending.peakCount,
            },
            "peak",
          );
        } else {
          // console.log("too late to feint defense");
        }
      }
    }

    // PRE PULL FEINT
    if (app.keyPressed[player.number - 1].pull === false && player.prePull.state === true) {
      logPull("prePullCancel", {
        plyr_no: player.number,
        count: player.prePull.count,
        limit: player.prePull.limit,
      });
      player.prePull = {
        state: false,
        count: 0,
        limit: player.prePull.limit,
        targetCell: undefined,
        direction: "",
        puller: 0,
      };

      if (player.newPushPullDelay.state !== true) {
        player.newPushPullDelay.state = true;
      }

      if (player.falling.state !== true && player.moving.state !== true) {
        player.action = "idle";
      }
    }

    // ATTACK FEINT
    if (app.keyPressed[player.number - 1].attack === false && player.attacking.state === true) {
      let directionalActionResult = app.checkSetAttackDefendDirectionalInput("windup", "attacking", player);
      player = directionalActionResult.player;

      let atkPeak;
      let atkType = player.currentWeapon.type;
      let blunt = "normal";
      if (player.currentWeapon.name === "") {
        atkType = "unarmed";
      }
      if (player.attacking.blunt === true) {
        blunt = "blunt";
      }

      if (player.attacking.count < player.attacking.peakCount) {
        logAttackFeint("attackFeintCheck", {
          plyr_no: player.number,
          count: player.attacking.count,
          peakCount: player.attacking.peakCount,
          chargeCount: player.attacking.chargeCount,
        });

        // console.log("attack windup key release before peak. feinting. refund stamina part");
        let dir = player.attacking.direction;
        player.action = "idle";
        player.attacking = {
          state: false,
          count: 0,
          limit: player.attacking.limit,
          strength: 0,
          direction: "",
          directionType: "", //thrust or slash
          animRef: player.attacking.animRef,
          peak: false,
          peakCount: 0,
          charge: 0,
          chargePeak: false,
          blunt: false,
          clashing: {
            state: false,
            count: 0,
            limit: player.attacking.clashing.limit,
          },
          maxCharge: player.attacking.maxCharge,
          chargeCount: 0,
          execute: false,
          effectivenessAllowance: player.attacking.effectivenessAllowance,
        };
        player.stamina.current += app.staminaCostRef.attack[atkType][blunt].pre;

        // RESET ELASTIC COUNTER
        if (player.elasticCounter.state === true && player.elasticCounter.type === "attacking") {
          player.elasticCounter.state = false;
          player.elasticCounter.type = "";
          player.elasticCounter.subType = "";
        }

        let popup;
        let popupsToRemove = ["attacking", "charging", "noDirection3", "northDirection", "southDirection", "eastDirection", "westDirection"];
        for (const pop of popupsToRemove) {
          popup = player.popups.find((x) => x.msg === pop);
          if (popup) {
            player.popups.splice(
              player.popups.findIndex((x) => x.msg === pop),
              1,
            );
          }
        }

        logAttackFeint("attackFeinted", {
          plyr_no: player.number,
          prevDirection: dir,
        });

        if (app.camera.customView.state !== true && player.ai.state !== true) {
          app.setAutoCamera("attackFocusBreak", player);
        }

        player.actionDirectionAnimationArray = [];
      } else {
        if (player.attacking.peak === true || player.attacking.chargeCount > 0) {
          player.attacking.charge = player.attacking.chargeCount;
          player.attacking.execute = true;
          logAttackFeint("attackExecuteOnRelease", {
            plyr_no: player.number,
            count: player.attacking.count,
            peakCount: player.attacking.peakCount,
            chargeCount: player.attacking.chargeCount,
          });
        }
      }
    }

    // DODGE RELEASE/FEINT
    if (
      player.dodging.countState === true &&
      player.dodging.count <= player.dodging.peak.start - player.crits.dodge &&
      app.keyPressed[player.number - 1].dodge !== true &&
      player.flanking.state !== true
    ) {
      logDodge("dodgeCancel", {
        plyr_no: player.number,
        count: player.dodging.count,
        peakStart: player.dodging.peak.start,
        critDodge: player.crits.dodge,
      });
      player.stamina.current += app.staminaCostRef.dodge.pre;
      player.action = "idle";
      player.dodging = {
        countState: false,
        state: false,
        count: 0,
        limit: player.dodging.limit,
        peak: {
          start: player.dodging.peak.start,
          end: player.dodging.peak.end,
        },
        direction: "",
      };
      if (player.elasticCounter.state === true && player.elasticCounter.type === "dodging") {
        player.elasticCounter.state = false;
        player.elasticCounter.type = "";
        player.elasticCounter.subType = "";
      }

      if (player.popups.find((x) => x.msg === "dodging")) {
        player.popups.splice(
          player.popups.findIndex((x) => x.msg === "dodging"),
          1,
        );
      }
    }

    // STRAFE RELEASE
    if (player.strafeReleaseHook === true) {
      player.strafing.state = false;
      // CHWCK FOR ATTACKING SINCE CHARGE CANCEL RELIES ON RELEASE STRAFE HOOK AND STRAFING CAN'T BE DONE WHILE ATTAING ANYWAY
      if (player.attacking.state !== true && player.attacking.charge === 0) {
        player.strafeReleaseHook = false;
      }
      // player.strafeReleaseHook = false;
      app.getTarget(player);
      player.strafing.direction = "";
      logMove("strafeRelease", {
        plyr_no: player.number,
        action: player.action,
        strafeReleaseHook: player.strafeReleaseHook,
      });
    }
  }

  if (mode === "push") {
    // PUSH KEY RELEASE
    if (player.prePush.state === true && app.keyPressed[player.number - 1][player.prePush.direction] !== true) {
      logPush("prePushCancel", {
        plyr_no: player.number,
        count: player.prePush.count,
        limit: player.prePush.limit,
        direction: player.prePush.direction,
      });
      player.prePush = {
        state: false,
        count: 0,
        limit: player.prePush.limit,
        targetCell: undefined,
        direction: "",
        pusher: undefined,
      };

      if (player.newPushPullDelay.state !== true) {
        player.newPushPullDelay.state = true;
      }
    }
  }
}
