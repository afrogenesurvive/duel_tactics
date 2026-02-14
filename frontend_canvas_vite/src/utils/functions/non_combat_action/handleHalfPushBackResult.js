export function handleHalfPushBackResult(app, type, data) {
  // console.log("handleHalfPushBackResult", type, data);

  let direction = "";
  let impactor = type;
  let impactee = "";
  let impacteePlayerRef;
  let shouldDamageImpactor = false;
  let shouldDamageImpactee = false;
  let shouldDeflectImpactor = false;
  let shouldDeflectImpactee = false;
  let impactorDamage = 0;
  let impacteeDamage = 0;
  let shouldMoveImpactee = false;

  let moveObstacle = false;
  let movePlayer = false;

  let targetCellNumber = undefined;
  let targetCellRef = undefined;
  let myCellRef = undefined;

  let damageObstacle = (args) => {
    let damage = 1;
    if (app.rnJesus(1, 2) === 1) {
      damage = app.rnJesus(1, 2);
    }

    // IMPACTOR DAMAGE OR DESTROY, DON'T MOVE
    if (args === "impactor") {
      if (myCellRef.obstacle.destructible.state === true) {
        if (myCellRef.obstacle.hp - damage > 0) {
          let hp = myCellRef.obstacle.hp - damage;

          myCellRef.obstacle = {
            state: myCellRef.obstacle.state,
            name: myCellRef.obstacle.name,
            type: myCellRef.obstacle.type,
            hp: hp,
            destructible: myCellRef.obstacle.destructible,
            locked: myCellRef.obstacle.locked,
            weight: myCellRef.obstacle.weight,
            height: myCellRef.obstacle.height,
            items: myCellRef.obstacle.items,
            effects: myCellRef.obstacle.effects,
            moving: myCellRef.obstacle.moving,
          };

          app.obstacleBarrierToDestroy.push({
            type: "obstacle",
            action: "damage",
            count: 0,
            limit: 30,
            complete: false,
            cell: myCellRef,
          });
        }

        // DESTROY OBSTACLE W/ OR W/O RUBBLE
        else if (myCellRef.obstacle.hp - damage <= 0) {
          let itemsToDrop = [];

          if (myCellRef.obstacle.destructible.leaveRubble === true) {
            // console.log('leave rubble on ',targetCell.number,'removing obstacle');

            if (myCellRef.obstacle.items[0]) {
              itemsToDrop = myCellRef.obstacle.items;
            }
            myCellRef.rubble = true;
            // targetCell.terrain.type = 'hazard';

            myCellRef.obstacle = {
              state: false,
              name: myCellRef.obstacle.name,
              type: myCellRef.obstacle.type,
              hp: 0,
              destructible: myCellRef.obstacle.destructible,
              locked: myCellRef.obstacle.locked,
              weight: myCellRef.obstacle.weight,
              height: myCellRef.obstacle.height,
              items: myCellRef.obstacle.items,
              effects: myCellRef.obstacle.effects,
              moving: myCellRef.obstacle.moving,
            };
          } else {
            // console.log('no rubble. Just remove obstacle');
            if (myCellRef.obstacle.items[0]) {
              itemsToDrop = myCellRef.obstacle.items;
            }

            myCellRef.obstacle = {
              state: false,
              name: myCellRef.obstacle.name,
              type: myCellRef.obstacle.type,
              hp: 0,
              destructible: myCellRef.obstacle.destructible,
              locked: myCellRef.obstacle.locked,
              weight: myCellRef.obstacle.weight,
              height: myCellRef.obstacle.height,
              items: myCellRef.obstacle.items,
              effects: myCellRef.obstacle.effects,
              moving: myCellRef.obstacle.moving,
            };
          }

          // DROP OBSTACLE ITEMS?
          if (itemsToDrop[0]) {
            // console.log('dropping obstacle items melee',itemsToDrop);
            app.obstacleItemDrop(myCellRef, undefined);
          }

          app.obstacleBarrierToDestroy.push({
            type: "obstacle",
            action: "destroy",
            count: 0,
            limit: 30,
            complete: false,
            cell: myCellRef,
          });

          if (!app.cellPopups.find((x) => x.msg === "destroyedItem")) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: 35,
              type: "",
              position: "",
              msg: "destroyedItem",
              img: "",
              cell: myCellRef,
            });
          }
        }
      } else {
        // moveObstacle = true;
      }
    }

    // IMPACTEE, DAMAGE, DESTROY AND MOVE?
    if (args === "impactee") {
      if (targetCellRef.obstacle.destructible.state === true) {
        if (targetCellRef.obstacle.hp - damage > 0) {
          let hp = targetCellRef.obstacle.hp - damage;

          targetCellRef.obstacle = {
            state: targetCellRef.obstacle.state,
            name: targetCellRef.obstacle.name,
            type: targetCellRef.obstacle.type,
            hp: hp,
            destructible: targetCellRef.obstacle.destructible,
            locked: targetCellRef.obstacle.locked,
            weight: targetCellRef.obstacle.weight,
            height: targetCellRef.obstacle.height,
            items: targetCellRef.obstacle.items,
            effects: targetCellRef.obstacle.effects,
            moving: targetCellRef.obstacle.moving,
          };

          app.obstacleBarrierToDestroy.push({
            type: "obstacle",
            action: "damage",
            count: 0,
            limit: 30,
            complete: false,
            cell: targetCellRef,
          });

          if (app.rnJesus(1, 4) === 1) {
            moveObstacle = true;
          }
        }

        // DESTROY OBSTACLE W/ OR W/O RUBBLE
        else if (targetCellRef.obstacle.hp - damage <= 0) {
          let itemsToDrop = [];

          if (targetCellRef.obstacle.destructible.leaveRubble === true) {
            // console.log('leave rubble on ',targetCell.number,'removing obstacle');

            if (targetCellRef.obstacle.items[0]) {
              itemsToDrop = targetCellRef.obstacle.items;
            }
            targetCellRef.rubble = true;
            // targetCell.terrain.type = 'hazard';

            targetCellRef.obstacle = {
              state: false,
              name: targetCellRef.obstacle.name,
              type: targetCellRef.obstacle.type,
              hp: 0,
              destructible: targetCellRef.obstacle.destructible,
              locked: targetCellRef.obstacle.locked,
              weight: targetCellRef.obstacle.weight,
              height: targetCellRef.obstacle.height,
              items: targetCellRef.obstacle.items,
              effects: targetCellRef.obstacle.effects,
              moving: targetCellRef.obstacle.moving,
            };
          } else {
            // console.log('no rubble. Just remove obstacle');
            if (targetCellRef.obstacle.items[0]) {
              itemsToDrop = targetCellRef.obstacle.items;
            }

            targetCellRef.obstacle = {
              state: false,
              name: targetCellRef.obstacle.name,
              type: targetCellRef.obstacle.type,
              hp: 0,
              destructible: targetCellRef.obstacle.destructible,
              locked: targetCellRef.obstacle.locked,
              weight: targetCellRef.obstacle.weight,
              height: targetCellRef.obstacle.height,
              items: targetCellRef.obstacle.items,
              effects: targetCellRef.obstacle.effects,
              moving: targetCellRef.obstacle.moving,
            };
          }

          // DROP OBSTACLE ITEMS?
          if (itemsToDrop[0]) {
            app.obstacleItemDrop(targetCellRef, undefined);
          }

          app.obstacleBarrierToDestroy.push({
            type: "obstacle",
            action: "destroy",
            count: 0,
            limit: 30,
            complete: false,
            cell: targetCellRef,
          });

          if (!app.cellPopups.find((x) => x.msg === "destroyedItem")) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: 35,
              type: "",
              position: "",
              msg: "destroyedItem",
              img: "",
              cell: targetCellRef,
            });
          }
        }
      } else {
        moveObstacle = true;
      }
    }

    if (moveObstacle === true) {
      if (args === "impactee") {
        shouldMoveImpactee = true;
      }
    }
  };

  let damageBarrier = (args, myCell) => {
    let damage = 1;
    if (app.rnJesus(1, 2) === 1) {
      damage = app.rnJesus(1, 2);
    }

    if (myCell === true) {
      if (myCellRef.barrier.destructible.state === true) {
        if (myCellRef.barrier.hp - damage > 0) {
          let hp = myCellRef.barrier.hp - damage;

          myCellRef.barrier = {
            state: myCellRef.barrier.state,
            name: myCellRef.barrier.name,
            type: myCellRef.barrier.type,
            hp: hp,
            destructible: myCellRef.barrier.destructible,
            locked: myCellRef.barrier.locked,
            position: myCellRef.barrier.position,
            height: myCellRef.barrier.height,
          };

          app.obstacleBarrierToDestroy.push({
            type: "barrier",
            action: "damage",
            count: 0,
            limit: 30,
            complete: false,
            cell: myCellRef,
          });
        }

        // DESTROY FWD BARRIER W/ OR W/O RUBBLE
        else if (myCellRef.barrier.hp - damage <= 0) {
          if (myCellRef.barrier.destructible.leaveRubble === true && myCellRef.obstacle.state !== true && myCellRef.item.name === "") {
            myCellRef.rubble = true;

            myCellRef.barrier = {
              state: false,
              name: myCellRef.barrier.name,
              type: myCellRef.barrier.type,
              hp: 0,
              destructible: myCellRef.barrier.destructible,
              locked: myCellRef.barrier.locked,
              position: myCellRef.barrier.position,
              height: myCellRef.barrier.height,
            };

            if (
              !app.cellPopups.find(
                (x) => x.msg === "destroyedItem" && x.cell.number.x === myCellRef.number.x && x.cell.number.y === myCellRef.number.y,
              )
            ) {
              app.cellPopups.push({
                state: false,
                count: 0,
                limit: 35,
                type: "",
                position: "",
                msg: "destroyedItem",
                img: "",
                cell: myCellRef,
              });
            }
          } else {
            // console.log('no rubble. Just remove barrier');

            myCellRef.barrier = {
              state: false,
              name: myCellRef.barrier.name,
              type: myCellRef.barrier.type,
              hp: 0,
              destructible: myCellRef.barrier.destructible,
              locked: myCellRef.barrier.locked,
              position: myCellRef.barrier.position,
              height: myCellRef.barrier.height,
            };

            if (
              !app.cellPopups.find(
                (x) => x.msg === "destroyedItem" && x.cell.number.x === myCellRef.number.x && x.cell.number.y === myCellRef.number.y,
              )
            ) {
              app.cellPopups.push({
                state: false,
                count: 0,
                limit: 35,
                type: "",
                position: "",
                msg: "destroyedItem",
                img: "",
                cell: myCellRef,
              });
            }
          }

          app.obstacleBarrierToDestroy.push({
            type: "barrier",
            action: "destroy",
            count: 0,
            limit: 30,
            complete: false,
            cell: myCellRef,
          });
        }
      }
    } else {
      if (targetCellRef.barrier.position === app.getOppositeDirection(direction)) {
        if (targetCellRef.barrier.destructible.state === true) {
          if (targetCellRef.barrier.hp - damage > 0) {
            let hp = targetCellRef.barrier.hp - damage;

            targetCellRef.barrier = {
              state: targetCellRef.barrier.state,
              name: targetCellRef.barrier.name,
              type: targetCellRef.barrier.type,
              hp: hp,
              destructible: targetCellRef.barrier.destructible,
              locked: targetCellRef.barrier.locked,
              position: targetCellRef.barrier.position,
              height: targetCellRef.barrier.height,
            };

            app.obstacleBarrierToDestroy.push({
              type: "barrier",
              action: "damage",
              count: 0,
              limit: 30,
              complete: false,
              cell: targetCellRef,
            });
          }

          // DESTROY FWD BARRIER W/ OR W/O RUBBLE
          else if (targetCellRef.barrier.hp - damage <= 0) {
            if (targetCellRef.barrier.destructible.leaveRubble === true && targetCellRef.obstacle.state !== true && targetCellRef.item.name === "") {
              targetCellRef.rubble = true;

              targetCellRef.barrier = {
                state: false,
                name: targetCellRef.barrier.name,
                type: targetCellRef.barrier.type,
                hp: 0,
                destructible: targetCellRef.barrier.destructible,
                locked: targetCellRef.barrier.locked,
                position: targetCellRef.barrier.position,
                height: targetCellRef.barrier.height,
              };

              if (
                !app.cellPopups.find(
                  (x) => x.msg === "destroyedItem" && x.cell.number.x === targetCellRef.number.x && x.cell.number.y === targetCellRef.number.y,
                )
              ) {
                app.cellPopups.push({
                  state: false,
                  count: 0,
                  limit: 35,
                  type: "",
                  position: "",
                  msg: "destroyedItem",
                  img: "",
                  cell: targetCellRef,
                });
              }
            } else {
              // console.log('no rubble. Just remove barrier');

              targetCellRef.barrier = {
                state: false,
                name: targetCellRef.barrier.name,
                type: targetCellRef.barrier.type,
                hp: 0,
                destructible: targetCellRef.barrier.destructible,
                locked: targetCellRef.barrier.locked,
                position: targetCellRef.barrier.position,
                height: targetCellRef.barrier.height,
              };

              if (
                !app.cellPopups.find(
                  (x) => x.msg === "destroyedItem" && x.cell.number.x === targetCellRef.number.x && x.cell.number.y === targetCellRef.number.y,
                )
              ) {
                app.cellPopups.push({
                  state: false,
                  count: 0,
                  limit: 35,
                  type: "",
                  position: "",
                  msg: "destroyedItem",
                  img: "",
                  cell: targetCellRef,
                });
              }
            }

            app.obstacleBarrierToDestroy.push({
              type: "barrier",
              action: "destroy",
              count: 0,
              limit: 30,
              complete: false,
              cell: targetCellRef,
            });
          }
        }
      }
    }
  };

  // PLAYER HALF PUSHED BACK
  if (type === "player") {
    direction = data.halfPushBack.direction;
    targetCellNumber = app.getCellFromDirection(1, data.currentPosition.cell.number, data.halfPushBack.direction);
    targetCellRef = app.gridInfo.find((x) => x.number.x === targetCellNumber.x && x.number.y === targetCellNumber.y);
    myCellRef = app.gridInfo.find((x) => x.number.x === data.currentPosition.cell.number.x && x.number.y === data.currentPosition.cell.number.y);
    impactee = data.halfPushBack.type;
    shouldDamageImpactor = app.rnJesus(1, data.crits.guardBreak) === 1;
    shouldDeflectImpactor = app.rnJesus(1, data.crits.guardBreak) === 1;

    switch (impactee) {
      case "obstacle":
        // IMPACTOR DAMAGE, DEFLECT?
        if (shouldDamageImpactor === true) {
          app.handleMiscPlayerDamage(data, "halfPushBackImpactor_" + impactee + "");
        }

        if (shouldDeflectImpactor === true) {
          app.setDeflection(data, "attacked", false);
        }

        // IMPACTEE DAMAGE?
        shouldDamageImpactee = app.rnJesus(1, targetCellRef.obstacle.height + targetCellRef.obstacle.weight + targetCellRef.obstacle.hp) === 1;
        if (shouldDamageImpactee === true) {
          damageObstacle("impactee");
        }

        if (app.halfPushBackChainingMoveAll === true) {
          moveObstacle = true;
        }

        break;
      case "player":
        // IMPACTOR DAMAGE, DEFLECT?
        if (shouldDamageImpactor === true) {
          app.handleMiscPlayerDamage(data, "halfPushBackImpactor_" + impactee + "");
        }

        if (shouldDeflectImpactor === true) {
          app.setDeflection(data, "attacked", false);
        }

        // IMPACTEE DAMAGE, DEFLECT/ PUSHBACK + DEFLECT?
        impacteePlayerRef = app.players.find(
          (x) => x.currentPosition.cell.number.x === targetCellRef.number.x && x.currentPosition.cell.number.y === targetCellRef.number.y,
        );
        shouldDamageImpactee = app.rnJesus(1, impacteePlayerRef.crits.guardBreak) === 1;

        if (shouldDamageImpactee === true) {
          app.handleMiscPlayerDamage(impacteePlayerRef, "halfPushBackImpactee_" + impactor + "");
        }

        shouldDeflectImpactee = app.rnJesus(1, impacteePlayerRef.crits.guardBreak) === 1;

        if (app.halfPushBackChainingMoveAll === true) {
          if (impacteePlayerRef.direction === direction) {
            movePlayer = true;
          } else {
            app.setDeflection(impacteePlayerRef, "attacked", true);
          }
        } else {
          if (shouldDeflectImpactee === true) {
            if (app.rnJesus(1, impacteePlayerRef.crits.pushBack) === 1) {
              app.setDeflection(impacteePlayerRef, "attacked", false);
            } else {
              if (impacteePlayerRef.direction === direction) {
                movePlayer = true;
              } else {
                app.setDeflection(impacteePlayerRef, "attacked", true);
              }
            }
          }
        }

        // if (impacteePlayerRef.direction === direction) {
        //   movePlayer = true;
        // }
        //
        // else {
        //   app.setDeflection(impacteePlayerRef,'attacked',true);
        // }

        break;
      case "barrier":
        // IMPACTOR DAMAGE, DEFLECT?
        if (shouldDamageImpactor === true) {
          app.handleMiscPlayerDamage(data, "halfPushBackImpactor_" + impactee + "");
        }

        if (shouldDeflectImpactor === true) {
          app.setDeflection(data, "attacked", false);
        }

        // IMPACTEE DAMAGE?
        let myCell = false;
        if (myCellRef.barrier.state === true && myCellRef.barrier.position === data.halfPushBack.direction) {
          myCell = true;
          shouldDamageImpactee = app.rnJesus(1, myCellRef.barrier.height + myCellRef.barrier.hp) === 1;
        } else {
          shouldDamageImpactee = app.rnJesus(1, targetCellRef.barrier.height + targetCellRef.barrier.hp) === 1;
        }

        if (shouldDamageImpactee === true) {
          damageBarrier("impactee", myCell);
        }

        break;
      case "higherElevation":
        // DAMAGE, DEFLECT IMPACTOR?
        if (shouldDamageImpactor === true) {
          app.handleMiscPlayerDamage(data, "halfPushBackImpactor_" + impactee + "");
        }

        if (shouldDeflectImpactor === true) {
          app.setDeflection(data, "attacked", false);
        }

        break;
      default:
    }
  }

  // OBSTACLE HALF PUSHED BACK
  if (type === "obstacle") {
    direction = data.direction;
    targetCellRef = app.gridInfo.find((x) => x.number.x === data.blockCellNo.x && x.number.y === data.blockCellNo.y);
    myCellRef = app.gridInfo.find((x) => x.number.x === data.myCellNo.x && x.number.y === data.myCellNo.y);
    impactee = data.blockType;
    shouldDamageImpactor = app.rnJesus(1, data.obstacle.height + data.obstacle.weight + data.obstacle.hp) === 1;

    switch (impactee) {
      case "obstacle":
        // IMPACTOR
        if (shouldDamageImpactor === true) {
          damageObstacle("impactor");
        }

        // IMPACTEE
        shouldDamageImpactee = app.rnJesus(1, targetCellRef.obstacle.height + targetCellRef.obstacle.weight) === 1;
        if (shouldDamageImpactee === true) {
          damageObstacle("impactee");
        }

        if (app.halfPushBackChainingMoveAll === true) {
          moveObstacle = true;
        }

        break;
      case "player":
        // IMPACTOR
        if (shouldDamageImpactor === true) {
          damageObstacle("impactor");
        }

        // IMPACTEE
        impacteePlayerRef = app.players.find(
          (x) => x.currentPosition.cell.number.x === targetCellRef.number.x && x.currentPosition.cell.number.y === targetCellRef.number.y,
        );
        shouldDamageImpactee = app.rnJesus(1, impacteePlayerRef.crits.guardBreak) === 1;

        if (shouldDamageImpactee === true) {
          app.handleMiscPlayerDamage(impacteePlayerRef, "halfPushBackImpactee_" + impactor + "");
        }

        shouldDeflectImpactee = app.rnJesus(1, impacteePlayerRef.crits.guardBreak) === 1;

        if (app.halfPushBackChainingMoveAll === true) {
          if (impacteePlayerRef.direction === direction) {
            movePlayer = true;
          } else {
            app.setDeflection(impacteePlayerRef, "attacked", true);
          }
        } else {
          if (shouldDeflectImpactee === true) {
            if (app.rnJesus(1, impacteePlayerRef.crits.pushBack) === 1) {
              app.setDeflection(impacteePlayerRef, "attacked", false);
            } else {
              if (impacteePlayerRef.direction === direction) {
                movePlayer = true;
              } else {
                app.setDeflection(impacteePlayerRef, "attacked", true);
              }
            }
          }
        }

        break;
      case "barrier":
        // IMPACTOR
        if (shouldDamageImpactor === true) {
          damageObstacle("impactor");
        }

        // IMPACTEE
        let myCell = false;
        if (myCellRef.barrier.state === true && myCellRef.barrier.position === data.direction) {
          myCell = true;
          shouldDamageImpactee = app.rnJesus(1, myCellRef.barrier.height + myCellRef.barrier.hp) === 1;
        } else {
          shouldDamageImpactee = app.rnJesus(1, targetCellRef.barrier.height + targetCellRef.barrier.hp) === 1;
        }

        if (shouldDamageImpactee === true) {
          damageBarrier("impactee", myCell);
        }

        break;
      case "higherElevation":
        if (shouldDamageImpactor === true) {
          damageObstacle("impactor");
        }

        break;
      default:
    }
  }

  // moveObstacle = true;
  // impactee = "obstacle";

  if (moveObstacle === true && impactee === "obstacle") {
    let destCell = app.getCellFromDirection(1, targetCellRef.number, direction);
    let destCellRef = app.gridInfo.find((x) => x.number.x === destCell.x && x.number.y === destCell.y);
    let destCellOccupant = "";
    let preMoveSpeed = app.rnJesus(0, 5);
    let moveSpeed = 0;
    if (preMoveSpeed <= 1) {
      moveSpeed = 0.05;
    }
    if (preMoveSpeed === 2) {
      moveSpeed = 0.1;
    }
    if (preMoveSpeed > 2 && preMoveSpeed < 4) {
      moveSpeed = 0.125;
    }
    if (preMoveSpeed >= 4) {
      moveSpeed = 0.2;
    }
    if (app.terrainMoveSpeedRef[targetCellRef.terrain.type]) {
      moveSpeed = app.terrainMoveSpeedRef[targetCellRef.terrain.type];
    }

    let targetFree = true;
    if (targetCellRef.barrier.state === true && targetCellRef.barrier.position === direction) {
      targetFree = false;
      if (app.halfPushBackChaining === true) {
        app.startHalfPushBack("obstacle", "barrier", direction, targetCellRef);
      }
    }
    if (destCellRef) {
      if (destCellRef.barrier.state === true && destCellRef.barrier.position === app.getOppositeDirection(direction)) {
        targetFree = false;
        if (app.halfPushBackChaining === true) {
          app.startHalfPushBack("obstacle", "barrier", direction, targetCellRef);
        }
      }

      if (destCellRef.obstacle.state === true) {
        targetFree = false;

        if (app.halfPushBackChaining === true) {
          app.startHalfPushBack("obstacle", "obstacle", direction, targetCellRef);
        }
      }

      if (
        app.players.find((x) => x.currentPosition.cell.number.x === destCellRef.number.x && x.currentPosition.cell.number.y === destCellRef.number.y)
      ) {
        targetFree = false;

        if (app.halfPushBackChaining === true) {
          app.startHalfPushBack("obstacle", "player", direction, targetCellRef);
        }
      }
    }
    if (targetFree === true) {
      if (targetCellRef.obstacle.moving.state !== true) {
        if (destCellRef) {
          let obstacleCrementObj = app.obstacleMoveCrementer(targetCellRef, destCellRef);

          targetCellRef.obstacle = {
            id: targetCellRef.obstacle.id,
            trap: targetCellRef.obstacle.trap,
            state: targetCellRef.obstacle.state,
            name: targetCellRef.obstacle.name,
            type: targetCellRef.obstacle.type,
            hp: targetCellRef.obstacle.hp,
            destructible: targetCellRef.obstacle.destructible,
            locked: targetCellRef.obstacle.locked,
            weight: targetCellRef.obstacle.weight,
            height: targetCellRef.obstacle.height,
            items: targetCellRef.obstacle.items,
            effects: targetCellRef.obstacle.effects,
            moving: {
              state: true,
              step: obstacleCrementObj.step,
              origin: {
                number: targetCellRef.number,
                center: targetCellRef.center,
              },
              destination: {
                number: destCellRef.number,
                center: destCellRef.center,
              },
              currentPosition: targetCellRef.center,
              nextPosition: obstacleCrementObj.pos,
              moveSpeed: moveSpeed,
              pushable: true,
              pushed: true,
              pusher: -1,
              falling: targetCellRef.obstacle.moving.falling,
            },
          };
        }

        if (!destCellRef) {
          let voidCenter = app.getVoidCenter(1, direction, targetCellRef.center);

          let obstacleCrementObj = app.obstacleMoveCrementer(targetCellRef, {
            center: voidCenter,
          });

          targetCellRef.obstacle = {
            id: targetCellRef.obstacle.id,
            trap: targetCellRef.obstacle.trap,
            state: targetCellRef.obstacle.state,
            name: targetCellRef.obstacle.name,
            type: targetCellRef.obstacle.type,
            hp: targetCellRef.obstacle.hp,
            destructible: targetCellRef.obstacle.destructible,
            locked: targetCellRef.obstacle.locked,
            weight: targetCellRef.obstacle.weight,
            height: targetCellRef.obstacle.height,
            items: targetCellRef.obstacle.items,
            effects: targetCellRef.obstacle.effects,
            moving: {
              state: true,
              step: obstacleCrementObj.step,
              origin: {
                number: targetCellRef.number,
                center: targetCellRef.center,
              },
              destination: {
                number: {
                  x: undefined,
                  y: undefined,
                },
                center: voidCenter,
              },
              currentPosition: targetCellRef.center,
              nextPosition: obstacleCrementObj.pos,
              moveSpeed: moveSpeed,
              pushable: true,
              pushed: true,
              pusher: -1,
              falling: targetCellRef.obstacle.moving.falling,
            },
          };
        }
      } else {
        console.log("obstacle already being 1/2 pushed back!!");
      }
    }
  }

  if (movePlayer === true && impactee === "player") {
    let destCell = app.getCellFromDirection(1, targetCellRef.number, direction);
    let destCellRef = app.gridInfo.find((x) => x.number.x === destCell.x && x.number.y === destCell.y);
    let destCellOccupant = "";
    let preMoveSpeed = app.rnJesus(0, 5);
    let moveSpeed = 0;
    if (preMoveSpeed <= 1) {
      moveSpeed = 0.05;
    }
    if (preMoveSpeed === 2) {
      moveSpeed = 0.1;
    }
    if (preMoveSpeed > 2 && preMoveSpeed < 4) {
      moveSpeed = 0.125;
    }
    if (preMoveSpeed >= 4) {
      moveSpeed = 0.2;
    }
    if (app.terrainMoveSpeedRef[targetCellRef.terrain.type]) {
      moveSpeed = app.terrainMoveSpeedRef[targetCellRef.terrain.type];
    }

    let targetFree = true;
    if (targetCellRef.barrier.state === true && targetCellRef.barrier.position === direction) {
      targetFree = false;
    }
    if (destCellRef) {
      if (destCellRef.barrier.state === true && destCellRef.barrier.position === app.getOppositeDirection(direction)) {
        targetFree = false;
      }

      if (destCellRef.obstacle.state === true) {
        targetFree = false;
        if (app.halfPushBackChaining === true) {
          app.startHalfPushBack("player", "obstacle", direction, impacteePlayerRef);
        }
      }

      if (
        app.players.find((x) => x.currentPosition.cell.number.x === destCellRef.number.x && x.currentPosition.cell.number.y === destCellRef.number.y)
      ) {
        targetFree = false;

        if (app.halfPushBackChaining === true) {
          app.startHalfPushBack("player", "player", direction, impacteePlayerRef);
        }
      }
    }

    if (targetFree === true) {
      if (app.players[impacteePlayerRef.number - 1].moving.state !== true) {
        // app.players[targetPlayer.number-1].strafing.direction = impactDirection;
        // app.players[targetPlayer.number-1].strafing.state = true;
        // app.players[targetPlayer.number-1].action = 'strafe moving';
        app.players[impacteePlayerRef.number - 1].action = "moving";

        app.unsetDeflection(impacteePlayerRef);

        app.players[impacteePlayerRef.number - 1].pushed = {
          state: true,
          pusher: -1,
          moveSpeed: moveSpeed,
        };
        app.getTarget(impacteePlayerRef);

        if (destCellRef) {
          app.players[impacteePlayerRef.number - 1].moving = {
            state: true,
            step: 0,
            course: "",
            origin: {
              number: {
                x: impacteePlayerRef.currentPosition.cell.number.x,
                y: impacteePlayerRef.currentPosition.cell.number.y,
              },
              center: {
                x: impacteePlayerRef.currentPosition.cell.center,
                y: impacteePlayerRef.currentPosition.cell.center,
              },
            },
            destination: destCellRef.center,
          };
          let targetPlyrNextPosition = app.lineCrementer(impacteePlayerRef);
          app.players[impacteePlayerRef.number - 1].nextPosition = targetPlyrNextPosition;
        }

        if (!destCellRef) {
          let voidCenter = app.getVoidCenter(1, direction, targetCellRef.center);

          app.players[impacteePlayerRef.number - 1].moving = {
            state: true,
            step: 0,
            course: "",
            origin: {
              number: {
                x: impacteePlayerRef.currentPosition.cell.number.x,
                y: impacteePlayerRef.currentPosition.cell.number.y,
              },
              center: {
                x: impacteePlayerRef.currentPosition.cell.center,
                y: impacteePlayerRef.currentPosition.cell.center,
              },
            },
            destination: voidCenter,
          };
          let targetPlyrNextPosition = app.lineCrementer(impacteePlayerRef);
          app.players[impacteePlayerRef.number - 1].nextPosition = targetPlyrNextPosition;
        }
      } else {
        console.log("player is already being pushed back!!");
      }
    }
  }
}
