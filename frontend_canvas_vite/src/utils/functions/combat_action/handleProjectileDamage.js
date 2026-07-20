export function handleProjectileDamage(app, bolt, ownerType, targetType, target) {
  let boltOwner;
  let damage;
  let doubleHitChance;
  let singleHitChance;

  if (ownerType === "player") {
    if (targetType === "player") {
      boltOwner = app.players[bolt.owner - 1];
      damage = 0;
      let boltChargePercentage = 0;

      const directionalInputThresh = Math.ceil(boltOwner.attacking.animRef.peak.crossbow.slash / 2);
      boltChargePercentage = (bolt.charge / (app.players[bolt.owner - 1].attacking.peakCount - directionalInputThresh)) * 100;

      doubleHitChance = boltOwner.crits.doubleHit;
      singleHitChance = boltOwner.crits.singleHit;

      if (target.currentArmor.name !== "") {
        // console.log('opponent armour found');
        switch (target.currentArmor.effect) {
          case "dblhit-5":
            doubleHitChance = boltOwner.crits.doubleHit + 5;
            break;
          case "dblhit-10":
            doubleHitChance = boltOwner.crits.doubleHit + 10;
            break;
          case "dblhit-15":
            doubleHitChance = boltOwner.crits.doubleHit + 15;
            break;
          // case 'dblhit-30' :
          //   doubleHitChance = target.crits.doubleHit+30;
          // break;
          case "snghit-5":
            singleHitChance = boltOwner.crits.singleHit + 5;
            break;
          case "snghit-10":
            singleHitChance = boltOwner.crits.singleHit + 10;
            break;
        }
      }

      let positionalDamagaMod = 0;
      // BACK ATTACK
      if (target.direction === bolt.direction) {
        positionalDamagaMod = 10;
      }
      // SIDE ATTACK
      if (target.direction !== bolt.direction && target.direction !== app.getOppositeDirection(bolt.direction)) {
        positionalDamagaMod = 20;
      }

      // THE HIGHER THE BOLT CHARGE &  POSITIONAL DAMAGE MOD
      // THE LOWER THE SINGLE HIT CHANCE & THE HIGHER THE DOUBLE HIT CHANCE
      let doubleHit = app.rnJesus(1, doubleHitChance + bolt.charge + positionalDamagaMod);
      let singleHit = app.rnJesus(1, singleHitChance + bolt.charge + positionalDamagaMod);

      if (singleHit === 1) {
        damage = 1;
      }
      if (doubleHit !== 1) {
        damage = 2;
      }
      console.log(`handleProjectileDamage: dmg ${damage}`);

      // BACK ATTACK ADDS DMG +1
      if (target.direction === bolt.direction) {
        damage += 1;
      }
      boltOwner.success.attackSuccess = {
        state: true,
        count: 1,
        limit: boltOwner.success.attackSuccess.limit,
      };
      if (!target.popups.find((x) => x.msg.split("_")[0] === "hpDown")) {
        target.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "hpDown_" + "-" + damage + "",
          img: "",
        });
      }
      target.hp -= damage;
      if (target.hp === 1) {
        target.attacking.strength = 1;

        // ADJUST TARGET MOVE SPEED
        let currentMoveSpeedIndx = target.speed.range_2.indexOf(target.speed.move);
        if (currentMoveSpeedIndx > 0) {
          target.speed.move = target.speed.range_2[currentMoveSpeedIndx - 1];
        }
        // target.speed.move = .05;
      }

      if (target.hp > 0) {
        app.attackedCancel(target);
      }

      // KILL OPPONENT!
      else {
        app.killPlayer(target);
        app.placeItems({
          init: false,
          item: app.itemList[app.rnJesus(0, app.itemList.length - 1)].name,
        });
        boltOwner.points++;
        app.pointChecker(boltOwner);

        if (boltOwner.ai.state === true && boltOwner.ai.mode === "aggressive") {
          console.log("check for evidence of retrieval here and resume retrieve if so", boltOwner.ai.retrieving, boltOwner.ai.mission);

          if (boltOwner.ai.retrieving.checkin) {
            boltOwner.ai.mission = "retrieve";

            if (!boltOwner.popups.find((x) => x.msg === "missionRetrieve")) {
              boltOwner.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "missionRetrieve",
                img: "",
              });
            }

            let targetSafeData = app.scanTargetAreaThreat({
              player: boltOwner.number,
              point: {
                x: boltOwner.ai.retrieving.point.x,
                y: boltOwner.ai.retrieving.point.y,
              },
              range: 3,
            });

            boltOwner.ai.retrieving.safe = targetSafeData.isSafe;
          }
        }
      }

      if (bolt.kill !== true) {
        bolt.kill = true;
      }

      app.players[target.number - 1] = target;
      app.players[boltOwner.number - 1] = boltOwner;
      // app.projectiles.find(x => x.id === bolt.id) = bolt;
      let x = app.projectiles.find((x) => x.id === bolt.id);
      x = bolt;
    }
  } else {
    if (targetType === "player") {
      damage = 0;
      doubleHitChance = 1;
      singleHitChance = 1;

      if (target.currentArmor.name !== "") {
        // console.log('opponent armour found');
        switch (target.currentArmor.effect) {
          case "dblhit-5":
            doubleHitChance += 5;
            break;
          case "dblhit-10":
            doubleHitChance += 10;
            break;
          case "dblhit-15":
            doubleHitChance += 15;
            break;
          // case 'dblhit-30' :
          //   doubleHitChance = target.crits.doubleHit+30;
          // break;
          case "snghit-5":
            singleHitChance += 5;
            break;
          case "snghit-10":
            singleHitChance += 10;
            break;
        }
      }

      let positionalDamagaMod = 0;
      // BACK ATTACK
      if (target.direction === bolt.direction) {
        positionalDamagaMod = 10;
      }
      // SIDE ATTACK
      if (target.direction !== bolt.direction && target.direction !== app.getOppositeDirection(bolt.direction)) {
        positionalDamagaMod = 20;
      }

      let doubleHit = app.rnJesus(1, doubleHitChance + positionalDamagaMod);
      let singleHit = app.rnJesus(1, singleHitChance + positionalDamagaMod);

      // BACK ATTACK
      if (target.direction === bolt.direction) {
        damage = +1;
      }

      if (singleHit === 1) {
        damage = 1;
      }
      if (doubleHit !== 1) {
        damage = 2;
      }
      if (!target.popups.find((x) => x.msg.split("_")[0] === "hpDown")) {
        target.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "hpDown_" + "-" + damage + "",
          img: "",
        });
      }
      target.hp -= damage;
      if (target.hp === 1) {
        target.attacking.strength = 1;

        // ADJUST TARGET MOVE SPEED
        let currentMoveSpeedIndx = target.speed.range_2.indexOf(target.speed.move);
        if (currentMoveSpeedIndx > 0) {
          target.speed.move = target.speed.range_2[currentMoveSpeedIndx - 1];
        }
        // target.speed.move = .05;
      }

      if (target.hp > 0) {
        app.attackedCancel(target);
      }

      // KILL OPPONENT!
      else {
        app.killPlayer(target);
        app.placeItems({
          init: false,
          item: app.itemList[app.rnJesus(0, app.itemList.length - 1)].name,
        });
      }

      if (bolt.kill !== true) {
        bolt.kill = true;
      }

      app.players[target.number - 1] = target;
      // app.projectiles.find(x => x.id === bolt.id) = bolt;
      let x = app.projectiles.find((x) => x.id === bolt.id);
      x = bolt;
    }
  }
}
