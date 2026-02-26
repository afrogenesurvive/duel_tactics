export function deflectDrop(app, player) {
  // console.log('deflected! drop gear?',player.number);
  // console.log('preDropItems', player.items);

  let item = {
    name: "",
    type: "",
    subType: "",
    effect: "",
    initDrawn: false,
  };

  let dropWhat = app.rnJesus(1, 5);
  dropWhat = 1;
  let shouldDrop = false;
  let dropped = false;

  // let dropChance = app.rnJesus(1,1*player.crits.pushBack);

  let dropChance = app.rnJesus(1, player.crits.pushBack + 3);
  dropChance = app.rnJesus(1, 1);
  if (dropChance === 1 && player.falling.state !== true && player.dead.state !== true) {
    shouldDrop = true;

    if (dropWhat === 1) {
      if (player.currentWeapon.name !== "") {
        dropped = true;

        let index = player.items.weapons.findIndex((weapon) => weapon.name === player.currentWeapon.name);
        // console.log("dropping weapon player ",player.number,app.players[player.number-1].items.weapons[index].name,index,);

        item.name = app.players[player.number - 1].items.weapons[index].name;
        item.subType = app.players[player.number - 1].items.weapons[index].type;
        item.type = "weapon";
        item.effect = app.players[player.number - 1].items.weapons[index].effect;

        app.players[player.number - 1].itemDrop = {
          state: true,
          count: 0,
          limit: 10,
          item: {
            name: "",
          },
          gear: {
            type: app.players[player.number - 1].items.weapons[index].type,
          },
        };

        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "dropWeapon",
          img: "",
        });

        app.players[player.number - 1].items.weapons.splice(index, 1);
        app.players[player.number - 1].items.weaponIndex = 0;
        app.players[player.number - 1].currentWeapon = {
          name: "",
          type: "",
          effect: "",
        };

        // CURRENT WEAPON DROPPED, DROP DEFENSE
        if (!player.currentArmor.name || !player.currentArmor || player.currentArmor.name === "") {
          app.players[player.number - 1].defending = {
            state: false,
            count: 0,
            limit: app.players[player.number - 1].defending.limit,
            animRef: app.players[player.number - 1].defending.animRef,
            peak: false,
            peakCount: 0,
            decay: {
              state: false,
              count: 0,
              limit: app.defendAnimRef.limit.unarmed.slash - app.defendAnimRef.peak.unarmed.slash,
            },
            direction: "",
            directionType: "", //thrust or slash
          };
          app.players[player.number - 1].action = "idle";
        }

        app.players[player.number - 1].statusDisplay = {
          state: true,
          status: item.name + "dropped",
          count: 1,
          limit: app.players[player.number - 1].statusDisplay.limit,
        };
      }
    } else {
      if (player.currentArmor.name !== "") {
        dropped = true;
        let index = player.items.armor.findIndex((armor) => armor.name === player.currentArmor.name);
        // console.log("dropping armor player ",player.number,app.players[player.number-1].items.armor[index].name);
        item.name = app.players[player.number - 1].items.armor[index].name;
        item.subType = app.players[player.number - 1].items.armor[index].type;
        item.effect = app.players[player.number - 1].items.armor[index].effect;
        item.type = "armor";

        app.players[player.number - 1].itemDrop = {
          state: true,
          count: 0,
          limit: 10,
          item: {
            name: "",
          },
          gear: {
            type: app.players[player.number - 1].items.armor[index].type,
          },
        };

        app.players[player.number - 1].popups.push({
          state: false,
          count: 0,
          limit: 25,
          type: "",
          position: "",
          msg: "dropArmor",
          img: "",
        });

        app.applyRemoveEffect(player, "remove", "deflectDrop", "armor", item);

        app.players[player.number - 1].items.armor.splice(index, 1);
        app.players[player.number - 1].items.armorIndex = 0;
        app.players[player.number - 1].currentArmor = {
          name: "",
          type: "",
          effect: "",
        };

        if (!player.currentWeapon.name || !player.currentWeapon || player.currentWeapon.name === "") {
          app.players[player.number - 1].defending = {
            state: false,
            count: 0,
            limit: app.players[player.number - 1].defending.limit,
            animRef: app.players[player.number - 1].defending.animRef,
            peak: false,
            peakCount: 0,
            decay: {
              state: false,
              count: 0,
              limit: app.defendAnimRef.limit.unarmed.slash - app.defendAnimRef.peak.unarmed.slash,
            },
            direction: "",
            directionType: "", //thrust or slash
          };
          app.players[player.number - 1].action = "idle";
        }

        app.players[player.number - 1].statusDisplay = {
          state: true,
          status: item.name + "dropped",
          count: 1,
          limit: app.players[player.number - 1].statusDisplay.limit,
        };
      }
    }

    if (player.currentWeapon.name === "" || player.currentArmor.name === "") {
      console.log("currently unarmed and/or unarmored. Nothing to drop");
    }

    // console.log('postDropItems', player.items, player.currentPosition.cell.number.x,player.currentPosition.cell.number.y);

    if (dropped === true) {
      let dropCellIndex = app.gridInfo.findIndex(
        (cell) => cell.number.x === player.currentPosition.cell.number.x && cell.number.y === player.currentPosition.cell.number.y,
      );
      app.gridInfo[dropCellIndex].item = item;

      if (player.ai.state === true && item.name !== "" && player.ai.organizing.dropped.state !== true) {
        if (dropWhat === 1) {
          // console.log('ai dropping weapon');
          player.ai.organizing.dropped.state = true;
          player.ai.organizing.dropped.gear = {
            name: item.name,
            type: item.type,
            subType: item.subType,
            effect: item.effect,
          };
        } else {
          // console.log('ai dropping armor');
          player.ai.organizing.dropped.state = true;
          player.ai.organizing.dropped.gear = {
            name: item.name,
            type: item.type,
            subType: item.subType,
            effect: item.effect,
          };
        }
      }
    }
  } else {
    // console.log('no gear drop',player.currentPosition.cell.number.x,player.currentPosition.cell.number.y);
  }

  //   if dropped gear remove buff/effect
  // console.log('app.players[player.number-1].itemDrop',app.players[player.number-1].itemDrop);
}
