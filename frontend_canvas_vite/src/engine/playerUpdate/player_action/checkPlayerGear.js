export function checkPlayerGear(app, player) {
  // DISCARD GEAR STEPPER!!
  if (player.discardGear.state === true) {
    if (player.discardGear.count < player.discardGear.limit) {
      player.discardGear.count++;
    } else if (player.discardGear.count >= player.discardGear.limit) {
      player.discardGear = {
        state: false,
        count: 0,
        limit: player.discardGear.limit,
      };
    }
  }

  // WEAPON/ARMOR CYCLE CHECK!!
  if (app.keyPressed[player.number - 1].cycleWeapon === true && player.cycleWeapon.state === false) {
    if (player.cycleWeapon.count < player.cycleWeapon.limit) {
      player.cycleWeapon.count++;
      // console.log('player.cycleWeapon.count',player.cycleWeapon.count);
    }
    if (player.cycleWeapon.count >= player.cycleWeapon.limit) {
      if (app.keyPressed[player.number - 1].cycleWeapon === true && player.items.weapons.length > 1) {
        // console.log('cycling weapon',player.items);

        // let currentIndex = player.items.weapons.indexOf(player.currentWeapon);
        let currentIndex = player.items.weaponIndex;
        let newIndex;
        // console.log(player.items.weapons,player.currentWeapon,currentIndex,player.items.weapons[currentIndex]);
        if (currentIndex + 1 > player.items.weapons.length - 1) {
          newIndex = 0;
        } else {
          newIndex = currentIndex + 1;
        }
        player.items.weaponIndex = newIndex;
        player.currentWeapon = player.items.weapons[newIndex];

        if (!player.popups.find((x) => x.msg === player.items.weapons[newIndex].type)) {
          player.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: player.items.weapons[newIndex].type,
            img: "",
          });
        }

        // console.log(player.items.weapons,player.currentWeapon,newIndex,player.items.weapons[newIndex]);
      }
      if (app.keyPressed[player.number - 1].cycleWeapon === true && player.items.weapons.length === 1) {
        if (player.currentWeapon.type === "crossbow" && player.items.ammo === 0) {
          player.currentWeapon = {
            name: "",
            type: "",
            effect: "",
          };
          console.log("only have empty crossbow left, switching to unarmed");
        } else {
          player.currentWeapon = player.items.weapons[0];
          // console.log('nothing to cycle through');
          app.players[player.number - 1].statusDisplay = {
            state: true,
            status: "no weapons to cycle!",
            count: 1,
            limit: app.players[player.number - 1].statusDisplay.limit,
          };

          if (!player.popups.find((x) => x.msg === "stop")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "stop",
              img: "",
            });
          }
        }
      }

      player.cycleWeapon = {
        state: false,
        count: 0,
        limit: player.cycleWeapon.limit,
      };

      let myCell = app.gridInfo.find(
        (cell) => cell.number.x === player.currentPosition.cell.number.x && cell.number.y === player.currentPosition.cell.number.y,
      );
      // if (myCell.item.name !== '') {
      //   // console.log('found an item. picking it up');
      //   app.checkDestination(player)
      // }
    }
  } else if (app.keyPressed[player.number - 1].cycleWeapon === true && player.cycleWeapon.state === true) {
    console.log("already cycling weapon");
  }
  if (app.keyPressed[player.number - 1].cycleArmor === true && player.cycleArmor.state === false) {
    if (player.cycleArmor.count < player.cycleArmor.limit) {
      player.cycleArmor.count++;
      // console.log('player.cycleArmor.count',player.cycleArmor.count);
    }
    if (player.cycleArmor.count >= player.cycleArmor.limit) {
      if (app.keyPressed[player.number - 1].cycleArmor === true && player.items.armor.length > 0) {
        // console.log('cycling armor');

        // let currentIndex = player.items.armor.indexOf(player.currentArmor);
        let currentIndex = player.items.armorIndex;
        let newIndex;
        if (currentIndex + 1 > player.items.armor.length - 1) {
          newIndex = 0;
        } else {
          newIndex = currentIndex + 1;
        }

        switch (player.currentArmor.effect) {
          case "hpUp":
            if (player.hp > 1) {
              // console.log('armor cycle debuff hp',player.hp);
              player.hp = player.hp - 1;
              // console.log('armor cycle debuff hp',player.hp);
            }
            break;
          case "speedUp":
            let currentSpd1 = player.speed.range.indexOf(player.speed.move);
            if (player.speed.move > 0.05) {
              // console.log('armor cycle debuff speed',player.speed.move);
              player.speed.move = player.speed.range[currentSpd1 - 1];
              // console.log('armor cycle debuff speed',player.speed.move);
            }
            break;
        }

        switch (player.items.armor[newIndex].effect) {
          case "hpUp":
            if (player.hp < 3) {
              // console.log('armor cycle buff hp',player.hp);
              player.hp = player.hp + 1;
              // console.log('armor cycle buff hp',player.hp);

              player.statusDisplay = {
                state: true,
                status: "hpUp",
                count: 1,
                limit: player.statusDisplay.limit,
              };
            }
            break;
          case "speedUp":
            let currentSpd2 = player.speed.range.indexOf(player.speed.move);
            if (player.speed.move < 0.2) {
              // console.log('armor cycle buff speed',player.speed.move);
              player.speed.move = player.speed.range[currentSpd2 + 1];
              // console.log('armor cycle buff speed',player.speed.move);

              player.statusDisplay = {
                state: true,
                status: "speedUp",
                count: 1,
                limit: player.statusDisplay.limit,
              };
            }
            break;
        }

        player.items.armorIndex = newIndex;
        player.currentArmor = player.items.armor[newIndex];

        if (player.items.armor[newIndex].type !== "" && !player.popups.find((x) => x.msg === player.items.armor[newIndex].type)) {
          player.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: player.items.armor[newIndex].type,
            img: "",
          });
        }
        if (player.items.armor[newIndex].type === "" && !player.popups.find((x) => x.msg === "stop")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "stop",
            img: "",
          });
        }
      }
      if (app.keyPressed[player.number - 1].cycleArmor === true && player.items.armor.length === 0) {
        console.log("no armor to cycle through");
        app.players[player.number - 1].statusDisplay = {
          state: true,
          status: "no armor to cycle!",
          count: 1,
          limit: app.players[player.number - 1].statusDisplay.limit,
        };

        if (!player.popups.find((x) => x.msg === "stop")) {
          player.popups.push({
            state: false,
            count: 0,
            limit: 30,
            type: "",
            position: "",
            msg: "stop",
            img: "",
          });
        }
      }

      player.cycleArmor = {
        state: false,
        count: 0,
        limit: player.cycleArmor.limit,
      };

      let myCell = app.gridInfo.find(
        (cell) => cell.number.x === player.currentPosition.cell.number.x && cell.number.y === player.currentPosition.cell.number.y,
      );
      // if (myCell.item.name !== '') {
      //   // console.log('found an item. picking it up');
      //   app.checkDestination(player)
      // }
    }
  } else if (app.keyPressed[player.number - 1].cycleArmor === true && player.cycleArmor.state === true) {
    console.log("already cycling armor");
  }

  // ITEM PICKUP/DROP ANIM COUNTER!
  if (player.itemDrop.state === true) {
    if (player.itemDrop.count < player.itemDrop.limit) {
      player.itemDrop.count++;
      // console.log('dropping item anim');
    } else if (player.itemDrop.count >= player.itemDrop.limit) {
      player.itemDrop = {
        state: false,
        count: 0,
        limit: 10,
        item: {
          name: "",
        },
        gear: {
          type: "",
        },
      };
    }
  }
  if (player.itemPickup.state === true) {
    if (player.itemPickup.count < player.itemPickup.limit) {
      player.itemPickup.count++;
      // console.log('picking item anim');
    } else if (player.itemPickup.count >= player.itemPickup.limit) {
      player.itemPickup = {
        state: false,
        count: 0,
        limit: 10,
        item: {
          name: "",
        },
        gear: {
          type: "",
        },
      };
    }
  }
}
