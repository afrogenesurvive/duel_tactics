export function checkDodge(app, player) {
  let dodgeCondition = false;
  if (player.crits.dodge > 4) {
    player.crits.dodge = 4;
  }
  if (
    player.dodging.countState === true &&
    player.dodging.count <= player.dodging.peak.start - player.crits.dodge &&
    app.keyPressed[player.number - 1].dodge === true
  ) {
    dodgeCondition = true;
  }
  if (player.dodging.countState === true && player.dodging.count > player.dodging.peak.start - player.crits.dodge) {
    dodgeCondition = true;
  }
  if (dodgeCondition === true && player.flanking.state !== true) {
    let startMod = player.crits.dodge;
    let endMod = player.crits.dodge;
    if (player.crits.dodge > 5) {
      player.crits.dodge = 5;
    }
    // START & ENDMODS CAN'T MAKE DODGE WIND UP & COOLDOWN < 2
    if (player.dodging.peak.start - startMod < 2) {
      startMod = player.dodging.peak.start - 2;
    }
    if (player.dodging.peak.end + endMod > player.dodging.limit - 2) {
      endMod = player.dodging.limit - (2 + player.dodging.peak.end);
    }

    // HAVE STAMIN FOR DODGE
    if (player.dodging.count === 0) {
      if (player.stamina.current - app.staminaCostRef.dodge.peak >= 0) {
        player.stamina.current = player.stamina.current - app.staminaCostRef.dodge.peak;
        player.dodging.count++;
        player.action = "dodging";

        // CHOOSE DODGE DIRECTION
        let whichDirection = app.rnJesus(1, 2);
        switch (player.direction) {
          case "north":
            if (whichDirection === 1) {
              player.dodging.direction = "east";
            } else {
              player.dodging.direction = "west";
            }
            break;
          case "south":
            if (whichDirection === 1) {
              player.dodging.direction = "east";
            } else {
              player.dodging.direction = "west";
            }
            break;
          case "east":
            if (whichDirection === 1) {
              player.dodging.direction = "north";
            } else {
              player.dodging.direction = "south";
            }
            break;
          case "west":
            if (whichDirection === 1) {
              player.dodging.direction = "north";
            } else {
              player.dodging.direction = "south";
            }
            break;
        }

        if (!player.popups.find((x) => x.msg === "dodgeStart")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: 5,
            type: "",
            position: "",
            msg: "dodgeStart",
            img: "",
          });
        }

        player = app.setElasticCounter("dodging", "", true, player);
      } else {
        player.stamina.current = 0;
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
        player.action = "idle";
        player.statusDisplay = {
          state: true,
          status: "Out of Stamina",
          count: 1,
          limit: player.statusDisplay.limit,
        };
      }
    }
    if (player.dodging.count >= 1 && player.dodging.count < player.dodging.limit) {
      player.dodging.count++;
      player.action = "dodging";
      // console.log("dodge count", player.dodging.count);

      if (!player.popups.find((x) => x.msg === "dodging")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: player.dodging.limit,
          type: "",
          position: "",
          msg: "dodging",
          img: "",
        });
      }
    }
    // PEAK START
    if (player.dodging.count === player.dodging.peak.start - startMod) {
      // console.log("dodge count", player.dodging.count);
      // player.popups.push(
      //   {
      //     state: false,
      //     count: 0,
      //     limit: (player.dodging.peak.end + endMod)-(player.dodging.peak.start + startMod),
      //     type: '',
      //     position: '',
      //     msg: 'dodgeSuccess',
      //     img: '',
      //
      //   }
      // )
    }

    // PEAK DURATION
    if (player.dodging.count > player.dodging.peak.start - startMod && player.dodging.count < player.dodging.peak.end + endMod) {
      player.dodging.state = true;

      // console.log("dodge peak", player.dodging.count);
    }

    // IF DODGE IS BEFORE OR AFTER PEAK, STATE OFF
    if (player.dodging.count < player.dodging.peak.start - startMod || player.dodging.count > player.dodging.peak.end + endMod) {
      player.dodging.state = false;
      player.dodging.direction = "";
      // console.log('dodge peak off');
    }
    if (player.dodging.count >= player.dodging.limit) {
      player.action = "idle";
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
    }
  }
}
