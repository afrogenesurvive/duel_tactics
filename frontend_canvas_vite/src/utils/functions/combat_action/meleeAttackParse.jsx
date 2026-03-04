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
    let defendPeak = target.defending.peakCount;
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
        console.log(
          "executing melee attack: ",
          ownerType,
          owner.number,
          owner.id,
          "blunt attacked a player",
          targetPlayerRef.number,
          "from the",
          attackPosition,
          " w/ ",
          ownerWeaponType,
          "@",
          logCellNo,
          "successfully. deflect target/defender",
        );
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
          console.log(
            "executing melee attack: ",
            ownerType,
            owner.number,
            owner.id,
            "attacked a player",
            targetPlayerRef.number,
            "from the",
            attackPosition,
            " w/ ",
            ownerWeaponType,
            "@",
            logCellNo,
            "successfully. damage,deflect target/defender",
          );
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
      console.log(
        "executing melee attack: ",
        ownerType,
        owner.number,
        owner.id,
        "attacked a player",
        targetPlayerRef.number,
        "from the",
        attackPosition,
        " w/ ",
        ownerWeaponType,
        "@",
        logCellNo,
        "successfully. damage,deflect target/defender",
        owner.trap.acting.direction,
      );
      app.handleMeleeDamage(ownerType, owner, targetPlayerRef);

      app.setDeflection(targetPlayerRef, "attacked", false);
    }
  };
  const handleTargetDodging = () => {
    console.log(
      "target dodging: ",
      ownerType,
      owner.number,
      owner.id,
      "attacked a player",
      targetPlayerRef.number,
      "from the",
      attackPosition,
      " w/ ",
      ownerWeaponType,
      "@",
      logCellNo,
      "but they dodged successfully",
    );

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
    // BLUNT ATTACK IS MADE FOR BREAKING DEFENSE
    if (ownerType === "player" && owner.attacking.blunt === true) {
      console.log(
        "target defending:",
        ownerType,
        owner.number,
        owner.id,
        "blunt attacked a player",
        targetPlayerRef.number,
        "from the",
        attackPosition,
        " w/ ",
        ownerWeaponType,
        " @",
        logCellNo,
        ". they defended but blunt attack is an auto defense break. Deflect target",
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
        // console.log(
        //   "target defending: attacker",
        //   ownerType,
        //   owner.number,
        //   owner.id,
        //   " & defender player",
        //   targetPlayerRef.number,
        //   "are evenly matched in combat advantage"
        // );

        // SIDE ATTACK OR FACE TO FACE
        // PEAK DEFEND/PARRY
        if (sideAttack === true || faceToFace === true) {
          if (
            targetPlayerRef.defending.peak === true ||
            (target.defending.decay.state === true && target.defending.decay.count < app.defendPeakAllowance)
          ) {
            console.log(
              "target defending:",
              ownerType,
              owner.number,
              owner.id,
              "attacked a player",
              targetPlayerRef.number,
              "from the",
              attackPosition,
              " w/ ",
              ownerWeaponType,
              " @",
              logCellNo,
              ". they parried successfully. Deflect/pushback (high chance) attacker?",
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
              console.log(
                "target defending:",
                ownerType,
                owner.number,
                owner.id,
                "attacked a player",
                targetPlayerRef.number,
                "from the",
                attackPosition,
                " w/ ",
                ownerWeaponType,
                " @",
                logCellNo,
                ". they off peak defended successfully. Deflect attacker?",
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
              console.log(
                "target defending:",
                ownerType,
                owner.number,
                owner.id,
                "attacked a player",
                targetPlayerRef.number,
                "from the",
                attackPosition,
                " w/ ",
                ownerWeaponType,
                " @",
                logCellNo,
                ". they off peak defended unsuccessfully. Damage, deflect target/defender?",
              );
              app.setDeflection(targetPlayerRef, "attacked", false);
              app.handleMeleeDamage(ownerType, owner, targetPlayerRef);
            }
          }
          //FACE TO FACE OFF PEAK DEFEND IS GUARANTEED SUCCESS
          if (faceToFace === true) {
            console.log(
              "target defending:",
              ownerType,
              owner.number,
              owner.id,
              "attacked a player",
              targetPlayerRef.number,
              "from the",
              attackPosition,
              " w/ ",
              ownerWeaponType,
              " @",
              logCellNo,
              ". they off peak defended successfully. Deflect/pushback attacker?",
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
        // console.log(
        //   "target defending: attacker",
        //   ownerType,
        //   owner.number,
        //   owner.id,
        //   " & defender player",
        //   targetPlayerRef.number,
        //   ". the attacker outmatches defender in comabt advantage (defender is likely unarmed). Damage deflect target/defender"
        // );
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
    // EVENLY MATCHED. CLASHING
    if (advantage === 0) {
      console.log(
        "target attacking: attacker",
        ownerType,
        owner.number,
        owner.id,
        " & defender player",
        targetPlayerRef.number,
        "are evenly matched in combat advantage. clashing!! pushback one or both players w/o damage",
      );

      // PUSHBACK ATTACKER/PLAYER BASED ON charge difference
      if (additional === "clash") {
        if (ownerType === "player") {
          targetPlayerRef.attacking.clashing.state = true;
          owner.attacking.clashing.state = true;
        } else {
          targetPlayerRef.attacking.clashing.state = true;
        }

        console.log(
          ownerType,
          owner.number,
          owner.id,
          "clashed with player",
          targetPlayerRef.number,
          "from the",
          attackPosition,
          " w/ ",
          ownerWeaponType,
          "@",
          logCellNo,
          ". pushback 1 or both players",
        );

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
        console.log(
          ownerType,
          owner.number,
          owner.id,
          "traded blows with player",
          targetPlayerRef.number,
          "from the",
          attackPosition,
          " w/ ",
          ownerWeaponType,
          "@",
          logCellNo,
          ". damage both players, deflect both players",
        );
        app.handleMeleeDamage(ownerType, owner, targetPlayerRef);
        app.setDeflection(targetPlayerRef, "attacked", false);

        if (ownerType === "player") {
          app.handleMeleeDamage("player", targetPlayerRef, owner);
          app.setDeflection(owner, "attacked", false);
        } else {
          app.attackCellContents("melee", "player", targetPlayerRef, targetCell, targetCell2, myCell, undefined);
        }
      }
    }

    // PLAYER ADVANTAGE
    if (advantage === 1) {
      console.log(
        "target attacking: attacker",
        ownerType,
        owner.number,
        owner.id,
        " & defender player",
        targetPlayerRef.number,
        "are unevenly matched in combat advantage. attacker advantage (defender is likely unarmed) damage, deflect target/defender",
      );
      if (ownerType === "player") {
        owner.success.attackSuccess = {
          state: true,
          count: 1,
          limit: owner.success.attackSuccess.limit,
        };
      }

      app.handleMeleeDamage(ownerType, owner, targetPlayerRef);
      app.setDeflection(targetPlayerRef, "attacked", false);
    }

    // TARGET ADVANTAGE
    if (advantage === 2) {
      console.log(
        "target attacking: attacker",
        ownerType,
        owner.number,
        owner.id,
        " & defender player",
        targetPlayerRef.number,
        "are unevenly matched in combat advantage. target/defender advantage (attacker is likely unarmed) damage, deflect attacker",
      );
      if (ownerType === "player") {
        app.handleMeleeDamage("player", targetPlayerRef, owner);
        app.setDeflection(owner, "attacked", false);
      } else {
        app.attackCellContents("melee", "player", targetPlayerRef, targetCell, targetCell2, myCell, undefined);
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
    console.log(`Non-player melee attack target.`, targetCell1.number);

    logCellNo = targetCell1.number;
    //TARGET IS PROJECTILE!!
    if (app.isBoltInCell(targetCell1.number) === true) {
      console.log(
        ownerType,
        owner.number,
        owner.id,
        "attacked and destroyed a bolt projectile @",
        targetCell1.number,
        "w/ ",
        ownerWeaponType,
        ". pushback?",
      );
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
        if (
          (targetCell1.obstacle.trap.state === true &&
            targetCell1.obstacle.trap.acting.state === true &&
            targetCell1.obstacle.trap.action === "attacking" &&
            (targetCell1.obstacle.trap.item.subType === "sword" || targetCell1.obstacle.trap.item.subType === "spear") &&
            targetCell1.obstacle.trap.acting.count === targetCell1.obstacle.trap.acting.peak &&
            targetCell1.obstacle.trap.acting.direction === app.getOppositeDirection(owner.direction)) ||
          (targetCell1.barrier.trap.state === true &&
            targetCell1.barrier.trap.acting.state === true &&
            targetCell1.barrier.trap.action === "attacking" &&
            (targetCell1.barrier.trap.item.subType === "sword" || targetCell1.barrier.trap.item.subType === "spear") &&
            targetCell1.barrier.trap.acting.count === targetCell1.barrier.trap.acting.peak &&
            targetCell1.barrier.trap.acting.direction === app.getOppositeDirection(owner.direction))
        ) {
          console.log("traps clashing!!");
        }
        app.attackCellContents("melee", ownerType, owner, targetCell1, targetCell2, myCell, undefined);
      }
    }
  }
  if (cellNo === 2) {
    console.log(`Non-player melee attack target.`, targetCell2.number);
    logCellNo = targetCell2.number;
    //TARGET IS PROJECTILE!!
    if (app.isBoltInCell(targetCell2.number) === true) {
      console.log(
        ownerType,
        owner.number,
        owner.id,
        "attacked and destroyed a bolt projectile @",
        targetCell2.number,
        "w/ ",
        ownerWeaponType,
        ". pushback?",
      );
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
          (targetCell2.obstacle.trap.state === true &&
            targetCell2.obstacle.trap.acting.state === true &&
            targetCell2.obstacle.trap.action === "attacking" &&
            (targetCell2.obstacle.trap.item.subType === "sword" || targetCell2.obstacle.trap.item.subType === "spear") &&
            targetCell2.obstacle.trap.acting.count === targetCell2.obstacle.trap.acting.peak &&
            targetCell2.obstacle.trap.acting.direction === app.getOppositeDirection(owner.direction)) ||
          (targetCell2.barrier.trap.state === true &&
            targetCell2.barrier.trap.acting.state === true &&
            targetCell2.barrier.trap.action === "attacking" &&
            (targetCell2.barrier.trap.item.subType === "sword" || targetCell2.barrier.trap.item.subType === "spear") &&
            targetCell2.barrier.trap.acting.count === targetCell2.barrier.trap.acting.peak &&
            targetCell2.barrier.trap.acting.direction === app.getOppositeDirection(owner.direction))
        ) {
          console.log("traps clashing!!");
        }
        app.attackCellContents("melee", ownerType, owner, targetCell1, targetCell2, myCell, undefined);
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
  if (ownerType === "player" && targetPlayerRef) {
    // IS TARGET DEFENDING?
    let targetDefending = setTargetDefending();
    advantage = setAdvantage();
    const sameAxis = app.isSameAxisDirection(ownerActionDirection, targetPlayerRef.attacking.direction);

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
        (targetPlayerRef.attacking.count >= targetPlayerRef.attacking.peakCount &&
          targetPlayerRef.attacking.count <= targetPlayerRef.attacking.peakCount + app.simultaneousAttackAllowance)
      ) {
        simultaneousAttack = true;
      }

      if (simultaneousAttack === true) {
        // SIDE ATTACK CAN ONLY TRADE OR CLASH IF SLASHING IN THE OPPOSITE DIRECTION OF THE ATTACKER
        if (targetPlayerRef.attacking.directionType === "slash" && targetPlayerRef.attacking.direction === app.getOppositeDirection(ownerDirection)) {
          if (sameAxis !== true || ownerActionDirectionType === "thrust") {
            console.log(
              "Compatible lateral attack directions: opposite axis",
              ownerType,
              owner.number,
              owner.id,
              ownerActionDirection,
              ". Target -",
              targetPlayerRef.number,
              targetPlayerRef.attacking.direction,
              " They may trade blows",
            );
            handleTargetAttacking("trade");
          }
          if (sameAxis === true && ownerActionDirectionType !== "thrust") {
            console.log(
              "Compatible lateral attack directions: same axis",
              ownerType,
              owner.number,
              owner.id,
              ownerActionDirection,
              ". Target -",
              targetPlayerRef.number,
              targetPlayerRef.attacking.direction,
              " They may clash",
            );
            handleTargetAttacking("clash");
          }
        } else {
          console.log(
            "Incompatible lateral attack directions: target attack direction does face attacker or is thrusting",
            ownerType,
            owner.number,
            owner.id,
            ownerActionDirection,
            ". Target -",
            targetPlayerRef.number,
            targetPlayerRef.attacking.direction,
          );
          executeAttack();
        }
      }

      // TARGET PLAYER DEFENDING
      else if (targetDefending === true) {
        // SIDE ATTACK CAN ONLY BE DEFENDED AGAINST IF IT IS A SLASH IN THE OPPOSITE DIRECTION OF THE ATTACKER
        if (targetPlayerRef.defending.directionType === "slash" && targetPlayerRef.defending.direction === app.getOppositeDirection(ownerDirection)) {
          if (sameAxis === false || ownerActionDirectionType === "thrust") {
            console.log(
              "Incompatible lateral defend directions: opposite axis or thrust",
              ownerType,
              owner.number,
              owner.id,
              ownerActionDirection,
              ". Target -",
              targetPlayerRef.number,
              targetPlayerRef.defending.direction,
            );
            executeAttack();
          }
          if (sameAxis === true && ownerActionDirectionType !== "thrust") {
            console.log(
              "Compatible lateral defend directions: same axis",
              ownerType,
              owner.number,
              owner.id,
              ownerActionDirection,
              ". Target -",
              targetPlayerRef.number,
              targetPlayerRef.defending.direction,
            );
            handleTargetDefending();
          }
        } else {
          console.log(
            "Incompatible lateral defend directions: target defend direction does not face attacker",
            ownerType,
            owner.number,
            owner.id,
            ownerActionDirection,
            ". Target -",
            targetPlayerRef.number,
            targetPlayerRef.defending.direction,
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
      // console.log(
      //   "here",
      //   owner.attacking.count,
      //   targetPlayerRef.attacking.count,
      //   targetPlayerRef.attacking.animRef.peak[defenderWeaponType] - app.simultaneousAttackAllowance
      // );
      if (
        targetPlayerRef.attacking.peak === true ||
        (targetPlayerRef.attacking.count >= targetPlayerRef.attacking.peakCount &&
          targetPlayerRef.attacking.count <= targetPlayerRef.attacking.peakCount + app.simultaneousAttackAllowance)
      ) {
        simultaneousAttack = true;
      }

      // TARGET ALSO ATTACKING

      if (simultaneousAttack === true) {
        const targetAttackDirection = targetPlayerRef.attacking.direction;
        const targetAttackDirectionType = targetPlayerRef.attacking.directionType;
        const directionsOpposed = ownerActionDirection === app.getOppositeDirection(targetAttackDirection);
        const sameAxis = app.isSameAxisDirection(ownerActionDirection, targetAttackDirection);

        if (ownerActionDirectionType === "slash" && targetAttackDirectionType === "thrust") {
          console.log(
            "Frontal simultaneous: slash beats thrust in opposite directions. Owner damages target.",
            ownerType,
            owner.number,
            owner.id,
            ownerActionDirectionType,
            "vs",
            targetAttackDirectionType,
          );
          executeAttack();
          resolved = true;
        } else if (ownerActionDirectionType === "thrust" && targetAttackDirectionType === "slash") {
          console.log(
            "Frontal simultaneous: slash beats thrust in opposite directions. Target damages owner.",
            ownerType,
            owner.number,
            owner.id,
            ownerActionDirectionType,
            "vs",
            targetAttackDirectionType,
          );
          app.handleMeleeDamage("player", targetPlayerRef, owner);
          app.setDeflection(owner, "attacked", false);
          targetPlayerRef.success.attackSuccess = {
            state: true,
            count: 1,
            limit: targetPlayerRef.success.attackSuccess.limit,
          };
          resolved = true;
        } else if (ownerActionDirectionType === "slash" && targetAttackDirectionType === "slash") {
          if (sameAxis) {
            console.log(
              "Frontal simultaneous: slash vs slash on same axis. Clash!",
              ownerType,
              owner.number,
              owner.id,
              ownerActionDirection,
              targetAttackDirection,
            );
            handleTargetAttacking("clash");
          } else {
            console.log(
              "Frontal simultaneous: slash vs slash on different axes. Trade!",
              ownerType,
              owner.number,
              owner.id,
              ownerActionDirection,
              targetAttackDirection,
            );
            handleTargetAttacking("trade");
          }
          resolved = true;
        } else if (ownerActionDirectionType === "thrust" && targetAttackDirectionType === "thrust" && directionsOpposed) {
          console.log(
            "Frontal simultaneous: thrust vs thrust in opposite directions. Clash!",
            ownerType,
            owner.number,
            owner.id,
            ownerActionDirection,
            targetAttackDirection,
          );
          handleTargetAttacking("clash");
          resolved = true;
        }

        if (ownerType === "player") {
          app.players[owner.number - 1] = owner;
        }
        app.players[targetPlayerRef.number - 1] = targetPlayerRef;
        return;
      }

      // TARGET DEFENDING
      if (targetDefending === true) {
        if (
          ownerActionDirectionType === "thrust" &&
          targetPlayerRef.defending.directionType === "thrust" &&
          ownerActionDirection === app.getOppositeDirection(targetPlayerRef.defending.direction)
        ) {
          console.log(
            "Compatible frontal defend directions: thrust & opposite direction. Perfect!",
            ownerType,
            owner.number,
            owner.id,
            ownerActionDirection,
            ". Target -",
            targetPlayerRef.number,
            targetPlayerRef.defending.direction,
          );
          handleTargetDefending();
        } else if (
          ownerActionDirectionType === "slash" &&
          targetPlayerRef.defending.directionType === "slash" &&
          ownerActionDirection === targetPlayerRef.defending.direction
        ) {
          console.log(
            "Compatible frontal defend directions: same direction. Perfect!",
            ownerType,
            owner.number,
            owner.id,
            ownerActionDirection,
            ". Target -",
            targetPlayerRef.number,
            targetPlayerRef.defending.direction,
          );
          handleTargetDefending();
        } else {
          console.log(
            "Incompatible lateral defend directions: different directions.",
            ownerType,
            owner.number,
            owner.id,
            ownerActionDirection,
            ". Target -",
            targetPlayerRef.number,
            targetPlayerRef.defending.direction,
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
