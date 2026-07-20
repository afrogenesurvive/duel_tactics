export function handleMiscPlayerDamage(app, player, type) {
  app.attackedCancel(app.players[player.number - 1]);
  if (type === "obstacleBarrierInvulnurable") {
    if (player.hp - 1 <= 0) {
      app.killPlayer(app.players[player.number - 1]);

      let randomItemIndex = app.rnJesus(0, app.itemList.length - 1);
      app.placeItems({
        init: false,
        item: app.itemList[randomItemIndex].name,
      });

      app.players[player.number - 1].points--;

      app.pointChecker(player);
    } else {
      app.players[player.number - 1].hp -= 1;

      if (player.hp > 0) {
        app.attackedCancel(player);
      }

      if (!app.players[player.number - 1].popups.find((x) => x.msg.split("_")[0] === "hpDown")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "hpDown_" + "-" + 1 + "",
          img: "",
        });
      }

      if (app.players[player.number - 1].hp === 1) {
        // ADJUST TARGET MOVE SPEED
        let currentMoveSpeedIndx = app.players[player.number - 1].speed.range_2.indexOf(app.players[player.number - 1].speed.move);
        if (currentMoveSpeedIndx > 0) {
          app.players[player.number - 1].speed.move = app.players[player.number - 1].speed.range_2[currentMoveSpeedIndx - 1];
        }
      }
    }
  }

  if (type === "applyHazard") {
    if (player.hp - 1 <= 0) {
      app.killPlayer(app.players[player.number - 1]);

      let randomItemIndex = app.rnJesus(0, app.itemList.length - 1);
      app.placeItems({
        init: false,
        item: app.itemList[randomItemIndex].name,
      });

      app.players[player.number - 1].points--;

      app.pointChecker(player);
    } else {
      app.players[player.number - 1].hp -= 1;

      app.setDeflection(player, "attacked", false);

      if (!app.players[player.number - 1].popups.find((x) => x.msg.split("_")[0] === "hpDown")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "hpDown_" + "-" + 1 + "",
          img: "",
        });
      }
      if (!app.players[player.number - 1].popups.find((x) => x.msg === "terrainInjured")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "terrainInjured",
          img: "",
        });
      }

      if (app.players[player.number - 1].hp === 1) {
        // ADJUST TARGET MOVE SPEED
        let currentMoveSpeedIndx = app.players[player.number - 1].speed.range_2.indexOf(app.players[player.number - 1].speed.move);
        if (currentMoveSpeedIndx > 0) {
          app.players[player.number - 1].speed.move = app.players[player.number - 1].speed.range_2[currentMoveSpeedIndx - 1];
        }
      }
    }
  }

  if (type === "jumpCollision") {
    if (player.hp - 1 <= 0) {
      app.killPlayer(app.players[player.number - 1]);

      let randomItemIndex = app.rnJesus(0, app.itemList.length - 1);
      app.placeItems({
        init: false,
        item: app.itemList[randomItemIndex].name,
      });

      app.players[player.number - 1].points--;

      app.pointChecker(player);
    } else {
      app.players[player.number - 1].hp -= 1;

      // app.setDeflection(player,'attacked',false);

      if (!app.players[player.number - 1].popups.find((x) => x.msg.split("_")[0] === "hpDown")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "hpDown_" + "-" + 1 + "",
          img: "",
        });
      }

      if (app.players[player.number - 1].hp === 1) {
        // ADJUST TARGET MOVE SPEED
        let currentMoveSpeedIndx = app.players[player.number - 1].speed.range_2.indexOf(app.players[player.number - 1].speed.move);
        if (currentMoveSpeedIndx > 0) {
          app.players[player.number - 1].speed.move = app.players[player.number - 1].speed.range_2[currentMoveSpeedIndx - 1];
        }
      }
    }
  }

  if (type.split("_")[1]) {
    let damage = 1;

    if (type.split("_")[0] === "halfPushBackImpactee") {
      switch (type.split("_")[1]) {
        case "obstacle":
          break;
        case "player":
          break;
        case "barrier":
          break;
        case "higherElevation":
          break;
        default:
      }
    }

    if (type.split("_")[0] === "halfPushBackImpactor") {
      switch (type.split("_")[1]) {
        case "obstacle":
          break;
        case "player":
          break;
        case "barrier":
          break;
        case "higherElevation":
          break;
        default:
      }
    }

    if (player.hp - damage <= 0) {
      app.killPlayer(app.players[player.number - 1]);

      let randomItemIndex = app.rnJesus(0, app.itemList.length - 1);
      app.placeItems({
        init: false,
        item: app.itemList[randomItemIndex].name,
      });

      app.players[player.number - 1].points--;

      app.pointChecker(player);
    } else {
      app.players[player.number - 1].hp -= damage;

      if (player.hp > 0) {
        app.attackedCancel(player);
      }

      if (!app.players[player.number - 1].popups.find((x) => x.msg.split("_")[0] === "hpDown")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 30,
          type: "",
          position: "",
          msg: "hpDown_" + "-" + damage + "",
          img: "",
        });
      }

      if (app.players[player.number - 1].hp === 1) {
        // ADJUST TARGET MOVE SPEED
        let currentMoveSpeedIndx = app.players[player.number - 1].speed.range_2.indexOf(app.players[player.number - 1].speed.move);
        if (currentMoveSpeedIndx > 0) {
          app.players[player.number - 1].speed.move = app.players[player.number - 1].speed.range_2[currentMoveSpeedIndx - 1];
        }
      }
    }
  }
}
