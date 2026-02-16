export function checkStamina(app, player) {
  if (player.stamina.current < player.stamina.max) {
    if (player.moving.state !== true) {
      player.stamina.current += 0.05;
      player.stamina.current = +(Math.round(player.stamina.current + "e+" + 3) + "e-" + 3);
    } else {
      // DON'T INCRMENT STAMINA MID MOVE. SINCE if (player.stamina.current < 1) moveSpeed = 0.05;
    }

    if (player.stamina.current >= player.stamina.max) {
      player.stamina.current = player.stamina.max;
    }
    if (player.stamina.current < 0) {
      // console.log('stamina lower limit reset for player ',player.number);
      player.stamina.current = 0;
    }
    if (player.stamina.current === 0) {
      console.log(`checkStamina: player ${player.number} is out of stamina!`);
      player.flanking = {
        checking: false,
        preFlankDirection: "",
        direction: "",
        state: false,
        step: 0,
        target1: { x: 0, y: 0 },
        target2: { x: 0, y: 0 },
      };
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

      app.attackedCancel(player);

      if (player.success.deflected.state !== true) {
        app.setDeflection(player, "outOfStamina", false);
      }

      if (!player.popups.find((x) => x.msg === "outOfStamina")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: 20,
          type: "",
          position: "",
          msg: "outOfStamina",
          img: "",
        });
      }
    }

    // AI RETREAT ON LOW STAMINA
    if (player.stamina.current <= 4) {
      if (player.ai.state === true) {
        console.log("ai player", player.number, " almost out of stamina. Retreat");
        player.ai.mission = "retreat";

        if (!player.popups.find((x) => x.msg === "missionRetreat")) {
          player.popups.push({
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
    }
  }
}
