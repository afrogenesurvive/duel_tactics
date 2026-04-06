export function aiEvaluate(app, plyr) {
  // console.log('aiEvaluate',plyr.ai.upgradeWeapon);
  // console.log('aiEvaluate',plyr.ai.organizing.dropped.state);
  const logEval = (message, data = {}) => {
    app.globalLogger("ai.evaluate", message, { plyr_no: plyr.number, ...data }, { fn: "aiEvaluate" });
  };

  const getCell = (x, y) => app.gridInfo.find((cell) => cell.number.x === x && cell.number.y === y);
  const checkJumpDestination = () => {
    const currentInstruction = plyr.ai.instructions?.[plyr.ai.currentInstruction];
    if (!currentInstruction || !currentInstruction.keyword || !currentInstruction.keyword.startsWith("jump_")) {
      return;
    }

    const dir = currentInstruction.keyword.split("_")[1];
    const offsets = {
      north: { x: 0, y: -1 },
      south: { x: 0, y: 1 },
      east: { x: 1, y: 0 },
      west: { x: -1, y: 0 },
    };
    const offset = offsets[dir];
    if (!offset) {
      return;
    }

    const originCell = getCell(plyr.currentPosition.cell.number.x, plyr.currentPosition.cell.number.y);
    const cell1 = getCell(plyr.currentPosition.cell.number.x + offset.x, plyr.currentPosition.cell.number.y + offset.y);
    const cell2 = getCell(plyr.currentPosition.cell.number.x + offset.x * 2, plyr.currentPosition.cell.number.y + offset.y * 2);

    if (!originCell || !cell1 || !cell2) {
      plyr.ai.resetInstructions = true;
      logEval("jumpDestInvalid", { dir: dir });
      return;
    }

    if (plyr.stamina.current < app.staminaCostRef.jump) {
      plyr.ai.resetInstructions = true;
      logEval("jumpNoStamina", { stamina: plyr.stamina.current });
      return;
    }

    const blockedByBarrier =
      (originCell.barrier.state === true && originCell.barrier.position === dir) ||
      (cell1.barrier.state === true && cell1.barrier.position === app.getOppositeDirection(dir)) ||
      (cell2.barrier.state === true && cell2.barrier.position === app.getOppositeDirection(dir));

    if (blockedByBarrier === true) {
      plyr.ai.resetInstructions = true;
      logEval("jumpDestBlockedBarrier", { dir: dir, cell2: cell2.number });
      return;
    }

    if (cell2.obstacle.state === true) {
      plyr.ai.resetInstructions = true;
      logEval("jumpDestBlockedObstacle", { dir: dir, cell2: cell2.number });
      return;
    }

    if (cell2.void.state === true || cell2.terrain.type === "deep") {
      plyr.ai.resetInstructions = true;
      logEval("jumpDestUnsafe", { dir: dir, cell2: cell2.number });
    }
  };

  // SOMEONE DIED, RESET AI TARGETS
  if (app.resetAiTarget.state === true) {
    logEval("someoneDiedResetTargets", { reset_player: app.resetAiTarget.player });
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
    for (const plyr of app.players) {
      if (plyr.ai.state === true && plyr.ai.targetSet === true && plyr.ai.targetPlayer.number === app.resetAiTarget.player) {
        app.aiResetRanges(plyr);

        if (plyr.attacking.state === true) {
          plyr.attacking.state = false;
          plyr.action = "idle";
          // app.attackedCancel(plyr)
          plyr.ai.targetSet = false;
          plyr.ai.targetAcquired = false;
          plyr.ai.mission = plyr.ai.primaryMission;
          plyr.ai.currentInstruction = 0;
          plyr.ai.pathArray = [];
          plyr.ai.instructions = [];

          // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
          //   plyr.popups.push(
          //     {
          //       state: false,
          //       count: 0,
          //       limit: 25,
          //       type: '',
          //       position: '',
          //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
          //       img: '',
          //
          //     }
          //   )
          // }
        }

        plyr.ai.targetSet = false;
        plyr.ai.targetPlayer = {
          number: undefined,
          currentPosition: {
            x: undefined,
            y: undefined,
          },
          target: {
            number1: {
              x: undefined,
              y: undefined,
            },
            number2: {
              x: undefined,
              y: undefined,
            },
          },
          action: "",
        };

        if (plyr.ai.mission === "pursue") {
          plyr.ai.targetSet = false;
          plyr.ai.targetAcquired = false;
          plyr.ai.mission = plyr.ai.primaryMission;
          plyr.ai.currentInstruction = 0;
          plyr.ai.pathArray = [];
          plyr.ai.instructions = [];

          // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
          //   plyr.popups.push(
          //     {
          //       state: false,
          //       count: 0,
          //       limit: 25,
          //       type: '',
          //       position: '',
          //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
          //       img: '',
          //
          //     }
          //   )
          // }
        }
      }
    }

    if (app.playerNumber > 1) {
      if (app.resetAiTarget.player === 1) {
        if (app.players[1].dead.state !== true && app.players[1].falling.state !== true && app.players[1].respawn !== true) {
          logEval("retargetPlayer", { target: 2 });
          app.aiTarget = 2;
          app.resetAiTarget.player = 0;
        } else {
          app.allPlayersDead = true;
        }
      }

      if (app.resetAiTarget.player === 2) {
        if (app.players[0].dead.state !== true && app.players[0].falling.state !== true && app.players[0].respawn !== true) {
          logEval("retargetPlayer", { target: 1 });
          app.aiTarget = 1;
          app.resetAiTarget.player = 0;
        } else {
          app.allPlayersDead = true;
        }
      }
    } else {
      app.allPlayersDead = true;
    }

    // app.resetAiTarget.state2 = true;
    app.resetAiTarget.state = false;
  }

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
    // console.log('still no targets availible for ai!!');
  }

  if (plyr.ai.mission !== "engage" && app.aiDeflectedCheck.includes(plyr.number === true)) {
    // console.log('!! AI DEFLECTED BUT NOT ENGAGED, CHECK CIRCUMSTANCES AND BEHAVIOR !!');
  }

  // ITEM LOGIC
  let fieldItemScan = [];
  for (const cell of app.gridInfo) {
    if (cell.item.name !== "") {
      fieldItemScan.push({
        name: cell.item.name,
        type: cell.item.type,
        subType: cell.item.subType,
        effect: cell.item.effect,
        location: { x: cell.number.x, y: cell.number.y },
      });
    }
  }

  let nerfItemPositions = [];
  for (const item of fieldItemScan) {
    switch (item.name) {
      case "moveSpeedDown":
        nerfItemPositions.push(item);
        break;
      case "hpDown":
        nerfItemPositions.push(item);
        break;
      case "focusDown":
        nerfItemPositions.push(item);
        break;
      case "strengthDown":
        nerfItemPositions.push(item);
        break;
    }
  }

  // console.log('fieldItemScan',fieldItemScan);
  // console.log('nerfItemPositions',nerfItemPositions);

  let weaponUpgradePriority = [];
  let armorUpgradePriority = [];

  if (plyr.ai.upgradeWeapon === true && plyr.ai.mission !== "retreat" && plyr.ai.mission !== "retrieve") {
    logEval("upgradeWeaponCheck", { mission: plyr.ai.mission });

    let weaponPriorityIndex = plyr.ai.organizing.weaponPriorityIndex;
    let havePriorityWeapon = true;
    weaponUpgradePriority = ["crossbow", "spear", "sword"];
    let inMyInventory = plyr.items.weapons.find((elem) => elem.type === weaponUpgradePriority[weaponPriorityIndex]);

    logEval("priorityWeapon", {
      weapon_type: weaponUpgradePriority[weaponPriorityIndex],
      index: weaponPriorityIndex,
    });

    if (plyr.currentWeapon.type === weaponUpgradePriority[weaponPriorityIndex]) {
      logEval("priorityWeaponIsCurrent", { weapon_type: plyr.currentWeapon.type });

      if (plyr.currentWeapon.type === "crossbow" && plyr.items.ammo === 0 && plyr.items.weapons.length < 2) {
        logEval("priorityRangedWeaponNoAmmo", { weapon_type: plyr.currentWeapon.type, ammo: plyr.items.ammo });
        if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
          plyr.ai.upgradeWeapon = false;
          logEval("priorityIndexMax w/ nothing to retrieve");
        } else {
          logEval("priorityWeaponNextCheck");
          plyr.ai.organizing.weaponPriorityIndex++;
        }
      } else {
        havePriorityWeapon = true;
        plyr.ai.upgradeWeapon = false;
      }
    } else {
      havePriorityWeapon = false;
    }

    if (inMyInventory && plyr.currentWeapon.type !== weaponUpgradePriority[weaponPriorityIndex]) {
      logEval("priorityWeaponInInventory. Switching", {
        current_weapon: plyr.currentWeapon,
        ammo: plyr.items.ammo,
        weapons: plyr.items.weapons,
      });

      if (plyr.currentWeapon.type === "crossbow" && plyr.items.ammo === 0 && plyr.items.weapons.length === 1) {
        logEval("priorityRangedWeaponNoAmmo", { weapon_type: plyr.currentWeapon.type, ammo: plyr.items.ammo });
        if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
          plyr.ai.upgradeWeapon = false;
          logEval("priorityIndexMax.Nothing to retrieve");
        } else {
          logEval("priorityWeaponNextCheck");
          plyr.ai.organizing.weaponPriorityIndex++;
        }
      } else {
        havePriorityWeapon = true;
        plyr.ai.upgradeWeapon = false;

        plyr.currentWeapon.name = inMyInventory.name;
        plyr.currentWeapon.type = inMyInventory.type;
        plyr.currentWeapon.effect = inMyInventory.effect;
      }
      // plyr.currentWeapon.name = inMyInventory.name;
      // plyr.currentWeapon.type = inMyInventory.type;
      // plyr.currentWeapon.effect = inMyInventory.effect;

      // havePriorityWeapon = true;
      // plyr.ai.upgradeWeapon = false
    } else if (plyr.currentWeapon.type !== weaponUpgradePriority[weaponPriorityIndex]) {
      havePriorityWeapon = false;
    }

    if (havePriorityWeapon === false) {
      logEval("priorityWeaponMissing");

      let inTheField = fieldItemScan.find((elem) => elem.subType === weaponUpgradePriority[weaponPriorityIndex]);
      // console.log('inTheField',inTheField);
      if (inTheField) {
        logEval("priorityWeaponInField", { weapon_type: inTheField.subType, location: inTheField.location });

        if (inTheField.subType === "crossbow") {
          logEval("priorityWeaponCrossbow", { ammo: inTheField.effect.split("+")[1] });

          if (inTheField.effect.split("+")[1] !== 0 && inTheField.effect.split("+")[1] !== "0") {
            let targetSafeData = app.scanTargetAreaThreat({
              player: plyr.number,
              point: {
                x: inTheField.location.x,
                y: inTheField.location.y,
              },
              range: 3,
            });

            if (targetSafeData.isSafe === true) {
              logEval("priorityWeaponLocationSafe", { weapon_type: inTheField.subType, location: inTheField.location });

              plyr.ai.mission = "retrieve";
              plyr.ai.retrieving.point = {
                x: inTheField.location.x,
                y: inTheField.location.y,
              };
              plyr.ai.retrieving.targetItem = {
                name: inTheField.name,
                type: inTheField.type,
                subType: inTheField.subType,
                effect: inTheField.effect,
              };
              plyr.ai.retrieving.safe = true;
              plyr.ai.upgradeWeapon = false;

              if (!plyr.popups.find((x) => x.msg === "missionRetrieve")) {
                plyr.popups.push({
                  state: false,
                  count: 0,
                  limit: 30,
                  type: "",
                  position: "",
                  msg: "missionRetrieve",
                  img: "",
                });
              }
            } else {
              logEval("priorityWeaponLocationUnsafe", { weapon_type: inTheField.subType, location: inTheField.location });

              if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
                // plyr.ai.upgradeWeapon = false;
                logEval("priorityIndexMax. Nothing to retrieve");
              } else {
                logEval("priorityWeaponNextCheck");
                plyr.ai.organizing.weaponPriorityIndex++;
              }
            }
          } else if (inTheField.effect.split("+")[1] === 0 || inTheField.effect.split("+")[1] === "0") {
            logEval("priorityRangedWeaponInFieldNoAmmo", { weapon_type: "crossbow", ammo: inTheField.effect.split("+")[1] });
            if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
              // plyr.ai.upgradeWeapon = false;
              logEval("priorityIndexMax.Nothing to retrieve");
            } else {
              logEval("priorityWeaponNextCheck");
              plyr.ai.organizing.weaponPriorityIndex++;
            }
          }
        } else {
          logEval("priorityWeaponNonCrossbow", { weapon_type: inTheField.subType });

          let targetSafeData2 = app.scanTargetAreaThreat({
            player: plyr.number,
            point: {
              x: inTheField.location.x,
              y: inTheField.location.y,
            },
            range: 3,
          });

          if (targetSafeData2.isSafe === true) {
            plyr.ai.mission = "retrieve";
            plyr.ai.retrieving.point = {
              x: inTheField.location.x,
              y: inTheField.location.y,
            };
            plyr.ai.retrieving.targetItem = {
              name: inTheField.name,
              type: inTheField.type,
              subType: inTheField.subType,
              effect: inTheField.effect,
            };
            plyr.ai.retrieving.safe = true;
            plyr.ai.upgradeWeapon = false;

            if (!plyr.popups.find((x) => x.msg === "missionRetrieve")) {
              plyr.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "missionRetrieve",
                img: "",
              });
            }
          } else {
            logEval("priorityWeaponUnavailable", { weapon_type: inTheField.subType });

            if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
              // plyr.ai.upgradeWeapon = false;
              logEval("priorityIndexMax.Nothing to retrieve");
            } else {
              logEval("priorityWeaponNextCheck");
              plyr.ai.organizing.weaponPriorityIndex++;
            }
          }
        }
      } else {
        logEval("priorityWeaponUnavailable", { weapon_type: weaponUpgradePriority[weaponPriorityIndex] });
        if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
          // plyr.ai.upgradeWeapon = false;
          logEval("priorityIndexMax.Nothing to retrieve");
        } else {
          logEval("priorityWeaponNextCheck");
          plyr.ai.organizing.weaponPriorityIndex++;
        }
      }
    }
  }
  if (plyr.ai.upgradeArmor === true && plyr.ai.upgradeWeapon !== true && plyr.ai.mission !== "retreat" && plyr.ai.mission !== "retrieve") {
    logEval("upgradeArmorCheck", { mission: plyr.ai.mission });

    let armorInTheField;
    if (plyr.hp === 1) {
      armorInTheField = fieldItemScan.find((gear) => gear.effect === "hpUp")[0];
      if (armorInTheField) {
        let targetSafeData2 = app.scanTargetAreaThreat({
          player: plyr.number,
          point: {
            x: armorInTheField.location.x,
            y: armorInTheField.location.y,
          },
          range: 3,
        });

        if (targetSafeData2.isSafe === true) {
          plyr.ai.mission = "retrieve";
          plyr.ai.retrieving.point = {
            x: armorInTheField.location.x,
            y: armorInTheField.location.y,
          };
          plyr.ai.retrieving.targetItem = {
            name: armorInTheField.name,
            type: armorInTheField.type,
            subType: armorInTheField.subType,
            effect: armorInTheField.effect,
          };
          plyr.ai.retrieving.safe = true;
          plyr.ai.upgradeArmor = false;

          if (!plyr.popups.find((x) => x.msg === "missionRetrieve")) {
            plyr.popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "missionRetrieve",
              img: "",
            });
          }
        }

        logEval("armorUpgradeRetrieve", { point: plyr.ai.retrieving.point, effect: "hpUp" });
      } else {
        logEval("armorUpgradeMissing", { effect: "hpUp" });
      }
    }

    if (plyr.speed.move < 0.1) {
      armorInTheField = fieldItemScan.find((gear) => gear.effect === "speedUp")[0];

      if (armorInTheField) {
        let targetSafeData2 = app.scanTargetAreaThreat({
          player: plyr.number,
          point: {
            x: armorInTheField.location.x,
            y: armorInTheField.location.y,
          },
          range: 3,
        });

        if (targetSafeData2.isSafe === true) {
          plyr.ai.mission = "retrieve";
          plyr.ai.retrieving.point = {
            x: armorInTheField.location.x,
            y: armorInTheField.location.y,
          };
          plyr.ai.retrieving.targetItem = {
            name: armorInTheField.name,
            type: armorInTheField.type,
            subType: armorInTheField.subType,
            effect: armorInTheField.effect,
          };
          plyr.ai.retrieving.safe = true;
          plyr.ai.upgradeArmor = false;

          if (!plyr.popups.find((x) => x.msg === "missionRetrieve")) {
            plyr.popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "missionRetrieve",
              img: "",
            });
          }
        }

        logEval("armorUpgradeRetrieve", { point: plyr.ai.retrieving.point, effect: "speedUp" });
      } else {
        logEval("armorUpgradeMissing", { effect: "speedUp" });
      }
    }
  }

  // RELOAD BOW AMMO
  if (plyr.currentWeapon.type === "crossbow" && plyr.ai.mission !== "retrieve" && plyr.ai.mission !== "retreat") {
    if (plyr.items.ammo === 0) {
      logEval("crossbowNoAmmo", { ammo: plyr.items.ammo });
      let inTheField = fieldItemScan.find((elem) => elem.type === "crossbow" || elem.name.substr(0, 4) === "ammo");
      if (inTheField) {
        if (inTheField.effect.split("+")[1] !== 0 && inTheField.effect.split("+")[1] !== "0") {
          let targetSafeData2 = app.scanTargetAreaThreat({
            player: plyr.number,
            point: {
              x: inTheField.location.x,
              y: inTheField.location.y,
            },
            range: 3,
          });

          if (targetSafeData2.isSafe === true) {
            plyr.ai.mission = "retrieve";
            plyr.ai.retrieving.point = {
              x: inTheField.location.x,
              y: inTheField.location.y,
            };
            plyr.ai.retrieving.targetItem = {
              name: inTheField.name,
              type: inTheField.type,
              subType: inTheField.subType,
              effect: inTheField.effect,
            };
            plyr.ai.retrieving.safe = true;
            plyr.ai.upgradeWeapon = false;

            if (!plyr.popups.find((x) => x.msg === "missionRetrieve")) {
              plyr.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "missionRetrieve",
                img: "",
              });
            }
          } else {
            logEval("retrieveUnsafeFallbackInventory");

            if (plyr.items.weapons.length > 1) {
              logEval("fallbackWeapon", { weapons: plyr.items.weapons });
              plyr.currentWeapon = {
                name: plyr.items.weapons[1].name,
                type: plyr.items.weapons[1].type,
                effect: plyr.items.weapons[1].effect,
              };

              plyr.ai.targetAcquired = false;
            } else {
              logEval("inventoryEmptyFindInField");
              plyr.ai.upgradeWeapon = true;
            }
          }
        } else {
          logEval("bowInFieldNoAmmo");

          if (plyr.items.weapons.length > 1) {
            logEval("fallbackWeapon", { weapons: plyr.items.weapons });
            plyr.currentWeapon = {
              name: plyr.items.weapons[1].name,
              type: plyr.items.weapons[1].type,
              effect: plyr.items.weapons[1].effect,
            };

            plyr.ai.targetAcquired = false;
          } else {
            logEval("inventoryEmptyFindInField");
            plyr.ai.upgradeWeapon = true;
          }
        }
      } else {
        logEval("noBowOrAmmoInField");

        if (plyr.items.weapons.length > 1) {
          logEval("fallbackWeapon", { weapons: plyr.items.weapons });
          plyr.currentWeapon = {
            name: plyr.items.weapons[0].name,
            type: plyr.items.weapons[0].type,
            effect: plyr.items.weapons[0].effect,
          };

          plyr.ai.targetAcquired = false;
        } else {
          logEval("inventoryEmptyFindInField");
          plyr.ai.upgradeWeapon = true;

          if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
            logEval("noAmmoNoUpgradeSwitchUnarmed");
            plyr.currentWeapon = {
              name: "",
              type: "",
              effect: "",
            };
          }
        }
      }
    }
  }

  // INJURED OR SLOW!
  if (plyr.hp === 1 && plyr.ai.mission !== "retrieve" && plyr.ai.mission !== "retrieve") {
    logEval("injuredCheckHealItem");

    let itemToRetrieve = undefined;
    for (const item2 of fieldItemScan) {
      if (item2.effect === "hpUp") {
        itemToRetrieve = item2;
      }
    }

    if (itemToRetrieve) {
      let targetSafeData2 = app.scanTargetAreaThreat({
        player: plyr.number,
        point: {
          x: itemToRetrieve.location.x,
          y: itemToRetrieve.location.y,
        },
        range: 3,
      });

      if (targetSafeData2.isSafe === true) {
        plyr.ai.mission = "retrieve";
        plyr.ai.retrieving.point = {
          x: itemToRetrieve.location.x,
          y: itemToRetrieve.location.y,
        };
        plyr.ai.retrieving.targetItem = {
          name: itemToRetrieve.name,
          type: itemToRetrieve.type,
          subType: itemToRetrieve.subType,
          effect: itemToRetrieve.effect,
        };
        plyr.ai.retrieving.safe = true;

        if (!plyr.popups.find((x) => x.msg === "missionRetrieve")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionRetrieve",
            img: "",
          });
        }

        logEval("healItemRetrieve", { location: itemToRetrieve.location });
      } else {
        logEval("healItemMissing");
      }
    }
  }

  if (plyr.speed.move < 0.1 && plyr.ai.mission !== "retrieve" && plyr.ai.mission !== "retrieve") {
    logEval("slowCheckSpeedUpItem");

    let itemToRetrieve = undefined;
    for (const item3 of fieldItemScan) {
      if (item3.effect === "speedUp") {
        itemToRetrieve = item3;
      }
    }

    if (itemToRetrieve) {
      logEval("speedItemFound", { location: itemToRetrieve.location });

      let targetSafeData2 = app.scanTargetAreaThreat({
        player: plyr.number,
        point: {
          x: itemToRetrieve.location.x,
          y: itemToRetrieve.location.y,
        },
        range: 3,
      });

      if (targetSafeData2.isSafe === true) {
        plyr.ai.mission = "retrieve";
        plyr.ai.retrieving.point = {
          x: itemToRetrieve.location.x,
          y: itemToRetrieve.location.y,
        };
        plyr.ai.retrieving.targetItem = {
          name: itemToRetrieve.name,
          type: itemToRetrieve.type,
          subType: itemToRetrieve.subType,
          effect: itemToRetrieve.effect,
        };
        plyr.ai.retrieving.safe = true;
        plyr.ai.upgradeWeapon = false;

        if (!plyr.popups.find((x) => x.msg === "missionRetrieve")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionRetrieve",
            img: "",
          });
        }
      } else {
        logEval("speedItemMissingUpgradeArmorCheck");
        plyr.ai.upgradeArmor = true;
      }
    }
  }

  // RETRIEVE DROPPED GEAR!
  if (plyr.ai.organizing.dropped.state === true) {
    logEval("retrieveDroppedGear", { gear: plyr.ai.organizing.dropped.gear });

    for (const cell of app.gridInfo) {
      if (cell.item.name !== "") {
        fieldItemScan.push({
          name: cell.item.name,
          type: cell.item.type,
          subType: cell.item.subType,
          effect: cell.item.effect,
          location: { x: cell.number.x, y: cell.number.y },
        });
      }
    }

    let droppedGear = fieldItemScan.find((elem) => elem.name === plyr.ai.organizing.dropped.gear.name);
    // console.log('droppedGear',droppedGear);

    if (plyr.ai.mission !== "engage") {
      logEval("droppedGearOutOfBattle");

      if (droppedGear.location.x === plyr.currentPosition.cell.number.x && droppedGear.location.y === plyr.currentPosition.cell.number.y) {
        plyr.ai.instructions.push({
          keyword: "pickup",
          count: 0,
          limit: 1,
        });

        app.players[plyr.number - 1].ai.organizing.dropped.state = false;

        logEval("droppedGearPickup", { state: plyr.ai.organizing.dropped.state });
      } else {
        logEval("droppedGearRetrieve");

        plyr.ai.mission = "retrieve";
        plyr.ai.retrieving.point = {
          x: droppedGear.location.x,
          y: droppedGear.location.y,
        };
        plyr.ai.retrieving.targetItem = {
          name: droppedGear.name,
          type: droppedGear.type,
          subType: droppedGear.subType,
          effect: droppedGear.effect,
        };
        plyr.ai.retrieving.safe = true;

        // let targetSafeData2 = app.scanTargetAreaThreat({
        //   player: plyr.number,
        //   point: {
        //     x: droppedGear.location.x,
        //     y: droppedGear.location.y,
        //   },
        //   range: 3,
        // })
        //
        // if (targetSafeData2.isSafe === true) {
        //
        //   plyr.ai.mission = 'retrieve';
        //   plyr.ai.retrieving.point = {
        //     x: droppedGear.location.x,
        //     y: droppedGear.location.y,
        //   }
        //   plyr.ai.retrieving.targetItem = {
        //     name: droppedGear.name,
        //     type: droppedGear.type,
        //     subType: droppedGear.subType,
        //     effect: droppedGear.effect,
        //   };
        //   plyr.ai.retrieving.safe = true;
        //
        // }
        // else {
        //   console.log('unsafe to retrieve. check inventory');
        //
        //   if (plyr.items.weapons.length > 1) {
        //     console.log('fallback to other weapon');
        //     plyr.currentWeapon = {
        //       name: plyr.items.weapons[1].name,
        //       type: plyr.items.weapons[1].type,
        //       effect: plyr.items.weapons[1].effect,
        //     }
        //
        //     plyr.ai.organizing.dropped.state = false;
        //   } else {
        //     console.log('nothing else in inventory. find other in the field');
        //     plyr.ai.upgradeWeapon = true;
        //   }
        // }

        if (!plyr.popups.find((x) => x.msg === "missionRetrieve")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionRetrieve",
            img: "",
          });
        }
      }
    } else {
      logEval("droppedGearInBattle");

      if (droppedGear.location.x === plyr.currentPosition.cell.number.x && droppedGear.location.y === plyr.currentPosition.cell.number.y) {
        plyr.ai.instructions.push({
          keyword: "pickup",
          count: 0,
          limit: 1,
        });

        app.players[plyr.number - 1].ai.organizing.dropped.state = false;

        logEval("droppedGearPickup", { state: plyr.ai.organizing.dropped.state });
      } else {
        if (plyr.items.weapons.length > 1) {
          logEval("droppedGearSwitchInventory");
          plyr.currentWeapon = {
            name: plyr.items.weapons[0].name,
            type: plyr.items.weapons[0].type,
            effect: plyr.items.weapons[0].effect,
          };
        } else {
          logEval("droppedGearRetrieve");

          plyr.ai.mission = "retrieve";
          plyr.ai.retrieving.point = {
            x: droppedGear.location.x,
            y: droppedGear.location.y,
          };
          plyr.ai.retrieving.targetItem = {
            name: droppedGear.name,
            type: droppedGear.type,
            subType: droppedGear.subType,
            effect: droppedGear.effect,
          };
          plyr.ai.retrieving.safe = true;

          // let targetSafeData2 = app.scanTargetAreaThreat({
          //   player: plyr.number,
          //   point: {
          //     x: droppedGear.location.x,
          //     y: droppedGear.location.y,
          //   },
          //   range: 3,
          // })
          //
          // if (targetSafeData2.isSafe === true) {
          //
          //   plyr.ai.mission = 'retrieve';
          //   plyr.ai.retrieving.point = {
          //     x: droppedGear.location.x,
          //     y: droppedGear.location.y,
          //   }
          //   plyr.ai.retrieving.targetItem = {
          //     name: droppedGear.name,
          //     type: droppedGear.type,
          //     subType: droppedGear.subType,
          //     effect: droppedGear.effect,
          //   };
          //   plyr.ai.retrieving.safe = true;
          //
          // }
          // else {
          //   console.log('unsafe to retrieve. check inventory');
          //
          //   if (plyr.items.weapons.length > 1) {
          //     console.log('fallback to other weapon');
          //     plyr.currentWeapon = {
          //       name: plyr.items.weapons[1].name,
          //       type: plyr.items.weapons[1].type,
          //       effect: plyr.items.weapons[1].effect,
          //     }
          //
          //     plyr.ai.organizing.dropped.state = false;
          //   } else {
          //     console.log('nothing else in inventory. find other in the field');
          //     plyr.ai.upgradeWeapon = true
          //   }
          //
          // }

          if (!plyr.popups.find((x) => x.msg === "missionRetrieve")) {
            plyr.popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "missionRetrieve",
              img: "",
            });
          }
        }
      }
    }

    // plyr.ai.organizing.dropped.state = true
  }

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

  // if (plyr.ai.mission === 'retrieve' && plyr.ai.retrieving.state !== true) {
  if (plyr.ai.mission === "retrieve") {
    // console.log('retrieve @  ai evaluate', plyr.ai.retrieving);

    let targetSafeData = app.scanTargetAreaThreat({
      player: plyr.number,
      point: {
        x: plyr.ai.retrieving.point.x,
        y: plyr.ai.retrieving.point.y,
      },
      range: 3,
    });

    plyr.ai.retrieving.safe = targetSafeData.isSafe;

    if (targetSafeData.isSafe !== true) {
      // console.log('target area is under threat');
      if (plyr.ai.mode === "aggressive") {
        // console.log('threats',targetSafeData.threats);
        plyr.ai.mission = "pursue";

        if (!plyr.popups.find((x) => x.msg === "missionPursue")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionPursue",
            img: "",
          });
        }
        if (!plyr.popups.find((x) => x.msg === "aggressiveMode")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "aggressiveMode",
            img: "",
          });
        }

        for (const threat of targetSafeData.threats) {
          logEval("retrieveThreat", { threat: threat });
          if (threat.distVal === 0) {
            logEval("retrieveThreats", { threats: targetSafeData.threats });

            plyr.ai.targetSet = true;
            plyr.ai.targetAquired = false;
            let threat2 = app.players[threat.player - 1];
            plyr.ai.targetPlayer = {
              number: 1,
              currentPosition: {
                x: threat2.currentPosition.cell.number.x,
                y: threat2.currentPosition.cell.number.y,
              },
              target: {
                number1: {
                  x: threat2.target.cell1.x,
                  y: threat2.target.cell1.y,
                },
                number2: {
                  x: threat2.target.cell2.x,
                  y: threat2.target.cell2.y,
                },
              },
              action: threat.action,
            };
          }
        }
      }
      if (plyr.ai.mode === "careful" && plyr.ai.retrieving.checkin === "enroute") {
        logEval("retrieveEnrouteRetreat");

        if (!plyr.popups.find((x) => x.msg === "passiveMode")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "passiveMode",
            img: "",
          });
        }

        plyr.ai.mission = "retreat";

        if (!plyr.popups.find((x) => x.msg === "missionRetreat")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionRetreat",
            img: "",
          });
        }
      }
    } else {
      // console.log('target area clear. proceed w/ retrieval');
      plyr.ai.retrieving.safe = true;
    }

    if (plyr.ai.retrieving.checkin === "complete") {
      plyr.ai.mission = plyr.ai.primaryMission;
      app.aiResetRanges(plyr);

      if (!plyr.popups.find((x) => x.msg === "missionComplete")) {
        plyr.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "missionComplete",
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

      plyr.ai.retrieving.checkin = undefined;
      plyr.ai.retrieving.safe = false;
      plyr.ai.targetAcquired = false;
      // console.log('retrieval complete. revert mission',plyr.ai.mission,plyr.ai.targetSet,plyr.ai.targetPlayer.currentPosition,plyr.ai.targetAcquired,plyr.ai.targetPlayer);

      let itemRetrieved;

      if (plyr.ai.retrieving.targetItem.type !== "item") {
        if (plyr.ai.retrieving.targetItem.type === "weapon") {
          if (plyr.currentWeapon.name === plyr.ai.retrieving.targetItem.name) {
            itemRetrieved = true;
          }
          for (const item of plyr.items.weapons) {
            if (item.name === plyr.ai.retrieving.targetItem.name) {
              itemRetrieved = true;
              plyr.currentWeapon = {
                name: plyr.ai.retrieving.targetItem.name,
                type: plyr.ai.retrieving.targetItem.subType,
                effect: plyr.ai.retrieving.targetItem.effect,
              };
            }
          }
        }
        if (plyr.ai.retrieving.targetItem.type === "armor") {
          if (plyr.currentArmor.name === plyr.ai.retrieving.targetItem.name) {
            itemRetrieved = true;
          }
          for (const item of plyr.items.armor) {
            if (item.name === plyr.ai.retrieving.targetItem.name) {
              itemRetrieved = true;
              plyr.currentArmor = {
                name: plyr.ai.retrieving.targetItem.name,
                type: plyr.ai.retrieving.targetItem.subType,
                effect: plyr.ai.retrieving.targetItem.effect,
              };
            }
          }
        }
      }

      if (itemRetrieved === true) {
        plyr.ai.retrieving = {
          checkin: undefined,
          state: false,
          point: { x: undefined, y: undefined },
          targetItem: {
            name: "",
            type: "",
            subType: "",
            effect: "",
          },
          safe: false,
        };
      }

      if (plyr.ai.organizing.dropped.state === true) {
        plyr.ai.organizing.dropped.state = false;
      }
    }

    if (plyr.ai.retrieving.checkin === "abort") {
      plyr.ai.retrieving = {
        checkin: undefined,
        state: false,
        point: { x: undefined, y: undefined },
        targetItem: {
          name: "",
          type: "",
          subType: "",
          effect: "",
        },
        safe: false,
      };
    }
  }

  if (plyr.ai.mission === "retreat") {
    // console.log('retreating @ ai evaluate');

    if (!plyr.ai.retreating.checkin) {
      let isSafeDistance = false;

      let cell = { x: 0, y: 0 };
      let checkCell = false;
      let safeTarget = false;
      while (checkCell === false && safeTarget !== true && isSafeDistance !== true) {
        cell.x = app.rnJesus(0, app.gridWidth);
        cell.y = app.rnJesus(0, app.gridWidth);
        checkCell = app.checkCell(cell, ["all"]);
        safeTarget = app.scanTargetAreaThreat({
          player: plyr.number,
          point: {
            x: cell.x,
            y: cell.y,
          },
          range: 3,
        }).isSafe;
        isSafeDistance = app.safeDistanceRetreat(plyr, cell);
      }

      if (checkCell === true && safeTarget === true && isSafeDistance !== true) {
        plyr.ai.retreating.point = cell;
        plyr.ai.retreating.safe = safeTarget;
        logEval("retreatLocationFound", { point: cell });
      }
    }

    if (plyr.ai.retreating.checkin && plyr.ai.retreating.state !== true) {
      let targetSafeData = app.scanTargetAreaThreat({
        player: plyr.number,
        point: {
          x: plyr.ai.retreating.point.x,
          y: plyr.ai.retreating.point.y,
        },
        range: 3,
      });

      plyr.ai.retrieving.safe = targetSafeData.isSafe;

      if (targetSafeData.isSafe !== true) {
        logEval("retreatTargetUnsafe");
        plyr.ai.retreating.checkin = undefined;
        plyr.ai.retreating.safe = false;
      }

      if (plyr.ai.retreating.checkin === "complete") {
        plyr.ai.retreating.checkin = undefined;
        plyr.ai.retreating.safe = false;
        plyr.ai.mission = plyr.ai.primaryMission;
        app.aiResetRanges(plyr);

        switch (plyr.ai.primaryMission) {
          case "defend":
            plyr.ai.defending.checkin = undefined;
            break;
          case "patrol":
            plyr.ai.patrolling.checkin = undefined;
            break;
          default:
        }

        // console.log('gg',plyr.ai.targetPlayer);

        if (!plyr.popups.find((x) => x.msg === "missionComplete")) {
          plyr.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "missionComplete",
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

        // plyr.ai.targetSet = false
        plyr.ai.targetAcquired = false;
      }
    }

    // plyr.ai.retreating.level pick a spot further away depending on levelData
  }

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
