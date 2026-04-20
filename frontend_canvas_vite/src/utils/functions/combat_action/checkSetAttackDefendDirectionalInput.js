// only show charge popup if chargeCount > 0;
// dirInputThresh/ - the count at which directional input will be set. Before this count, player can change direction of attack;

export function checkSetAttackDefendDirectionalInput(app, mode, action, player) {
  const logInputs = (message, data = {}) => {
    app.globalLogger("directional_animations.inputs", message, data, { fn: "checkSetAttackDefendDirectionalInput" });
  };
  const logExecution = (message, data = {}) => {
    app.globalLogger("directional_animations.execution", message, data, { fn: "checkSetAttackDefendDirectionalInput" });
  };
  const logCount = (message, data = {}) => {
    app.globalLogger("directional_animations.count", message, data, { fn: "checkSetAttackDefendDirectionalInput" });
  };
  const logCharge = (message, data = {}) => {
    app.globalLogger("player.attacking.charge", message, data, { fn: "checkSetAttackDefendDirectionalInput" });
  };
  const logFeint = (message, data = {}) => {
    app.globalLogger("player.attacking.feint", message, data, { fn: "checkSetAttackDefendDirectionalInput" });
  };

  // stage is either 'init' or 'windup'
  let charging = false;
  let input = false;
  let inputDirection = "";
  let inputDirections = [];
  let directionalInputThresh = 0;
  let directionChanged = false;
  let inputCount = 0;

  // COLLECT DIRECTIONS OF ALL BUTTONS CURRENTLY BEING PRESSED
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
        limit: player.attacking.maxCharge,
        type: "",
        position: "",
        msg: "charging",
        img: "",
      });
    }
    logCharge("charging", {
      plyr_no: player.number,
      action: action,
      charge: player[action].charge,
      chargeCount: player[action].chargeCount,
      maxCharge: player[action].maxCharge,
    });
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
      logFeint("windupReleaseBeforePeak", {
        plyr_no: player.number,
        action: action,
        count: player.attacking.count,
        peakCount: player.attacking.peakCount,
        direction: player.attacking.direction,
        directionType: player.attacking.directionType,
        chargeType: chargeType,
        atkPeak: atkPeak,
        result: "feinting. Refund pre attack stamina cost.",
      });

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
    directionalInputThresh = Math.ceil(player[action].animRef.peak[player.currentWeapon?.type || "unarmed"].thrust / 2);
    logCount("attackDirectionalThresh", {
      plyr_no: player.number,
      action: action,
      mode: mode,
      inputThresh: directionalInputThresh,
      count: player[action].count,
      weaponType: player.currentWeapon?.type || "unarmed",
    });
    if (player.currentWeapon?.type === "crossbow") {
      if (mode === "init") {
        player[action].direction = "none";
        player[action].directionType = "thrust";
        logExecution("crossbowInit", {
          plyr_no: player.number,
          action: action,
          direction: player[action].direction,
          directionType: player[action].directionType,
        });
      }
      if (mode === "windup") {
        // dirInputThresh/ - the count at which directional input will be set. Before this count, player can change direction of attack
        if (player[action].count < directionalInputThresh) {
          if (input === true) {
            if (inputCount > 1) {
              inputDirections = inputDirections.filter((x) => x !== player[action].direction);
              inputDirection = inputDirections[0];
            } else {
              inputDirection = inputDirections[0];
            }

            // IF NOT THRUSTING (NO THRUST FOR CROSSBOW), ONLY SLASH IF DIRECTIONAL INPUT === PLAYER DIRECTION. OTHERWISE FEINT ATTACK
            if (inputDirection === player.direction) {
              popup(inputDirection, player[action].direction);
              player[action].direction = inputDirection;
              player[action].directionType = "slash";
            } else {
              logExecution("crossbowDirectionMismatch", {
                plyr_no: player.number,
                action: action,
                inputDirection: inputDirection,
                playerDirection: player.direction,
                count: player[action].count,
                inputThresh: directionalInputThresh,
                result: "feint",
              });
              feintAttack();
            }
          }
        }
        // DIRECTIONAL ACTION INPUT THRESHOLD PASSED.
        else {
          if (input === true) {
            // console.log("input thresh passed.");
            if (inputCount > 1) {
              inputDirections = inputDirections.filter((x) => x !== player[action].direction);
              inputDirection = inputDirections[0];
            } else {
              inputDirection = inputDirections[0];
            }

            if (inputDirection !== player[action].direction) {
              logExecution("crossbowInputAfterThreshMismatch", {
                plyr_no: player.number,
                action: action,
                inputDirection: inputDirection,
                currentDirection: player[action].direction,
                count: player[action].count,
                inputThresh: directionalInputThresh,
                result: "feint",
              });
              feintAttack();
            }
            if (inputDirection === player[action].direction) {
              if (player[action].chargeCount > 0 && player[action].chargeCount < player[action].maxCharge) {
                charge();
              }
            }
          }
          if (player[action].direction === "none") {
            logExecution("crossbowNoDirection", {
              plyr_no: player.number,
              action: action,
              playerDirection: player.direction,
              count: player[action].count,
              inputThresh: directionalInputThresh,
              result: "feint",
            });
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
            logInputs("attackInitKeepDirection", {
              plyr_no: player.number,
              action: action,
              direction: player[action].direction,
              directionType: player[action].directionType,
            });
          }
        } else {
          if (player[action].direction === "" || player[action].directionType === "") {
            popup("none", player[action].direction);
            player[action].direction = "none";
            player[action].directionType = "thrust";
          }
        }
        logInputs("attackInit", {
          plyr_no: player.number,
          action: action,
          input: input,
          inputDirection: inputDirection,
          actionDirection: player[action].direction,
          actionDirectionType: player[action].directionType,
        });
      }
      if (mode === "windup") {
        logInputs("attackWindup", {
          plyr_no: player.number,
          action: action,
          input: input,
          inputDirection: inputDirection,
          actionDirection: player[action].direction,
          actionDirectionType: player[action].directionType,
          count: player[action].count,
          inputThresh: directionalInputThresh,
        });
        if (player[action].count < directionalInputThresh) {
          if (input === true) {
            if (inputCount > 1) {
              inputDirections = inputDirections.filter((x) => x !== player[action].direction);
              inputDirection = inputDirections[0];
            } else {
              inputDirection = inputDirections[0];
            }

            if (player[action].direction === "none" || player[action].directionType === "thrust") {
              player[action].direction = inputDirection;
              player[action].directionType = "slash";
            }

            if (inputDirection === player[action].direction) {
              popup(inputDirection, player[action].direction);
              player[action].direction = inputDirection;
              player[action].directionType = "slash";
            }
          } else {
            if (player[action].direction === "" || player[action].directionType === "") {
              logExecution("attackWindupNoInputSetThrust", {
                plyr_no: player.number,
                action: action,
                count: player[action].count,
                inputThresh: directionalInputThresh,
              });
              popup("none", player[action].direction);
              player[action].direction = "none";
              player[action].directionType = "thrust";
            }
          }
        }
        // DIRECTIONAL ACTION INPUT THRESHOLD PASSED.
        else {
          if (input === true) {
            logInputs("attackInputAfterThresh", {
              plyr_no: player.number,
              action: action,
              inputDirection: inputDirection,
              currentDirection: player[action].direction,
              count: player[action].count,
              inputThresh: directionalInputThresh,
            });

            if (inputCount > 1) {
              inputDirections = inputDirections.filter((x) => x !== player[action].direction);
              inputDirection = inputDirections[0];
            } else {
              inputDirection = inputDirections[0];
            }

            if (inputDirection !== player[action].direction) {
              logExecution("attackInputAfterThreshMismatch", {
                plyr_no: player.number,
                action: action,
                inputDirection: inputDirection,
                currentDirection: player[action].direction,
                count: player[action].count,
                inputThresh: directionalInputThresh,
                result: "feint",
              });
              feintAttack();
            }
            if (inputDirection === player[action].direction) {
              if (player[action].chargeCount > 0 && player[action].chargeCount < player[action].maxCharge) {
                charge();
              }
            }
          } else {
            if (player[action].direction === "none" || player[action].directionType === "thrust") {
              if (player[action].chargeCount > 0 && player[action].chargeCount < player[action].maxCharge) {
                charge();
              }
            }
          }
        }
      }
    }
  }

  if (action === "defending") {
    if (mode === "init") {
      if (input === true) {
        inputDirection = inputDirections[0];
        if (player[action].direction === "" || player[action].directionType === "") {
          player[action].direction = inputDirection;
          player[action].directionType = "slash";
          popup(inputDirection);
        } else {
          logInputs("defendInitKeepDirection", {
            plyr_no: player.number,
            action: action,
            direction: player[action].direction,
            directionType: player[action].directionType,
          });
        }
      } else {
        if (player[action].direction === "" || player[action].directionType === "") {
          player[action].direction = "none";
          player[action].directionType = "thrust";
          logInputs("defendInitNoInput", {
            plyr_no: player.number,
            action: action,
            direction: player[action].direction,
            directionType: player[action].directionType,
          });
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
      logCount("defendDirectionalThresh", {
        plyr_no: player.number,
        action: action,
        mode: mode,
        inputThresh: directionalInputThresh,
        count: player[action].count,
        weaponType: defendType,
      });
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
            logInputs("defendWindupSameDirection", {
              plyr_no: player.number,
              action: action,
              direction: player[action].direction,
              count: player[action].count,
              inputThresh: directionalInputThresh,
            });
          } else {
            logExecution("defendDirectionChange", {
              plyr_no: player.number,
              action: action,
              from: player[action].direction,
              to: inputDirection,
              count: player[action].count,
              inputThresh: directionalInputThresh,
            });
            directionChanged = true;
            popup(inputDirection, player[action].direction);
            player[action].direction = inputDirection;
            player[action].directionType = "slash";
          }
        } else {
          if (player[action].direction !== "none") {
            logExecution("defendDirectionChange", {
              plyr_no: player.number,
              action: action,
              from: player[action].direction,
              to: "none",
              count: player[action].count,
              inputThresh: directionalInputThresh,
            });
            directionChanged = true;
          }
          popup("none", player[action].direction);
          player[action].direction = "none";
          player[action].directionType = "thrust";
        }
      }
      // DIRECTIONAL ACTION INPUT THRESHOLD PASSED.
      else {
        if (input === true) {
          logExecution("defendInputAfterThresh", {
            plyr_no: player.number,
            action: action,
            inputDirections: inputDirections,
            currentDirection: player[action].direction,
            count: player[action].count,
            inputThresh: directionalInputThresh,
          });
        } else {
          if (player[action].direction === "" || player[action].directionType === "") {
            popup("none", player[action].direction);
            player[action].direction = "none";
            player[action].directionType = "thrust";
          }
        }
      }
    }
  }

  return {
    player: player,
    charging: charging,
    inputThresh: directionalInputThresh,
    directionChanged: directionChanged,
  };
}
