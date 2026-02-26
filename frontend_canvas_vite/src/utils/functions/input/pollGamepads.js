export function pollGamepads(app) {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  // console.log('gamepads',gamepads,navigator.getGamepads ? navigator.getGamepads() : []);

  let connectedGamepadsCount = gamepads.filter((x) => x !== null).length;
  let connectedGamepads = gamepads.filter((x) => x !== null);
  for (const pad of connectedGamepads) {
    if (
      pad.id.substr(0, 11) === "Joy-Con (R)" ||
      pad.id.substr(0, 11) === "Joy-Con (L)"
    ) {
      connectedGamepads.splice(
        connectedGamepads.indexOf((x) => x.index === pad.index),
        1,
      );
    }
  }

  // console.log('connectedGamepads',connectedGamepads);

  let currentGamepadPlayer;
  let settingsGamepadPlayerCount = app.gamepadConfig.filter(
    (x) => x.input === "Gamepad",
  ).length;

  if (app.gamepadPollCounter.count1 === 0) {
    app.gamepadPollCounter.count1 = 1;
  } else {
    app.gamepadPollCounter.count1 = 0;
  }
  if (app.gamepadPollCounter.count2 === 0) {
    app.gamepadPollCounter.count2 = 1;
  } else {
    app.gamepadPollCounter.count2 = 0;
  }

  let keyPressed = [];
  let connectedGamepadIndexB = 0;
  console.log("app.gamepadConfig", app.gamepadConfig);
  for (const elem of app.gamepadConfig) {
    let indx = app.gamepadConfig.indexOf((x) => x.plyrNo === elem.plyrNo);

    if (elem.input === "Gamepad") {
      keyPressed.push({
        state: true,
        plyrNo: elem.plyrNo,
        keyPressed: {
          north: false,
          south: false,
          east: false,
          west: false,
          attack: false,
          defend: false,
          strafe: false,
          dodge: false,
          pull: false,
          kick: false,
          cycleArmor: false,
          discardWeapon: false,
          discardArmor: false,
          uiMenu: false,
          playerMenu: false,
          rotateRight: false,
          rotateLeft: false,
        },
      });

      app.players[elem.plyrNo - 1].strafing.state = false;

      if (app.connectedGamepadsInit !== true && connectedGamepads[0]) {
        if (connectedGamepads[connectedGamepadIndexB]) {
          elem.type = connectedGamepads[connectedGamepadIndexB].id.substr(0, 11);
          elem.id =
            connectedGamepads[connectedGamepadIndexB].id.substr(0, 11) +
            "_" +
            connectedGamepads[connectedGamepadIndexB].index;
          elem.mapping = connectedGamepads[connectedGamepadIndexB].mapping;
          elem.gamepadIndex = connectedGamepads[connectedGamepadIndexB].index;

          connectedGamepadIndexB++;
        }

        // console.log('app.gamepadConfig + connected gamepads',app.gamepadConfig,connectedGamepads,settingsGamepadPlayerCount);

        if (
          app.gamepadConfig.filter((x) => x.id !== "").length ===
          settingsGamepadPlayerCount
        ) {
          app.connectedGamepadsInit = true;
        }
      }
    } else {
      // dummy object for setting global keypressed by index
      keyPressed.push({
        state: false,
        plyrNo: elem.plyrNo,
        keyPressed: {
          north: false,
          south: false,
          east: false,
          west: false,
          attack: false,
          defend: false,
          strafe: false,
          dodge: false,
          pull: false,
          kick: false,
          cycleArmor: false,
          discardWeapon: false,
          discardArmor: false,
          uiMenu: false,
          playerMenu: false,
          rotateRight: false,
          rotateLeft: false,
        },
      });
    }
  }
  connectedGamepadIndexB = 0;

  let showSettingsKeyPressState = false;

  let gamepadEngaged = false;
  // for(let g = 0; g < gamepads.length; g++) {
  for (let g = 0; g < connectedGamepads.length; g++) {
    const gp = connectedGamepads[g];

    if (gp) {
      // console.log('gp',gp);
      let gamepadConfigRef = app.gamepadConfig.find((x) => x.gamepadIndex === gp.index);

      if (gamepadConfigRef) {
        currentGamepadPlayer = gamepadConfigRef.plyrNo;
        const keyPressedIndex = currentGamepadPlayer - 1;

        if (
          gp.id.substr(0, 11) !== "Joy-Con (R)" &&
          gp.id.substr(0, 11) !== "Joy-Con (L)"
        ) {
          // CHECK BUTTONS!!
          for (const btn of gp.buttons) {
            if (btn.pressed === true) {
              // DEBUGGING
              if (
                // b btn
                gp.buttons.indexOf(btn) === 0 ||
                // a btn
                gp.buttons.indexOf(btn) === 1 ||
                // y btn
                gp.buttons.indexOf(btn) === 2 ||
                // x btn
                gp.buttons.indexOf(btn) === 3 ||
                // l btn
                gp.buttons.indexOf(btn) === 4 ||
                // r btn
                gp.buttons.indexOf(btn) === 5 ||
                // l trigger
                gp.buttons.indexOf(btn) === 6 ||
                // r trigger
                gp.buttons.indexOf(btn) === 7 ||
                // - btn
                gp.buttons.indexOf(btn) === 8 ||
                // + btn
                gp.buttons.indexOf(btn) === 9 ||
                // l stick press
                gp.buttons.indexOf(btn) === 10 ||
                // r stick press
                gp.buttons.indexOf(btn) === 11 ||
                // dpad up
                gp.buttons.indexOf(btn) === 12 ||
                // dpad down
                gp.buttons.indexOf(btn) === 13 ||
                // dpad left
                gp.buttons.indexOf(btn) === 14 ||
                // dpad right
                gp.buttons.indexOf(btn) === 15
              ) {
                // console.log('player '+currentGamepadPlayer+' btn ',gp.buttons.indexOf(btn),' pressed');
                // console.log('gp',gp);
                gamepadEngaged = true;
              }

              switch (gp.buttons.indexOf(btn)) {
                case 0:
                  // b btn
                  // console.log('player '+currentGamepadPlayer+' defend btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.defend = true;
                  break;
                case 1:
                  // a btn
                  // console.log('player '+currentGamepadPlayer+' attack btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.attack = true;
                  break;
                case 2:
                  // y btn
                  // console.log('player '+currentGamepadPlayer+' strafe btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.strafe = true;
                  break;
                case 3:
                  // x btn
                  // console.log('player '+currentGamepadPlayer+' dodge btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.dodge = true;
                  break;
                case 4:
                  // l btn
                  // console.log('player '+currentGamepadPlayer+' discard weapon btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.discardWeapon = true;
                  break;
                case 5:
                  // r btn
                  if (app.players[currentGamepadPlayer - 1].dead.state === true) {
                    app.respawn(app.playerscurrentGamepadPlayer - 1);
                    // console.log('player '+currentGamepadPlayer+' cycle weapon btn pressed: RESPAWN');
                  } else {
                    // console.log('player '+currentGamepadPlayer+' cycle weapon btn pressed');
                    keyPressed[keyPressedIndex].keyPressed.cycleWeapon = true;
                  }
                  break;
                case 6:
                  // l trigger
                  // console.log('player '+currentGamepadPlayer+' discard armor btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.discardArmor = true;
                  break;
                case 7:
                  // r trigger
                  // console.log('player '+currentGamepadPlayer+' cycle armor btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.cycleArmor = true;
                  break;
                case 8:
                  // - btn
                  showSettingsKeyPressState = true;
                  break;
                case 9:
                  // + btn
                  app.gameReset("soft");
                  break;
                case 10:
                  // l stick press
                  break;
                case 11:
                  // r stick press
                  break;
                case 12:
                  // dpad up
                  // console.log('player '+currentGamepadPlayer+' kick btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.kick = true;
                  break;
                case 13:
                  // dpad down
                  // console.log('player '+currentGamepadPlayer+' pull btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.pull = true;
                  break;
                case 14:
                  // dpad left
                  // console.log('player '+currentGamepadPlayer+' ui menu toggle btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.uiMenu = true;
                  break;
                case 15:
                  // dpad right
                  // console.log('player '+currentGamepadPlayer+' player menu toggle btn pressed');
                  keyPressed[keyPressedIndex].keyPressed.playerMenu = true;
                  break;
                default:
              }
            }
          }

          // CHECK AXES!!
          // DEBUGGING
          // axes 0(x),1(y) == left stick, 2(x),3(y) == right stick
          for (const axis of gp.axes) {
            if (axis !== 0) {
              if (gp.axes.indexOf(axis) === 0) {
                // console.log('player '+currentGamepadPlayer+' left stick x axis value',axis.toFixed(2));
              }
              if (gp.axes.indexOf(axis) === 1) {
                // console.log('player '+currentGamepadPlayer+' left stick y axis value',axis.toFixed(2));
              }
              if (gp.axes.indexOf(axis) === 2) {
                // console.log('player '+currentGamepadPlayer+' right stick x axis value',axis.toFixed(2));
              }
              if (gp.axes.indexOf(axis) === 3) {
                // console.log('player '+currentGamepadPlayer+' right stick y axis value',axis.toFixed(2));
              }

              // console.log('gp',gp);
            }
          }

          const getAxesDirection = (x, y) => {
            let dir;
            let magnitude;

            if (x < -0.5 && y < -0.5) dir = "up-left";
            else if (x < -0.5 && y >= -0.5 && y <= 0.5) dir = "left";
            else if (x < -0.5 && y > 0.5) dir = "down-left";
            else if (x >= -0.5 && x <= 0.5 && y < -0.5) dir = "up";
            else if (x >= -0.5 && x <= 0.5 && y >= -0.5 && y <= 0.5) dir = "neutral";
            else if (x >= -0.5 && x <= 0.5 && y > 0.5) dir = "down";
            else if (x > 0.5 && y < -0.5) dir = "up-right";
            else if (x > 0.5 && y >= -0.5 && y <= 0.5) dir = "right";
            else if (x > 0.5 && y > 0.5) dir = "down-right";

            // ALTERNATE METHOD, 2ND W/ MAGNITUDE
            // if (Math.abs(x) > Math.abs(y)) {
            //   if (x < -0.5 && y < -0.5) dir = 'up-left';
            //   else if (x < -0.5 && y > 0.5) dir = 'down-left';
            //   else if (x > 0.5 && y < -0.5) dir = 'up-right';
            //   else if (x > 0.5 && y > 0.5) dir = 'down-right';
            //   else if (x < -0.5) dir = 'left';
            //   else dir = 'right';
            // } else {
            //   if (x < -0.5 && y < -0.5) dir = 'up-left';
            //   else if (x < -0.5 && y > 0.5) dir = 'down-left';
            //   else if (x > 0.5 && y < -0.5) dir = 'up-right';
            //   else if (x > 0.5 && y > 0.5) dir = 'down-right';
            //   else if (y < -0.5) dir = 'up';
            //   else dir = 'down';
            // }
            //
            // if (Math.abs(x) > Math.abs(y)) {
            //    if (x < -0.5 && y < -0.5) {
            //       dir = 'up-left';
            //       magnitude = Math.sqrt(x*x + y*y);
            //     }
            //    else if (x < -0.5 && y > 0.5) {
            //       dir = 'down-left';
            //       magnitude = Math.sqrt(x*x + y*y);
            //     }
            //    else if (x > 0.5 && y < -0.5) {
            //       dir = 'up-right';
            //       magnitude = Math.sqrt(x*x + y*y);
            //     }
            //    else if (x > 0.5 && y > 0.5) {
            //       dir = 'down-right';
            //       magnitude = Math.sqrt(x*x + y*y);
            //     }
            //    else if (x < -0.5) {
            //       dir = 'left';
            //       magnitude = Math.abs(x);
            //     }
            //    else {
            //       dir = 'right';
            //       magnitude = Math.abs(x);
            //     }
            //  } else {
            //    if (x < -0.5 && y < -0.5) {
            //       dir = 'up-left';
            //       magnitude = Math.sqrt(x*x + y*y);
            //     }
            //    else if (x < -0.5 && y > 0.5) {
            //       dir = 'down-left';
            //       magnitude = Math.sqrt(x*x + y*y);
            //     }
            //    else if (x > 0.5 && y < -0.5) {
            //       dir = 'up-right';
            //       magnitude = Math.sqrt(x*x + y*y);
            //     }
            //    else if (x > 0.5 && y > 0.5) {
            //       dir = 'down-right';
            //       magnitude = Math.sqrt(x*x + y*y);
            //     }
            //    else if (y < -0.5) {
            //       dir = 'up';
            //       magnitude = Math.abs(y);
            //     }
            //    else {
            //       dir = 'down';
            //       magnitude = Math.abs(y);
            //     }
            //  }

            // only return direction if magnitude is more than a a certain amount
            if (!dir) {
              dir = "neutral";
            }
            if (!magnitude) {
              magnitude = 0;
            }

            return { direction: dir, magnitude: magnitude };
          };
          let preDirection;
          let direction;
          let x;
          let y;

          // LEFT ANALOG STICK (MOVE, TURN, PUSH ETC)
          if (gp.axes[0] !== 0 || gp.axes[1] !== 0) {
            x = gp.axes[0];
            y = gp.axes[1];
            preDirection = getAxesDirection(x, y).direction;
            switch (preDirection) {
              case "up":
              case "up-right":
                direction = "north";
                break;
              case "left":
              case "up-left":
                direction = "west";
                break;
              case "down":
              case "down-left":
                direction = "south";
                break;
              case "right":
              case "down-right":
                direction = "east";
                break;
              default:
            }
            if (direction) {
              gamepadEngaged = true;
              keyPressed[keyPressedIndex].keyPressed[direction] = true;
            }
            // console.log('player ',currentGamepadPlayer,' gamepad left stick to ',preDirection,direction,' magnitude',getAxesDirection(x,y).magnitude);
          }

          // RIGHT ANALOG STICK (STAGE ROTATE)
          if (gp.axes[2] !== 0 || gp.axes[3] !== 0) {
            x = gp.axes[2];
            y = gp.axes[3];
            preDirection = getAxesDirection(x, y).direction;
            switch (preDirection) {
              case "up":
              case "up-right":
                direction = "north";
                break;
              case "left":
              case "up-left":
                direction = "west";
                break;
              case "down":
              case "down-left":
                direction = "south";
                break;
              case "right":
              case "down-right":
                direction = "east";
                break;
              default:
            }
            if (direction) {
              gamepadEngaged = true;
              // keyPressed[keyPressedIndex].keyPressed[direction] = true;
              if (direction === "east") {
                keyPressed[keyPressedIndex].keyPressed.rotateRight = true;
              }
              if (direction == "west") {
                keyPressed[keyPressedIndex].keyPressed.rotateLeft = true;
              }
            }

            // console.log('player ',currentGamepadPlayer,' gamepad right stick to ',preDirection,direction,' magnitude',getAxesDirection(x,y).magnitude);
          }
        }

        // NOT USING PRO CONTROLLER OR BOTH JOYCONS
        else {
          if (
            gp.id.substr(0, 11) === "Joy-Con (R)" ||
            gp.id.substr(0, 11) === "Joy-Con (L)"
          ) {
            console.log(
              "can't use single joycon. please re-configure controller/gamepad settings",
            );
            keyPressed[keyPressedIndex].state = false;
            keyPressed[keyPressedIndex].keyPressed = {
              north: false,
              south: false,
              east: false,
              west: false,
              attack: false,
              defend: false,
              strafe: false,
              dodge: false,
              pull: false,
              kick: false,
              cycleArmor: false,
              discardWeapon: false,
              discardArmor: false,
              uiMenu: false,
              playerMenu: false,
              rotateRight: false,
              rotateLeft: false,
            };
            showSettingsKeyPressState = true;
            app.connectedGamepadsInit = false;
          }
        }
      } else {
        // console.log('found a connected gamepad not assigned to a player. do nothing',gp.index);
      }
    }
  }

  let player = app.players[currentGamepadPlayer - 1];

  // if (player && gamepadEngaged === true) {
  if (player) {
    if (keyPressed[currentGamepadPlayer - 1].state === true) {
      app.keyPressed[currentGamepadPlayer - 1] =
        keyPressed[currentGamepadPlayer - 1].keyPressed;
      // console.log('xxx',app.keyPressed[currentGamepadPlayer-1]);
    }

    if (showSettingsKeyPressState === true) {
      app.showSettingsKeyPress.state = showSettingsKeyPressState;
    }

    if (player.defending.state === true && player.defending.count === 0) {
      if (app.keyPressed[currentGamepadPlayer - 1].defend === false) {
        console.log("player", player.number, " stop defending1 @ gamepad");
        // player.defending.state = false;
        // player.defending.count = 0;
        // player.defending.decay.state = false;
        // player.defending.decay.count = 0;
      }
    }

    // STRAFE CHECKS
    if (
      keyPressed[currentGamepadPlayer - 1].keyPressed.strafe === false &&
      app.players[currentGamepadPlayer - 1].moving.state === true &&
      app.players[currentGamepadPlayer - 1].strafing.state === true
    ) {
      app.players[currentGamepadPlayer - 1].strafeReleaseHook = true;
    }
    if (
      keyPressed[currentGamepadPlayer - 1].keyPressed.strafe === false &&
      app.players[currentGamepadPlayer - 1].moving.state !== true &&
      app.keyPressed[currentGamepadPlayer - 1].strafe === true
    ) {
      app.players[currentGamepadPlayer - 1].strafeReleaseHook = true;
    } else {
      app.players[currentGamepadPlayer - 1].strafing.state =
        keyPressed[currentGamepadPlayer - 1].keyPressed.strafe;
    }
  }
}
