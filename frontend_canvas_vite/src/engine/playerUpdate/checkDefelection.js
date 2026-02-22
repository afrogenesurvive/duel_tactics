export function checkDeflection(app, player) {
  // if (player.success.deflected.state === true && player.success.deflected.count < player.success.deflected.limit && player.success.deflected.predeflect !== true) {
  if (player.success.deflected.state === true && player.success.deflected.count < player.success.deflected.limit) {
    // console.log("player deflected");

    player.action = "deflected";
    player.success.deflected.count++;

    if (player.success.deflected.count === 2) {
      // console.log('count',player.success.deflected.count,'limit',player.success.deflected.limit,'type',player.success.deflected.type);

      if (player.success.deflected.type === "bluntAttacked" || player.success.deflected.type === "defended") {
        if (!player.popups.find((x) => x.msg === "guardBroken")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.success.deflected.limit,
            type: "",
            position: "",
            msg: "guardBroken",
            img: "",
          });
        }
      }

      if (player.success.deflected.type === "parried") {
        if (!player.popups.find((x) => x.msg === "attackParried")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.success.deflected.limit,
            type: "",
            position: "",
            msg: "attackParried",
            img: "",
          });
        }
      }
      if (player.success.deflected.type === "attacked") {
        if (!player.popups.find((x) => x.msg === "injured")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.success.deflected.limit,
            type: "",
            position: "",
            msg: "injured",
            img: "",
          });
        }
      }
      if (player.success.deflected.type === "outOfStamina") {
        if (!player.popups.find((x) => x.msg === player.success.deflected.type)) {
          player.popups.push({
            state: false,
            count: 0,
            limit: player.success.deflected.limit,
            type: "",
            position: "",
            msg: player.success.deflected.type,
            img: "",
          });
        }
      }
    }

    // if (player.ai.state === true) {
    //   player.ai.instructions = []
    //   player.ai.currentInstruction = 0
    //   if (player.ai.mission === 'engage') {
    //     player.ai.engaging.targetAction = ''
    //   }
    // }
  }
  //END DEFLECTION, SPIN & DROP
  else if (player.success.deflected.state === true && player.success.deflected.count >= player.success.deflected.limit) {
    console.log("deflect end", player.success.deflected.type);
    // DEFLECT SPIN!
    let shouldSpin;
    if (player.success.deflected.type === "attacked") {
      shouldSpin = app.rnJesus(1, 5);
    }
    if (player.success.deflected.type === "defended") {
      shouldSpin = app.rnJesus(1, 10);
    }

    if (player.success.deflected.type === "outOfStamina") {
      shouldSpin = app.rnJesus(1, 2);
    }
    if (player.success.deflected.type === "parried") {
      shouldSpin = 1;
    }
    let newDirection;
    if (shouldSpin === 1) {
      switch (player.direction) {
        case "north":
          if (shouldSpin === 1) {
            newDirection = "east";
          } else {
            newDirection = "west";
          }
          break;
        case "south":
          if (shouldSpin === 1) {
            newDirection = "east";
          } else {
            newDirection = "west";
          }
          break;
        case "east":
          if (shouldSpin === 1) {
            newDirection = "north";
          } else {
            newDirection = "south";
          }
          break;
        case "west":
          if (shouldSpin === 1) {
            newDirection = "north";
          } else {
            newDirection = "south";
          }
          break;
      }
      player.direction = newDirection;
    }

    player.action = "idle";

    app.unsetDeflection(player);

    // CANCEL AI ATTACK, DEFEND!!
    if (player.ai.state === true) {
      if (player.ai.state === true) {
        player.attacking = {
          state: false,
          count: 0,
          limit: player.attacking.limit,
          strength: 0,
          direction: "",
          directionType: "", //thrust or slash
          animRef: player.attacking.animRef,
          peak: false,
          peakCount: 0,
          charge: 0,
          chargePeak: false,
          blunt: false,
          clashing: {
            state: false,
            count: 0,
            limit: player.attacking.clashing.limit,
          },
          maxCharge: 15,
          chargeCount: 0,
          execute: false,
          effectivenessAllowance: 3,
        };
      }

      player.defending = {
        state: false,
        count: 0,
        limit: player.defending.limit,
        animRef: player.defending.animRef,
        peak: false,
        peakCount: 0,
        decay: {
          state: false,
          count: 0,
          limit: player.defending.decay.limit,
        },
        direction: "",
        directionType: "", //thrust or slash
      };

      player.ai.targetAqcuiredReset = true;
    }

    if (player.dead.state !== true && player.falling.state !== true) {
      let shouldDeflectDrop = app.rnJesus(1, player.crits.guardBreak);
      //   let shouldDeflectDrop = 1;
      if (shouldDeflectDrop === 1) {
        app.deflectDrop(player);
      }
    }
  }
}
