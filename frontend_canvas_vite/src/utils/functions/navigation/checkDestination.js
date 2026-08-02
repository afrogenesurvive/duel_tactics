export function checkDestination(app, player, pickupOnly) {
  const logItem = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("items.pickup", message, data, { fn: "checkDestination" });
    }
  };
  const logMove = (message, data = {}) => {
    if (app?.globalLogger) {
      app.globalLogger("player.movement", message, data, { fn: "checkDestination" });
    }
  };
  // console.log('checking for item or enviro effect');

  app.players[player.number - 1].terrainMoveSpeed.state = false;
  let pickUp = false;
  let cell = app.gridInfo.find(
    (elem) => elem.number.x === player.currentPosition.cell.number.x && elem.number.y === player.currentPosition.cell.number.y,
  );

  let gearAmount = 0;
  for (const weapon of player.items.weapons) {
    if (weapon.name && weapon.name !== "") {
      gearAmount++;
    }
  }
  for (const armor of player.items.armor) {
    if (armor.name && armor.name !== "") {
      gearAmount++;
    }
  }

  let haveSpace = false;
  if (gearAmount < player.inventorySize) {
    haveSpace = true;
  }
  // console.log('gearAmount', gearAmount, 'inventorySize',player.inventorySize);

  // if (haveSpace === true && ) {

  // console.log('check dest cell',cell);

  // let cell = app.gridInfo.find(elem => elem.number.x === player.currentPosition.cell.number.x && elem.number.y === player.currentPosition.cell.number.y)
  if (cell.item.name !== "") {
    // console.log('picked up an item');

    // GEAR
    if (cell.item.type === "weapon") {
      if (haveSpace === true) {
        // NO CUREENT WEAPON, EQUIP
        if (player.currentWeapon.name === "" || !player.currentWeapon.name) {
          app.players[player.number - 1].currentWeapon = {
            name: cell.item.name,
            type: cell.item.subType,
            effect: cell.item.effect,
          };
          app.players[player.number - 1].items.weapons.push({
            name: cell.item.name,
            type: cell.item.subType,
            effect: cell.item.effect,
          });
          if (cell.item.subType === "crossbow") {
            let ammo = parseInt(cell.item.effect.split("+")[1]);
            // console.log('picked up a crossbow checking ammo',ammo);
            if (!app.players[player.number - 1].popups.find((x) => x.msg === "crossbow")) {
              app.players[player.number - 1].popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "crossbow",
                img: "",
              });
            }

            app.players[player.number - 1].items.ammo = app.players[player.number - 1].items.ammo + ammo;
            // console.log('new ammo amt',app.players[player.number-1].items.ammo);
          }

          if (!app.players[player.number - 1].popups.find((x) => x.msg === "pickupWeapon")) {
            app.players[player.number - 1].popups.push({
              state: false,
              count: 0,
              limit: 25,
              type: "",
              position: "",
              msg: "pickupWeapon",
              img: "",
            });
          }

          pickUp = true;
        }

        // STASH IN INVENTORY
        else {
          // DON'T ALREADY HAVE WEPAON
          if (player.items.weapons.map((weapon) => weapon.name).includes(cell.item.name) !== true) {
            app.players[player.number - 1].items.weapons.push({
              name: cell.item.name,
              type: cell.item.subType,
              effect: cell.item.effect,
            });

            if (cell.item.subType === "crossbow") {
              let ammo = parseInt(cell.item.effect.split("+")[1]);
              // console.log('picked up a crossbow checking ammo',ammo);
              if (!app.players[player.number - 1].popups.find((x) => x.msg === "crossbow")) {
                app.players[player.number - 1].popups.push({
                  state: false,
                  count: 0,
                  limit: 25,
                  type: "",
                  position: "",
                  msg: "crossbow",
                  img: "",
                });
              }
              app.players[player.number - 1].items.ammo = app.players[player.number - 1].items.ammo + ammo;
              // console.log('new ammo amt',app.players[player.number-1].items.ammo);
            }
            pickUp = true;

            app.players[player.number - 1].statusDisplay = {
              state: true,
              status: "weapon accquired",
              count: 1,
              limit: app.players[player.number - 1].statusDisplay.limit,
            };

            if (!app.players[player.number - 1].popups.find((x) => x.msg === "pickupWeapon")) {
              app.players[player.number - 1].popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupWeapon",
                img: "",
              });
            }
          }

          // ALREADY HAVE WEAPON
          else {
            if (cell.item.subType === "crossbow") {
              let ammo = parseInt(cell.item.effect.split("+")[1]);
              app.players[player.number - 1].items.ammo = app.players[player.number - 1].items.ammo + ammo;
              logItem("ammoPickup", {
                playerId: player.number,
                ammo,
                result: "picked up ammo from duplicate crossbow",
              });
              cell.item.effect = "ammo+0";

              if (!app.players[player.number - 1].popups.find((x) => x.msg === "pickupAmmo")) {
                app.players[player.number - 1].popups.push({
                  state: false,
                  count: 0,
                  limit: 25,
                  type: "",
                  position: "",
                  msg: "pickupAmmo",
                  img: "",
                });
              }
            } else {
              logItem("alreadyHaveWeapon", {
                playerId: player.number,
                itemName: cell.item.name,
              });
              app.players[player.number - 1].statusDisplay = {
                state: true,
                status: "Already have app weapon!",
                count: 1,
                limit: app.players[player.number - 1].statusDisplay.limit,
              };

              if (!app.players[player.number - 1].popups.find((x) => x.msg === "stop")) {
                app.players[player.number - 1].popups.push({
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
          }
        }
      }

      // NO SPACE TO PICKUP
      else if (cell.item.name !== "") {
        logItem("inventoryFull", {
          playerId: player.number,
        });

        app.players[player.number - 1].statusDisplay = {
          state: true,
          status: "Not enough space!!",
          count: 1,
          limit: app.players[player.number - 1].statusDisplay.limit,
        };

        if (!app.players[player.number - 1].popups.find((x) => x.msg === "inventoryFull")) {
          app.players[player.number - 1].popups.push({
            state: false,
            count: 0,
            limit: 25,
            type: "",
            position: "",
            msg: "inventoryFull",
            img: "",
          });
        }
      }
    }

    if (cell.item.type === "armor") {
      // console.log('picked up armor',player.currentArmor);

      if (haveSpace === true) {
        // EQUIP
        if (player.currentArmor.name === "" || !player.currentArmor.name) {
          // console.log('gg',cell.item.effect);
          app.players[player.number - 1].currentArmor = {
            name: cell.item.name,
            type: cell.item.subType,
            effect: cell.item.effect,
          };
          app.players[player.number - 1].items.armor.push({
            name: cell.item.name,
            type: cell.item.subType,
            effect: cell.item.effect,
          });

          app.applyRemoveEffect(player, "apply", "pickup", "armor", cell.item);

          pickUp = true;
        }

        // STASH TO INVENTORY
        else {
          if (player.items.armor.map((armor) => armor.name).includes(cell.item.name) !== true) {
            app.players[player.number - 1].items.armor.push({
              name: cell.item.name,
              type: cell.item.subType,
              effect: cell.item.effect,
            });
            pickUp = true;

            app.players[player.number - 1].statusDisplay = {
              state: true,
              status: "armor accquired",
              count: 1,
              limit: app.players[player.number - 1].statusDisplay.limit,
            };

            if (!app.players[player.number - 1].popups.find((x) => x.msg === "pickupArmor")) {
              app.players[player.number - 1].popups.push({
                state: false,
                count: 0,
                limit: 25,
                type: "",
                position: "",
                msg: "pickupArmor",
                img: "",
              });
            }
          } else {
            logItem("alreadyHaveArmor", {
              playerId: player.number,
              itemName: cell.item.name,
            });
            app.players[player.number - 1].statusDisplay = {
              state: true,
              status: "Already have app armor!",
              count: 1,
              limit: app.players[player.number - 1].statusDisplay.limit,
            };

            if (!app.players[player.number - 1].popups.find((x) => x.msg === "stop")) {
              app.players[player.number - 1].popups.push({
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
        }
      }
      // INVENTORY FULL
      else if (cell.item.name !== "") {
        logItem("inventoryFull", {
          playerId: player.number,
        });

        app.players[player.number - 1].statusDisplay = {
          state: true,
          status: "Not enough space!!",
          count: 1,
          limit: app.players[player.number - 1].statusDisplay.limit,
        };

        if (!app.players[player.number - 1].popups.find((x) => x.msg === "inventoryFull")) {
          app.players[player.number - 1].popups.push({
            state: false,
            count: 0,
            limit: 25,
            type: "",
            position: "",
            msg: "inventoryFull",
            img: "",
          });
        }
      }
    }

    // ITEM
    else if (cell.item.type !== "weapon" && cell.item.type !== "armor") {
      // console.log('item',cell.item);

      pickUp = app.applyRemoveEffect(player, "apply", "pickup", "item", cell.item);
    }

    if (pickUp === true) {
      // PICKUP ANIM!!
      if (cell.item.type === "item") {
        app.players[player.number - 1].itemPickup = {
          state: true,
          count: 0,
          limit: 10,
          item: {
            name: cell.item.name,
          },
          gear: {
            type: "",
          },
        };
      } else if (cell.item.type === "weapon" || cell.item.type === "armor") {
        app.players[player.number - 1].itemPickup = {
          state: true,
          count: 0,
          limit: 10,
          item: {
            name: "",
          },
          gear: {
            type: cell.item.subType,
          },
        };
      }

      cell.item = {
        name: "",
        type: "",
        subType: "",
        effect: "",
        initDrawn: false,
      };
    }
  }

  // }
  // else if (cell.item.name !== '') {
  //   console.log('Not enough space!!');
  //
  //   app.players[player.number-1].statusDisplay = {
  //     state: true,
  //     status: 'Not enough space!!',
  //     count: 1,
  //     limit: app.players[player.number-1].statusDisplay.limit,
  //   }
  // }

  let nextPosition;
  switch (cell.terrain.type) {
    case "stone":
      // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      break;
    case "grass":
      // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      break;
    case "deep":
      app.players[player.number - 1].falling.state = true;
      app.players[player.number - 1].action = "falling";
      app.players[player.number - 1].drowning = true;

      logMove("enteredDeep", {
        playerId: player.number,
        cell: cell?.number,
        terrain: cell?.terrain?.type,
      });

      if (!app.players[player.number - 1].popups.find((x) => x.msg === "drowning")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "drowning",
          img: "",
        });
      }

      app.players[player.number - 1].target.cell1.number = player.currentPosition.cell.number;
      app.players[player.number - 1].target.cell1.center = player.currentPosition.cell.center;

      app.players[player.number - 1].moving = {
        state: true,
        step: 0,
        course: "",
        origin: {
          number: player.currentPosition.cell.number,
          center: player.currentPosition.cell.center,
        },
        destination: {
          x: player.currentPosition.cell.center.x,
          y: player.currentPosition.cell.center.y,
        },
      };

      nextPosition = app.lineCrementer(player);
      app.players[player.number - 1].nextPosition = nextPosition;

      // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      break;
    case "void":
      app.players[player.number - 1].falling.state = true;
      app.players[player.number - 1].action = "falling";

      logMove("enteredVoid", {
        playerId: player.number,
        cell: cell?.number,
        terrain: cell?.terrain?.type,
      });

      if (!app.players[player.number - 1].popups.find((x) => x.msg === "falling")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "falling",
          img: "",
        });
      }

      app.players[player.number - 1].target.cell1.number = player.currentPosition.cell.number;
      app.players[player.number - 1].target.cell1.center = player.currentPosition.cell.center;

      app.players[player.number - 1].moving = {
        state: true,
        step: 0,
        course: "",
        origin: {
          number: player.currentPosition.cell.number,
          center: player.currentPosition.cell.center,
        },
        destination: {
          x: player.currentPosition.cell.center.x,
          y: player.currentPosition.cell.center.y,
        },
      };

      nextPosition = app.lineCrementer(player);
      app.players[player.number - 1].nextPosition = nextPosition;

      // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      break;
    case "road":
      // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      break;
    case "shallow":
      // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      app.players[player.number - 1].terrainMoveSpeed.state = true;
      app.players[player.number - 1].terrainMoveSpeed.speed = app.terrainMoveSpeedRef[cell.terrain.type];
      break;
    case "sticky":
      // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      app.players[player.number - 1].terrainMoveSpeed.state = true;
      app.players[player.number - 1].terrainMoveSpeed.speed = app.terrainMoveSpeedRef[cell.terrain.type];

      if (!player.popups.find((x) => x.msg === "terrainSlowdown")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "terrainSlowdown",
          img: "",
        });
      }

      break;
    case "slippery":
      // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      app.players[player.number - 1].terrainMoveSpeed.state = true;
      app.players[player.number - 1].terrainMoveSpeed.speed = app.terrainMoveSpeedRef[cell.terrain.type];

      if (!player.popups.find((x) => x.msg === "terrainSpeedup")) {
        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "terrainSpeedup",
          img: "",
        });
      }

      break;
    case "hazard":
      // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      let applyHazard;
      if (cell.terrain.name === "lava") {
        applyHazard = app.rnJesus(1, 2);
      } else {
        applyHazard = app.rnJesus(1, 3);
      }

      logMove("enteredHazard", {
        playerId: player.number,
        cell: cell?.number,
        terrain: cell?.terrain?.type,
        terrainName: cell?.terrain?.name,
        roll: applyHazard,
        applied: applyHazard === 1,
      });

      if (applyHazard === 1) {
        // if (!app.players[player.number-1].popups.find(x=>x.msg === 'alarmed')) {
        //   app.players[player.number-1].popups.push(
        //     {
        //       state: false,
        //       count: 0,
        //       limit:25,
        //       type: '',
        //       position: '',
        //       msg: 'alarmed',
        //       img: '',
        //
        //     }
        //   )
        // }

        app.handleMiscPlayerDamage(player, "applyHazard");
      }
      break;
  }

  if (pickupOnly !== true) {
    if (cell.rubble === true) {
      // console.log('stepped on rubble @ check destination. removing it too');

      let applyHazard = app.rnJesus(1, 3);

      if (applyHazard === 1) {
        app.handleMiscPlayerDamage(player, "applyHazard");
      }

      app.gridInfo.find((x) => x.number.x === cell.number.x && x.number.y === cell.number.y).rubble = false;
    }
  } else {
    logItem("pickupOnly", {
      playerId: player.number,
      cell: cell?.number,
    });
  }
}
