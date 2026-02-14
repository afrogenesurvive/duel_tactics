export function checkSetAttackDefendDirectionalInput(app, mode, action, player) {
  // stage is either 'init' or 'windup'
  let charging = false;
  let input = false;
  let inputDirection = "";
  let inputDirections = [];
  let directionalInputThresh = 0;
  let directionChanged = false;
  let inputCount = 0;
  if (app.keyPressed[player.number - 1].north === true) {
    input = true;
    inputDirections.push("north");
    inputCount++;
  }
  if (app.keyPressed[player.number - 1].south === true) {
    input = true;
    inputDirections.push("south");
    inputCount++;
  }
  if (app.keyPressed[player.number - 1].east === true) {
    input = true;
    inputDirections.push("east");
    inputCount++;
  }
  if (app.keyPressed[player.number - 1].west === true) {
    input = true;
    inputDirections.push("west");
    inputCount++;
  }

  const charge = () => {
    charging = true;
    player[action].charge++;
    if (!player.popups.find((x) => x.msg === "charging")) {
      player.popups.push({
        state: false,
        count: 0,
        limit: 10,
        type: "",
        position: "",
        msg: "charging",
        img: "",
      });
    }
    // console.log("charging attack", player[action].charge);
  };

  const feintAttack = () => {
    let chargeType = "normal";
    if (charging === true) {
      chargeType = "charged";
    }

    let atkPeak;
    let atkType = player.currentWeapon.type;
    let blunt = "normal";
    if (player.currentWeapon.name === "") {
      atkType = "unarmed";
    }
    if (player.attacking.blunt === true) {
      blunt = "blunt";
    }
    atkPeak = player.attacking.animRef.peak[atkType][player.attacking.directionType][chargeType];

    if (player.attacking.count < player.attacking.peakCount) {
      // console.log('attack windup key release before peak. feinting. refund stamina part');

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

      if (app.camera.customView.state !== true && player.ai.state !== true) {
        app.setAutoCamera("attackFocusBreak", player);
      }
    }

    player.actionDirectionAnimationArray = [];
  };

  const popup = (dir, prevDir) => {
    if (app.hideDirectionalActionPopus !== true) {
      let msg = dir + "Direction";
      if (dir === "none") {
        msg = "noDirection3";
      }
      let popup;
      let popupsToRemove = ["noDirection3", "northDirection", "southDirection", "eastDirection", "westDirection"];
      popupsToRemove.splice(
        popupsToRemove.findIndex((x) => x === msg),
        1,
      );
      for (const pop of popupsToRemove) {
        popup = player.popups.find((x) => x.msg === pop);
        if (popup) {
          player.popups.splice(
            player.popups.findIndex((x) => x.msg === pop),
            1,
          );
        }
      }
      if (!player.popups.find((x) => x.msg === msg)) {
        player.popups.push({
          state: false,
          count: 0,
          limit: player.defending.limit,
          type: "",
          position: "",
          msg: msg,
          img: "",
        });
      }
    }
  };

  if (action === "attacking") {
    directionalInputThresh = Math.ceil(player[action].animRef.peak.unarmed.thrust.normal / 2);
    if (player.currentWeapon.type === "crossbow") {
      if (mode === "init") {
        player[action].direction = "none";
        player[action].directionType = "thrust";
        // popup("none");
      }
      if (mode === "windup") {
        if (player[action].count < directionalInputThresh) {
          if (input === true) {
            if (inputCount > 1) {
              inputDirections = inputDirections.filter((x) => x !== player[action].direction);
              inputDirection = inputDirections[0];
            } else {
              inputDirection = inputDirections[0];
            }

            if (inputDirection === player.direction) {
              popup(inputDirection, player[action].direction);
              player[action].direction = inputDirection;
              player[action].directionType = "slash";
            } else {
              console.log("crossbow directional atk & charge can only be in player direction");
              feintAttack();
            }
          }
        } else {
          if (input === true) {
            // console.log("input thresh passed.");
            if (inputCount > 1) {
              inputDirections = inputDirections.filter((x) => x !== player[action].direction);
              inputDirection = inputDirections[0];
            } else {
              inputDirection = inputDirections[0];
            }

            if (inputDirection !== player[action].direction) {
              console.log("input after thresh w/ different direction. feint attack");
              feintAttack();
            }
            if (inputDirection === player[action].direction) {
              if (player[action].count > player[action].peakCount) {
                // console.log("past peak. no charging");
              } else {
                if (inputCount > 1) {
                  console.log("directional attack w/ multiple inputs. feint attack");
                  feintAttack();
                } else {
                  charge();
                }
              }
            }
          }
          if (player[action].direction === "none") {
            console.log("crossbow attack requires direction === player direction. feint attack");
            feintAttack();
          }
        }
      }
    } else {
      if (mode === "init") {
        if (input === true) {
          inputDirection = inputDirections[0];
          if (player[action].direction === "" || player[action].directionType === "") {
            popup(inputDirection, player[action].direction);
            player[action].direction = inputDirection;
            player[action].directionType = "slash";
          } else {
            // console.log("do nothing");
          }
        } else {
          if (player[action].direction === "" || player[action].directionType === "") {
            popup("none", player[action].direction);
            player[action].direction = "none";
            player[action].directionType = "thrust";
          }
        }
      }
      if (mode === "windup") {
        if (player[action].count < directionalInputThresh) {
          if (input === true) {
            if (inputCount > 1) {
              inputDirections = inputDirections.filter((x) => x !== player[action].direction);
              inputDirection = inputDirections[0];
            } else {
              inputDirection = inputDirections[0];
            }
            // console.log("y");
            if (inputDirection === player[action].direction) {
              // charge();
            } else {
              // console.log(
              //   "still time to set attack direction. changing direction",
              //   player[action].direction,
              //   inputDirection
              // );
              popup(inputDirection, player[action].direction);
              player[action].direction = inputDirection;
              player[action].directionType = "slash";
            }
          } else {
            if (player[action].direction === "" || player[action].directionType === "") {
              console.log("winding up within input thresh but no input. set to thrust");
              popup("none", player[action].direction);
              player[action].direction = "none";
              player[action].directionType = "thrust";
            }
            // console.log(" direction and type should already be set, do nothing");
          }
        } else {
          if (input === true) {
            // console.log("input thresh passed.");

            if (inputCount > 1) {
              inputDirections = inputDirections.filter((x) => x !== player[action].direction);
              inputDirection = inputDirections[0];
            } else {
              inputDirection = inputDirections[0];
            }

            if (inputDirection !== player[action].direction) {
              console.log("input after thresh w/ different direction. feint attack");
              feintAttack();
            }
            if (inputDirection === player[action].direction) {
              if (player[action].count > player[action].peakCount) {
                // console.log("past peak. no charging");
              } else {
                if (inputCount > 1) {
                  console.log("directional attack w/ multiple inputs. feint attack");
                  feintAttack();
                } else {
                  charge();
                }
              }
            }
          }
        }
      }
    }
    // console.log("directional attack input thresh", directionalInputThresh);
  }

  if (action === "defending") {
    if (mode === "init") {
      if (input === true) {
        inputDirection = inputDirections[0];
        if (player[action].direction === "" || player[action].directionType === "") {
          player[action].direction = inputDirection;
          player[action].directionType = "slash";
          // popup(inputDirection);
        } else {
          // console.log("do nothing");
        }
      } else {
        if (player[action].direction === "" || player[action].directionType === "") {
          player[action].direction = "none";
          player[action].directionType = "thrust";
          // popup("none");
        }
      }
    }
    if (mode === "windup") {
      let defendType = player.currentWeapon.type;
      if (player.currentWeapon.name === "") {
        defendType = "unarmed";
      }
      let defendPeak = player.defending.animRef.peak[defendType][player.defending.directionType];
      let defendDecayLimit = player.defending.decay.limit;
      directionalInputThresh = defendDecayLimit + defendPeak - app.defendPeakAllowance;
      if (player[action].count <= directionalInputThresh) {
        if (input === true) {
          if (inputCount > 1) {
            // inputDirections = inputDirections.filter(
            //   (x) => x !== player[action].direction
            // );
            if (inputDirections.find((x) => x === player[action].direction)) {
              inputDirection = player[action].direction;
            } else {
              inputDirection = inputDirections[0];
            }
          } else {
            inputDirection = inputDirections[0];
          }

          if (player[action].direction === inputDirection) {
          } else {
            console.log("changing defend direction before thresh. from", player[action].direction, "to", inputDirection);
            directionChanged = true;
            popup(inputDirection, player[action].direction);
            player[action].direction = inputDirection;
            player[action].directionType = "slash";
          }
        } else {
          if (player[action].direction !== "none") {
            console.log("changing defend direction before thresh. from", player[action].direction, "to none");
            directionChanged = true;
          }
          popup("none", player[action].direction);
          player[action].direction = "none";
          player[action].directionType = "thrust";
        }
      } else {
        if (input === true) {
          // console.log("too late to change defend direction: count");
        } else {
          if (player[action].direction === "" || player[action].directionType === "") {
            popup("none", player[action].direction);
            player[action].direction = "none";
            player[action].directionType = "thrust";
          }
        }
      }
      // console.log("directional defend input thresh", directionalInputThresh);
    }
  }

  return {
    player: player,
    charging: charging,
    inputThresh: directionalInputThresh,
    directionChanged: directionChanged,
  };
}
