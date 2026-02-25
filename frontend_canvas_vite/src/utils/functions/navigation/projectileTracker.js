import pointInPolygon from "point-in-polygon";

export function projectileTracker(app) {
  for (const bolt of app.projectiles) {
    if (bolt.kill === true) {
      let index = app.projectiles.findIndex((blt) => blt.id === bolt.id);
      app.projectiles.splice(index, 1);
      console.log(
        "kill bolt",
        bolt.currentPosition.number,
        // app.players[bolt.owner - 1].currentPosition.cell.number,
        app.projectiles,
        app.settingAutoCamera,
        app.settingAutoCameraFollowBolt,
      );
      if (app.settingAutoCameraFollowBolt === true) {
        app.setAutoCamera("zoomReset", "");
      }
    }

    if (bolt.type === "bolt" && bolt.moving.state === true && bolt.kill !== true) {
      // console.log("traking projectile", bolt.id);

      let index = app.projectiles.findIndex((blt) => blt.id === bolt.id);
      bolt.currentPosition.center = bolt.nextPosition;

      let boltNextPosition = app.boltCrementer(bolt);
      bolt.nextPosition = boltNextPosition;
      // console.log('moving bolt nxt pos',bolt.nextPosition);

      // CHECK WHICH CELL BOLT IS AT
      for (const cell of bolt.target.path) {
        let point = [bolt.currentPosition.center.x, bolt.currentPosition.center.y];
        let polygon = [];
        for (const vertex of cell.vertices) {
          let vertexPoint = [vertex.x - 10, vertex.y - 5];
          // let vertexPoint = [vertex.x,vertex.y];
          polygon.push(vertexPoint);
        }
        let pip = pointInPolygon(point, polygon);
        if (pip === true) {
          // console.log("bolt passing through cell", cell.number);
          bolt.currentPosition.number = cell.number;

          let infoCell = app.gridInfo.find((x) => x.number.x === cell.number.x && x.number.y === cell.number.y);

          let boltOwner;
          if (bolt.ownerType === "player") {
            boltOwner = app.players[bolt.owner - 1];
          }
          if (bolt.ownerType === "obstacle" || bolt.ownerType === "barrier") {
            boltOwner = app.gridInfo.find((x) => x[bolt.ownerType].state === true && x[bolt.ownerType].id === bolt.owner)[bolt.ownerType];
          }
          if (bolt.ownerType === "custom") {
            boltOwner = bolt.owner;
          }

          // PATH HIGHLIGHT
          if (cell.number.x === bolt.origin.number.x && cell.number.y === bolt.origin.number.y) {
          } else {
            app.cellsUnderAttack.push({
              number: {
                x: cell.number.x,
                y: cell.number.y,
              },
              count: 1,
              limit: 5,
            });
          }

          if (infoCell.elevation.number === bolt.elevation) {
            let fwdBarrier = false;

            if (infoCell.barrier.state === true && infoCell.barrier.height >= 1) {
              // if (infoCell.barrier.position === bolt.direction) {
              //   fwdBarrier = true;
              // }
              fwdBarrier = app.checkForwardBarrier(bolt.direction, infoCell);
            }

            if (bolt.target.path.length === 1) {
              if (infoCell.barrier.state === true && infoCell.barrier.position === bolt.direction) {
                app.attackCellContents("bolt", bolt.ownerType, boltOwner, infoCell, undefined, undefined, bolt);
              }
            }

            if (infoCell.barrier.position === bolt.direction) {
              fwdBarrier = true;
            }
            let dodged = false;

            // CHECK FOR PLAYERS, OBSTACLE &  REAR BARRIER COLLISION
            if (fwdBarrier !== true) {
              if (bolt.ownerType === "player") {
                for (const plyr of app.players) {
                  if (
                    plyr.currentPosition.cell.number.x === cell.number.x &&
                    plyr.currentPosition.cell.number.y === cell.number.y &&
                    plyr.dead.state !== true &&
                    plyr.number !== bolt.owner
                  ) {
                    app.projectileAttackParse(bolt, "player", "player", plyr);
                  }
                }
              }
              if (bolt.ownerType === "obstacle" || bolt.ownerType === "barrier" || bolt.ownerType === "custom") {
                for (const plyr of app.players) {
                  if (
                    plyr.currentPosition.cell.number.x === cell.number.x &&
                    plyr.currentPosition.cell.number.y === cell.number.y &&
                    plyr.dead.state !== true
                  ) {
                    app.projectileAttackParse(bolt, bolt.ownerType, "player", plyr);
                  }
                }
              }

              // CHECK FOR OBSTACLE &  REAR BARRIER COLLISION

              if (infoCell.obstacle.state === true && infoCell.obstacle.height >= 1) {
                if (bolt.ownerType !== "player" && `obstacle_${infoCell.obstacle.id}` !== `${bolt.ownerType}_${boltOwner.id}`) {
                  app.attackCellContents("bolt", bolt.ownerType, boltOwner, infoCell, undefined, undefined, bolt);
                }
                if (bolt.ownerType === "player") {
                  app.attackCellContents("bolt", bolt.ownerType, boltOwner, infoCell, undefined, undefined, bolt);
                }
              } else if (infoCell.barrier.state === true && infoCell.barrier.height >= 1) {
                app.attackCellContents("bolt", bolt.ownerType, boltOwner, infoCell, undefined, undefined, bolt);
              }
            } else {
              // HANDLE FWD BARRIER BOLT COLLISION
              if (infoCell.barrier.state === true && infoCell.barrier.height >= 1) {
                if (`barrier_${infoCell.barrier.id}` !== `${bolt.ownerType}_${boltOwner.id}`) {
                  let myCell = app.gridInfo.find((x) => x.number.x === bolt.origin.number.x && x.number.y === bolt.origin.number.y);
                  app.attackCellContents("bolt", bolt.ownerType, boltOwner, infoCell, undefined, myCell, bolt);
                } else {
                  console.log("app barrier is the same as the bolt owner. do nothing");
                }
              }
            }
          } else {
            if (infoCell.elevation.number < bolt.elevation) {
              console.log("bolt moving over lower cell. ");

              app.attackCellContents("flyOverBolt", bolt.ownerType, boltOwner, infoCell, undefined, undefined, bolt);
            }
            if (infoCell.elevation.number > bolt.elevation) {
              console.log("bolt hit cell of higher elevation.");
              bolt.kill = true;
            }
          }
        }
      }

      // BOLT WENT OUT OF CANVAS BOUNDS
      if (
        bolt.currentPosition.center.x < 0 ||
        bolt.currentPosition.center.y < 0 ||
        bolt.currentPosition.center.x > app.canvasWidth ||
        bolt.currentPosition.center.y > app.canvasHeight
      ) {
        console.log("bolt went out of canvas bounds");
        bolt.kill = true;
      }
    }

    if (bolt.type === "arc" && bolt.moving.state === true && bolt.kill !== true) {
    }
  }
}
