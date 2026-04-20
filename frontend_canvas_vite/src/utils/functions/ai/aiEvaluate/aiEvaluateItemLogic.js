export function aiEvaluateItemLogic(app, plyr) {
  const logEval = (message, data = {}) => {
    app.globalLogger("ai.evaluate", message, { plyr_no: plyr.number, ...data }, { fn: "aiEvaluateItemLogic" });
  };

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

  return plyr;
}
