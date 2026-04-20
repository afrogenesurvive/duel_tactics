// Simulataneaous Attack resolutions:
// Face to face:

// slash vs thrust in opposte directions favors a slash (thrusting player gets damaged)
// slash v slash on same axis is a clash
// slash v slash on different axes is a trade
// thrust v thrust in opposite direction is a clash

// Target side facing attacker
// Only a target player slash the opposite to the attacker facing has an effect

// if attacker is thrusting, they may trade
// if attacker is slashing on a different axis, they may trade
// if attacker is slashing on the same axis, they may clash

// target defending resolutions
// face to face:

// if attacker and defender are thrusting and opposite direction, handle defense
// if attacker and defender slashing and same direction, handle defense
// if attacker and defender action type are different, defender attacked
// if attacker and defender are slashing in diffferent directions, defender attacked

// Target side facing attacker
// Only a target player slash the opposite to the attacker facing has an effect

// if attacker is thrusting, defender attacked
// if defender is slashing on a different axis, or same direction, defender attacked
// if defender is slashing on the same axis but opposite direction, handle defense

// if attack is blunt, break defense
// else check advantage
// if defender has advantage or evenly matched
// if peak defense deflect and possible pushback attacker
// if off peak, just deflect attacker

export function meleeAttackParse(app, ownerType, owner, cellNo) {
  // console.log("meleeAttackParse");

  const attackLogType =
    ownerType === "player"
      ? "player.attacking.melee"
      : ownerType === "obstacle"
        ? "obstacle.attacking"
        : ownerType === "barrier"
          ? "barrier.attacking"
          : "trap.action";
  const logAttack = (message, data = {}) => {
    app.globalLogger(attackLogType, message, data, { fn: "meleeAttackParse" });
  };
  const logDodge = (message, data = {}) => {
    app.globalLogger("player.dodging", message, data, { fn: "meleeAttackParse" });
  };
  const logDefend = (message, data = {}, variant = "peak") => {
    app.globalLogger(`player.defending.${variant}`, message, data, { fn: "meleeAttackParse" });
  };
  const logPushBack = (message, data = {}) => {
    app.globalLogger("player.pushBack", message, data, { fn: "meleeAttackParse" });
  };
  const logTrap = (message, data = {}) => {
    app.globalLogger("trap.action", message, data, { fn: "meleeAttackParse" });
  };
  const getDefendVariant = () => {
    const isPeak =
      targetPlayerRef?.defending?.peak === true ||
      (targetPlayerRef?.defending?.decay?.state === true && targetPlayerRef.defending.decay.count < app.defendPeakAllowance);
    return isPeak ? "peak" : "off_peak";
  };

  let targetPlayerRef = undefined;

  let targetCell1;
  let targetCell2;
  let myCell;
  let ownerWeaponName;
  let ownerWeaponType;
  let ownerDirection;
  let ownerActionDirection;
  let ownerActionDirectionType;
  let cell1Item;
  let cell1Rubble;
  let cell2Item;
  let cell2Rubble;
  let faceToFace;
  let sideAttack;
  let backAttack;
  let logCellNo;
  let attackPosition;
  let advantage;

  // ATTACK STAM UNARMED CHECK & AND POPUPS SET
  let playerAttackStamType;

  if (ownerType === "player") {
    myCell = app.gridInfo.find(
      (elem) => elem.number.x === owner.currentPosition.cell.number.x && elem.number.y === owner.currentPosition.cell.number.y,
    );
    targetCell1 = app.gridInfo.find((x) => x.number.x === owner.target.cell1.number.x && x.number.y === owner.target.cell1.number.y);
    targetCell2 = app.gridInfo.find((x) => x.number.x === owner.target.cell2.number.x && x.number.y === owner.target.cell2.number.y);
    ownerDirection = owner.direction;
    ownerActionDirection = owner.attacking.direction;
    ownerActionDirectionType = owner.attacking.directionType;
    ownerWeaponType = owner.currentWeapon.type;
    ownerWeaponName = owner.currentWeapon.name;
    cell1Item = owner.target.cell1.occupant.type === "item";
    cell1Rubble = owner.target.cell1.occupant.type === "rubble";
    cell2Item = owner.target.cell2.occupant.type === "item";
    cell2Rubble = owner.target.cell2.occupant.type === "rubble";
  } else {
    myCell = app.gridInfo.find((x) => x[ownerType].state === true && x[ownerType].id === owner.id);
    ownerDirection = app.getDirectionFromCells(myCell.number, owner.trap.target);
    ownerActionDirection = owner.trap.acting.direction;
    ownerActionDirectionType = owner.trap.acting.directionType;
    let cell1 = app.getCellFromDirection(1, myCell.number, ownerDirection);
    let cell2 = app.getCellFromDirection(2, myCell.number, ownerDirection);
    targetCell1 = app.gridInfo.find((x) => x.number.x === cell1.x && x.number.y === cell1.y);
    targetCell2 = app.gridInfo.find((x) => x.number.x === cell2.x && x.number.y === cell2.y);
    ownerWeaponType = owner.trap.item.subType;
    ownerWeaponType = owner.trap.item.name;
    cell1Item = targetCell1.item.name !== "";
    cell1Rubble = targetCell1.rubble === true;
    cell2Item = targetCell2.item.name !== "";
    cell2Rubble = targetCell2.rubble === true;
  }
  let defendType;

  // SET ATTACK STAM TYPE AND POPUPS/ ATK SUCCESS
  if (ownerType === "player") {
    if (ownerWeaponName !== "") {
      playerAttackStamType = app.staminaCostRef.attack[ownerWeaponType].normal;
    }

    if (owner.attacking.blunt === true && ownerWeaponName !== "") {
      playerAttackStamType = app.staminaCostRef.attack[ownerWeaponType].blunt;
    }
    if (ownerWeaponName === "") {
      playerAttackStamType = app.staminaCostRef.attack.unarmed.normal;
      if (owner.attacking.blunt === true) {
        playerAttackStamType = app.staminaCostRef.attack.unarmed.blunt;
      }
      defendType = "unarmed";
      ownerWeaponType = "unarmed";

      if (owner.attacking.blunt === true) {
        if (!owner.popups.find((x) => x.msg === "attackingBlunt")) {
          owner.popups.push({
            state: false,
            count: 0,
            limit: owner.attacking.animRef.limit[ownerWeaponType] - owner.attacking.animRef.peak[ownerWeaponType],
            type: "",
            position: "",
            msg: "attackingBlunt",
            img: "",
          });
        }
      } else {
        if (!owner.popups.find((x) => x.msg === "attackingUnarmed")) {
          owner.popups.push({
            state: false,
            count: 0,
            limit: owner.attacking.animRef.limit.unarmed - owner.attacking.animRef.peak.unarmed,
            type: "",
            position: "",
            msg: "attackingUnarmed",
            img: "",
          });
        }
      }
    } else {
      if (owner.attacking.blunt === true) {
        if (!owner.popups.find((x) => x.msg === "attackingBlunt")) {
          owner.popups.push({
            state: false,
            count: 0,
            limit: owner.attacking.animRef.limit[ownerWeaponType] - owner.attacking.animRef.peak[ownerWeaponType],
            type: "",
            position: "",
            msg: "attackingBlunt",
            img: "",
          });
        }
      } else {
        if (!owner.popups.find((x) => x.msg === "attacking")) {
          owner.popups.push({
            state: false,
            count: 0,
            limit: owner.attacking.animRef.limit[ownerWeaponType] - owner.attacking.animRef.peak[ownerWeaponType],
            type: "",
            position: "",
            msg: "attacking",
            img: "",
          });
        }
      }
    }
  }

  const setTargetDefending = () => {
    defendType = targetPlayerRef.currentWeapon.type;
    if (targetPlayerRef.currentWeapon.name === "") {
      defendType = "unarmed";
    }
    let defendPeak = targetPlayerRef.defending.peakCount;
    if ((targetPlayerRef.defending.count > 0 && targetPlayerRef.defending.count === defendPeak) || targetPlayerRef.defending.decay.state === true) {
      return true;
    } else {
      return false;
    }
  };
  const setAdvantage = () => {
    let adv;
    if (ownerType === "player") {
      adv = app.checkCombatAdvantage(owner, targetPlayerRef);
    } else {
      if (targetPlayerRef.currentWeapon.name === "") {
        adv = 1;
      } else {
        adv = 0;
      }
    }

    return adv;
  };
  const executeAttack = () => {
    // PLAYER BLUNT ATK SUCCESS, TARGET DEFLECTED
    if (ownerType === "player") {
      if (owner.attacking.blunt === true) {
        logAttack("executeAttackBlunt", {
          owner_type: ownerType,
          owner_number: ownerType === "player" ? owner.number : owner.id,
          target_no: targetPlayerRef.number,
          attack_position: attackPosition,
          weapon_type: ownerWeaponType,
          cell: logCellNo,
          result: "success. deflect target/defender",
        });
        app.setDeflection(targetPlayerRef, "bluntAttacked", false);
        owner.success.attackSuccess = {
          state: true,
          count: 1,
          limit: owner.success.attackSuccess.limit,
        };
      }
      // PLAYER ATK SUCCESS, TARGET DEFLECTED + DAMAGE
      else {
        let takeDamage = true;
        if (targetPlayerRef.attacking.state === true && targetPlayerRef.attacking.charge > 0) {
          let chargePerc = Math.ceil((targetPlayerRef.attacking.charge / targetPlayerRef.attacking.maxCharge) * 10);
          if (app.rnJesus(1, targetPlayerRef.crits.guardBreak + chargePerc) === 1) {
            takeDamage = false;
          }
        }
        if (takeDamage) {
          logAttack("executeAttack", {
            owner_type: ownerType,
            owner_number: owner.number,
            owner_id: owner.id,
            target_no: targetPlayerRef.number,
            attack_position: attackPosition,
            weapon_type: ownerWeaponType,
            cell: logCellNo,
            result: "damage, deflect target/defender",
          });
          app.handleMeleeDamage(ownerType, owner, targetPlayerRef);

          app.setDeflection(targetPlayerRef, "attacked", false);
          owner.success.attackSuccess = {
            state: true,
            count: 1,
            limit: owner.success.attackSuccess.limit,
          };
        }
      }
    } else {
      logAttack("executeAttackTrap", {
        owner_type: ownerType,
        owner_number: owner.id,
        owner_id: owner.id,
        target_no: targetPlayerRef.number,
        attack_position: attackPosition,
        weapon_type: ownerWeaponType,
        cell: logCellNo,
        trap_direction: owner.trap.acting.direction,
        result: "damage, deflect target/defender",
      });
      app.handleMeleeDamage(ownerType, owner, targetPlayerRef);
      app.setDeflection(targetPlayerRef, "attacked", false);
    }
  };
  const handleTargetDodging = () => {
    logDodge("targetDodging", {
      owner_type: ownerType,
      owner_number: ownerType === "player" ? owner.number : owner.id,
      defender: targetPlayerRef.number,
      attack_position: attackPosition,
      weapon_type: ownerWeaponType,
      cell: logCellNo,
      result: "dodged successfully",
    });

    if (ownerType === "player") {
      if (!owner.popups.find((x) => x.msg === "missedAttack2")) {
        owner.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "missedAttack2",
          img: "",
        });
      }

      if (owner.attacking.blunt === true) {
        owner.attacking.blunt = false;
      }

      owner.stamina.current -= playerAttackStamType.pre;
      targetPlayerRef.stamina.current += app.staminaCostRef.dodge.pre;
    } else {
      if (!app.cellPopups.find((x) => x.msg === "missedAttack2" && x.cell.number.x === myCell.number.x && x.cell.number.y === myCell.number.y)) {
        app.cellPopups.push({
          state: false,
          count: 0,
          limit: 35,
          type: "",
          position: "",
          msg: "missedAttack2",
          color: "",
          img: "",
          cell: app.gridInfo.find((x) => x.number.x === myCell.number.x && x.number.y === myCell.number.y),
        });
      }
    }
  };
  const handleTargetDefending = () => {
    const defendPeak =
      targetPlayerRef.defending.peak === true ||
      (targetPlayerRef.defending.decay.state === true && targetPlayerRef.defending.decay.count < app.defendPeakAllowance);
    const defendOffPeak =
      targetPlayerRef.defending.peak !== true &&
      targetPlayerRef.defending.decay.state === true &&
      targetPlayerRef.defending.decay.count > app.defendPeakAllowance;
    logDefend(
      "defendStateCheck",
      {
        peak: defendPeak,
        off_peak: defendOffPeak,
      },
      defendPeak ? "peak" : "off_peak",
    );

    // BLUNT ATTACK IS MADE FOR BREAKING DEFENSE
    if (ownerType === "player" && owner.attacking.blunt === true) {
      logDefend(
        "bluntAttackParried",
        {
          owner_type: ownerType,
          owner_number: ownerType === "player" ? owner.number : owner.id,
          defender: targetPlayerRef.number,
          attack_position: attackPosition,
          weapon_type: ownerWeaponType,
          cell: logCellNo,
          result: "parried; deflect/pushback attacker",
        },
        getDefendVariant(),
      );

      app.setDeflection(targetPlayerRef, "bluntAttacked", false);
      owner.success.attackSuccess = {
        state: true,
        count: 1,
        limit: owner.success.attackSuccess.limit,
      };
    }

    // ATTACKER NON-BLUNT ATTACK
    else {
      // DEFENDER ADVANTAGE/evenly matched
      if (advantage === 2 || advantage === 0) {
        logDefend(
          "defendEvenAdvantage",
          {
            owner_type: ownerType,
            owner_number: ownerType === "player" ? owner.number : owner.id,
            defender: targetPlayerRef.number,
            result: "even combat advantage",
          },
          getDefendVariant(),
        );

        // SIDE ATTACK OR FACE TO FACE
        // PEAK DEFEND/PARRY
        if (sideAttack === true || faceToFace === true) {
          if (
            targetPlayerRef.defending.peak === true ||
            (targetPlayerRef.defending.decay.state === true && targetPlayerRef.defending.decay.count < app.defendPeakAllowance)
          ) {
            logDefend(
              "defendParryPeak",
              {
                owner_type: ownerType,
                owner_number: ownerType === "player" ? owner.number : owner.id,
                defender: targetPlayerRef.number,
                attack_position: attackPosition,
                weapon_type: ownerWeaponType,
                cell: logCellNo,
                result: "parried; deflect/pushback attacker",
              },
              "peak",
            );

            // PUSHBACK AND/OR DEFLECT ATTACKER/PLAYER?
            if (ownerType === "player") {
              if (faceToFace === true) {
                app.setDeflection(owner, "parried", true);
              }
              if (sideAttack === true) {
                if (app.rnJesus(1, 0) === 1) {
                  app.setDeflection(owner, "parried", true);
                }
                // JUST DEFLECT
                else {
                  app.setDeflection(owner, "parried", false);
                }
              }
            }
            // PUSHBACK OBSTACLE
            else {
              if (ownerType === "obstacle") {
                if (faceToFace === true) {
                  app.canPushObstacle("player", targetPlayerRef, myCell, `hitPush`);
                }
                if (sideAttack === true) {
                  if (app.rnJesus(1, (owner.height + owner.weight) * app.rnJesus(1, 3))) {
                    app.canPushObstacle("player", targetPlayerRef, myCell, `hitPush`);
                  }
                }
              }
            }

            targetPlayerRef.stamina.current += app.staminaCostRef.defend.peak;
            targetPlayerRef.success.defendSuccess = {
              state: true,
              count: 1,
              limit: targetPlayerRef.success.defendSuccess.limit,
            };
            targetPlayerRef.statusDisplay = {
              state: true,
              status: "Parry!",
              count: 1,
              limit: targetPlayerRef.statusDisplay.limit,
            };
            if (!targetPlayerRef.popups.find((x) => x.msg === "attackParried")) {
              targetPlayerRef.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "attackParried",
                img: "",
              });
            }

            // LATERAL: IF ATTACKER CHARGE > 25% PUSHBACK TARGET
            // FRONTAL: IF ATTACKER CHARGE > 50% PUSHBACK TARGET
            let attackerCharge = calcChargePercentage("defending")?.result1;
            if (sideAttack === true) {
              // IF ATTACKER CHARGE > 50% PUSHBACK TARGET
              if (attackerCharge > 25) {
                app.pushBack(targetPlayerRef, app.getOppositeDirection(targetPlayerRef.direction));
              }
            }
            if (faceToFace === true) {
              // IF ATTACKER CHARGE > 25% PUSHBACK TARGET
              if (attackerCharge > 50) {
                app.pushBack(targetPlayerRef, app.getOppositeDirection(targetPlayerRef.direction));
              }
            }
          }
        }

        // OFF PEAK DEFEND. DEFENSE NOT GUARANTEED
        // if (targetPlayerRef.defending.decay.state === true && targetPlayerRef.defending.peak !== true) {
        if (
          targetPlayerRef.defending.peak !== true &&
          targetPlayerRef.defending.decay.state === true &&
          targetPlayerRef.defending.decay.count > app.defendPeakAllowance
        ) {
          if (sideAttack === true) {
            if (app.rnJesus(1, targetPlayerRef.crits.guardBreak) !== 1) {
              logDefend(
                "defendOffPeakSuccess",
                {
                  owner_type: ownerType,
                  owner_number: ownerType === "player" ? owner.number : owner.id,
                  defender: targetPlayerRef.number,
                  attack_position: attackPosition,
                  weapon_type: ownerWeaponType,
                  cell: logCellNo,
                  result: "off-peak defend success; deflect attacker",
                },
                "off_peak",
              );

              // DEFLECT ATTACKER?
              if (ownerType === "player") {
                if (app.rnJesus(1, owner.crits.pushBack) === 1) {
                  app.setDeflection(owner, "defended", false);
                }
              }

              targetPlayerRef.success.defendSuccess = {
                state: true,
                count: 1,
                limit: targetPlayerRef.success.defendSuccess.limit,
              };
              targetPlayerRef.statusDisplay = {
                state: true,
                status: "Defend",
                count: 1,
                limit: targetPlayerRef.statusDisplay.limit,
              };
              if (!targetPlayerRef.popups.find((x) => x.msg === "defendSuccess")) {
                targetPlayerRef.popups.push({
                  state: false,
                  count: 0,
                  limit: 25,
                  type: "",
                  position: "",
                  msg: "defendSuccess",
                  img: "",
                });
              }

              if (app.rnJesus(0, 3) === 1) {
                app.pushBack(targetPlayerRef, app.getOppositeDirection(targetPlayerRef.direction));
              }
            }

            // DEFEND FAILURE
            else {
              logDefend(
                "defendOffPeakFail",
                {
                  owner_type: ownerType,
                  owner_number: ownerType === "player" ? owner.number : owner.id,
                  defender: targetPlayerRef.number,
                  attack_position: attackPosition,
                  weapon_type: ownerWeaponType,
                  cell: logCellNo,
                  result: "off-peak defend failed; damage, deflect target/defender",
                },
                "off_peak",
              );

              app.setDeflection(targetPlayerRef, "attacked", false);
              app.handleMeleeDamage(ownerType, owner, targetPlayerRef);
            }
          }
          //FACE TO FACE OFF PEAK DEFEND IS GUARANTEED SUCCESS
          if (faceToFace === true) {
            logDefend(
              "defendOffPeakSuccess",
              {
                owner_type: ownerType,
                owner_number: ownerType === "player" ? owner.number : owner.id,
                defender: targetPlayerRef.number,
                attack_position: attackPosition,
                weapon_type: ownerWeaponType,
                cell: logCellNo,
                result: "off-peak defend success; deflect/pushback attacker",
              },
              "off_peak",
            );

            if (app.rnJesus(1, targetPlayerRef.crits.guardBreak) !== 1) {
              // PUSHBACK AND/OR DEFLECT ATTACKER/PLAYER?
              if (ownerType === "player") {
                if (app.rnJesus(1, owner.crits.pushBack) === 1) {
                  app.setDeflection(owner, "defended", true);
                }
                // JUST DEFLECT
                else {
                  app.setDeflection(owner, "defended", false);
                }
              }
              // PUSHBACK OBSTACLE
              else {
                if (ownerType === "obstacle") {
                  if (app.rnJesus(1, (owner.height + owner.weight) * app.rnJesus(1, 3))) {
                    app.canPushObstacle("player", targetPlayerRef, myCell, `hitPush`);
                  }
                }
              }
            }
            targetPlayerRef.success.defendSuccess = {
              state: true,
              count: 1,
              limit: targetPlayerRef.success.defendSuccess.limit,
            };
            targetPlayerRef.statusDisplay = {
              state: true,
              status: "Defend",
              count: 1,
              limit: targetPlayerRef.statusDisplay.limit,
            };
            if (!targetPlayerRef.popups.find((x) => x.msg === "defendSuccess")) {
              targetPlayerRef.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "defendSuccess",
                img: "",
              });
            }
            // PUSHBACK PLAYER
            if (app.rnJesus(0, 2) === 1) {
              app.pushBack(targetPlayerRef, app.getOppositeDirection(targetPlayerRef.direction));
            }
          }
        }
      }

      // ATTACKER/PLAYER ADVANTAGE
      else if (advantage === 1) {
        logDefend(
          "defendAttackerAdvantage",
          {
            owner_type: ownerType,
            owner_number: ownerType === "player" ? owner.number : owner.id,
            defender: targetPlayerRef.number,
            result: "attacker advantage; damage, deflect target/defender",
          },
          getDefendVariant(),
        );

        app.handleMeleeDamage(ownerType, owner, targetPlayerRef);
        app.setDeflection(targetPlayerRef, "attacked", false);

        if (ownerType === "player") {
          owner.success.attackSuccess = {
            state: true,
            count: 1,
            limit: owner.success.attackSuccess.limit,
          };
        }
      }
    }
  };
  const calcChargePercentage = (targetAction) => {
    let result1 = 0;
    let result2 = 0;

    if (ownerType === "player") {
      result1 = (owner.attacking.charge / owner.attacking.maxCharge) * 100;
    }

    if (targetAction === "attacking") {
      result2 = (targetPlayerRef[targetAction].charge / targetPlayerRef[targetAction].maxCharge) * 100;
    }

    if (result1 < 0) {
      result1 = 0;
    }
    if (result2 < 0) {
      result2 = 0;
    }

    return {
      result1: result1.toFixed(0),
      result2: result2.toFixed(0),
    };
  };

  const handleTargetAttacking = (additional) => {
    logAttack("handleTargetAttacking");

    // EVENLY MATCHED. CLASHING
    if (advantage === 0) {
      logAttack("targetAttackingEvenAdvantage", {
        owner_type: ownerType,
        owner_number: ownerType === "player" ? owner.number : owner.id,
        target_number: targetPlayerRef.number,
        result: "even combat advantage",
      });

      // PUSHBACK ATTACKER/PLAYER BASED ON charge difference
      if (additional === "clash") {
        let set = false;
        if (ownerType === "player") {
          targetPlayerRef.attacking.clashing.state = true;
          owner.attacking.clashing.state = true;
        } else {
          targetPlayerRef.attacking.clashing.state = true;
        }

        logPushBack("clashPushBack", {
          owner_type: ownerType,
          owner_number: ownerType === "player" ? owner.number : owner.id,
          target_number: targetPlayerRef.number,
          attack_position: attackPosition,
          weapon_type: ownerWeaponType,
          cell: logCellNo,
          result: "pushback 1 or both players",
        });

        let attackerCharge = calcChargePercentage("attacking").result1;
        let targetCharge = calcChargePercentage("attacking").result2;

        if (set !== true && (attackerCharge - targetCharge === 10 || attackerCharge - targetCharge === -10 || attackerCharge === targetCharge)) {
          if (ownerType === "obstacle") {
            app.canPushObstacle("player", targetPlayerRef, myCell, `hitPush`);
            set = true;
          }
          if (ownerType === "player") {
            app.pushBack(owner, app.getOppositeDirection(owner.direction));
            set = true;
          }
          app.pushBack(targetPlayerRef, app.getOppositeDirection(targetPlayerRef.direction));
          set = true;
        } else if (set !== true) {
          if (attackerCharge > targetCharge) {
            app.pushBack(targetPlayerRef, app.getOppositeDirection(targetPlayerRef.direction));
            set = true;
          }
          if (attackerCharge < targetCharge) {
            if (ownerType === "obstacle") {
              app.canPushObstacle("player", targetPlayerRef, myCell, `hitPush`);
              set = true;
            }
            if (ownerType === "player") {
              app.pushBack(owner, app.getOppositeDirection(owner.direction));
              set = true;
            }
          }
        }
      }
      if (additional === "trade") {
        logAttack("tradeAttack", {
          owner_type: ownerType,
          owner_number: ownerType === "player" ? owner.number : owner.id,
          target_number: targetPlayerRef.number,
          attack_position: attackPosition,
          weapon_type: ownerWeaponType,
          cell: logCellNo,
          result: "damage both players; deflect both",
        });

        if (ownerType === "player" && owner.attacking.blunt === true) {
          app.setDeflection(targetPlayerRef, "bluntAttacked", false);
        } else {
          app.handleMeleeDamage(ownerType, owner, targetPlayerRef);
          app.setDeflection(targetPlayerRef, "attacked", false);
        }

        if (ownerType === "player") {
          if (targetPlayerRef.attacking.blunt === true) {
            app.setDeflection(owner, "bluntAttacked", false);
          } else {
            app.handleMeleeDamage("player", targetPlayerRef, owner);
            app.setDeflection(owner, "attacked", false);
          }
        } else {
          app.attackCellContents("melee", "player", targetPlayerRef, targetCell1, targetCell2, myCell, undefined);
        }
      }
    }

    // PLAYER ADVANTAGE
    if (advantage === 1) {
      logAttack("targetAttackingAttackerAdvantage", {
        owner_type: ownerType,
        owner_number: ownerType === "player" ? owner.number : owner.id,
        target_number: targetPlayerRef.number,
        result: "attacker advantage; damage, deflect target/defender",
      });

      if (ownerType === "player") {
        owner.success.attackSuccess = {
          state: true,
          count: 1,
          limit: owner.success.attackSuccess.limit,
        };
      }

      if (owner.attacking.blunt === true) {
        app.setDeflection(targetPlayerRef, "bluntAttacked", false);
      } else {
        app.handleMeleeDamage(ownerType, owner, targetPlayerRef);
        app.setDeflection(targetPlayerRef, "attacked", false);
      }
    }

    // TARGET ADVANTAGE
    if (advantage === 2) {
      logAttack("targetAttackingDefenderAdvantage", {
        owner_type: ownerType,
        owner_number: ownerType === "player" ? owner.number : owner.id,
        target_number: targetPlayerRef.number,
        result: "defender advantage; damage, deflect attacker",
      });

      if (ownerType === "player") {
        if (targetPlayerRef.attacking.blunt === true) {
          app.setDeflection(owner, "bluntAttacked", false);
        } else {
          app.handleMeleeDamage("player", targetPlayerRef, owner);
          app.setDeflection(owner, "attacked", false);
        }
      } else {
        app.attackCellContents("melee", "player", targetPlayerRef, targetCell1, targetCell2, myCell, undefined);
      }

      targetPlayerRef.success.attackSuccess = {
        state: true,
        count: 1,
        limit: targetPlayerRef.success.attackSuccess.limit,
      };
    }
  };

  // PROJECTILE, ITEM, RUBBLE, OBSTACLE, BARRIER TARGETS
  if (cellNo === 1) {
    logCellNo = targetCell1.number;
    let cellObstacleBarrier = targetCell1.obstacle.state === true ? "obstacle" : targetCell1.barrier.state === true ? "barrier" : "";
    //TARGET IS PROJECTILE!!
    if (app.isBoltInCell(targetCell1.number) === true) {
      logAttack("destroyedBoltProjectile", {
        owner_type: ownerType,
        owner_number: ownerType === "player" ? owner.number : owner.id,
        owner_id: owner.id,
        target_cell: targetCell1.number,
        weapon_type: ownerWeaponType,
        result: "bolt destroyed; pushback?",
      });
      app.projectiles.find((x) => x.currentPosition.number.x === targetCell1.number.x && x.currentPosition.number.y === targetCell1.number.y).kill =
        true;

      if (ownerType === "player") {
        if (!owner.popups.find((x) => x.msg === "boltKilled")) {
          owner.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "boltKilled",
            img: "",
          });
        }
        if (app.rnJesus(0, owner.crits.pushBack)) {
          app.pushBack(owner, app.getOppositeDirection(owner.direction));
        }
      }
    }

    // TARGET IS BARRIER/OBSTACLE/ITEM/RUBBLE
    if (app.isBoltInCell(targetCell1.number) !== true) {
      if (cell1Item === true || cell1Rubble === true || targetCell1.obstacle.state === true || targetCell1.barrier.state === true) {
        // console.log(
        //   ownerType,
        //   owner.number,
        //   owner.id,
        //   "attacked an obstacle, barrier, item or rubble @",
        //   targetCell1.number,
        //   "w/ ",
        //   ownerWeaponType,
        //   ". attackCellContents"
        // );
        logAttack("cellContentsAttackCheck", {
          cell_item: cell1Item,
          cell_rubble: cell1Rubble,
        });

        if (
          (ownerType === "obstacle" || ownerType === "barrier") &&
          targetCell1[cellObstacleBarrier]?.trap.state === true &&
          targetCell1[cellObstacleBarrier]?.trap.acting.state === true &&
          targetCell1[cellObstacleBarrier]?.trap.action === "attack" &&
          (targetCell1[cellObstacleBarrier]?.trap.item.subType === "sword" || targetCell1[cellObstacleBarrier]?.trap.item.subType === "spear") &&
          targetCell1[cellObstacleBarrier]?.trap.acting.count === targetCell1[cellObstacleBarrier]?.trap.acting.peak &&
          targetCell1[cellObstacleBarrier]?.trap.direction === app.getOppositeDirection(owner.trap.direction)
        ) {
          let ownerCell = app.gridInfo.find((x) => x[cellObstacleBarrier].id === owner.id);
          if (owner.trap.acting.direction === app.getOppositeDirection(targetCell1[cellObstacleBarrier].trap.acting.direction)) {
            logTrap("trapsClashing", {
              owner_type: ownerType,
              owner_id: owner.id,
              target_type: cellObstacleBarrier,
              target_id: targetCell1[cellObstacleBarrier].id,
            });
            app.canPushObstacle(ownerType, owner, targetCell1, `hitPush`);
            app.canPushObstacle(cellObstacleBarrier, targetCell1[cellObstacleBarrier], ownerCell, `hitPush`);
          } else {
            logTrap("trapsTrading", {
              owner_type: ownerType,
              owner_id: owner.id,
              target_type: cellObstacleBarrier,
              target_id: targetCell1[cellObstacleBarrier].id,
            });
            app.attackCellContents("melee", ownerType, owner, targetCell1, targetCell2, myCell, undefined);
            let x = app.gridInfo.find(
              (x) =>
                x.number.x === app.getCellFromDirection(2, targetCell1.number, targetCell1[cellObstacleBarrier].trap.direction).x &&
                x.number.y === app.getCellFromDirection(2, targetCell1.number, targetCell1[cellObstacleBarrier].trap.direction).y,
            );
            app.attackCellContents("melee", cellObstacleBarrier, targetCell1[cellObstacleBarrier], ownerCell, x, targetCell1, undefined);
          }
        } else {
          app.attackCellContents("melee", ownerType, owner, targetCell1, targetCell2, myCell, undefined);
        }
      }
    }
  }

  if (cellNo === 2) {
    logCellNo = targetCell2.number;
    let cellObstacleBarrier = targetCell2.obstacle.state === true ? "obstacle" : targetCell2.barrier.state === true ? "barrier" : "";
    //TARGET IS PROJECTILE!!
    if (app.isBoltInCell(targetCell2.number) === true) {
      logAttack("destroyedBoltProjectile", {
        owner_type: ownerType,
        owner_number: ownerType === "player" ? owner.number : owner.id,
        owner_id: owner.id,
        target_cell: targetCell2.number,
        weapon_type: ownerWeaponType,
        result: "bolt destroyed; pushback?",
      });
      app.projectiles.find((x) => x.currentPosition.number.x === targetCell2.number.x && x.currentPosition.number.y === targetCell2.number.y).kill =
        true;

      if (ownerType === "player") {
        if (!owner.popups.find((x) => x.msg === "boltKilled")) {
          owner.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "boltKilled",
            img: "",
          });
        }
        if (app.rnJesus(0, owner.crits.pushBack)) {
          app.pushBack(owner, app.getOppositeDirection(owner.direction));
        }
      }
    }

    // TARGET IS BARRIER/OBSTACLE/ITEM/RUBBLE
    if (app.isBoltInCell(targetCell2.number) !== true) {
      if (cell2Item === true || cell2Rubble === true || targetCell2.obstacle.state === true || targetCell2.barrier.state === true) {
        // console.log(
        //   ownerType,
        //   owner.number,
        //   owner.id,
        //   "attacked an obstacle, barrier, item or rubble @",
        //   targetCell2.number,
        //   "w/ ",
        //   ownerWeaponType,
        //   ". attackCellContents"
        // );
        if (
          (ownerType === "obstacle" || ownerType === "barrier") &&
          targetCell2[cellObstacleBarrier]?.trap.state === true &&
          targetCell2[cellObstacleBarrier]?.trap.acting.state === true &&
          targetCell2[cellObstacleBarrier]?.trap.action === "attack" &&
          (targetCell2[cellObstacleBarrier]?.trap.item.subType === "sword" || targetCell2[cellObstacleBarrier]?.trap.item.subType === "spear") &&
          targetCell2[cellObstacleBarrier]?.trap.acting.count === targetCell2[cellObstacleBarrier]?.trap.acting.peak &&
          targetCell2[cellObstacleBarrier]?.trap.direction === app.getOppositeDirection(owner.trap.direction)
        ) {
          let ownerCell = app.gridInfo.find((x) => x[cellObstacleBarrier].id === owner.id);
          if (owner.trap.acting.direction === app.getOppositeDirection(targetCell2[cellObstacleBarrier].trap.acting.direction)) {
            logTrap("trapsClashing", {
              owner_type: ownerType,
              owner_id: owner.id,
              target_type: cellObstacleBarrier,
              target_id: targetCell2[cellObstacleBarrier].id,
            });
            app.canPushObstacle(ownerType, owner, targetCell2, `hitPush`);
            app.canPushObstacle(cellObstacleBarrier, targetCell2[cellObstacleBarrier], ownerCell, `hitPush`);
          } else {
            logTrap("trapsTrading", {
              owner_type: ownerType,
              owner_id: owner.id,
              target_type: cellObstacleBarrier,
              target_id: targetCell2[cellObstacleBarrier].id,
            });
            app.attackCellContents("melee", ownerType, owner, targetCell1, targetCell2, myCell, undefined);
            let x = app.gridInfo.find(
              (x) =>
                x.number.x === app.getCellFromDirection(2, targetCell2.number, targetCell2[cellObstacleBarrier].trap.direction).x &&
                x.number.y === app.getCellFromDirection(2, targetCell2.number, targetCell2[cellObstacleBarrier].trap.direction).y,
            );
            app.attackCellContents("melee", cellObstacleBarrier, targetCell2[cellObstacleBarrier], ownerCell, x, targetCell2, undefined);
          }
        } else {
          app.attackCellContents("melee", ownerType, owner, targetCell1, targetCell2, myCell, undefined);
        }
      }
    }
  }

  // TARGET IS A PLAYER
  for (const plyr of app.players) {
    if (cellNo === 1) {
      if (plyr.currentPosition.cell.number.x === targetCell1.number.x && plyr.currentPosition.cell.number.y === targetCell1.number.y) {
        targetPlayerRef = plyr;
      }
    }
    if (cellNo === 2) {
      if (plyr.currentPosition.cell.number.x === targetCell2.number.x && plyr.currentPosition.cell.number.y === targetCell2.number.y) {
        targetPlayerRef = plyr;
      }
    }
  }

  if (targetPlayerRef) {
    logAttack("targetIsPlayer", {
      number: targetPlayerRef.number,
    });

    // IS TARGET DEFENDING?
    let targetDefending = setTargetDefending();
    advantage = setAdvantage();
    const sameAxis = app.isSameAxisDirection(
      ownerActionDirection,
      targetDefending ? targetPlayerRef.defending.direction : targetPlayerRef.attacking.direction,
    );

    // BACK ATTACK
    if (ownerDirection === targetPlayerRef.direction) {
      backAttack = true;
      attackPosition = "back";
      // TARGET DODGING BACK ATTACK
      if (targetPlayerRef.dodging.state === true) {
        handleTargetDodging();

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }

      //TARGET NOT DODGING. VULNERABLE TO BACK ATTACK
      else {
        executeAttack();

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }
    }

    // SIDE ATTACK
    if (targetPlayerRef.direction !== ownerDirection && targetPlayerRef.direction !== app.getOppositeDirection(ownerDirection)) {
      sideAttack = true;
      attackPosition = "side";
      // TARGET PLAYER IS DODGING
      if (targetPlayerRef.dodging.state === true) {
        handleTargetDodging();

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }

      let simultaneousAttack = false;

      if (
        targetPlayerRef.attacking.peak === true ||
        (targetPlayerRef.action === "attacking" &&
          targetPlayerRef.attacking.count >= targetPlayerRef.attacking.peakCount &&
          targetPlayerRef.attacking.count <= targetPlayerRef.attacking.peakCount + app.simultaneousAttackAllowance)
      ) {
        simultaneousAttack = true;
      }

      if (targetPlayerRef.action === "attacking") {
        logAttack("lateralSimultaneousAttackTimingCheck", {
          action: targetPlayerRef.action,
          peak: targetPlayerRef.attacking.peak === true,
          above_peak: targetPlayerRef.attacking.count >= targetPlayerRef.attacking.peakCount,
          within_allowance: targetPlayerRef.attacking.count <= targetPlayerRef.attacking.peakCount + app.simultaneousAttackAllowance,
        });
      }

      if (simultaneousAttack === true) {
        // SIDE ATTACK CAN ONLY TRADE OR CLASH IF SLASHING IN THE OPPOSITE DIRECTION OF THE ATTACKER
        if (
          targetPlayerRef.attacking.directionType === "slash" &&
          targetPlayerRef.attacking.direction === app.getOppositeDirection(ownerActionDirection)
        ) {
          if (sameAxis !== true || ownerActionDirectionType === "thrust") {
            logAttack("compatibleLateralAttackDirectionsOppositeAxis", {
              owner_type: ownerType,
              owner_number: ownerType === "player" ? owner.number : owner.id,
              owner_id: owner.id,
              owner_action_direction: ownerActionDirection,
              target_number: targetPlayerRef.number,
              target_action_direction: targetPlayerRef.attacking.direction,
              result: "may trade blows",
            });
            handleTargetAttacking("trade");
          }
          if (sameAxis === true && ownerActionDirectionType !== "thrust") {
            logAttack("compatibleLateralAttackDirectionsSameAxis", {
              owner_type: ownerType,
              owner_number: ownerType === "player" ? owner.number : owner.id,
              owner_id: owner.id,
              owner_action_direction: ownerActionDirection,
              target_number: targetPlayerRef.number,
              target_action_direction: targetPlayerRef.attacking.direction,
              result: "may clash",
            });
            handleTargetAttacking("clash");
          }
        } else {
          logAttack("incompatibleLateralAttackDirections", {
            owner_type: ownerType,
            owner_number: ownerType === "player" ? owner.number : owner.id,
            owner_id: owner.id,
            owner_action_direction: ownerActionDirection,
            target_number: targetPlayerRef.number,
            target_action_direction: targetPlayerRef.attacking.direction,
            result: "execute attack",
          });
          executeAttack();
        }
      }

      // TARGET PLAYER DEFENDING
      else if (targetDefending === true) {
        logDefend(
          "lateralAttackTargetDefending",
          {
            owner_dir_type: ownerActionDirectionType,
            target_defend_type: targetPlayerRef.defending.directionType,
            owner_action_dir: ownerActionDirection,
            target_defend_dir: targetPlayerRef.defending.direction,
          },
          getDefendVariant(),
        );
        // SIDE ATTACK CAN ONLY BE DEFENDED AGAINST IF IT IS A SLASH IN THE OPPOSITE DIRECTION OF THE ATTACKER
        if (
          targetPlayerRef.defending.directionType === "slash" &&
          targetPlayerRef.defending.direction === app.getOppositeDirection(ownerActionDirection)
        ) {
          if (sameAxis === false || ownerActionDirectionType === "thrust") {
            logDefend(
              "incompatibleLateralDefendDirections",
              {
                owner_type: ownerType,
                owner_number: ownerType === "player" ? owner.number : owner.id,
                owner_id: owner.id,
                owner_action_direction: ownerActionDirection,
                target_number: targetPlayerRef.number,
                target_defend_direction: targetPlayerRef.defending.direction,
                result: "execute attack",
              },
              getDefendVariant(),
            );
            executeAttack();
          }
          if (sameAxis === true && ownerActionDirectionType !== "thrust") {
            logDefend(
              "compatibleLateralDefendDirections",
              {
                owner_type: ownerType,
                owner_number: ownerType === "player" ? owner.number : owner.id,
                owner_id: owner.id,
                owner_action_direction: ownerActionDirection,
                target_number: targetPlayerRef.number,
                target_defend_direction: targetPlayerRef.defending.direction,
              },
              getDefendVariant(),
            );
            handleTargetDefending();
          }
        } else {
          logDefend(
            "incompatibleLateralDefendDirections",
            {
              owner_type: ownerType,
              owner_number: ownerType === "player" ? owner.number : owner.id,
              owner_id: owner.id,
              owner_action_direction: ownerActionDirection,
              target_number: targetPlayerRef.number,
              target_defend_direction: targetPlayerRef.defending.direction,
              result: "execute attack",
            },
            getDefendVariant(),
          );
          executeAttack();
        }

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }

      // TARGET PLAYER NOT DODGING OR DEFENDING
      if (
        targetPlayerRef.dodging.state !== true &&
        // targetPlayerRef.attacking.peak !== true &&
        simultaneousAttack !== true &&
        targetDefending !== true
      ) {
        executeAttack();

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }
    }

    // TARGET & PLAYER ARE FACE TO FACE
    if (ownerDirection === app.getOppositeDirection(targetPlayerRef.direction)) {
      faceToFace = true;
      attackPosition = "front";
      // TARGET DODGING
      if (targetPlayerRef.dodging.state === true) {
        handleTargetDodging();

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }

      let defenderWeaponType = targetPlayerRef.currentWeapon.type;
      if (targetPlayerRef.currentWeapon.name === "") {
        defenderWeaponType = "unarmed";
      }
      let simultaneousAttack = false;
      if (
        targetPlayerRef.attacking.peak === true ||
        (targetPlayerRef.action === "attacking" &&
          targetPlayerRef.attacking.count >= targetPlayerRef.attacking.peakCount &&
          targetPlayerRef.attacking.count <= targetPlayerRef.attacking.peakCount + app.simultaneousAttackAllowance)
      ) {
        simultaneousAttack = true;
      }

      if (targetPlayerRef.action === "attacking") {
        logAttack("faceToFaceSimultaneousAttackTimingCheck", {
          action: targetPlayerRef.action,
          peak: targetPlayerRef.attacking.peak === true,
          above_peak: targetPlayerRef.attacking.count >= targetPlayerRef.attacking.peakCount,
          within_allowance: targetPlayerRef.attacking.count <= targetPlayerRef.attacking.peakCount + app.simultaneousAttackAllowance,
        });
      }

      // TARGET ALSO ATTACKING

      if (simultaneousAttack === true) {
        logAttack("faceToFaceSimultaneousAttack");

        const targetAttackDirection = targetPlayerRef.attacking.direction;
        const targetAttackDirectionType = targetPlayerRef.attacking.directionType;
        const directionsOpposed = ownerActionDirection === app.getOppositeDirection(targetAttackDirection);
        // const sameAxis = app.isSameAxisDirection(ownerActionDirection, targetAttackDirection);

        if (ownerActionDirectionType === "slash" && targetAttackDirectionType === "thrust") {
          logAttack("frontalSimultaneousSlashBeatsThrust", {
            ownerType,
            ownerNumber: ownerType === "player" ? owner.number : owner.id,
            targetNumber: targetPlayerRef.number,
            ownerActionDirectionType,
            targetAttackDirectionType,
          });

          executeAttack();
        } else if (ownerActionDirectionType === "thrust" && targetAttackDirectionType === "slash") {
          logAttack("frontalSimultaneousSlashBeatsThrustTargetWins", {
            ownerType,
            ownerNumber: ownerType === "player" ? owner.number : owner.id,
            targetNumber: targetPlayerRef.number,
            ownerActionDirectionType,
            targetAttackDirectionType,
          });

          app.handleMeleeDamage("player", targetPlayerRef, owner);
          app.setDeflection(owner, "attacked", false);
          targetPlayerRef.success.attackSuccess = {
            state: true,
            count: 1,
            limit: targetPlayerRef.success.attackSuccess.limit,
          };
        } else if (ownerActionDirectionType === "slash" && targetAttackDirectionType === "slash") {
          if (sameAxis) {
            logAttack("frontalSimultaneousSlashClash", {
              ownerType,
              ownerNumber: ownerType === "player" ? owner.number : owner.id,
              targetNumber: targetPlayerRef.number,
              ownerActionDirectionType,
              targetAttackDirectionType,
            });

            handleTargetAttacking("clash");
          } else {
            logAttack("frontalSimultaneousSlashTrade", {
              ownerType,
              ownerNumber: ownerType === "player" ? owner.number : owner.id,
              targetNumber: targetPlayerRef.number,
              ownerActionDirectionType,
              targetAttackDirectionType,
            });

            handleTargetAttacking("trade");
          }
        } else if (
          ownerActionDirectionType === "thrust" &&
          targetAttackDirectionType === "thrust" &&
          ownerDirection === app.getOppositeDirection(targetPlayerRef.direction)
        ) {
          logAttack("frontalSimultaneousThrustClash", {
            ownerType,
            ownerNumber: ownerType === "player" ? owner.number : owner.id,
            targetNumber: targetPlayerRef.number,
            ownerActionDirectionType,
            targetAttackDirectionType,
          });

          handleTargetAttacking("clash");
        }

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }

      // TARGET DEFENDING
      if (targetDefending === true) {
        logDefend(
          "faceToFaceTargetDefending",
          {
            owner_dir_type: ownerActionDirectionType,
            target_defend_type: targetPlayerRef.defending.directionType,
            owner_action_dir: ownerActionDirection,
            target_defend_dir: targetPlayerRef.defending.direction,
          },
          getDefendVariant(),
        );

        if (
          ownerActionDirectionType === "thrust" &&
          targetPlayerRef.defending.directionType === "thrust"
          // ownerActionDirection === app.getOppositeDirection(targetPlayerRef.defending.direction)
        ) {
          logDefend(
            "compatibleFrontalDefendDirectionsThrust",
            {
              ownerType,
              ownerNumber: ownerType === "player" ? owner.number : owner.id,
              ownerActionDirection,
              targetNumber: targetPlayerRef.number,
              targetDefendDirection: targetPlayerRef.defending.direction,
            },
            getDefendVariant(),
          );

          handleTargetDefending();
        } else if (
          ownerActionDirectionType === "slash" &&
          targetPlayerRef.defending.directionType === "slash" &&
          ownerActionDirection === targetPlayerRef.defending.direction
        ) {
          logDefend(
            "compatibleFrontalDefendDirectionsSlash",
            {
              ownerType,
              ownerNumber: ownerType === "player" ? owner.number : owner.id,
              ownerActionDirection,
              targetNumber: targetPlayerRef.number,
              targetDefendDirection: targetPlayerRef.defending.direction,
            },
            getDefendVariant(),
          );

          handleTargetDefending();
        } else {
          logDefend(
            "incompatibleFrontalDefendDirections",
            {
              ownerType,
              ownerNumber: ownerType === "player" ? owner.number : owner.id,
              ownerActionDirection,
              targetNumber: targetPlayerRef.number,
              targetDefendDirection: targetPlayerRef.defending.direction,
              result: "execute attack",
            },
            getDefendVariant(),
          );

          executeAttack();
        }

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }

      // TARGET NOT DEFENDING, DODGING OR ATTACKING, DAMAGE
      if (
        targetPlayerRef.dodging.state !== true &&
        // targetPlayerRef.attacking.peak !== true &&
        simultaneousAttack !== true &&
        targetDefending !== true
      ) {
        executeAttack();

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }
    }

    // app.players[targetPlayerRef.number - 1] = targetPlayerRef;
  }

  // if (ownerType === "player") {
  //   app.players[owner.number - 1] = owner;
  // }
}
