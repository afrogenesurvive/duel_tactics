export function applyRemoveEffect(app, player, action, subAction, type, item) {
  const logEffect = (message, data = {}) => {
    if (app?.globalLogger) {
      app.globalLogger("items.effects", message, data, { fn: "applyRemoveEffect" });
    }
  };
  // console.log('applyRemoveEffect',action,subAction,type,item);
  // call from: pickup, discard, deflect drop, use
  //
  // action: apply, remove
  //
  // actiontype: pickup, discard, deflect drop, use
  //
  // type: armor, weapon, item

  // EVENT LOG: item pickup / drop
  if (action === "apply" && app?.addEventLog) {
    app.addEventLog("P" + player.number + " picked up " + (item?.name || type), "items");
  }
  if (action === "remove" && (subAction === "discard" || subAction === "drop") && app?.addEventLog) {
    app.addEventLog("P" + player.number + " dropped " + (item?.name || type), "items");
  }

  let pickUp = false;

  if (action === "remove") {
    if (type === "armor") {
      switch (item.effect) {
        case "hpUp":
          if (player.hp > 1) {
            player.hp = player.hp - 1;
            // console.log(`armor ${subAction} debuff hp`,player.hp);
          }
          break;
        case "speedUp":
          let currentSpd1 = player.speed.range_2.indexOf(player.speed.move);
          if (player.speed.move > 0.05) {
            player.speed.move = player.speed.range_2[currentSpd1 - 1];
            // console.log(`armor ${subAction} debuff speed`,player.speed.move);
          }
          break;
      }
    }
  }

  if (action === "apply") {
    if (type === "armor") {
      switch (item.effect) {
        case "hpUp":
          // console.log('armor pickup buff');
          if (app.players[player.number - 1].hp < 3) {
            player.hp = player.hp + 1;

            player.statusDisplay = {
              state: true,
              status: "hpUp",
              count: 1,
              limit: player.statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "pickupBuff")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupBuff",
                img: "",
              });
            }

            if (!player.popups.find((x) => x.msg.split("_")[0] === "hpUp")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "hpUp_" + "+" + 1 + "",
                img: "",
              });
            }
          }
          break;
        case "speedUp":
          // console.log('armor pickup buff');
          let currentSpd1 = player.speed.range_2.indexOf(player.speed.move);
          if (player.speed.move < 0.2) {
            player.speed.move = player.speed.range_2[currentSpd1 + 1];

            player.statusDisplay = {
              state: true,
              status: "speedUp",
              count: 1,
              limit: player.statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "pickupBuff")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupBuff",
                img: "",
              });
            }
          }
          break;
      }
    }

    if (type === "item") {
      let ammo;
      switch (item.name) {
        case "moveSpeedUp":
          // console.log('moveSpeedUp');
          let currentSpd1 = player.speed.range_2.indexOf(player.speed.move);

          if (player.speed.move < 0.2) {
            // console.log('added buff');
            player.speed.move = player.speed.range_2[currentSpd1 + 1];

            player.statusDisplay = {
              state: true,
              status: item.name,
              count: 1,
              limit: player.statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "pickupBuff")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupBuff",
                img: "",
              });
            }

            pickUp = true;
          } else {
            logEffect("alreadyMax", {
              playerId: player.number,
              effect: "moveSpeedUp",
            });

            player.statusDisplay = {
              state: true,
              status: "Already Max Speed!!",
              count: 1,
              limit: app.players[player.number - 1].statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "stop")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "stop",
                img: "",
              });
            }
          }
          break;
        case "moveSpeedDown":
          // console.log('moveSpeedDown');
          let currentSpd2 = player.speed.range_2.indexOf(player.speed.move);
          // console.log('ff',currentSpd2,app.players[player.number-1].speed.range_2[currentSpd2]);
          // console.log('ff2',currentSpd2,app.players[player.number-1].speed.range_2[currentSpd2-1]);
          if (player.speed.move > 0.05) {
            // console.log('added debuff');
            player.speed.move = player.speed.range_2[currentSpd2 - 1];

            player.statusDisplay = {
              state: true,
              status: item.name,
              count: 1,
              limit: player.statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "pickupDebuff")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupDebuff",
                img: "",
              });
            }

            pickUp = true;
          }
          break;
        case "hpUp":
          // console.log('hpUp');
          if (player.hp === 1 && player.speed.move < 0.1) {
            player.speed.move = 0.1;
          }
          if (player.hp < 3) {
            player.hp++;

            player.statusDisplay = {
              state: true,
              status: item.name,
              count: 1,
              limit: player.statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "pickupBuff")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupBuff",
                img: "",
              });
            }

            if (!player.popups.find((x) => x.msg.split("_")[0] === "hpUp")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 30,
                type: "",
                position: "",
                msg: "hpUp_" + "+" + 1 + "",
                img: "",
              });
            }

            pickUp = true;
          } else {
            logEffect("alreadyMax", {
              playerId: player.number,
              effect: "hpUp",
            });

            player.statusDisplay = {
              state: true,
              status: "Already Max HP!!",
              count: 1,
              limit: player.statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "stop")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "stop",
                img: "",
              });
            }
          }
          break;
        case "hpDown":
          // console.log('hpDown');
          if (player.hp > 1) {
            player.hp--;

            player.statusDisplay = {
              state: true,
              status: item.name,
              count: 1,
              limit: player.statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "pickupDebuff")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupDebuff",
                img: "",
              });
            }
            if (!player.popups.find((x) => x.msg === "alarmed")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "alarmed",
                img: "",
              });
            }
            pickUp = true;
          }
          break;
        case "focusUp":
          if (player.crits.doubleHit - 2 !== 0) {
            player.crits.doubleHit = player.crits.doubleHit - 2;

            player.statusDisplay = {
              state: true,
              status: item.name,
              count: 1,
              limit: player.statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "pickupBuff")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupBuff",
                img: "",
              });
            }
          }
          player.crits.guardBreak = player.crits.guardBreak + 1;

          pickUp = true;
          break;
        case "focusDown":
          player.crits.doubleHit = player.crits.doubleHit + 2;
          if (player.crits.guardBreak - 1 !== 0) {
            player.crits.guardBreak = player.crits.guardBreak - 1;
          }

          player.statusDisplay = {
            state: true,
            status: item.name,
            count: 1,
            limit: player.statusDisplay.limit,
          };

          if (!player.popups.find((x) => x.msg === "pickupDebuff")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 25,
              type: "",
              position: "",
              msg: "pickupDebuff",
              img: "",
            });
          }

          pickUp = true;
          break;
        case "strengthUp":
          player.crits.pushBack = player.crits.pushBack + 1;

          player.crits.guardBreak = player.crits.guardBreak + 1;

          player.statusDisplay = {
            state: true,
            status: item.name,
            count: 1,
            limit: player.statusDisplay.limit,
          };

          if (!player.popups.find((x) => x.msg === "pickupBuff")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 25,
              type: "",
              position: "",
              msg: "pickupBuff",
              img: "",
            });
          }

          pickUp = true;
          break;
        case "strengthDown":
          if (player.crits.pushBack - 1 !== 0) {
            player.crits.pushBack = player.crits.pushBack - 1;

            player.statusDisplay = {
              state: true,
              status: item.name,
              count: 1,
              limit: player.statusDisplay.limit,
            };

            if (!player.popups.find((x) => x.msg === "pickupDebuff")) {
              player.popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupDebuff",
                img: "",
              });
            }

            pickUp = true;
          }
          if (player.crits.guardBreak - 1 !== 0) {
            player.crits.guardBreak = player.crits.guardBreak - 1;

            player.statusDisplay = {
              state: true,
              status: item.name,
              count: 1,
              limit: player.statusDisplay.limit,
            };

            pickUp = true;
          }
          break;
        case "ammo5":
          ammo = parseInt(item.name.split("o")[1]);
          player.items.ammo = player.items.ammo + ammo;

          player.statusDisplay = {
            state: true,
            status: item.name,
            count: 1,
            limit: player.statusDisplay.limit,
          };

          if (!player.popups.find((x) => x.msg === "pickupAmmo")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 25,
              type: "",
              position: "",
              msg: "pickupAmmo",
              img: "",
            });
          }

          pickUp = true;
          break;
        case "ammo10":
          ammo = parseInt(item.name.split("o")[1]);
          player.items.ammo = player.items.ammo + ammo;

          player.statusDisplay = {
            state: true,
            status: item.name,
            count: 1,
            limit: player.statusDisplay.limit,
          };

          if (!player.popups.find((x) => x.msg === "pickupAmmo")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 25,
              type: "",
              position: "",
              msg: "pickupAmmo",
              img: "",
            });
          }

          pickUp = true;
          break;
      }
    }
  }

  logEffect("result", {
    playerId: player.number,
    action,
    subAction,
    type,
    itemName: item?.name,
    itemEffect: item?.effect,
    applied: pickUp,
    hp: player.hp,
    speed: player.speed.move,
    pushBack: player.crits.pushBack,
    guardBreak: player.crits.guardBreak,
    doubleHit: player.crits.doubleHit,
    ammo: player.items.ammo,
  });

  app.players[player.number - 1] = player;
  return pickUp;
}
