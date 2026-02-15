export function checkNonMoveInput(app, player, plyrPullPushed, plyrPullPushedPlyr, breakPulledPushed, keyPressedDirection, nextPosition) {
  // ATTACKING/DEFENDING
  if (app.keyPressed[player.number - 1].attack === true || app.keyPressed[player.number - 1].defend === true) {
    // ALREADY ATTACKING/DEFENDING!!
    if (player.attacking.state === true || player.defending.state === true) {
      if (app.keyPressed[player.number - 1].attack === true) {
        // console.log("already attacking");
      }
      if (app.keyPressed[player.number - 1].defend === true) {
        // console.log('already defending',player.number);
      }
    }

    // START ATTACK/DEFEND!!
    if (player.attacking.state === false && player.defending.state === false && player.defending.decay.state !== true) {
      if (
        app.keyPressed[player.number - 1].attack === true &&
        player.success.deflected.state !== true &&
        app.keyPressed[player.number - 1].defend !== true
      ) {
        let atkType = player.currentWeapon.type;
        let blunt = "normal";
        if (player.attacking.blunt === true) {
          atkType = "blunt";
          blunt = "blunt";
        }
        if (player.currentWeapon.name === "") {
          atkType = "unarmed";
        }

        // BLUNT ATTACK!!
        if (app.keyPressed[player.number - 1].dodge === true) {
          // console.log('start blunt attack');
          if (player.dodging.countState === true || player.dodging.state === true || app.keyPressed[player.number - 1].dodge === true) {
            console.log("was dodging, now blunt attacking. cancel dodge. return dodge stamina");
            player.stamina.current += app.staminaCostRef.dodge.peak;
            player.dodging = {
              countState: false,
              state: false,
              count: 0,
              limit: player.dodging.limit,
              peak: {
                start: player.dodging.peak.start,
                end: player.dodging.peak.end,
              },
              direction: "",
            };
            if (player.elasticCounter.state === true && player.elasticCounter.type === "dodging") {
              player.elasticCounter.state = false;
              player.elasticCounter.type = "";
              player.elasticCounter.subType = "";
            }
          }
          app.keyPressed[player.number - 1].dodge = false;

          let popup = player.popups.find((x) => x.msg === "dodging");
          if (popup) {
            player.popups.splice(
              player.popups.findIndex((x) => x.msg === "dodging"),
              1,
            );
          }
          let popup2 = player.popups.find((x) => x.msg === "dodgeStart");
          if (popup2) {
            player.popups.splice(
              player.popups.findIndex((x) => x.msg === "dodgeStart"),
              1,
            );
          }

          player.attacking.blunt = true;
          atkType = "blunt";
        }

        player = app.checkSetAttackDefendDirectionalInput("init", "attacking", player).player;

        player.action = "attacking";
        player.attacking.state = true;
        player.attacking.count = 1;

        // console.log("start attack");

        if (plyrPullPushed === true) {
          breakPulledPushed = true;
        }
      }

      if (
        app.keyPressed[player.number - 1].defend === true &&
        player.defending.decay.state !== true &&
        app.keyPressed[player.number - 1].attack !== true
      ) {
        // console.log('start defending',player.number);

        // console.log('start defending');
        if (plyrPullPushed === true) {
          breakPulledPushed = true;
        }

        if (player.defending.count === 0 && player.defending.decay.state !== true) {
          player = app.checkSetAttackDefendDirectionalInput("init", "defending", player).player;

          player.defending.state = true;
          player.defending.count = 1;

          if (!player.popups.find((x) => x.msg === "preAction1")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 5,
              type: "",
              position: "",
              msg: "preAction1",
              img: "",
            });
          }
        } else {
          // console.log('cant start defend. might already be in progress');
        }
      }
    }
  }

  // PRE PULL
  if (app.keyPressed[player.number - 1].pull === true) {
    app.getTarget(player);

    if (player.target.cell1.occupant.type === "obstacle" && player.pulling.state !== true) {
      // console.log('pulling obstacle trigger north',player.prePull.state,player.prePull.count);
      app.preObstaclePullCheck(player, player.target, app.getOppositeDirection(player.direction));
    }
    if (player.target.cell1.occupant.type === "player" && player.pulling.state !== true) {
      // console.log('pulling player trigger north',player.prePull.state,player.prePull.count);
      app.prePlayerPullCheck(player, player.target, app.getOppositeDirection(player.direction));
    }
  }

  // DODGE START
  else if (
    app.keyPressed[player.number - 1].dodge === true &&
    app.keyPressed[player.number - 1].attack !== true &&
    app.keyPressed[player.number - 1].defend !== true
  ) {
    if (player.attacking.state !== true && player.defending.state !== true) {
      if (player.dodging.state !== true && player.dodging.countState !== true) {
        console.log("start dodge wind up");
        player.dodging.countState = true;

        if (plyrPullPushed === true) {
          breakPulledPushed = true;
        }
      }
      if (player.dodging.state === true || player.dodging.countState === true) {
        console.log("already dodging");
      }
    } else {
      console.log("cant dodge while already attacking or defending");
    }
  }

  // DISCARD GEAR/PICKUP GEAR & ITEMS!!
  if (app.keyPressed[player.number - 1].discardWeapon === true && player.discardGear.state !== true) {
    app.discardGear(player, "weapon");
    player.discardGear.state = true;
  }
  if (app.keyPressed[player.number - 1].discardArmor === true && player.discardGear.state !== true) {
    app.discardGear(player, "armor");
    player.discardGear.state = true;
  }
}
