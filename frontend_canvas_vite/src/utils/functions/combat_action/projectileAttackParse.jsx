// player target
// - dodging
// - - all directions
// - back attack
// - side attack
// - - armed
// - - - peak attack
// - - - - correct direction
// - - - - incorrect direction
// - - unarmed
// - - defending
// - - - unarmed
// - - - armed
// - - - - correct direction
// - - - - - peak defend
// - - - - - off-peak defend
// - - - - incorrect direction
// - - no attack or defend
// - frontal attack
// - - peak attack unarmed
// - - correct direction
// - - - peak attack armed
// - - incorrect direction
// - - - peak attack armed
// - - defending
// - - - correct direction
// - - - - unarmed
// - - - - - peak
// - - - - - off-peak
// - - - - armed
// - - - - - peak
// - - - - - off-peak
// - - - incorrect direction
// - - no attack or defend

export function projectileAttackParse(app, bolt, ownerType, targetType, target) {
  // console.log("projectileAttackParse", app.time, target.attacking.peakCount);
  const logProjectile = (message, data = {}) => {
    app.globalLogger("player.attacking.projectile", message, data, { fn: "projectileAttackParse" });
  };

  logProjectile("projectileAttackParse", {
    time: app.time,
    bolt_direction: bolt.direction,
    target_atk_peak: target.attacking.peak,
    target_atk_count: target.attacking.count,
    target_atk_peakCount: target.attacking.peakCount,
    allowance: target.attacking.peakCount + target.attacking.effectivenessAllowance,
    count_is_peak: target.attacking.count >= target.attacking.peakCount,
    count_is_within_effectiveness: target.attacking.count < target.attacking.peakCount + target.attacking.effectivenessAllowance,
    defend_direction: target.defending.direction,
  });

  let deflected = false;
  let x;
  let boltChargePercentage = 0;
  let boltOwner;
  if (ownerType === "player") {
    const directionalInputThresh = Math.ceil(app.players[bolt.owner - 1].attacking.animRef.peak.crossbow.slash / 2);
    boltChargePercentage = (bolt.charge / (app.players[bolt.owner - 1].attacking.peakCount - directionalInputThresh)) * 100;
  }

  app.cellsUnderAttack.push({
    number: {
      x: target.currentPosition.cell.number.x,
      y: target.currentPosition.cell.number.y,
    },
    count: 1,
    limit: 8,
  });

  if (targetType === "player") {
    let weapon = target.currentWeapon.type;

    // ATTACK STAM UNARMED CHECK & AND POPUPS SET
    let playerAttackStamType;

    if (target.currentWeapon.name !== "") {
      playerAttackStamType = app.staminaCostRef.attack[target.currentWeapon.type].normal;
    }

    if (target.attacking.blunt === true && target.currentWeapon.name !== "") {
      playerAttackStamType = app.staminaCostRef.attack[target.currentWeapon.type].blunt;
    }
    if (target.currentWeapon.name === "") {
      playerAttackStamType = app.staminaCostRef.attack.unarmed.normal;
      if (target.attacking.blunt === true) {
        playerAttackStamType = app.staminaCostRef.attack.unarmed.blunt;
      }
      weapon = "unarmed";
    }

    // IS TARGET DEFENDING?
    let targetDefending = false;
    let defendType = target.currentWeapon.type;
    if (target.currentWeapon.name === "") {
      defendType = "unarmed";
    }
    let defendPeak = target.defending.peakCount;
    if ((target.defending.count > 0 && target.defending.count === defendPeak) || target.defending.decay.state === true) {
      targetDefending = true;
    }

    //BOLT TARGET DODGING
    if (target.dodging.state === true) {
      logProjectile("targetPlayerDodging", {
        number: target.number,
        boltOwnerType: bolt.ownerType,
        boltOwner: bolt.owner,
      });

      target.stamina.current += app.staminaCostRef.dodge.pre;
      // FINISH
      x = app.projectiles.find((x) => x.id === bolt.id);
      x = bolt;
      app.players[target.number - 1] = target;
      return;
    } else {
      // BOLT NOT DODGED MUST HIT PLAYER
      bolt.kill = true;
      // BOLT TARGET NOT DODGING
      // BACK ATTACK
      if (target.direction === bolt.direction && deflected !== true) {
        logProjectile("boltHitPlayer", {
          target_no: target.number,
          owner_type: bolt.ownerType,
          owner: bolt.owner,
          bolt_dir: bolt.direction,
          atk_position: "back",
          result: "Damage & deflection",
        });
        app.handleProjectileDamage(bolt, ownerType, "player", target);
        app.setDeflection(target, "attacked", false);
        deflected = true;
        // FINISH
        x = app.projectiles.find((x) => x.id === bolt.id);
        x = bolt;
        app.players[target.number - 1] = target;
        return;
      }

      // SIDE ATTACK
      if (target.direction !== bolt.direction && target.direction !== app.getOppositeDirection(bolt.direction) && deflected !== true) {
        // PLAYER IS ATTACKING ARMED

        if (
          (target.attacking.peak === true ||
            (target.action === "attacking" &&
              target.attacking.count >= target.attacking.peakCount &&
              target.attacking.count < target.attacking.peakCount + target.attacking.effectivenessAllowance)) &&
          weapon !== "unarmed"
        ) {
          // CHANCE TO KILL BOLT & PUSHBACK
          // ONLY SLASH IN OPPOSITE DIRECTION CAN KILL BOLT
          if (target.attacking.directionType === "slash" && target.attacking.direction === app.getOppositeDirection(bolt.direction)) {
            // LOWER BOLT CHARGE AND HIGHER GB CRIT INCREASES CHANCE OF ATTACK SUCCESS

            if (app.rnJesus(1, bolt.charge - target.crits.guardBreak) <= 1) {
              // if (app.rnJesus(1, 1) <= 1) {
              logProjectile("boltSideAttackBlockedBySlash", {
                target_no: target.number,
                owner_type: bolt.ownerType,
                owner: bolt.owner,
                bolt_dir: bolt.direction,
                atk_position: "side",
                result: "but they attacked it successfull beating charge roll w/ guardBreak crit. Pushback?",
              });
              if (!target.popups.find((x) => x.msg === "boltKilled")) {
                target.popups.push({
                  state: false,
                  count: 0,
                  limit: 30,
                  type: "",
                  position: "",
                  msg: "boltKilled",
                  img: "",
                });
              }
              app.pushBack(target, bolt.direction);
              target.success.attackSuccess = {
                state: true,
                count: 1,
                limit: target.success.attackSuccess.limit,
              };

              // FINISH
              x = app.projectiles.find((x) => x.id === bolt.id);
              x = bolt;
              app.players[target.number - 1] = target;
              return;
            }

            // OR BE INJURED
            else {
              logProjectile("boltSideAttackFailedChargeRoll", {
                target_no: target.number,
                owner_type: bolt.ownerType,
                owner: bolt.owner,
                bolt_dir: bolt.direction,
                atk_position: "side",
                result: "and they failed the charge roll w/ guardBreak crit to block it. Take damage & deflect(?)",
              });
              app.handleProjectileDamage(bolt, ownerType, "player", target);
              app.setDeflection(target, "attacked", false);
              deflected = true;
              // FINISH
              x = app.projectiles.find((x) => x.id === bolt.id);
              x = bolt;
              app.players[target.number - 1] = target;
              return;
            }
          }

          // OR BE INJURED
          else {
            logProjectile("boltSideAttackFailedDirection", {
              target_no: target.number,
              owner_type: bolt.ownerType,
              owner: bolt.owner,
              bolt_dir: bolt.direction,
              atk_position: "side",
              result: "but they attacked in the wrong direction, so take damage & deflect(?)",
            });
            app.handleProjectileDamage(bolt, ownerType, "player", target);
            app.setDeflection(target, "attacked", false);
            deflected = true;
            // FINISH
            x = app.projectiles.find((x) => x.id === bolt.id);
            x = bolt;
            app.players[target.number - 1] = target;
            return;
          }
        }

        // PLAYER IS ATTACKING BUT UNARMED, TAKE DAMAGE
        if (
          (target.attacking.peak === true ||
            (target.action === "attacking" &&
              target.attacking.count >= target.attacking.peakCount &&
              target.attacking.count < target.attacking.peakCount + target.attacking.effectivenessAllowance)) &&
          weapon === "unarmed"
        ) {
          logProjectile("boltSideAttackUnarmed", {
            target_no: target.number,
            owner_type: bolt.ownerType,
            owner: bolt.owner,
            bolt_dir: bolt.direction,
            atk_position: "side",
            result: "but they were unarmed, so take damage & deflect(?)",
          });
          app.handleProjectileDamage(bolt, ownerType, "player", target);
          app.setDeflection(target, "attacked", false);
          deflected = true;
          // FINISH
          x = app.projectiles.find((x) => x.id === bolt.id);
          x = bolt;
          app.players[target.number - 1] = target;
          return;
        }

        // PLAYER DEFENDING
        if (targetDefending === true) {
          // UNARMED DEFENSE = DAMAGE.
          if (weapon === "unarmed" || defendType === "unarmed") {
            logProjectile("boltSideDefendUnarmed", {
              target_no: target.number,
              owner_type: bolt.ownerType,
              owner: bolt.owner,
              bolt_dir: bolt.direction,
              atk_position: "side",
              result: "but they were unarmed, so take damage & deflect(?)",
            });
            app.handleProjectileDamage(bolt, ownerType, "player", target);
            app.setDeflection(target, "attacked", false);
            deflected = true;
            // FINISH
            x = app.projectiles.find((x) => x.id === bolt.id);
            x = bolt;
            app.players[target.number - 1] = target;
            return;
          }
          // ARMED DEFENSE
          else {
            // ONLY SLASH IN OPPOSITE DIRECTION CAN DEFEND BOLT
            if (target.defending.directionType === "slash" && target.defending.direction === app.getOppositeDirection(bolt.direction)) {
              // PEAK DEFENSE IS GUARANTEED DEFEND SUCCESS
              // HIGHER PUSHBACK AND BOLT CHARGE INCREASE CHANCE OF PUSHBACK
              if (
                target.defending.peak === true ||
                (target.defending.decay.state === true && target.defending.decay.count < app.defendPeakAllowance)
              ) {
                logProjectile("boltSideParry", {
                  target_no: target.number,
                  owner_type: bolt.ownerType,
                  owner: bolt.owner,
                  bolt_dir: bolt.direction,
                  atk_position: "side",
                  result: "and they parried it on the peak, so no damage. Pushback?",
                });
                target.stamina.current += app.staminaCostRef.defend.peak;
                target.success.defendSuccess = {
                  state: true,
                  count: 1,
                  limit: target.success.defendSuccess.limit,
                };
                target.statusDisplay = {
                  state: true,
                  status: "Parry!",
                  count: 1,
                  limit: target.statusDisplay.limit,
                };
                if (!target.popups.find((x) => x.msg === "attackParried")) {
                  target.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "attackParried",
                    img: "",
                  });
                }
                // HIGHER PUSHBACK AND BOLT CHARGE INCREASE CHANCE OF PUSHBACK
                if (app.rnJesus(1, target.crits.pushBack + bolt.charge) !== 1) {
                  logProjectile("boltPushBack", {
                    target_no: target.number,
                    owner_type: bolt.ownerType,
                    owner: bolt.owner,
                    bolt_dir: bolt.direction,
                    result: "pushBack roll: rnJesus(1, target.crits.pushBack + bolt.charge)",
                  });
                  app.pushBack(target, bolt.direction);
                }

                // FINISH
                x = app.projectiles.find((x) => x.id === bolt.id);
                x = bolt;
                app.players[target.number - 1] = target;
                return;
              }

              // OFF PEAK DEFEND
              // CHANCE FOR DEFEND SUCCESS
              // LOWER BOLT CHARGE AND HIGHER GB CRIT INCREASES CHANCE OF DEFEND SUCCESS
              if (target.defending.peak !== true && target.defending.decay.state === true && target.defending.decay.count > app.defendPeakAllowance) {
                if (app.rnJesus(1, bolt.charge - target.crits.guardBreak) <= 1) {
                  logProjectile("boltSideDefendOffPeakSuccess", {
                    target_no: target.number,
                    owner_type: bolt.ownerType,
                    owner: bolt.owner,
                    bolt_dir: bolt.direction,
                    atk_position: "side",
                    result: "they defended off-peak beating the charge roll w/ guardBreak crit, so no damage but pushback?",
                  });
                  target.success.defendSuccess = {
                    state: true,
                    count: 1,
                    limit: target.success.defendSuccess.limit,
                  };
                  target.statusDisplay = {
                    state: true,
                    status: "Defend",
                    count: 1,
                    limit: target.statusDisplay.limit,
                  };
                  if (!target.popups.find((x) => x.msg === "defendSuccess")) {
                    target.popups.push({
                      state: false,
                      count: 0,
                      limit: 25,
                      type: "",
                      position: "",
                      msg: "defendSuccess",
                      img: "",
                    });
                  }
                  if (app.rnJesus(1, target.crits.pushBack) === 1) {
                    app.pushBack(target, app.getOppositeDirection(target.direction));
                  }
                  // FINISH
                  x = app.projectiles.find((x) => x.id === bolt.id);
                  x = bolt;
                  app.players[target.number - 1] = target;
                  return;
                }

                // DEFEND FAILURE DAMAGE, DEFLECT || DEFLECT + PUSHBACK
                else {
                  logProjectile("boltSideDefendOffPeakFail", {
                    target_no: target.number,
                    owner_type: bolt.ownerType,
                    owner: bolt.owner,
                    bolt_dir: bolt.direction,
                    atk_position: "side",
                    result: "they defended off-peak but failed the charge roll w/ guardBreak crit to block it. Take damage",
                  });
                  app.handleProjectileDamage(bolt, ownerType, "player", target);

                  deflected = true;
                  // FINISH
                  x = app.projectiles.find((x) => x.id === bolt.id);
                  x = bolt;
                  app.players[target.number - 1] = target;
                  return;
                }
              }
            }

            // OR BE INJURED
            else {
              logProjectile("boltSideDefendWrongDirection", {
                target_no: target.number,
                owner_type: bolt.ownerType,
                owner: bolt.owner,
                bolt_dir: bolt.direction,
                atk_position: "side",
                result: "but they defended in the wrong direction, so take damage & deflect",
              });
              app.handleProjectileDamage(bolt, ownerType, "player", target);
              app.setDeflection(target, "attacked", false);
              deflected = true;
              // FINISH
              x = app.projectiles.find((x) => x.id === bolt.id);
              x = bolt;
              app.players[target.number - 1] = target;
              return;
            }
          }
        }

        //PLAYER NOT DEFENDING OR ATTACKING, TAKE DAMAGE
        if (
          (targetDefending !== true && target.attacking.peak !== true && (target.action !== "attacking" || target.attacking.count === 0)) ||
          target.attacking.directionType !== "slash"
        ) {
          let takeDamage = true;
          if (target.attacking.state === true && target.attacking.charge > 0) {
            let chargePerc = Match.ceil((target.attacking.charge / target.attacking.maxCharge) * 10);
            if (app.rnJesus(1, target.crits.guardBreak + chargePerc) === 1) {
              takeDamage = false;
            }
          }
          if (takeDamage) {
            logProjectile("boltSideHitUnprotected", {
              target_no: target.number,
              owner_type: bolt.ownerType,
              owner: bolt.owner,
              bolt_dir: bolt.direction,
              atk_position: "side",
              result: "not attacking or defending. failed charge roll w/ guardBreak crit, so take damage & deflect",
            });

            app.handleProjectileDamage(bolt, ownerType, "player", target);
            app.setDeflection(target, "attacked", false);
            deflected = true;
            // FINISH
            x = app.projectiles.find((x) => x.id === bolt.id);
            x = bolt;
            app.players[target.number - 1] = target;
          }

          return;
        }
      }

      // FRONTAL ATTACK
      if (bolt.direction === app.getOppositeDirection(target.direction) && deflected !== true) {
        // PLAYER IS ATTACKING BUT UNARMED, TAKE DAMAGE
        if (
          (target.attacking.peak === true ||
            (target.action === "attacking" &&
              target.attacking.count >= target.attacking.peakCount &&
              target.attacking.count < target.attacking.peakCount + target.attacking.effectivenessAllowance)) &&
          weapon === "unarmed"
        ) {
          logProjectile("boltFrontAttackUnarmed", {
            target_no: target.number,
            owner_type: bolt.ownerType,
            owner: bolt.owner,
            bolt_dir: bolt.direction,
            atk_position: "front",
            result: "but they were unarmed, so take damage & deflect)",
          });
          app.handleProjectileDamage(bolt, ownerType, "player", target);
          app.setDeflection(target, "attacked", false);
          deflected = true;
          // FINISH
          x = app.projectiles.find((x) => x.id === bolt.id);
          x = bolt;
          app.players[target.number - 1] = target;
          return;
        }
        // PLAYER ARMED AND ATTACKING
        // ONLY SLASH ON SAME AXIS CAN ATTACK/DEFEND BOLT
        if (
          target.attacking.directionType === "slash" &&
          (target.attacking.direction === app.getOppositeDirection(bolt.direction) || target.attacking.direction === bolt.direction)
        ) {
          if (
            (target.attacking.peak === true ||
              (target.action === "attacking" &&
                target.attacking.count >= target.attacking.peakCount &&
                target.attacking.count < target.attacking.peakCount + target.attacking.effectivenessAllowance)) &&
            weapon !== "unarmed"
          ) {
            logProjectile("boltFrontAttackSuccess", {
              target_no: target.number,
              owner_type: bolt.ownerType,
              owner: bolt.owner,
              bolt_dir: bolt.direction,
              atk_position: "front",
              result: "and they attacked it successfully, pushback?",
            });
            if (!target.popups.find((x) => x.msg === "boltKilled")) {
              target.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "boltKilled",
                img: "",
              });
            }
            // HIGHER BOLT CHARGE AND LOWER PUSBACK INCREASES CHANCE OF PUSHBACK
            if (app.rnJesus(1, target.crits.pushBack - bolt.charge) >= 1) {
              logProjectile("boltPushBack", {
                target_no: target.number,
                owner_type: bolt.ownerType,
                owner: bolt.owner,
                bolt_dir: bolt.direction,
                result: "pushBack roll: rnJesus(1, target.crits.pushBack - bolt.charge)",
              });
              app.pushBack(target, app.getOppositeDirection(target.direction));
            }
            target.success.attackSuccess = {
              state: true,
              count: 1,
              limit: target.success.attackSuccess.limit,
            };
            // FINISH
            x = app.projectiles.find((x) => x.id === bolt.id);
            x = bolt;
            app.players[target.number - 1] = target;
            return;
          }
        }

        // TAKE DAMAGE/BE INJURED
        else if (
          target.attacking.peak === true &&
          (target.attacking.count < target.attacking.peakCount ||
            target.attacking.count > target.attacking.peakCount + target.attacking.effectivenessAllowance) &&
          weapon !== "unarmed"
        ) {
          logProjectile("boltFrontAttackFailedDirection", {
            target_no: target.number,
            owner_type: bolt.ownerType,
            owner: bolt.owner,
            bolt_dir: bolt.direction,
            atk_position: "front",
            result: "but attacked in the wrong direction, so take damage & deflect",
          });
          app.handleProjectileDamage(bolt, ownerType, "player", target);
          app.setDeflection(target, "attacked", false);
          deflected = true;
          // FINISH
          x = app.projectiles.find((x) => x.id === bolt.id);
          x = bolt;
          app.players[target.number - 1] = target;
          return;
        }

        // PLAYER DEFENDING
        if (targetDefending === true) {
          // ONLY SLASH ON SAME AXIS CAN DEFEND BOLT
          if (
            target.defending.directionType === "slash" &&
            (target.defending.direction === app.getOppositeDirection(bolt.direction) || target.defending.direction === bolt.direction)
          ) {
            // UNARMED DEFENSE
            if (weapon === "unarmed") {
              // UNARMED PEAK DEFEND, BOLT CHRG RNG SUCCESS ?
              if (
                target.defending.peak === true ||
                (target.defending.decay.state === true && target.defending.decay.count < app.defendPeakAllowance)
              ) {
                // PARRIED & OVERCOME BOLT CHARGE

                if (app.rnJesus(1, bolt.charge - target.crits.guardBreak) <= 1) {
                  logProjectile("boltFrontParryUnarmedSuccess", {
                    target_no: target.number,
                    owner_type: bolt.ownerType,
                    owner: bolt.owner,
                    bolt_dir: bolt.direction,
                    atk_position: "front",
                    result: "guardBreak roll success: rnJesus(1, bolt.charge - target.crits.guardBreak)",
                  });
                  // target.stamina.current += app.staminaCostRef.defend.peak;
                  target.success.defendSuccess = {
                    state: true,
                    count: 1,
                    limit: target.success.defendSuccess.limit,
                  };
                  target.statusDisplay = {
                    state: true,
                    status: "Parry!",
                    count: 1,
                    limit: target.statusDisplay.limit,
                  };
                  if (!target.popups.find((x) => x.msg === "attackParried")) {
                    target.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "attackParried",
                      img: "",
                    });
                  }
                  // FINISH
                  x = app.projectiles.find((x) => x.id === bolt.id);
                  x = bolt;
                  app.players[target.number - 1] = target;
                  return;
                }
                // SUCCESSFUL PARRY BUT OVERCOME BY BOLT CHARGE. TAKE DAMAGE
                else {
                  logProjectile("boltFrontParryUnarmedOverwhelmed", {
                    target_no: target.number,
                    owner_type: bolt.ownerType,
                    owner: bolt.owner,
                    bolt_dir: bolt.direction,
                    atk_position: "front",
                    result: "peak defended unarmed but they were overwhelmed by the bolt charge. Deflect & take damage",
                  });
                  app.handleProjectileDamage(bolt, ownerType, "player", target);
                  app.setDeflection(target, "attacked", false);
                  deflected = true;
                  // FINISH
                  x = app.projectiles.find((x) => x.id === bolt.id);
                  x = bolt;
                  app.players[target.number - 1] = target;
                  return;
                }
              }

              // UNARMED OFF PEAK DEFEND, TAKE DAMAGE
              if (target.defending.peak !== true && target.defending.decay.state === true && target.defending.decay.count > app.defendPeakAllowance) {
                logProjectile("boltFrontDefendUnarmedOffPeak", {
                  target_no: target.number,
                  owner_type: bolt.ownerType,
                  owner: bolt.owner,
                  bolt_dir: bolt.direction,
                  atk_position: "front",
                  result: "defended unarmed off-peak, but off-peak is not effective for projectiles, so take damage & deflect",
                });
                app.handleProjectileDamage(bolt, ownerType, "player", target);
                app.setDeflection(target, "attacked", false);
                deflected = true;
                // FINISH
                x = app.projectiles.find((x) => x.id === bolt.id);
                x = bolt;
                app.players[target.number - 1] = target;
                return;
              }
            }

            // ARMED DEFENSE
            else {
              // ARMED PEAK DEFEND
              if (
                target.defending.peak === true ||
                (target.defending.decay.state === true && target.defending.decay.count < app.defendPeakAllowance)
              ) {
                logProjectile("boltFrontParryArmed", {
                  target_no: target.number,
                  owner_type: bolt.ownerType,
                  owner: bolt.owner,
                  bolt_dir: bolt.direction,
                  atk_position: "front",
                  result: "and they parried it armed on the peak, so no damage. Pushback?",
                });
                target.stamina.current += app.staminaCostRef.defend.peak;
                target.success.defendSuccess = {
                  state: true,
                  count: 1,
                  limit: target.success.defendSuccess.limit,
                };
                target.statusDisplay = {
                  state: true,
                  status: "Parry!",
                  count: 1,
                  limit: target.statusDisplay.limit,
                };
                if (!target.popups.find((x) => x.msg === "attackParried")) {
                  target.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "attackParried",
                    img: "",
                  });
                }
                if (app.rnJesus(1, target.crits.pushBack + bolt.charge) === 1) {
                  logProjectile("boltPushBack", {
                    target_no: target.number,
                    owner_type: bolt.ownerType,
                    owner: bolt.owner,
                    bolt_dir: bolt.direction,
                    result: "pushBack roll: rnJesus(1, target.crits.pushBack + bolt.charge)",
                  });
                  app.pushBack(target, app.getOppositeDirection(target.direction));
                }
                // FINISH
                x = app.projectiles.find((x) => x.id === bolt.id);
                x = bolt;
                app.players[target.number - 1] = target;
                return;
              }

              // ARMED OFF PEAK DEFEND
              // IF BOLT CHARGE PERC IS OVER 90%, CHANCE TO DEFEND BREAK/TAKE DMG
              if (target.defending.peak !== true && target.defending.decay.state === true && target.defending.decay.count > app.defendPeakAllowance) {
                if (app.rnJesus(1, bolt.charge - target.crits.guardBreak) <= 1) {
                  logProjectile("boltFrontDefendArmedOffPeakSuccess", {
                    target_no: target.number,
                    owner_type: bolt.ownerType,
                    owner: bolt.owner,
                    bolt_dir: bolt.direction,
                    atk_position: "front",
                    result: "guardBreak roll success: rnJesus(1, bolt.charge - target.crits.guardBreak)",
                  });
                  target.success.defendSuccess = {
                    state: true,
                    count: 1,
                    limit: target.success.defendSuccess.limit,
                  };
                  target.statusDisplay = {
                    state: true,
                    status: "Defend",
                    count: 1,
                    limit: target.statusDisplay.limit,
                  };
                  if (!target.popups.find((x) => x.msg === "defendSuccess")) {
                    target.popups.push({
                      state: false,
                      count: 0,
                      limit: 25,
                      type: "",
                      position: "",
                      msg: "defendSuccess",
                      img: "",
                    });
                  }
                  if (app.rnJesus(1, target.crits.pushBack) === 1) {
                    app.pushBack(target, app.getOppositeDirection(target.direction));
                  }
                  // FINISH
                  x = app.projectiles.find((x) => x.id === bolt.id);
                  x = bolt;
                  app.players[target.number - 1] = target;
                  return;
                }

                // TAKE DAMAGE/BE INJURED
                else {
                  logProjectile("boltFrontDefendArmedOffPeakFail", {
                    target_no: target.number,
                    owner_type: bolt.ownerType,
                    owner: bolt.owner,
                    bolt_dir: bolt.direction,
                    atk_position: "front",
                    result: "guardBreak roll failed: rnJesus(1, bolt.charge - target.crits.guardBreak)",
                  });
                  app.handleProjectileDamage(bolt, ownerType, "player", target);
                  app.setDeflection(target, "attacked", false);
                  deflected = true;
                  // FINISH
                  x = app.projectiles.find((x) => x.id === bolt.id);
                  x = bolt;
                  app.players[target.number - 1] = target;
                  return;
                }
              }
            }
          }

          // TAKE DAMAGE/BE INJURED
          else {
            logProjectile("boltFrontDefendWrongDirection", {
              target_no: target.number,
              owner_type: bolt.ownerType,
              owner: bolt.owner,
              bolt_dir: bolt.direction,
              atk_position: "front",
              result: "but they defended in the wrong direction, so take damage & deflect",
            });
            app.handleProjectileDamage(bolt, ownerType, "player", target);
            app.setDeflection(target, "attacked", false);
            deflected = true;
            // FINISH
            x = app.projectiles.find((x) => x.id === bolt.id);
            x = bolt;
            app.players[target.number - 1] = target;
            return;
          }
        }

        //PLAYER NOT DEFENDING OR ATTACKING, TAKE DAMAGE OR ROLL FOR HYPER ARMOUR IF CHARGING
        if (
          (targetDefending !== true && target.attacking.peak !== true && (target.action !== "attacking" || target.attacking.count === 0)) ||
          target.defending.directionType !== "slash"
        ) {
          let takeDamage = true;
          if (target.attacking.state === true && target.attacking.charge > 0) {
            let chargePerc = Match.ceil((target.attacking.charge / target.attacking.maxCharge) * 10);
            if (app.rnJesus(1, target.crits.guardBreak + chargePerc) === 1) {
              takeDamage = false;
            }
          }
          if (takeDamage) {
            logProjectile("boltFrontHitUnprotected", {
              target_no: target.number,
              owner_type: bolt.ownerType,
              owner: bolt.owner,
              bolt_dir: bolt.direction,
              atk_position: "front",
              result: "not attacking or defending. fail charge roll w/ guardBreak crits, so take damage & deflect",
            });
            app.handleProjectileDamage(bolt, ownerType, "player", target);
            app.setDeflection(target, "attacked", false);
            deflected = true;
            // FINISH
            x = app.projectiles.find((x) => x.id === bolt.id);
            x = bolt;
            app.players[target.number - 1] = target;
          }

          return;
        }
      }
    }
  } else {
    logProjectile("projectileNonPlayerTarget", {
      target_type: targetType,
      target: target,
      owner_type: bolt.ownerType,
      owner: bolt.owner,
    });

    let cell = app.gridInfo.find((x) => x[targetType].id === target.id);
    logProjectile("boltHitNonPlayer", {
      target_type: targetType,
      target_no: target.number,
      owner_type: bolt.ownerType,
      owner: bolt.owner,
    });

    boltOwner = app.gridInfo.find(
      (x) => x[bolt.ownerType].state === true && x[bolt.ownerType].trap?.state === true && x[bolt.ownerType].id === bolt.owner,
    );
    if (boltOwner.trap.action === "attack" && boltOwner.trap.acting.state === true && boltOwner.trap.acting.directionType === "slash") {
      // LATERAL/SIDE ATTACK

      if (boltOwner.trap.direction !== bolt.direction && boltOwner.trap.direction !== app.getOppositeDirection(bolt.direction)) {
        if (boltOwner.acting.direction === app.getOppositeDirection(bolt.direction)) {
          logProjectile("boltSideAttackTrapSuccess", {
            target_type: targetType,
            owner_type: bolt.ownerType,
            owner: bolt.owner,
          });
        } else {
          logProjectile("boltSideAttackTrapFail", {
            target_type: targetType,
            owner_type: bolt.ownerType,
            owner: bolt.owner,
          });
          app.attackCellContents("bolt", bolt.ownerType, cell[targetType], cell, undefined, undefined, bolt);
        }
      }
      // FRONTAL ATTACK
      if (bolt.direction === app.getOppositeDirection(target.direction)) {
        if (boltOwner.acting.direction === app.getOppositeDirection(bolt.direction) || boltOwner.acting.direction === bolt.direction) {
          logProjectile("boltFrontAttackTrapSuccess", {
            target_type: targetType,
            owner_type: bolt.ownerType,
            owner: bolt.owner,
          });
        } else {
          logProjectile("boltFrontAttackTrapFail", {
            target_type: targetType,
            owner_type: bolt.ownerType,
            owner: bolt.owner,
          });
          app.attackCellContents("bolt", bolt.ownerType, cell[targetType], cell, undefined, undefined, bolt);
        }
      }
    } else {
      app.attackCellContents("bolt", bolt.ownerType, cell[targetType], cell, undefined, undefined, bolt);
    }

    let x = app.projectiles.find((x) => x.id === bolt.id);
    x = bolt;
  }
}
