export function checkDefending(app, player) {
  if (player.defending.state === true) {
    let directionalActionResult = app.checkSetAttackDefendDirectionalInput("windup", "defending", player);
    player = directionalActionResult.player;

    let defendDecayLimitPercentage = 0.55; // calc & increase this based on defend stats

    let defendType = player.currentWeapon.type;
    if (player.currentWeapon.name === "") {
      defendType = "unarmed";
    }

    let defendPeak = player.defending.animRef.peak[defendType][player.defending.directionType];

    let defenseValueDecreased = false;
    if (player.defending.decay.state !== true && defendPeak !== player.defending.peakCount) {
      if (defendPeak > player.defending.peakCount) {
        defenseValueDecreased = true;
      }
      // console.log(
      //   "defend peak changed from",
      //   player.defending.peakCount,
      //   "to",
      //   defendPeak
      // );
      player.defending.peakCount = defendPeak;
    }

    let limit = player.defending.animRef.limit[defendType][player.defending.directionType];
    if (player.defending.decay.state !== true && limit !== player.defending.limit) {
      // console.log("defend limit changed from", player.defending.limit, "to", limit);
      player.defending.limit = limit;
    }

    // WINDUP
    if (player.defending.count < defendPeak && player.defending.decay.state !== true) {
      player.defending.count++;
      player.action = "defending";
      player.defending.peak = false;
      // console.log(
      //   "defend windup:",
      //   player.defending.direction,
      //   "counts",
      //   player.defending.count,
      //   defendPeak,
      //   player.defending.limit
      // );
      if (!player.popups.find((x) => x.msg === "defending")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: player.defending.limit,
          type: "",
          position: "",
          msg: "defending",
          img: "",
        });
      }

      if (player.defending.count <= 2) {
        // CAMERA DEFEND FOCUS
        if (
          app.camera.customView.state !== true &&
          app.settingAutoCamera === false &&
          player.ai.state !== true &&
          app.camera.preInstructions.length === 0 &&
          app.camera.instructions.length === 0
        ) {
          if (app.players[0].dead.state !== true) {
            if (player.number === 1) {
              app.setAutoCamera("defendFocus", player);
            }
          } else if (player.number === 2) {
            app.setAutoCamera("defendFocus", player);
          }
        } else {
          // console.log("no setting auto cam: defendFocus");
        }
      }
    }

    if (defenseValueDecreased === true && player.defending.count > player.defending.peakCount) {
      // console.log(
      //   "defend was directional now non directional & pask peak. Execute defend"
      // );
      player.defending.peakCount = player.defending.count;
    }

    // SET DIRECTIONAL DEFEND ANIMATIONS
    if (app.showDirectionalActionAnimation === true) {
      let dirAnimSetCalcMod = 5;
      // const decayLimit = Math.ceil((player.defending.limit - defendPeak) * defendDecayLimitPercentage);
      const decayLimit = Math.ceil((player.defending.decay.limit - defendPeak) * defendDecayLimitPercentage);
      let xTime = player.defending.peakCount + decayLimit + dirAnimSetCalcMod - player.defending.count;
      let existingDefendAnim = player.actionDirectionAnimationArray.find((x) => x.action === "defending");
      // if (player.defending.count === directionalActionResult.inputThresh) {
      if (!existingDefendAnim) {
        player = app.handleDirectionalActionAnimation("player", "defending", "release", player, null, xTime, app.directionalAnimShape);
      }
      if (directionalActionResult.directionChanged === true) {
        player.actionDirectionAnimationArray = [];
        let yTime;
        if (player.defending.decay.state !== true) {
          yTime = player.defending.peakCount + decayLimit - player.defending.count;
        } else {
          yTime = player.defending.decay.limit + dirAnimSetCalcMod - player.defending.decay.count;
        }
        player = app.handleDirectionalActionAnimation("player", "defending", "release", player, null, yTime, app.directionalAnimShape);
      }
    }

    let executeDefend = false;
    if (
      player.elasticCounter.subType !== "windup" &&
      player.defending.count === player.defending.peakCount &&
      player.defending.decay.state !== true
    ) {
      executeDefend = true;
    }

    // PEAK, START DECAY
    if (executeDefend === true) {
      console.log(`Execute defend`);

      if (player.stamina.current - app.staminaCostRef.defend.peak >= 0) {
        player.action = "defending";
        player.defending.peak = true;
        player.defending.count++;
        player.defending.decay.state = true;
        player.defending.decay.count = 0;
        player.defending.decay.limit = Math.ceil((player.defending.decay.limit - defendPeak) * defendDecayLimitPercentage);
        player.stamina.current = player.stamina.current - app.staminaCostRef.defend.peak;

        if (!player.popups.find((x) => x.msg === "defending")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.defending.limit,
            type: "",
            position: "",
            msg: "defending",
            img: "",
          });
        }

        player = app.setElasticCounter("defending", "peak", false, player);
        // console.log(
        //   "defend peak:",
        //   player.defending.direction,
        //   "counts",
        //   player.defending.count,
        //   defendPeak,
        //   player.defending.limit,
        //   "decay:",
        //   player.defending.decay.state,
        //   player.defending.decay.count,
        //   player.defending.decay.limit
        // );
      }
      // OUT OF STAMINA
      else {
        console.log("not enough stamina for peak defend. reset stamina");
        player.action = "idle";
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
        player.stamina.current = 0;
        player.statusDisplay = {
          state: true,
          status: "Out of Stamina",
          count: 1,
          limit: player.statusDisplay.limit,
        };

        if (!player.popups.find((x) => x.msg === "outOfStamina")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: 10,
            type: "",
            position: "",
            msg: "outOfStamina",
            img: "",
          });
        }
      }
    }

    // DECAY!!
    if (player.defending.decay.state === true) {
      if (player.defending.decay.count < player.defending.decay.limit) {
        player.action = "defending";
        player.defending.decay.count++;
        if (player.defending.decay.count >= app.defendPeakAllowance) {
          player.defending.peak = false;
          // console.log("peak defend over: count", player.defending.count, defendPeak, player.defending.decay.state);
        }
        console.log("Defend decay", {
          count: player.defending.decay.count,
          limit: player.defending.decay.limit,
        });

        if (!player.popups.find((x) => x.msg === "defending")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.defending.decay.limit,
            type: "",
            position: "",
            msg: "defending",
            img: "",
          });
        }
        player = app.setElasticCounter("defending", "decay", false, player);
        // console.log(
        //   "defend decay:",
        //   player.defending.direction,
        //   "counts",
        //   player.defending.count,
        //   defendPeak,
        //   player.defending.limit,
        //   "decay:",
        //   player.defending.decay.state,
        //   player.defending.decay.count,
        //   player.defending.decay.limit
        // );
      }

      if (player.defending.decay.count >= player.defending.decay.limit) {
        player.defending.decay.state = false;
        player.defending.decay.count = 0;
        player.defending.count = defendPeak + player.defending.decay.limit;
        // console.log(
        //   "defend decay end:",
        //   player.defending.direction,
        //   "counts",
        //   player.defending.count,
        //   defendPeak,
        //   player.defending.limit
        // );
      }
    }

    // DEFEND COOLDOWN
    if (player.defending.decay.state !== true && player.defending.count > defendPeak) {
      if (player.defending.count < player.defending.limit) {
        // let popup;
        // let popupsToRemove = [
        //   "noDirection3",
        //   "northDirection",
        //   "southDirection",
        //   "eastDirection",
        //   "westDirection",
        // ];
        // for (const pop of popupsToRemove) {
        //   popup = player.popups.find((x) => x.msg === pop);
        //   if (popup) {
        //     player.popups.splice(
        //       player.popups.findIndex((x) => x.msg === pop),
        //       1
        //     );
        //   }
        // }
        player.defending.count++;
        // console.log(
        //   "defend cooldown:",
        //   player.defending.direction,
        //   "counts",
        //   player.defending.count,
        //   defendPeak,
        //   player.defending.limit
        // );
      }
      if (player.defending.count >= player.defending.limit) {
        player.action = "idle";
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

        // AUTO CAM (DEF FOCUS BREAK)
        if (
          app.camera.customView.state !== true &&
          // app.settingAutoCamera === false &&
          player.ai.state !== true &&
          app.camera.preInstructions.length === 0 &&
          app.camera.instructions.length === 0
        ) {
          app.setAutoCamera("defendFocusBreak", player);
        } else {
          // console.log("no setting auto cam: defendFocusBreak");
        }
        // RESET ELASTIC COUNTER
        if (player.elasticCounter.state === true && player.elasticCounter.type === "defending") {
          player.elasticCounter.state = false;
          player.elasticCounter.type = "";
          player.elasticCounter.subType = "";
        }
        player.actionDirectionAnimationArray = [];
        console.log("defend end");
      }
    }
  }
}
