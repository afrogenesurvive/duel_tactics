export function attackedCancel(app, player) {
  // console.log('player', player.number,' attacked. Cancel action!',player.action);

  if (player.elasticCounter.state === true && player.elasticCounter.type !== "deflected") {
    player.elasticCounter.state = false;
    player.elasticCounter.type = "";
    player.elasticCounter.subType = "";
  }

  switch (player.action) {
    case "attacking":
      if (player.success.deflected.state !== true) {
        player.action = "idle";
      }

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
      };
      player.idleAnim = {
        state: false,
        count: 0,
        limit: 4,
      };
      app.players[player.number - 1].statusDisplay = {
        state: true,
        status: "attack break!",
        count: 1,
        limit: app.players[player.number - 1].statusDisplay.limit,
      };

      if (!player.popups.find((x) => x.msg === "attackCancelled")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "attackCancelled",
          img: "",
        });
      }
      if (app.camera.customView.state !== true && player.ai.state !== true) {
        app.setAutoCamera("attackFocusBreak", player);
      }

      break;
    case "defending":
      if (player.success.deflected.state !== true) {
        player.action = "idle";
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
      player.idleAnim = {
        state: false,
        count: 0,
        limit: 4,
      };
      app.players[player.number - 1].statusDisplay = {
        state: true,
        status: "guard break!",
        count: 1,
        limit: app.players[player.number - 1].statusDisplay.limit,
      };

      if (!player.popups.find((x) => x.msg === "attackCancelled")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "attackCancelled",
          img: "",
        });
      }
      if (app.camera.customView.state !== true && player.ai.state !== true) {
        app.setAutoCamera("defendFocusBreak", player);
      }

      break;
    case "strafe moving":
      if (player.success.deflected.state !== true) {
        player.action = "idle";
      }
      player.idleAnim = {
        state: false,
        count: 0,
        limit: 4,
      };
      player.strafing = {
        state: false,
        direction: "",
      };
      app.players[player.number - 1].statusDisplay = {
        state: true,
        status: "strafe break!",
        count: 1,
        limit: app.players[player.number - 1].statusDisplay.limit,
      };

      if (!player.popups.find((x) => x.msg === "attackCancelled")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "attackCancelled",
          img: "",
        });
      }

      break;
    case "dodging":
      if (player.success.deflected.state !== true) {
        player.action = "idle";
      }
      player.idleAnim = {
        state: false,
        count: 0,
        limit: 4,
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
      app.players[player.number - 1].statusDisplay = {
        state: true,
        status: "dodge break!",
        count: 1,
        limit: app.players[player.number - 1].statusDisplay.limit,
      };

      if (!player.popups.find((x) => x.msg === "attackCancelled")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "attackCancelled",
          img: "",
        });
      }

      break;
    case "flanking":
      if (player.success.deflected.state !== true) {
        player.action = "idle";
      }
      player.idleAnim = {
        state: false,
        count: 0,
        limit: 4,
      };
      player.flanking = {
        checking: false,
        preFlankDirection: "",
        direction: "",
        state: false,
        step: 0,
        target1: { x: 0, y: 0 },
        target2: { x: 0, y: 0 },
      };
      app.players[player.number - 1].statusDisplay = {
        state: true,
        status: "flanking break!",
        count: 1,
        limit: app.players[player.number - 1].statusDisplay.limit,
      };

      if (!player.popups.find((x) => x.msg === "attackCancelled")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "attackCancelled",
          img: "",
        });
      }

      break;
    case "jumping":
      if (player.success.deflected.state !== true) {
        player.action = "idle";
      }
      player.idleAnim = {
        state: false,
        count: 0,
        limit: 4,
      };
      player.jumping = {
        checking: false,
        state: false,
      };
      app.players[player.number - 1].statusDisplay = {
        state: true,
        status: "jumping break!",
        count: 1,
        limit: app.players[player.number - 1].statusDisplay.limit,
      };

      if (!player.popups.find((x) => x.msg === "attackCancelled")) {
        player.popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "attackCancelled",
          img: "",
        });
      }

      break;
    default:
  }

  if (player.prePush.state === true) {
    player.prePush = {
      state: false,
      count: 0,
      limit: player.prePush.limit,
      targetCell: undefined,
      direction: "",
      pusher: undefined,
    };
  }
  if (player.prePull.state === true) {
    player.prePull = {
      state: false,
      count: 0,
      limit: player.prePull.limit,
      targetCell: undefined,
      direction: "",
      puller: undefined,
    };
  }

  let popup;
  let popupsToRemove = [
    "preAction1",
    "preAction2",
    "attacking",
    "attacking1",
    "attacking2",
    "missedAttack",
    "attackingBlunt",
    "attackingUnarmed",
    "attackDefended",
    "attackParried",
    "defending",
    "dodgeStart",
    "pushedBack",
    "missedAttack2",
    "prePush",
    "canPush",
    "noPush",
    "pushing",
    "prePull",
    "canPull",
    "noPull",
    "pulling",
    "pushedPulled",
    "dodging2",
    "attackFeint",
    "attackFeint2",
    "attackFeint3",
    "defendFeint",
    "defendFeint2",
    "defendFeint3",
    "dodgeFeint",
    "dodgeFeint2",
    "boltDefend2",
    "flanking",
    "noFlanking",
    "clashing",
    "defending",
    "strafe moving",
    "dodging",
    "flanking",
    "jumping",
    "attacking",
    "charging",
    "noDirection3",
    "northDirection",
    "southDirection",
    "eastDirection",
    "westDirection",
  ];
  for (const pop of popupsToRemove) {
    popup = player.popups.find((x) => x.msg === pop);
    if (popup) {
      player.popups.splice(
        player.popups.findIndex((x) => x.msg === pop),
        1,
      );
    }
  }
  player.actionDirectionAnimationArray = [];

  if (player.ai.state === true) {
    app.players[player.number - 1].ai.currentInstruction = 0;
    app.players[player.number - 1].ai.instructions = [];
  }
}
