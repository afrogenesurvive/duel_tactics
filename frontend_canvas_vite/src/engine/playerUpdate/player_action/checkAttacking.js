export function checkAttacking(app, player) {
  if (player.attacking.state === true) {
    let directionalActionResult = app.checkSetAttackDefendDirectionalInput("windup", "attacking", player);
    player = directionalActionResult.player;
    if (player.attacking.state === true) {
      let chargeType = "normal";
      if (directionalActionResult.charging === true) {
        chargeType = "charged";
      }

      let attackPeak;
      let stamAtkType = player.currentWeapon.type;

      if (player.currentWeapon.type === "") {
        stamAtkType = "unarmed";
      }

      let blunt = "normal";
      if (player.attacking.blunt === true) {
        blunt = "blunt";
        // console.log("blunt attack");
      }

      if (player.attacking.directionType === "") {
        attackPeak = 0;
      } else {
        attackPeak = player.attacking.animRef.peak[stamAtkType][player.attacking.directionType][chargeType];
      }

      if (player.attacking.peakCount === 0 || player.attacking.count < player.attacking.peakCount) {
        // console.log(
        //   "attacking peakCount changed. was",
        //   player.attacking.peakCount,
        //   "now",
        //   attackPeak
        // );
        player.attacking.peakCount = attackPeak;
      }

      if (player.attacking.limit === 0 || player.attacking.count < player.attacking.peakCount) {
        // console.log(
        //   "attacking limit changed. was",
        //   player.attacking.limit,
        //   "now",
        //   player.attacking.animRef.limit[stamAtkType][player.attacking.directionType][
        //     chargeType
        //   ]
        // );
        player.attacking.limit = player.attacking.animRef.limit[stamAtkType][player.attacking.directionType][chargeType];
      }

      // STEP ATTACKING COUNT
      if (player.attacking.count < player.attacking.limit) {
        if (player.attacking.count < player.attacking.peakCount) {
          // console.log(
          //   "atk windup:",
          //   player.attacking.direction,
          //   "counts:",
          //   player.attacking.count,
          //   player.attacking.peakCount,
          //   player.attacking.limit,
          //   chargeType === "charged"
          // );
          player.attacking.peak = false;
          player.attacking.chargePeak = false;
        }

        player.action = "attacking";
        player.attacking.count++;

        // APPLY BLUNT ATTACK
        if (player.dodging.countState === true || player.dodging.state === true || app.keyPressed[player.number - 1].dodge === true) {
          // console.log("was attacking then pressed dodging. blunt attack");

          if (player.attacking.blunt !== true) {
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
            app.keyPressed[player.number - 1].dodge = false;
            player.attacking.blunt = true;

            // RESET DODGE ELASTIC COUNTER
            if (player.elasticCounter.state === true && player.elasticCounter.type === "dodging") {
              player.elasticCounter.state = false;
              player.elasticCounter.type = "";
              player.elasticCounter.subType = "";
            }
          }
        }

        // ATTACK START POPUP, GET TARGET, CELLS UNDER ATTACK & AUTO CAM
        if (player.attacking.count <= 2) {
          if (!player.popups.find((x) => x.msg === "attackStart")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 5,
              type: "",
              position: "",
              msg: "attackStart",
              img: "",
            });
          }

          app.getTarget(player);

          // CELLS UNDER PRE ATTACK!
          let cellUnderPreAttack1 = app.gridInfo.find(
            (elem) => elem.number.x === player.target.cell1.number.x && elem.number.y === player.target.cell1.number.y,
          );
          let cellUnderPreAttack2;
          if (player.currentWeapon.type === "spear") {
            cellUnderPreAttack2 = app.gridInfo.find(
              (elem) => elem.number.x === player.target.cell2.number.x && elem.number.y === player.target.cell2.number.y,
            );
          }
          if (player.currentWeapon.type === "spear") {
            app.cellsUnderPreAttack.push({
              number: {
                x: player.target.cell1.number.x,
                y: player.target.cell1.number.y,
              },
              count: 1,
              limit: 8,
            });
            app.cellsUnderPreAttack.push({
              number: {
                x: player.target.cell2.number.x,
                y: player.target.cell2.number.y,
              },
              count: 1,
              limit: 8,
            });
          }
          if (player.currentWeapon.type === "sword" || player.currentWeapon.type === "") {
            // console.log('sword/unarmed melee target',player.target);

            app.cellsUnderPreAttack.push({
              number: {
                x: player.target.cell1.number.x,
                y: player.target.cell1.number.y,
              },
              count: 1,
              limit: 8,
            });
          }

          // if (player.currentWeapon.type === 'crossbow' && player.attacking.blunt === true) {
          if (player.currentWeapon.type === "crossbow") {
            // console.log('crossbow melee target',player.target);

            app.cellsUnderPreAttack.push({
              number: {
                x: player.target.cell1.number.x,
                y: player.target.cell1.number.y,
              },
              count: 1,
              limit: 8,
            });
          }

          // console.log('app.cellsUnderPreAttack',app.cellsUnderPreAttack[0],app.cellsUnderPreAttack[1]);

          // CAMERA ATTACK FOCUS
          if (
            app.camera.customView.state !== true &&
            app.settingAutoCamera === false &&
            player.ai.state !== true &&
            app.camera.preInstructions.length === 0 &&
            app.camera.instructions.length === 0
          ) {
            if (app.players[0].dead.state !== true) {
              if (player.number === 1) {
                app.setAutoCamera("attackFocus", player);
              }
            } else if (player.number === 2) {
              app.setAutoCamera("attackFocus", player);
            }
          } else {
            // console.log("no setting auto cam: attackFocus");
          }
        }

        // SHOW ATTACKING POPUP
        if (player.attacking.count > 2) {
          if (!player.popups.find((x) => x.msg === "attacking")) {
            let limit = player.attackinglimit - player.attacking.count;
            if (limit === 0) {
              limit = 5;
            }
            if (!player.popups.find((x) => x.msg === "attacking")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: limit,
                type: "",
                position: "",
                msg: "attacking",
                img: "",
              });
            }
          }
          // else {
          //   console.log('beep2',player.attacking.animRef.limit[stamAtkType]-player.attacking.count);
          //   player.popups.find(x => x.msg === "attacking").limit = player.attacking.animRef.limit[stamAtkType]-player.attacking.count
          // }
        }
        let dirInputThresh = Math.ceil(player.attacking.animRef.peak.unarmed.thrust.normal / 2);
        if (player.attacking.count === dirInputThresh) {
          if (player.elasticCounter.state !== true) {
            player = app.setElasticCounter("attacking", "windup", false, player);
          }
        }
      }

      // SET DIRECTIONAL ATTACK ANIMATIONS
      if (app.showDirectionalActionAnimation === true) {
        let dirAnimSetCalcMod = 5;
        let xTime = player.attacking.peakCount + dirAnimSetCalcMod - directionalActionResult.inputThresh;
        if (directionalActionResult.inputThresh === player.attacking.count) {
          player = app.handleDirectionalActionAnimation(
            "player",
            "attacking",
            "pullback",
            player,
            null,
            // directionalActionResult.inputThresh +
            //   Math.ceil(xTime / 2) -
            //   player.attacking.count,
            Math.ceil(xTime / 2),
            app.directionalAnimShape,
          );
        }

        if (
          player.attacking.count < player.attacking.peakCount &&
          player.attacking.count === directionalActionResult.inputThresh + Math.ceil(xTime / 2)
        ) {
          player.actionDirectionAnimationArray = [];
          player = app.handleDirectionalActionAnimation(
            "player",
            "attacking",
            "release",
            player,
            null,
            // player.attacking.peakCount +
            //   dirAnimSetCalcMod -
            //   (directionalActionResult.inputThresh + Math.ceil(xTime / 2)),
            Math.ceil(xTime / 2),
            app.directionalAnimShape,
          );
        }
      }

      let executeAttack = false;
      if (player.elasticCounter.state !== true && player.elasticCounter.type !== "attacking" && player.elasticCounter.subType !== "peak") {
        if (
          chargeType !== "charged" &&
          player.attacking.charge > 0 &&
          player.attacking.count > player.attacking.animRef.peak[stamAtkType][player.attacking.directionType].normal &&
          player.attacking.count < player.attacking.animRef.peak[stamAtkType][player.attacking.directionType].charged
        ) {
          // console.log(
          //   "not currently charging, but past non charge peak. charge attack released early...adjusting peak"
          // );
          // console.log(
          //   "counts",
          //   player.attacking.count,
          //   player.attacking.animRef.peak[stamAtkType][
          //     player.attacking.directionType
          //   ].normal
          // );
          executeAttack = true;
          attackPeak = player.attacking.animRef.peak[stamAtkType][player.attacking.directionType].normal;
          player.attacking.limit = player.attacking.animRef.limit[stamAtkType][player.attacking.directionType].charged;
          player.attacking.peakCount = attackPeak;
        } else if (player.attacking.count === attackPeak) {
          executeAttack = true;
          player.attacking.peakCount = attackPeak;
          // console.log(
          //   "execute ",
          //   chargeType,
          //   " attack at peak normally",
          //   player.attacking.charge,
          //   player.attacking.blunt
          // );
        }
      } else {
        // console.log("attack peak already reached/passed");
      }

      // TIME TO ATTACK IS NOW!
      if (executeAttack === true) {
        // WEAPON STAMINA COST!!
        if (player.stamina.current - app.staminaCostRef.attack[stamAtkType][blunt].peak >= 0) {
          player.stamina.current -= app.staminaCostRef.attack[stamAtkType][blunt].peak;

          let melee = true;

          console.log(`Attack peak!`, {
            plyr_no: player.number,
            atk_count: player.attacking.count,
            peak_count: player.attacking.peakCount,
            limit: player.attacking.limit,
            charge_type: chargeType,
            blunt: player.attacking.blunt,
            time: app.time,
          });

          player = app.setElasticCounter("attacking", "peak", false, player);

          player.attacking.peak = true;
          if (player.attacking.charge > 0) {
            player.attacking.chargePeak = true;
          }

          // CREATE NEW PROJECTILE
          if (player.currentWeapon.type === "crossbow" && player.attacking.blunt !== true && player.items.ammo > 0) {
            // console.log('firing crossbow');
            melee = false;

            let projectileResult = app.projectileCreator("player", player, "bolt");
            player = projectileResult.owner;

            app.projectiles.push(projectileResult.projectile);

            app.getBoltTarget(projectileResult.projectile);
          }
          // NO PROJECTILE AMMO
          if (player.currentWeapon.type === "crossbow" && player.attacking.blunt !== true && player.items.ammo <= 0) {
            // console.log('no ammo!');
            app.players[player.number - 1].statusDisplay = {
              state: true,
              status: "out of ammo",
              count: 1,
              limit: app.players[player.number - 1].statusDisplay.limit,
            };
            player.currentWeapon.effect = "ammo+0";

            if (!player.popups.find((x) => x.msg === "outOfAmmo")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "outOfAmmo",
                img: "",
              });
            }
          }

          if (player.currentWeapon.type === "crossbow" && player.attacking.blunt === true) {
            melee = true;
          }

          if (melee === true) {
            app.getTarget(player);
            app.meleeAttackPeak("player", player);
          }
        }

        // OUT OF STAMINA
        else {
          player.attacking.count = attackPeak + 1;
          player.stamina.current = 0;
          player.statusDisplay = {
            state: true,
            status: "Out of Stamina",
            count: 1,
            limit: player.statusDisplay.limit,
          };
        }
      }

      // ATTACK COOLDOWN AND END!
      if (
        executeAttack !== true &&
        player.attacking.count !== 0 &&
        player.attacking.peakCount !== 0 &&
        player.attacking.count > player.attacking.peakCount &&
        player.attacking.count < player.attacking.limit
      ) {
        // console.log(
        //   "atk cooldown:",
        //   player.attacking.direction,
        //   "counts:",
        //   player.attacking.count,
        //   player.attacking.peakCount,
        //   player.attacking.limit,
        //   chargeType === "charged"
        // );
        player.attacking.peak = false;
        player.attacking.chargePeak = false;
        player.attacking.blunt = false;

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
      }

      if (player.attacking.count >= player.attacking.limit && player.attacking.count !== 0) {
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
        };
        player.action = "idle";

        // AUTO CAM (ATK FOCUS BREAK)
        if (
          app.camera.customView.state !== true &&
          // app.settingAutoCamera === false &&
          player.ai.state !== true &&
          app.camera.preInstructions.length === 0 &&
          app.camera.instructions.length === 0
        ) {
          app.setAutoCamera("attackFocusBreak", player);
        } else {
          // console.log("no setting auto cam: attackFocusBreak");
        }

        if (player.popups.find((x) => x.msg === "attacking")) {
          player.popups.splice(
            player.popups.findIndex((x) => x.msg === "attacking"),
            1,
          );
        }

        let popup;
        let popupsToRemove = ["noDirection3", "northDirection", "southDirection", "eastDirection", "westDirection"];
        for (const pop of popupsToRemove) {
          popup = player.popups.find((x) => x.msg === pop);
          if (popup) {
            player.popups.splice(
              player.popups.findIndex((x) => x.msg === pop),
              1,
            );
          }
        }
        player.actionDirectionAnimationArray = [];

        console.log("attack end");
      }
    } else {
      console.log("no longer attacking. probably feinted");
    }
  }

  // CLASHING
  if (player.attacking.clashing.state === true) {
    if (!player.popups.find((x) => x.msg === "clashing")) {
      player.popups.push({
        state: false,
        count: 0,
        limit: player.attacking.clashing.limit,
        type: "",
        position: "",
        msg: "clashing",
        img: "",
      });
    }
    if (player.attacking.clashing.count < player.attacking.clashing.limit) {
      player.attacking.clashing.count++;
    }
    if (player.attacking.clashing.count >= player.attacking.clashing.limit) {
      player.attacking.clashing = {
        state: false,
        count: 0,
        limit: 10,
      };
    }
  }
}
