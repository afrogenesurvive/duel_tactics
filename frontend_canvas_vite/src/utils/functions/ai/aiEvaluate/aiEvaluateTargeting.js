function aiEvaluateTargeting(app, plyr) {
  const logEval = (message, data = {}) => {
    app.globalLogger("ai.evaluate", message, { plyr_no: plyr.number, ...data }, { fn: "aiEvaluateTargeting" });
  };

  // SET TARGET!!
  // determine who is closer to me
  if (plyr.ai.targetSet !== true) {
    let targetAlive = false;
    let targetPlayer;

    targetPlayer = app.players[app.aiTarget - 1];
    if (targetPlayer.dead.state !== true && targetPlayer.falling.state !== true && targetPlayer.respawn !== true) {
      targetAlive = true;
    } else {
      targetAlive = false;
    }

    if (targetAlive === true) {
      logEval("setTarget", { target: app.aiTarget });

      plyr.ai.targetPlayer = {
        number: targetPlayer.number,
        currentPosition: {
          x: targetPlayer.currentPosition.cell.number.x,
          y: targetPlayer.currentPosition.cell.number.y,
        },
        target: {
          number1: {
            x: targetPlayer.target.cell1.number.x,
            y: targetPlayer.target.cell1.number.y,
          },
          number2: {
            x: targetPlayer.target.cell2.number.x,
            y: targetPlayer.target.cell2.number.y,
          },
        },
        action: targetPlayer.action,
      };
      plyr.ai.targetSet = true;
      // console.log('player',plyr.number,'setting target...player',targetPlayer.number,'my mission',plyr.ai.mission);
      // app.getTarget(plyr)
    } else {
      // console.log('no targets availible for ai');
    }
  }

  // TARGET AQUISITION & RANGE FINDING!!
  let targetInRange = false;

  if (plyr.ai.targetSet === true) {
    for (const plyr2 of app.players) {
      if (plyr2.ai.state !== true) {
        // CHECK FOR IN WEAPON RANGE!!
        if (plyr.currentWeapon.type === "crossbow") {
          let range = plyr.ai.pathfindingRanges.crossbow + 2;

          if (plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x) {
            if (
              (plyr2.currentPosition.cell.number.y < plyr.currentPosition.cell.number.y + range &&
                plyr2.currentPosition.cell.number.y > plyr.currentPosition.cell.number.y) ||
              (plyr2.currentPosition.cell.number.y > plyr.currentPosition.cell.number.y - range &&
                plyr2.currentPosition.cell.number.y < plyr.currentPosition.cell.number.y)
            ) {
              let clearToShoot = app.aiBoltPathCheck(plyr);
              if (
                clearToShoot === true &&
                plyr.ai.targetPlayer.number === plyr2.number &&
                plyr.ai.mission !== "retrieve" &&
                plyr.ai.mission !== "retreat"
              ) {
                targetInRange = true;
                // console.log('target in bow range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                plyr.ai.currentInstruction = 0;
              }
              if (clearToShoot !== true) {
                logEval("targetRangedWeaponObstructed", { weapon_type: "crossbow" });
              } else if (
                plyr.ai.mission !== "pursue" &&
                plyr.ai.mission !== "engage" &&
                plyr.ai.mission !== "retrieve" &&
                plyr.ai.mission !== "retreat"
              ) {
                plyr.ai.currentInstruction = 0;
                // console.log('alternative target in range. Switching');
                logEval("alternativeTargetInRange. Switch", { weapon_type: "crossbow", target: plyr2.number });

                if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                  plyr.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "alarmed",
                    img: "",
                  });
                }

                plyr.ai.targetPlayer = {
                  number: plyr2.number,
                  currentPosition: {
                    x: plyr2.currentPosition.cell.number.x,
                    y: plyr2.currentPosition.cell.number.y,
                  },
                  target: {
                    number1: {
                      x: plyr2.target.cell1.number.x,
                      y: plyr2.target.cell1.number.y,
                    },
                    number2: {
                      x: plyr2.target.cell2.number.x,
                      y: plyr2.target.cell2.number.y,
                    },
                  },
                  action: plyr2.action,
                };
              }
            }
          }

          if (plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y) {
            if (
              (plyr2.currentPosition.cell.number.x < plyr.currentPosition.cell.number.x + range &&
                plyr2.currentPosition.cell.number.x > plyr.currentPosition.cell.number.x) ||
              (plyr2.currentPosition.cell.number.x > plyr.currentPosition.cell.number.x - range &&
                plyr2.currentPosition.cell.number.x < plyr.currentPosition.cell.number.x)
            ) {
              let clearToShoot = app.aiBoltPathCheck(plyr);
              if (
                clearToShoot === true &&
                plyr.ai.targetPlayer.number === plyr2.number &&
                plyr.ai.mission !== "retrieve" &&
                plyr.ai.mission !== "retreat"
              ) {
                targetInRange = true;
                // console.log('target in bow range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                plyr.ai.currentInstruction = 0;
              }
              if (clearToShoot !== true) {
                logEval("targetRangedWeaponObstructed", { weapon_type: "crossbow" });
              } else if (
                plyr.ai.mission !== "pursue" &&
                plyr.ai.mission !== "engage" &&
                plyr.ai.mission !== "retrieve" &&
                plyr.ai.mission !== "retreat"
              ) {
                plyr.ai.currentInstruction = 0;
                // console.log('alternative target in range. Switching');
                logEval("alternativeTargetInRange. Switch", { weapon_type: "crossbow", target: plyr2.number });

                if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                  plyr.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "alarmed",
                    img: "",
                  });
                }

                plyr.ai.targetPlayer = {
                  number: plyr2.number,
                  currentPosition: {
                    x: plyr2.currentPosition.cell.number.x,
                    y: plyr2.currentPosition.cell.number.y,
                  },
                  target: {
                    number1: {
                      x: plyr2.target.cell1.number.x,
                      y: plyr2.target.cell1.number.y,
                    },
                    number2: {
                      x: plyr2.target.cell2.number.x,
                      y: plyr2.target.cell2.number.y,
                    },
                  },
                  action: plyr2.action,
                };
              }
            }
          }
        }

        if (plyr.currentWeapon.type === "spear") {
          let range = plyr.ai.pathfindingRanges.spear;
          // if (app.aiCarefulRange === true) {
          //   // console.log('careful range finding');
          //   range = 3;
          // }

          if (plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x) {
            if (plyr.ai.safeRange === true) {
              if (
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + range ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - range ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + (range - 1) ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - (range - 1) ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + (range - 2) ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - (range - 2)
              ) {
                let clearToShoot = app.aiBoltPathCheck(plyr);
                if (
                  clearToShoot === true &&
                  plyr.ai.targetPlayer.number === plyr2.number &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  targetInRange = true;
                  // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                }
                if (clearToShoot !== true) {
                  logEval("targetSpearObstructed", { weapon_type: "spear" });
                } else if (
                  plyr.ai.mission !== "pursue" &&
                  plyr.ai.mission !== "engage" &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // console.log('alternative target in range. Switching');

                  if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                    plyr.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "alarmed",
                      img: "",
                    });
                  }

                  plyr.ai.targetPlayer = {
                    number: plyr2.number,
                    currentPosition: {
                      x: plyr2.currentPosition.cell.number.x,
                      y: plyr2.currentPosition.cell.number.y,
                    },
                    target: {
                      number1: {
                        x: plyr2.target.cell1.number.x,
                        y: plyr2.target.cell1.number.y,
                      },
                      number2: {
                        x: plyr2.target.cell2.number.x,
                        y: plyr2.target.cell2.number.y,
                      },
                    },
                    action: plyr2.action,
                  };
                }
              }
            } else {
              if (
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + range ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - range
              ) {
                let clearToShoot = app.aiBoltPathCheck(plyr);
                if (
                  clearToShoot === true &&
                  plyr.ai.targetPlayer.number === plyr2.number &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  targetInRange = true;
                  // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                }
                if (clearToShoot !== true) {
                  logEval("targetSpearObstructed", { weapon_type: "spear" });
                } else if (
                  plyr.ai.mission !== "pursue" &&
                  plyr.ai.mission !== "engage" &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // console.log('alternative target in range. Switching');

                  if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                    plyr.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "alarmed",
                      img: "",
                    });
                  }

                  plyr.ai.targetPlayer = {
                    number: plyr2.number,
                    currentPosition: {
                      x: plyr2.currentPosition.cell.number.x,
                      y: plyr2.currentPosition.cell.number.y,
                    },
                    target: {
                      number1: {
                        x: plyr2.target.cell1.number.x,
                        y: plyr2.target.cell1.number.y,
                      },
                      number2: {
                        x: plyr2.target.cell2.number.x,
                        y: plyr2.target.cell2.number.y,
                      },
                    },
                    action: plyr2.action,
                  };
                }
              }
            }
          }

          if (plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y) {
            if (plyr.ai.safeRange === true) {
              if (
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + range ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - range ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + (range - 1) ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + (range - 1) ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - (range - 2) ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - (range - 2)
              ) {
                let clearToShoot = app.aiBoltPathCheck(plyr);
                if (
                  clearToShoot === true &&
                  plyr.ai.targetPlayer.number === plyr2.number &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  targetInRange = true;
                  // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                }
                if (clearToShoot !== true) {
                  logEval("targetSpearObstructed", { weapon_type: "spear" });
                } else if (
                  plyr.ai.mission !== "pursue" &&
                  plyr.ai.mission !== "engage" &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // console.log('alternative target in range. Switching');

                  if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                    plyr.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "alarmed",
                      img: "",
                    });
                  }

                  plyr.ai.targetPlayer = {
                    number: plyr2.number,
                    currentPosition: {
                      x: plyr2.currentPosition.cell.number.x,
                      y: plyr2.currentPosition.cell.number.y,
                    },
                    target: {
                      number1: {
                        x: plyr2.target.cell1.number.x,
                        y: plyr2.target.cell1.number.y,
                      },
                      number2: {
                        x: plyr2.target.cell2.number.x,
                        y: plyr2.target.cell2.number.y,
                      },
                    },
                    action: plyr2.action,
                  };
                }
              }
            } else {
              if (
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + 1 ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - 1 ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + 2 ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - 2
                // plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + range ||
                // plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - range
              ) {
                let clearToShoot = app.aiBoltPathCheck(plyr);
                if (
                  clearToShoot === true &&
                  plyr.ai.targetPlayer.number === plyr2.number &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  targetInRange = true;
                  // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                }
                if (clearToShoot !== true) {
                  logEval("targetSpearObstructed", { weapon_type: "spear" });
                } else if (
                  plyr.ai.mission !== "pursue" &&
                  plyr.ai.mission !== "engage" &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // console.log('alternative target in range. Switching');

                  if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                    plyr.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "alarmed",
                      img: "",
                    });
                  }

                  plyr.ai.targetPlayer = {
                    number: plyr2.number,
                    currentPosition: {
                      x: plyr2.currentPosition.cell.number.x,
                      y: plyr2.currentPosition.cell.number.y,
                    },
                    target: {
                      number1: {
                        x: plyr2.target.cell1.number.x,
                        y: plyr2.target.cell1.number.y,
                      },
                      number2: {
                        x: plyr2.target.cell2.number.x,
                        y: plyr2.target.cell2.number.y,
                      },
                    },
                    action: plyr2.action,
                  };
                }
              }
            }
          }
        }

        if (plyr.currentWeapon.type === "sword" || plyr.currentWeapon.type === "") {
          let range2 = 1;
          if (plyr.ai.safeRange === true) {
            // console.log('careful range finding');
            range2 = 2;
          }

          if (plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x) {
            if (plyr.ai.safeRange === true) {
              if (
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + range2 ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - range2 ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + (range2 - 1) ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - (range2 - 1)
              ) {
                if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== "retrieve" && plyr.ai.mission !== "retreat") {
                  targetInRange = true;
                  // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                } else if (
                  plyr.ai.mission !== "pursue" &&
                  plyr.ai.mission !== "engage" &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // console.log('alternative target in range. Switching');

                  if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                    plyr.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "alarmed",
                      img: "",
                    });
                  }

                  plyr.ai.targetPlayer = {
                    number: plyr2.number,
                    currentPosition: {
                      x: plyr2.currentPosition.cell.number.x,
                      y: plyr2.currentPosition.cell.number.y,
                    },
                    target: {
                      number1: {
                        x: plyr2.target.cell1.number.x,
                        y: plyr2.target.cell1.number.y,
                      },
                      number2: {
                        x: plyr2.target.cell2.number.x,
                        y: plyr2.target.cell2.number.y,
                      },
                    },
                    action: plyr2.action,
                  };
                }
              }
            } else {
              if (
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + range2 ||
                plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - range2
              ) {
                if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== "retrieve" && plyr.ai.mission !== "retreat") {
                  targetInRange = true;
                  // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                } else if (
                  plyr.ai.mission !== "pursue" &&
                  plyr.ai.mission !== "engage" &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // console.log('alternative target in range. Switching');

                  if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                    plyr.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "alarmed",
                      img: "",
                    });
                  }

                  plyr.ai.targetPlayer = {
                    number: plyr2.number,
                    currentPosition: {
                      x: plyr2.currentPosition.cell.number.x,
                      y: plyr2.currentPosition.cell.number.y,
                    },
                    target: {
                      number1: {
                        x: plyr2.target.cell1.number.x,
                        y: plyr2.target.cell1.number.y,
                      },
                      number2: {
                        x: plyr2.target.cell2.number.x,
                        y: plyr2.target.cell2.number.y,
                      },
                    },
                    action: plyr2.action,
                  };
                }
              }
            }
          }

          if (plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y) {
            if (plyr.ai.safeRange === true) {
              if (
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + range2 ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - range2 ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + (range2 - 1) ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - (range2 - 1)
              ) {
                if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== "retrieve" && plyr.ai.mission !== "retreat") {
                  targetInRange = true;
                  // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                } else if (
                  plyr.ai.mission !== "pursue" &&
                  plyr.ai.mission !== "engage" &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // console.log('alternative target in range. Switching');

                  if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                    plyr.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "alarmed",
                      img: "",
                    });
                  }

                  plyr.ai.targetPlayer = {
                    number: plyr2.number,
                    currentPosition: {
                      x: plyr2.currentPosition.cell.number.x,
                      y: plyr2.currentPosition.cell.number.y,
                    },
                    target: {
                      number1: {
                        x: plyr2.target.cell1.number.x,
                        y: plyr2.target.cell1.number.y,
                      },
                      number2: {
                        x: plyr2.target.cell2.number.x,
                        y: plyr2.target.cell2.number.y,
                      },
                    },
                    action: plyr2.action,
                  };
                }
              }
            } else {
              if (
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + range2 ||
                plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - range2
              ) {
                if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== "retrieve" && plyr.ai.mission !== "retreat") {
                  targetInRange = true;
                  // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                } else if (
                  plyr.ai.mission !== "pursue" &&
                  plyr.ai.mission !== "engage" &&
                  plyr.ai.mission !== "retrieve" &&
                  plyr.ai.mission !== "retreat"
                ) {
                  // console.log('alternative target in range. Switching');

                  if (!plyr.popups.find((x) => x.msg === "alarmed")) {
                    plyr.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "alarmed",
                      img: "",
                    });
                  }

                  plyr.ai.targetPlayer = {
                    number: plyr2.number,
                    currentPosition: {
                      x: plyr2.currentPosition.cell.number.x,
                      y: plyr2.currentPosition.cell.number.y,
                    },
                    target: {
                      number1: {
                        x: plyr2.target.cell1.number.x,
                        y: plyr2.target.cell1.number.y,
                      },
                      number2: {
                        x: plyr2.target.cell2.number.x,
                        y: plyr2.target.cell2.number.y,
                      },
                    },
                    action: plyr2.action,
                  };
                }
              }
            }
          }
        }
      }
    }
  }

  // TARGET IN RANGE, SWITCH TO MISSION ENGAGE
  if (targetInRange === true) {
    // console.log('target in range. switch to engage',plyr.ai.targetSet);
    if (plyr.ai.mission === "patrol") {
      plyr.ai.patrolling.checkin = undefined;
    }

    if (plyr.ai.mission === "defend") {
      plyr.ai.defending.checkin = undefined;
    }

    plyr.ai.prevMission = plyr.ai.mission;
    if (plyr.ai.mission !== "retrieve" && plyr.ai.mission !== "retreat") {
      // console.log('player',plyr.number,'target in range. Engage!');

      plyr.ai.mission = "engage";

      if (!plyr.popups.find((x) => x.msg === "missionEngage")) {
        plyr.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "missionEngage",
          img: "",
        });
      }
    }

    if (plyr.ai.mission === "retrieve" || plyr.ai.mission === "retreat") {
      // console.log('...');
    }

    // plyr.ai.engaging.state = true;
  }

  // TARGET OUT OF RANGE, REVERT TO PRIMARY MISSION
  if (plyr.ai.mission === "engage" && targetInRange !== true) {
    // console.log('target out of range. reverting to primary mission',plyr.ai.primaryMission);

    plyr.ai.mission = plyr.ai.primaryMission;

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

    app.aiResetRanges(plyr);
    if (plyr.ai.primaryMission === "defend") {
      logEval("defendCheckin", { checkin: plyr.ai.defending.checkin });
      plyr.ai.patrolling.checkin = undefined;
      plyr.ai.defending.state = true;
    }

    if (plyr.ai.primaryMission === "patrol") {
      // console.log('patrol',plyr.ai.patrolling.checkin);
      plyr.ai.defending.checkin = undefined;
      plyr.ai.patrolling.state = true;
    }
    // plyr.ai.engaging.state = false;
  }

  if (plyr.ai.targetAqcuiredReset === true) {
    plyr.ai.targetAcquired = false;
    plyr.ai.targetAqcuiredReset = false;
  }

  return plyr;
}
