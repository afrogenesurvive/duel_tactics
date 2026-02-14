export function handleMeleeDamage(app, ownerType, owner, targetPlayer) {
  // console.log('handleMeleeDamage');
  // DAMAGE THE TARGET!!!

  let damage = 0;
  let ownerWeaponName;
  let ownerWeaponType;
  let ownerDirection;
  let doubleHitChance;
  let singleHitChance;
  let ownerAttackCharge = 0;

  if (ownerType === "player") {
    ownerDirection = owner.direction;
    ownerWeaponType = owner.currentWeapon.type;
    ownerWeaponName = owner.currentWeapon.name;
    doubleHitChance = owner.crits.doubleHit;
    singleHitChance = owner.crits.singleHit;
    ownerAttackCharge = owner.attacking.charge;
  } else {
    let myCell = app.gridInfo.find((x) => x[ownerType].state === true && x[ownerType].id === owner.id);
    ownerDirection = app.getDirectionFromCells(myCell.number, owner.trap.target);
    ownerWeaponType = owner.trap.item.subType;
    ownerWeaponType = owner.trap.item.name;
    doubleHitChance = 2;
    singleHitChance = 1;
  }

  if (targetPlayer.currentArmor.name !== "") {
    // console.log('opponent armour found');
    switch (targetPlayer.currentArmor.effect) {
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
      //   doubleHitChance = player.crits.doubleHit+30;
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
  if (targetPlayer.direction === owner.direction) {
    positionalDamagaMod = 10;
  }
  // SIDE ATTACK
  if (targetPlayer.direction !== owner.direction && targetPlayer.direction !== app.getOppositeDirection(owner.direction)) {
    positionalDamagaMod = 20;
  }

  // THE HIGHER THE ATTACK CHARGE & POSITIONAL DAMAGE MOD
  // THE LOWER THE SINGLE HIT CHANCE & THE HIGHER THE DOUBLE HIT CHANCE
  let doubleHit = app.rnJesus(1, doubleHitChance + ownerAttackCharge + positionalDamagaMod);
  let singleHit = app.rnJesus(1, singleHitChance + ownerAttackCharge + positionalDamagaMod);

  if (ownerWeaponName === "") {
    singleHit = 1;
    doubleHit = 0;
  }

  if (singleHit === 1) {
    damage = 1;
  }
  if (doubleHit !== 1) {
    damage = 2;
  }

  // BACK ATTACK DMG
  if (ownerDirection === targetPlayer.direction) {
    damage += 1;
  }

  if (ownerType === "player") {
    if (owner.attacking.blunt === true) {
      damage = 0;
    }

    owner.success.attackSuccess = {
      state: true,
      count: 1,
      limit: owner.success.attackSuccess.limit,
    };
  }

  if (!targetPlayer.popups.find((x) => x.msg.split("_")[0] === "hpDown")) {
    targetPlayer.popups.push({
      state: false,
      count: 0,
      limit: 30,
      type: "",
      position: "",
      msg: "hpDown_" + "-" + damage + "",
      img: "",
    });
  }

  targetPlayer.hp -= damage;
  if (targetPlayer.hp === 1) {
    targetPlayer.attacking.strength = 1;

    // ADJUST TARGET MOVE SPEED
    let currentMoveSpeedIndx = targetPlayer.speed.range.indexOf(targetPlayer.speed.move);
    if (currentMoveSpeedIndx > 0) {
      targetPlayer.speed.move = targetPlayer.speed.range[currentMoveSpeedIndx - 1];
    }
    // player.speed.move = .05;
  }

  if (targetPlayer.hp > 0) {
    app.attackedCancel(targetPlayer);
  }

  // KILL OPPONENT!
  else {
    app.killPlayer(targetPlayer);
    app.placeItems({
      init: false,
      item: app.itemList[app.rnJesus(0, app.itemList.length - 1)].name,
    });

    if (ownerType === "player") {
      owner.points++;
      app.pointChecker(owner);

      if (owner.ai.state === true && owner.ai.mode === "aggressive") {
        console.log("check for evidence of retrieval here and resume retrieve if so", owner.ai.retrieving, owner.ai.mission);

        if (owner.ai.retrieving.checkin) {
          owner.ai.mission = "retrieve";

          if (!owner.popups.find((x) => x.msg === "missionRetrieve")) {
            owner.popups.push({
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
            player: owner.number,
            point: {
              x: owner.ai.retrieving.point.x,
              y: owner.ai.retrieving.point.y,
            },
            range: 3,
          });

          owner.ai.retrieving.safe = targetSafeData.isSafe;
        }
      }
    }
  }

  if (ownerType === "player") {
    app.players[owner.number - 1] = owner;
  }

  app.players[targetPlayer.number - 1] = targetPlayer;
}
