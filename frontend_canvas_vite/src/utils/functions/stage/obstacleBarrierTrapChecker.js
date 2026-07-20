export function obstacleBarrierTrapChecker(app, locationCell, ownerType) {
  const logTrapTrigger = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("trap.trigger", message, data, { fn: "obstacleBarrierTrapChecker" });
    }
  };
  const logTrapTimer = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("trap.timer", message, data, { fn: "obstacleBarrierTrapChecker" });
    }
  };
  const logTrapAction = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("trap.action", message, data, { fn: "obstacleBarrierTrapChecker" });
    }
  };
  const logTrapCount = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("trap.count", message, data, { fn: "obstacleBarrierTrapChecker" });
    }
  };
  const logOwnerTrapTrigger = (message, data) => {
    if (app?.globalLogger) {
      const type = ownerType === "barrier" ? "barrier.trapTriggers" : "obstacle.trapTriggers";
      app.globalLogger(type, message, data, { fn: "obstacleBarrierTrapChecker" });
    }
  };
  let trap = locationCell[ownerType].trap;
  // console.log("obstacleBarrierTrapChecker", trap);
  const executeTrapAction = () => {
    // console.log("executeTrapAction");
    if (trap.acting.state === true) {
      // console.log("trap is acting");
      if (trap.action === "attack") {
        if (trap.acting.count === trap.acting.peak) {
          // console.log("trap is acting: attack peak");

          if (trap.item.subType === "crossbow") {
            trap.acting.direction = trap.direction;
            trap.acting.directionType = "slash";

            if (trap.ammo > 0) {
              trap.ammo--;
              let result = app.projectileCreator(ownerType, locationCell[ownerType], "bolt");
              app.projectiles.push(result.projectile);
              app.getBoltTarget(result.projectile);
              trap = result.owner.trap;
            } else {
              logTrapAction("noAmmo", {
                ownerType,
                id: locationCell[ownerType].id,
                item: trap.item?.name,
              });
              if (trap.persistent === true) {
                logTrapAction("reloadPersistent", {
                  ownerType,
                  id: locationCell[ownerType].id,
                });
                let item = app.itemList.find((x) => {
                  return x.name === trap.itemNameRef;
                });
                trap.item = {
                  name: item.name,
                  amount: item.amount,
                  total: item.total,
                  type: item.type,
                  subType: item.subType,
                  effect: item.effect,
                };
                if (trap.item.effect.split("+")[0] === "ammo") {
                  trap.ammo = parseInt(trap.item.effect.split("+")[1]);
                }
              }
            }
          }
          if (trap.item.subType === "sword" || trap.item.subType === "spear") {
            app.meleeAttackPeak(ownerType, locationCell[ownerType]);
          }
        }
        if (trap.acting.count < trap.acting.limit) {
          // SET DIRECTION
          if (trap.acting.count === 0) {
            // let whatDirection = app.rnJesus(0, 4);
            let whatDirection = 0;
            switch (whatDirection) {
              case 0:
                trap.acting.direction = "none";
                trap.acting.directionType = "thrust";
                break;
              case 1:
                trap.acting.direction = "north";
                trap.acting.directionType = "slash";
                break;
              case 2:
                trap.acting.direction = "south";
                trap.acting.directionType = "slash";
                break;
              case 3:
                trap.acting.direction = "east";
                trap.acting.directionType = "slash";
                break;
              case 4:
                trap.acting.direction = "west";
                trap.acting.directionType = "slash";
                break;
              default:
                break;
            }
          }
          if (trap.item.subType === "crossbow") {
            trap.acting.direction = trap.direction;
            trap.acting.directionType = "slash";
          }

          trap.acting.count++;
          logTrapCount("acting", {
            ownerType,
            id: locationCell[ownerType].id,
            count: trap.acting.count,
            limit: trap.acting.limit,
            peak: trap.acting.peak,
          });

          if (trap.acting.count < trap.acting.peak) {
            // console.log("trap is acting: windup", trap.acting.count);
            higlightCell();
          }
          if (trap.acting.count > trap.acting.peak) {
            // console.log("trap is acting: cooldown", trap.acting.count);
          }

          // SET DIRECTIONAL ATTACK ANIMATIONS
          if (app.showDirectionalActionAnimation === true) {
            let dirAnimSetCalcMod = 5;
            let pullbackTime = 0;
            let releaseTime = 0;
            if (trap.acting.peak > 20) {
              pullbackTime = trap.acting.peak + dirAnimSetCalcMod - 20;
              releaseTime = trap.acting.peak + dirAnimSetCalcMod - 10;
            } else {
              pullbackTime = 1;
              releaseTime = Math.ceil((trap.acting.peak + dirAnimSetCalcMod) / 2);
            }

            if (trap.acting.count === pullbackTime) {
              trap = app.handleDirectionalActionAnimation(
                ownerType,
                "attacking",
                "pullback",
                locationCell,
                trap,
                releaseTime - pullbackTime,
                app.directionalAnimShape,
              );
            }
            if (trap.acting.count === releaseTime) {
              let toRemove = app.obstacleBarrierActionAnimationArray.findIndex((x) => {
                return x.locationCell === locationCell.number && x.ownerType === ownerType && x.action === "attacking";
              });
              app.obstacleBarrierActionAnimationArray.splice(toRemove, 1);
              trap = app.handleDirectionalActionAnimation(
                ownerType,
                "attacking",
                "release",
                locationCell,
                trap,
                // (trap.acting.limit-releaseTime)
                trap.acting.peak + dirAnimSetCalcMod - releaseTime,
                app.directionalAnimShape,
              );
              logTrapAction("attackPeak", {
                ownerType,
                id: locationCell[ownerType].id,
                action: trap.action,
              });
            }
          }

          // POPUPS
          if (
            !app.cellPopups.find(
              (x) => x.msg === "attacking" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y,
            )
          ) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: trap.acting.limit,
              type: "",
              position: "",
              msg: "attacking",
              color: "",
              img: "",
              cell: app.gridInfo.find((x) => x.number.x === locationCell.number.x && x.number.y === locationCell.number.y),
            });
          }
        }
        if (trap.acting.count >= trap.acting.limit) {
          trap.acting.count = 0;
          trap.acting.state = false;
          // trap.acting.direction = "";
          // trap.acting.directionType = "";
          logTrapAction("complete", {
            ownerType,
            id: locationCell[ownerType].id,
            action: trap.action,
          });
          app.cellPopups.splice(
            app.cellPopups.indexOf(
              app.cellPopups.find(
                (x) => x.msg === "attacking" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y,
              ),
            ),
            1,
          );

          let toRemove = app.obstacleBarrierActionAnimationArray.findIndex((x) => {
            return x.locationCell === locationCell.number && x.ownerType === ownerType && x.action === "attacking";
          });
          app.obstacleBarrierActionAnimationArray.splice(toRemove, 1);
        }
      } else {
        // apply non attack action here
        trap.acting.count = 0;
        trap.acting.state = false;
      }
    } else {
      trap.acting.state = true;
      // console.log("trap was triggered but hasnt started its action. start");
    }
  };
  const higlightCell = () => {
    if (!app.cellsToHighlight2.find((x) => x.number.x === trap.target.x && x.number.y === trap.target.y)) {
      app.cellsToHighlight2.push({
        number: {
          x: trap.target.x,
          y: trap.target.y,
        },
        count: 0,
        limit: 10,
      });
    }
  };
  const triggerTrap = (triggerType) => {
    if (trap.persistent) {
      if (trap.timer.enabled) {
        if (trap.timer.state === false) {
          trap.timer.state = true;
        }
        if (trap.timer.state === true) {
          if (trap.timer.count < trap.timer.limit) {
            trap.timer.count++;
            logTrapCount("timer", {
              ownerType,
              id: locationCell[ownerType].id,
              count: trap.timer.count,
              limit: trap.timer.limit,
            });
            higlightCell();
            if (trap.timer.count === 1) {
              logTrapTrigger("triggered", {
                ownerType,
                id: locationCell[ownerType].id,
                target: trap.target,
                triggerType,
              });
              logOwnerTrapTrigger("triggered", {
                ownerType,
                id: locationCell[ownerType].id,
                target: trap.target,
                triggerType,
              });
            }
            if (
              !app.cellPopups.find((x) => x.msg === "timer" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y)
            ) {
              app.cellPopups.push({
                state: false,
                count: 0,
                limit: trap.timer.limit,
                type: "",
                position: "",
                msg: "timer",
                color: "",
                img: "",
                cell: app.gridInfo.find((x) => x.number.x === locationCell.number.x && x.number.y === locationCell.number.y),
              });
            }
          }
          if (trap.timer.count >= trap.timer.limit) {
            trap.timer.count = 0;
            trap.timer.state = false;
            // console.log("persistent trap timer count finish", trap.timer.count);
            logTrapTimer("complete", {
              ownerType,
              id: locationCell[ownerType].id,
              target: trap.target,
            });
            executeTrapAction();
            if (
              app.cellPopups.find((x) => x.msg === "timer" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y)
            ) {
              app.cellPopups.splice(
                app.cellPopups.indexOf(
                  app.cellPopups.find(
                    (x) => x.msg === "timer" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y,
                  ),
                ),
                1,
              );
            }
          }
        }
      }
      if (!trap.timer.enabled) {
        executeTrapAction();
        higlightCell();
        // console.log("trap has been triggered at ", trap.target, "by", triggerType);
        logTrapTrigger("triggered", {
          ownerType,
          id: locationCell[ownerType].id,
          target: trap.target,
          triggerType,
        });
        logOwnerTrapTrigger("triggered", {
          ownerType,
          id: locationCell[ownerType].id,
          target: trap.target,
          triggerType,
        });
      }
    }
    if (trap.persistent === false) {
      if (trap.remaining <= 0) {
        trap.state = false;
        logTrapAction("disabledNoRemainingFires", {
          ownerType,
          id: locationCell[ownerType].id,
        });
      }
      if (trap.remaining > 0) {
        if (trap.timer.enabled) {
          if (trap.timer.state === false) {
            trap.timer.state = true;
          }
          if (trap.timer.state === true) {
            if (trap.timer.count < trap.timer.limit) {
              trap.timer.count++;
              higlightCell();
              // console.log("limited trap timer count up", trap.timer.count);
              if (trap.timer.count === 1) {
                logTrapTrigger("triggered", {
                  ownerType,
                  id: locationCell[ownerType].id,
                  target: trap.target,
                  triggerType,
                });
                logOwnerTrapTrigger("triggered", {
                  ownerType,
                  id: locationCell[ownerType].id,
                  target: trap.target,
                  triggerType,
                });
              }
              if (
                !app.cellPopups.find(
                  (x) => x.msg === "timer" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y,
                )
              ) {
                app.cellPopups.push({
                  state: false,
                  count: 0,
                  limit: trap.timer.limit,
                  type: "",
                  position: "",
                  msg: "timer",
                  color: "",
                  img: "",
                  cell: app.gridInfo.find((x) => x.number.x === locationCell.number.x && x.number.y === locationCell.number.y),
                });
              }
            }
            if (trap.timer.count >= trap.timer.limit) {
              trap.timer.count = 0;
              trap.timer.state = false;
              executeTrapAction();
              trap.remaining--;
              logTrapCount("remaining", {
                ownerType,
                id: locationCell[ownerType].id,
                remaining: trap.remaining,
              });
              if (
                app.cellPopups.find(
                  (x) => x.msg === "timer" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y,
                )
              ) {
                app.cellPopups.splice(
                  app.cellPopups.indexOf(
                    app.cellPopups.find(
                      (x) => x.msg === "timer" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y,
                    ),
                  ),
                  1,
                );
              }
            }
          }
        }
        if (!trap.timer.enabled) {
          executeTrapAction();
          higlightCell();
          trap.remaining--;
          logTrapCount("remaining", {
            ownerType,
            id: locationCell[ownerType].id,
            remaining: trap.remaining,
          });
        }
      }
    }
  };

  if (trap.state === true) {
    if (trap.acting.state === true) {
      executeTrapAction();
    } else {
      let triggered = false;
      for (const plyr of app.players) {
        if (plyr.ai.state !== true || plyr.team === app.players[0].team) {
          if (plyr.currentPosition.cell.number.x === trap.target.x && plyr.currentPosition.cell.number.y === trap.target.y) {
            triggerTrap("player");
            triggered = true;
          }
        }
      }
      if (trap.trigger.type !== "player") {
        for (const elem of app.gridInfo) {
          if (elem.obstacle.state === true && elem.number.x === trap.target.x && elem.number.y === trap.target.y) {
            triggerTrap("obstacle");
            triggered = true;
          }
        }
      }

      if (triggered === false && trap.timer.enabled && trap.timer.state === true) {
        logTrapTrigger("disengaged", {
          ownerType,
          id: locationCell[ownerType].id,
          target: trap.target,
        });
        trap.timer.count = 0;
        trap.timer.state = false;
        if (app.cellPopups.find((x) => x.msg === "timer" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y)) {
          app.cellPopups.splice(
            app.cellPopups.indexOf(
              app.cellPopups.find((x) => x.msg === "timer" && x.cell.number.x === locationCell.number.x && x.cell.number.y === locationCell.number.y),
            ),
            1,
          );
        }
      }
    }
  }
  locationCell[ownerType].trap = trap;
  return locationCell;
}
