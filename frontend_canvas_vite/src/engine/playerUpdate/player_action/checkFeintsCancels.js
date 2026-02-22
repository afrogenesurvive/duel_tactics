export function checkFeintsCancels(mode, app, player) {
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
            limit: player.defending.decay.limit,
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
        console.log("defend feinted");
      } else {
        if (player.defending.peak === true) {
          console.log("peak defense. cant feint");
        } else {
          // console.log("too late to feint defense");
        }
      }
    }

    // PRE PULL FEINT
    if (app.keyPressed[player.number - 1].pull === false && player.prePull.state === true) {
      // console.log("player was pre pulling. reset");
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
          maxCharge: 15,
          chargeCount: 0,
          execute: false,
          effectivenessAllowance: 3,
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

        console.log("attack feinted");

        if (app.camera.customView.state !== true && player.ai.state !== true) {
          app.setAutoCamera("attackFocusBreak", player);
        }

        player.actionDirectionAnimationArray = [];
      } else {
        if (player.attacking.peak === true || player.attacking.chargeCount > 0) {
          player.attacking.charge = player.attacking.chargeCount;
          player.attacking.execute = true;
          console.log("attack key released after peak or with charge. execute attack.");
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
      // console.log("released dodge key while winding up. cancel dodge.");
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
      player.strafeReleaseHook = false;
      app.getTarget(player);
      player.strafing.direction = "";
      // console.log('strafe release hook');
    }
  }

  if (mode === "push") {
    // PUSH KEY RELEASE
    if (player.prePush.state === true && app.keyPressed[player.number - 1][player.prePush.direction] !== true) {
      // console.log('mid prePush but key released. reset prePush');
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
