export function projectileTester(app, cell) {
  let result = app.projectileCreator(
    "custom",
    {
      direction: "south",
      originCell: cell,
    },
    "bolt",
  );
  app.projectiles.push(result.projectile);
  app.getBoltTarget(result.projectile);

  if (
    app.camera.customView.state !== true &&
    app.settingAutoCamera === false &&
    player.ai.state !== true &&
    app.camera.preInstructions.length === 0 &&
    app.camera.instructions.length === 0
  ) {
    // if (app.players[0].dead.state !== true) {
    //   if (player.number === 1) {
    //     app.setAutoCamera("attackFocus", player);
    //   }
    // } else if (player.number === 2) {
    //   app.setAutoCamera("attackFocus", player);
    // }
    app.setAutoCamera(`followBolt_${result.projectile.id}`, "");
  } else {
    // console.log("no setting auto cam: followBolt");
  }
}

export function projectileCreator(app, ownerType, owner, projectileType) {
  // console.log("projectileCreator", owner.id);
  // other projectile type is "arc"
  let projectile;
  if (ownerType === "custom") {
    let origin = {
      number: owner.originCell.number,
      center: owner.originCell.center,
    };
    let nextPosition = origin.center;
    projectile = {
      id: "000" + app.projectiles.length + "",
      type: projectileType,
      owner: "",
      ownerType: "custom",
      origin: origin,
      direction: owner.direction,
      moving: {
        state: false,
        step: 0,
        course: "",
        origin: {
          number: origin.number,
          center: origin.center,
        },
        destination: {
          x: 0,
          y: 0,
        },
      },
      currentPosition: {
        number: origin.number,
        center: origin.center,
      },
      nextPosition: {
        x: nextPosition.x,
        y: nextPosition.y,
      },
      target: {
        path: [],
        free: true,
        occupant: {
          type: "",
          player: "",
        },
        void: false,
      },
      speed: app.projectileSpeed,
      elevation: owner.originCell.elevation.number,
      kill: false,
      charge: 0,
    };
  } else {
    if (projectileType === "bolt") {
      if (ownerType === "player") {
        let origin = owner.currentPosition.cell;
        let currentPosition = owner.currentPosition.cell;
        let nextPosition = owner.currentPosition.cell.center;
        let elevation = app.gridInfo.find(
          (elem) => elem.number.x === owner.currentPosition.cell.number.x && elem.number.y === owner.currentPosition.cell.number.y,
        ).elevation.number;

        projectile = {
          id: "000" + app.projectiles.length + "",
          type: projectileType,
          owner: owner.number,
          ownerType: "player",
          origin: origin,
          direction: owner.direction,
          moving: {
            state: false,
            step: 0,
            course: "",
            origin: {
              number: currentPosition.number,
              center: currentPosition.center,
            },
            destination: {
              x: 0,
              y: 0,
            },
          },
          currentPosition: {
            number: currentPosition.number,
            center: currentPosition.center,
          },
          nextPosition: {
            x: nextPosition.x,
            y: nextPosition.y,
          },
          target: {
            path: [],
            free: true,
            occupant: {
              type: "",
              player: "",
            },
            void: false,
          },
          speed: app.projectileSpeed,
          elevation: elevation,
          kill: false,
          charge: owner.attacking.charge,
        };

        owner.items.ammo--;
        owner.currentWeapon.effect = "ammo+0";

        if (!owner.popups.find((x) => x.msg === "attacking")) {
          owner.popups.push({
            state: false,
            count: 0,
            limit: owner.attacking.animRef.limit[owner.currentWeapon.type] - owner.attacking.animRef.peak[owner.currentWeapon.type],
            type: "",
            position: "",
            msg: "attacking",
            img: "",
          });
        }
      }

      let refCell;
      let direction = "";
      if (ownerType === "obstacle") {
        refCell = app.gridInfo.find((x) => x.obstacle.state === true && x.obstacle.id === owner.id);
        let origin = {
          number: refCell.number,
          center: refCell.center,
        };
        let nextPosition = refCell.center;
        direction = app.getDirectionFromCells(origin.number, owner.trap.target);
        projectile = {
          id: "000" + app.projectiles.length + "",
          type: projectileType,
          owner: owner.id,
          ownerType: "obstacle",
          origin: origin,
          direction: direction,
          moving: {
            state: false,
            step: 0,
            course: "",
            origin: {
              number: origin.number,
              center: origin.center,
            },
            destination: {
              x: 0,
              y: 0,
            },
          },
          currentPosition: {
            number: origin.number,
            center: origin.center,
          },
          nextPosition: {
            x: nextPosition.x,
            y: nextPosition.y,
          },
          target: {
            path: [],
            free: true,
            occupant: {
              type: "",
              player: "",
            },
            void: false,
          },
          speed: app.projectileSpeed,
          elevation: refCell.elevation.number,
          kill: false,
          charge: 0,
        };
      }

      if (ownerType === "barrier") {
        refCell = app.gridInfo.find((x) => x.barrier.state === true && x.barrier.id === owner.id);
        let origin = {
          number: refCell.number,
          center: refCell.center,
        };
        let nextPosition = refCell.center;
        direction = app.getDirectionFromCells(origin.number, owner.trap.target);
        projectile = {
          id: "000" + app.projectiles.length + "",
          type: projectileType,
          owner: owner.id,
          ownerType: "barrier",
          origin: origin,
          direction: direction,
          moving: {
            state: false,
            step: 0,
            course: "",
            origin: {
              number: origin.number,
              center: origin.center,
            },
            destination: {
              x: 0,
              y: 0,
            },
          },
          currentPosition: {
            number: origin.number,
            center: origin.center,
          },
          nextPosition: {
            x: nextPosition.x,
            y: nextPosition.y,
          },
          target: {
            path: [],
            free: true,
            occupant: {
              type: "",
              player: "",
            },
            void: false,
          },
          speed: app.projectileSpeed,
          elevation: refCell.elevation.number,
          kill: false,
          charge: 0,
        };

        // owner.items.ammo--;
        // owner.currentWeapon.effect = "ammo+0";
        // remove trap ammo and set weapon effect
      }
    }
  }

  return {
    owner: owner,
    projectile: projectile,
  };
}
