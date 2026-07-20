export function discardGear(app, player, type) {
  const logItem = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("items.discard", message, data, { fn: "discardGear" });
    }
  };
  // console.log('dropping gear');

  let cellToDrop = app.gridInfo.find(
    (elem) => elem.number.x === player.currentPosition.cell.number.x && elem.number.y === player.currentPosition.cell.number.y,
  );

  app.players[player.number - 1].action = "idle";

  if (cellToDrop.item.name === "") {
    if (type === "weapon") {
      if (player.currentWeapon.name !== "") {
        let index = player.items.weapons.findIndex((weapon) => weapon.name === player.currentWeapon.name);

        let weapon = player.currentWeapon;

        cellToDrop.item = {
          name: weapon.name,
          type: "weapon",
          subType: weapon.type,
          effect: weapon.effect,
          initDrawn: false,
        };

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
        app.players[player.number - 1].statusDisplay = {
          state: true,
          status: weapon.name + " discarded!",
          count: 1,
          limit: app.players[player.number - 1].statusDisplay.limit,
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
        app.players[player.number - 1].currentWeapon = {
          name: "",
          type: "",
          effect: "",
        };

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
      } else {
        logItem("noWeaponEquipped", {
          playerId: player.number,
        });
      }
    }
    if (type === "armor") {
      if (player.currentArmor.name !== "") {
        let index2 = player.items.armor.findIndex((armor) => armor.name === player.currentArmor.name);

        let armor = player.currentArmor;

        cellToDrop.item = {
          name: armor.name,
          type: "armor",
          subType: armor.type,
          effect: armor.effect,
          initDrawn: false,
        };

        app.players[player.number - 1].itemDrop = {
          state: true,
          count: 0,
          limit: 10,
          item: {
            name: "",
          },
          gear: {
            type: app.players[player.number - 1].items.armor[index2].type,
          },
        };
        app.players[player.number - 1].statusDisplay = {
          state: true,
          status: armor.name + " discarded!",
          count: 1,
          limit: app.players[player.number - 1].statusDisplay.limit,
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
        app.applyRemoveEffect(player, "remove", "discard", "armor", cellToDrop.item);

        app.players[player.number - 1].items.armor.splice(index2, 1);
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
      } else {
        logItem("noArmorEquipped", {
          playerId: player.number,
        });
      }
    }
  } else {
    logItem("cellOccupied", {
      playerId: player.number,
      cell: cellToDrop.number,
      result: "can't drop gear",
    });

    app.players[player.number - 1].statusDisplay = {
      state: true,
      status: "Cell occupied. Cant drop!",
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

    app.checkDestination(player, true);
  }
}
