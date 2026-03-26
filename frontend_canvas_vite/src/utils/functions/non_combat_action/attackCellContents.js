export function attackCellContents(app, type, ownerType, owner, targetCell, targetCell2, myCell, bolt) {
  const stackLine = new Error().stack?.split("\n")[2]?.trim();

  console.log("attackCellContents", {
    type,
    ownerType,
    owner,
    targetCell,
    targetCell2,
    myCell,
    bolt,
    // stack: stackLine,
  });

  let damage;
  let weaponCheck;
  let ownerWeaponName;
  let ownerWeaponType;
  let ownerDirection;
  let ownerAttackCharge = 0;

  const handleObstacleDamage = (calcedDamage, range) => {
    targetCell.obstacle = app.trapActionCancel(targetCell.obstacle);
    if (range === 1) {
      if (targetCell.obstacle.destructible.state === true) {
        // WEAPON CHECK
        if (ownerType === "player") {
          ownerWeaponName = owner.currentWeapon.name;
        } else {
          ownerWeaponName = owner.trap.itemNameRef;
        }
        if (type === "bolt" || type === "flyOverBolt") {
          if (targetCell.obstacle.destructible.weapons.find((x) => x === "bolt")) {
            weaponCheck = true;
          }
        }
        if (type === "melee" && targetCell.obstacle.destructible.weapons.find((x) => x === ownerWeaponName)) {
          weaponCheck = true;
        }
        if (weaponCheck === true) {
          // DAMAGE, DON'T DESTROY FWD OBSTACLE
          if (targetCell.obstacle.hp - calcedDamage > 0) {
            console.log(
              ownerType,
              owner.number,
              owner.id,
              "hit an obstacle ",
              targetCell.obstacle.id,
              "w/ a",
              ownerWeaponType,
              "@ ",
              targetCell.number,
              "and damaged it.",
            );
            let hp = targetCell.obstacle.hp - calcedDamage;

            targetCell.obstacle = {
              id: targetCell.obstacle.id,
              trap: targetCell.obstacle.trap,
              state: targetCell.obstacle.state,
              name: targetCell.obstacle.name,
              type: targetCell.obstacle.type,
              hp: hp,
              destructible: targetCell.obstacle.destructible,
              locked: targetCell.obstacle.locked,
              weight: targetCell.obstacle.weight,
              height: targetCell.obstacle.height,
              items: targetCell.obstacle.items,
              effects: targetCell.obstacle.effects,
              moving: targetCell.obstacle.moving,
            };

            app.obstacleBarrierToDestroy.push({
              type: "obstacle",
              action: "damage",
              count: 0,
              limit: 30,
              complete: false,
              cell: targetCell,
            });

            // if (type === "bolt" || type === "flyOverBolt") {
            //   app.canPushObstacle(ownerType, owner, targetCell, `hitPushBolt_${bolt.direction}`);
            // }
            // if (type === "melee") {
            //   app.canPushObstacle(ownerType, owner, targetCell, `hitPush`);
            // }
          }

          // DESTROY OBSTACLE W/ OR W/O RUBBLE
          else if (targetCell.obstacle.hp - calcedDamage <= 0) {
            console.log(
              ownerType,
              owner.number,
              owner.id,
              "hit an obstacle ",
              targetCell.obstacle.id,
              "w/ a",
              ownerWeaponType,
              "@ ",
              targetCell.number,
              "and destroyed it. Drop items, leave rubble?",
            );
            let itemsToDrop = [];
            if (targetCell.obstacle.destructible.leaveRubble === true && targetCell.terrain.type !== "void" && targetCell.terrain.type !== "deep") {
              // console.log('leave rubble on ',targetCell.number,'removing obstacle');
              if (targetCell.obstacle.items[0]) {
                itemsToDrop = targetCell.obstacle.items;
              }
              // let cellRef = app.gridInfo.find(elem => elem.number.x === targetCell.number.x && elem.number.y === targetCell.number.y);
              targetCell.rubble = true;
              // targetCell.terrain.type = 'hazard';

              targetCell.obstacle = {
                id: targetCell.obstacle.id,
                trap: targetCell.obstacle.trap,
                state: false,
                name: targetCell.obstacle.name,
                type: targetCell.obstacle.type,
                hp: 0,
                destructible: targetCell.obstacle.destructible,
                locked: targetCell.obstacle.locked,
                weight: targetCell.obstacle.weight,
                height: targetCell.obstacle.height,
                items: targetCell.obstacle.items,
                effects: targetCell.obstacle.effects,
                moving: targetCell.obstacle.moving,
              };

              if (ownerType === "player") {
                app.players[owner.number - 1].statusDisplay = {
                  state: true,
                  status: "Destroyed " + targetCell.obstacle.name + "!",
                  count: 1,
                  limit: app.players[owner.number - 1].statusDisplay.limit,
                };

                if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                  owner.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "destroyedItem",
                    img: "",
                  });
                }
              }
            } else {
              // console.log('no rubble. Just remove obstacle');
              if (targetCell.obstacle.items[0]) {
                itemsToDrop = targetCell.obstacle.items;
              }

              targetCell.obstacle = {
                id: targetCell.obstacle.id,
                trap: targetCell.obstacle.trap,
                state: false,
                name: targetCell.obstacle.name,
                type: targetCell.obstacle.type,
                hp: 0,
                destructible: targetCell.obstacle.destructible,
                locked: targetCell.obstacle.locked,
                weight: targetCell.obstacle.weight,
                height: targetCell.obstacle.height,
                items: targetCell.obstacle.items,
                effects: targetCell.obstacle.effects,
                moving: targetCell.obstacle.moving,
              };

              if (ownerType === "player") {
                app.players[owner.number - 1].statusDisplay = {
                  state: true,
                  status: "Destroyed " + targetCell.obstacle.name + "!",
                  count: 1,
                  limit: app.players[owner.number - 1].statusDisplay.limit,
                };

                if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                  owner.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "destroyedItem",
                    img: "",
                  });
                }
              }
            }

            // DROP OBSTACLE ITEMS?
            if (itemsToDrop[0]) {
              // console.log('dropping obstacle items bolt',itemsToDrop);

              app.obstacleItemDrop(targetCell, owner);
            }
            app.obstacleBarrierToDestroy.push({
              type: "obstacle",
              action: "destroy",
              count: 0,
              limit: 30,
              complete: false,
              cell: targetCell,
            });
          }
        }

        // WEAPON NO GOOD. PUSH OBSTACLE?
        else {
          // console.log(
          //   "your current weapon cannot destroy app, you need ",
          //   targetCell.obstacle.destructible.weapons,
          //   ". Deflect player?"
          // );
          if (
            !app.cellPopups.find((x) => x.msg === "unbreakable" && x.cell.number.x === targetCell.number.x && x.cell.number.y === targetCell.number.y)
          ) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: 35,
              type: "",
              position: "",
              msg: "unbreakable",
              color: "",
              img: "",
              cell: app.gridInfo.find((x) => x.number.x === targetCell.number.x && x.number.y === targetCell.number.y),
            });
          }
          console.log(
            ownerType,
            owner.number,
            owner.id,
            "hit an obstacle ",
            targetCell.obstacle.id,
            "w/ a",
            ownerWeaponType,
            "@ ",
            targetCell.number,
            " but their current weapon cannot destroy app, they need",
            targetCell.obstacle.destructible.weapons,
            ". pushback obstacle. Deflect, pushback attacker?",
          );

          if (app.rnJesus(0, 2) === 1) {
            if (type === "bolt" || type === "flyOverBolt") {
              app.canPushObstacle(ownerType, owner, targetCell, `hitPushBolt_${bolt.direction}`);
            }
            if (type === "melee") {
              app.canPushObstacle(ownerType, owner, targetCell, `hitPush`);
            }
          }

          // DEFLECT PLAYER
          if (type === "melee" && ownerType === "player") {
            let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

            if (shouldDeflect === 1) {
              if (app.rnJesus(1, owner.crits.pushBack) === 1) {
                app.setDeflection(owner, "defended", true);
              } else {
                app.setDeflection(owner, "defended", false);
              }

              if (owner.currentWeapon.name === "") {
                console.log("app obstacle is stronger than your fist. Take damage?");
                let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
                if (takeDamage === 1) {
                  app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
                }
              }
            } else {
              app.pushBack(owner, app.getOppositeDirection(owner.direction));
            }
          }
        }
      }
      // INDESTRUCTIBLE OBSTACLE. PUSH OBSTACLE?
      else {
        // console.log('attacking invurnerable obstacle w/ bolt');
        console.log(
          ownerType,
          owner.number,
          owner.id,
          "hit an obstacle ",
          targetCell.obstacle.id,
          "w/ a",
          ownerWeaponType,
          "@ ",
          targetCell.number,
          " but it is indestructible. pushback obstacle. Deflect, pushback attacker?",
        );
        if (
          !app.cellPopups.find((x) => x.msg === "unbreakable" && x.cell.number.x === targetCell.number.x && x.cell.number.y === targetCell.number.y)
        ) {
          app.cellPopups.push({
            state: false,
            count: 0,
            limit: 35,
            type: "",
            position: "",
            msg: "unbreakable",
            color: "",
            img: "",
            cell: app.gridInfo.find((x) => x.number.x === targetCell.number.x && x.number.y === targetCell.number.y),
          });
        }
        if (type === "bolt" || type === "flyOverBolt") {
          app.canPushObstacle(ownerType, owner, targetCell, `hitPushBolt_${bolt.direction}`);
        }
        if (type === "melee") {
          app.canPushObstacle(ownerType, owner, targetCell, `hitPush`);
        }

        if (type === "melee" && ownerType === "player") {
          let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

          if (shouldDeflect === 1) {
            if (app.rnJesus(1, owner.crits.pushBack) === 1) {
              app.setDeflection(owner, "defended", true);
            } else {
              app.setDeflection(owner, "defended", false);
            }

            if (owner.currentWeapon.name === "") {
              console.log("app obstacle is stronger than your fist. Take damage?");
              let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
              if (takeDamage === 1) {
                app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
              }
            }
          } else {
            app.pushBack(owner, app.getOppositeDirection(owner.direction));
          }
        }
      }
    } else {
      if (targetCell2.obstacle.destructible.state === true) {
        // WEAPON CHECK
        if (ownerType === "player") {
          ownerWeaponName = owner.currentWeapon.name;
        } else {
          ownerWeaponName = owner.trap.itemNameRef;
        }
        if (type === "bolt" || type === "flyOverBolt") {
          if (targetCell2.obstacle.destructible.weapons.find((x) => x === "bolt")) {
            weaponCheck = true;
          }
        }
        if (type === "melee" && targetCell2.obstacle.destructible.weapons.find((x) => x === ownerWeaponName)) {
          weaponCheck = true;
        }
        if (weaponCheck === true) {
          // DAMAGE, DON'T DESTROY FWD OBSTACLE
          if (targetCell2.obstacle.hp - calcedDamage > 0) {
            console.log(
              ownerType,
              owner.number,
              owner.id,
              "hit an obstacle ",
              targetCell2.obstacle.id,
              "w/ a",
              ownerWeaponType,
              "@ ",
              targetCell2.number,
              "and damaged it.",
            );
            let hp = targetCell2.obstacle.hp - calcedDamage;

            targetCell2.obstacle = {
              id: targetCell2.obstacle.id,
              trap: targetCell2.obstacle.trap,
              state: targetCell2.obstacle.state,
              name: targetCell2.obstacle.name,
              type: targetCell2.obstacle.type,
              hp: hp,
              destructible: targetCell2.obstacle.destructible,
              locked: targetCell2.obstacle.locked,
              weight: targetCell2.obstacle.weight,
              height: targetCell2.obstacle.height,
              items: targetCell2.obstacle.items,
              effects: targetCell2.obstacle.effects,
              moving: targetCell2.obstacle.moving,
            };

            app.obstacleBarrierToDestroy.push({
              type: "obstacle",
              action: "damage",
              count: 0,
              limit: 30,
              complete: false,
              cell: targetCell2,
            });

            if (type === "bolt" || type === "flyOverBolt") {
              app.canPushObstacle(ownerType, owner, targetCell2, `hitPushBolt_${bolt.direction}`);
            }
            if (type === "melee") {
              app.canPushObstacle(ownerType, owner, targetCell2, `hitPush`);
            }
          }

          // DESTROY OBSTACLE W/ OR W/O RUBBLE
          else if (targetCell2.obstacle.hp - calcedDamage <= 0) {
            console.log(
              ownerType,
              owner.number,
              owner.id,
              "hit an obstacle ",
              targetCell2.obstacle.id,
              "w/ a",
              ownerWeaponType,
              "@ ",
              targetCell2.number,
              "and destroyed it. Drop items, leave rubble?",
            );
            let itemsToDrop = [];
            if (
              targetCell2.obstacle.destructible.leaveRubble === true &&
              targetCell2.terrain.type !== "void" &&
              targetCell2.terrain.type !== "deep"
            ) {
              // console.log('leave rubble on ',targetCell2.number,'removing obstacle');
              if (targetCell2.obstacle.items[0]) {
                itemsToDrop = targetCell2.obstacle.items;
              }
              // let cellRef = app.gridInfo.find(elem => elem.number.x === targetCell2.number.x && elem.number.y === targetCell2.number.y);
              targetCell2.rubble = true;
              // targetCell2.terrain.type = 'hazard';

              targetCell2.obstacle = {
                id: targetCell2.obstacle.id,
                trap: targetCell2.obstacle.trap,
                state: false,
                name: targetCell2.obstacle.name,
                type: targetCell2.obstacle.type,
                hp: 0,
                destructible: targetCell2.obstacle.destructible,
                locked: targetCell2.obstacle.locked,
                weight: targetCell2.obstacle.weight,
                height: targetCell2.obstacle.height,
                items: targetCell2.obstacle.items,
                effects: targetCell2.obstacle.effects,
                moving: targetCell2.obstacle.moving,
              };

              if (ownerType === "player") {
                app.players[owner.number - 1].statusDisplay = {
                  state: true,
                  status: "Destroyed " + targetCell2.obstacle.name + "!",
                  count: 1,
                  limit: app.players[owner.number - 1].statusDisplay.limit,
                };

                if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                  owner.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "destroyedItem",
                    img: "",
                  });
                }
              }
            } else {
              // console.log('no rubble. Just remove obstacle');
              if (targetCell2.obstacle.items[0]) {
                itemsToDrop = targetCell2.obstacle.items;
              }

              targetCell2.obstacle = {
                id: targetCell2.obstacle.id,
                trap: targetCell2.obstacle.trap,
                state: false,
                name: targetCell2.obstacle.name,
                type: targetCell2.obstacle.type,
                hp: 0,
                destructible: targetCell2.obstacle.destructible,
                locked: targetCell2.obstacle.locked,
                weight: targetCell2.obstacle.weight,
                height: targetCell2.obstacle.height,
                items: targetCell2.obstacle.items,
                effects: targetCell2.obstacle.effects,
                moving: targetCell2.obstacle.moving,
              };

              if (ownerType === "player") {
                app.players[owner.number - 1].statusDisplay = {
                  state: true,
                  status: "Destroyed " + targetCell2.obstacle.name + "!",
                  count: 1,
                  limit: app.players[owner.number - 1].statusDisplay.limit,
                };

                if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                  owner.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "destroyedItem",
                    img: "",
                  });
                }
              }
            }

            // DROP OBSTACLE ITEMS?
            if (itemsToDrop[0]) {
              // console.log('dropping obstacle items bolt',itemsToDrop);

              app.obstacleItemDrop(targetCell2, owner);
            }
            app.obstacleBarrierToDestroy.push({
              type: "obstacle",
              action: "destroy",
              count: 0,
              limit: 30,
              complete: false,
              cell: targetCell2,
            });
          }
        }

        // WEAPON NO GOOD. PUSH OBSTACLE?
        else {
          // console.log(
          //   "your current weapon cannot destroy app, you need ",
          //   targetCell2.obstacle.destructible.weapons,
          //   ". Deflect player?"
          // );
          console.log(
            ownerType,
            owner.number,
            owner.id,
            "hit an obstacle ",
            targetCell2.obstacle.id,
            "w/ a",
            ownerWeaponType,
            "@ ",
            targetCell2.number,
            " but their current weapon cannot destroy app, they need",
            targetCell2.obstacle.destructible.weapons,
            ". pushback obstacle. Deflect attacker?",
          );
          if (
            !app.cellPopups.find(
              (x) => x.msg === "unbreakable" && x.cell.number.x === targetCell2.number.x && x.cell.number.y === targetCell2.number.y,
            )
          ) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: 35,
              type: "",
              position: "",
              msg: "unbreakable",
              color: "",
              img: "",
              cell: app.gridInfo.find((x) => x.number.x === targetCell2.number.x && x.number.y === targetCell2.number.y),
            });
          }

          if (app.rnJesus(0, 2) === 1) {
            if (type === "bolt" || type === "flyOverBolt") {
              app.canPushObstacle(ownerType, owner, targetCell2, `hitPushBolt_${bolt.direction}`);
            }
            if (type === "melee") {
              app.canPushObstacle(ownerType, owner, targetCell2, `hitPush`);
            }
          }

          // DEFLECT PLAYER
          if (type === "melee" && ownerType === "player") {
            let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

            if (shouldDeflect === 1) {
              if (app.rnJesus(1, owner.crits.pushBack) === 1) {
                app.setDeflection(owner, "defended", true);
              } else {
                app.setDeflection(owner, "defended", false);
              }

              if (owner.currentWeapon.name === "") {
                console.log("app obstacle is stronger than your fist. Take damage?");
                let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
                if (takeDamage === 1) {
                  app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
                }
              }
            } else {
              app.pushBack(owner, app.getOppositeDirection(owner.direction));
            }
          }
        }
      }
      // INDESTRUCTIBLE OBSTACLE. PUSH OBSTACLE?
      else {
        // console.log('attacking invurnerable obstacle w/ bolt');
        console.log(
          ownerType,
          owner.number,
          owner.id,
          "hit an obstacle ",
          targetCell2.obstacle.id,
          "w/ a",
          ownerWeaponType,
          "@ ",
          targetCell2.number,
          " but it is indestructible. pushback obstacle. Deflect, pushback attacker?",
        );
        if (
          !app.cellPopups.find((x) => x.msg === "unbreakable" && x.cell.number.x === targetCell2.number.x && x.cell.number.y === targetCell2.number.y)
        ) {
          app.cellPopups.push({
            state: false,
            count: 0,
            limit: 35,
            type: "",
            position: "",
            msg: "unbreakable",
            color: "",
            img: "",
            cell: app.gridInfo.find((x) => x.number.x === targetCell2.number.x && x.number.y === targetCell2.number.y),
          });
        }
        if (type === "bolt" || type === "flyOverBolt") {
          app.canPushObstacle(ownerType, owner, targetCell2, `hitPushBolt_${bolt.direction}`);
        }
        if (type === "melee") {
          app.canPushObstacle(ownerType, owner, targetCell2, `hitPush`);
        }

        if (type === "melee" && ownerType === "player") {
          let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

          if (shouldDeflect === 1) {
            if (app.rnJesus(1, owner.crits.pushBack) === 1) {
              app.setDeflection(owner, "defended", true);
            } else {
              app.setDeflection(owner, "defended", false);
            }

            if (owner.currentWeapon.name === "") {
              console.log("app obstacle is stronger than your fist. Take damage?");
              let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
              if (takeDamage === 1) {
                app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
              }
            }
          } else {
            app.pushBack(owner, app.getOppositeDirection(owner.direction));
          }
        }
      }
    }

    if (type === "bolt" || type === "flyOverBolt") {
      app.projectiles.find((blt) => blt.id === bolt.id).kill = true;
    }
  };
  const handleBarrierDamage = (barrierType, calcedDamage, range) => {
    targetCell.barrier = app.trapActionCancel(targetCell.barrier);

    if (barrierType === "myCellBarrier") {
      if (myCell.barrier.destructible.state === true) {
        // WEAPON CHECK
        if (ownerType === "player") {
          ownerWeaponName = owner.currentWeapon.name;
        } else {
          ownerWeaponName = owner.trap.itemNameRef;
        }
        if (type === "bolt" || type === "flyOverBolt") {
          if (myCell.barrier.destructible.weapons.find((x) => x === "bolt")) {
            weaponCheck = true;
          }
        }
        if (type === "melee" && myCell.barrier.destructible.weapons.find((x) => x === ownerWeaponName)) {
          weaponCheck = true;
        }
        if (weaponCheck === true) {
          // DAMAGE, DON'T DESTROY FWD BARRIER
          if (myCell.barrier.hp - calcedDamage > 0) {
            console.log(
              ownerType,
              owner.number,
              owner.id,
              "hit a barrier ",
              myCell.barrier.id,
              "w/ a",
              ownerWeaponType,
              "@ ",
              myCell.number,
              " and damaged it.",
            );
            // app.gridInfo.find(elem => elem.number.x === myCell.number.x && elem.number.y === myCell.number.y ).barrier.hp -= calcedDamage;

            let hp = myCell.barrier.hp - calcedDamage;

            myCell.barrier = {
              id: myCell.barrier.id,
              trap: myCell.barrier.trap,
              state: myCell.barrier.state,
              name: myCell.barrier.name,
              type: myCell.barrier.type,
              hp: hp,
              destructible: myCell.barrier.destructible,
              locked: myCell.barrier.locked,
              position: myCell.barrier.position,
              height: myCell.barrier.height,
            };

            app.obstacleBarrierToDestroy.push({
              type: "barrier",
              action: "damage",
              count: 0,
              limit: 30,
              complete: false,
              cell: myCell,
            });
          }

          // DESTROY FWD BARRIER W/ OR W/O RUBBLE
          else if (myCell.barrier.hp - calcedDamage <= 0) {
            console.log(
              ownerType,
              owner.number,
              owner.id,
              "hit a barrier ",
              myCell.barrier.id,
              "w/ a",
              ownerWeaponType,
              "@ ",
              myCell.number,
              " and destroyed it. leave rubble?",
            );
            if (
              myCell.barrier.destructible.leaveRubble === true &&
              myCell.obstacle.state !== true &&
              myCell.item.name === "" &&
              myCell.terrain.type !== "void" &&
              myCell.terrain.type !== "deep"
            ) {
              // console.log("leave rubble on ", myCell.number, "removing barrier");
              myCell.rubble = true;
              // myCell.terrain.type = 'hazard';

              myCell.barrier = {
                id: myCell.barrier.id,
                trap: myCell.barrier.trap,
                state: false,
                name: myCell.barrier.name,
                type: myCell.barrier.type,
                hp: 0,
                destructible: myCell.barrier.destructible,
                locked: myCell.barrier.locked,
                position: myCell.barrier.position,
                height: myCell.barrier.height,
              };

              if (ownerType === "player") {
                app.players[owner.number - 1].statusDisplay = {
                  state: true,
                  status: "Destroyed " + myCell.barrier.name + "!",
                  count: 1,
                  limit: app.players[owner.number - 1].statusDisplay.limit,
                };

                if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                  owner.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "destroyedItem",
                    img: "",
                  });
                }
              }
            } else {
              // console.log('no rubble. Just remove barrier');
              myCell.barrier = {
                id: myCell.barrier.id,
                trap: myCell.barrier.trap,
                state: false,
                name: myCell.barrier.name,
                type: myCell.barrier.type,
                hp: 0,
                destructible: myCell.barrier.destructible,
                locked: myCell.barrier.locked,
                position: myCell.barrier.position,
                height: myCell.barrier.height,
              };

              if (ownerType === "player") {
                app.players[owner.number - 1].statusDisplay = {
                  state: true,
                  status: "Destroyed " + myCell.barrier.name + "!",
                  count: 1,
                  limit: app.players[owner.number - 1].statusDisplay.limit,
                };

                if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                  owner.popups.push({
                    state: false,
                    count: 0,
                    limit: 30,
                    type: "",
                    position: "",
                    msg: "destroyedItem",
                    img: "",
                  });
                }
              }
            }

            app.obstacleBarrierToDestroy.push({
              type: "barrier",
              action: "destroy",
              count: 0,
              limit: 30,
              complete: false,
              cell: myCell,
            });
          }
        }

        // WEAPON NO GOOD
        else {
          // console.log(
          //   "your current weapon cannot destroy app, you need ",
          //   myCell.obstacle.weapons,
          //   ". Deflect player?"
          // );
          console.log(
            ownerType,
            owner.number,
            owner.id,
            "hit an barrier ",
            myCell.barrier.id,
            "w/ a",
            ownerWeaponType,
            "@ ",
            myCell.number,
            " but their current weapon cannot destroy app, they need",
            myCell.barrier.destructible.weapons,
            ". Deflect, pushback attacker?",
          );
          if (!app.cellPopups.find((x) => x.msg === "unbreakable" && x.cell.number.x === myCell.number.x && x.cell.number.y === myCell.number.y)) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: 35,
              type: "",
              position: "",
              msg: "unbreakable",
              color: "",
              img: "",
              cell: app.gridInfo.find((x) => x.number.x === myCell.number.x && x.number.y === myCell.number.y),
            });
          }

          if (type === "melee" && ownerType === "player") {
            let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

            if (shouldDeflect === 1) {
              if (app.rnJesus(1, owner.crits.pushBack) === 1) {
                app.setDeflection(owner, "defended", true);
              } else {
                app.setDeflection(owner, "defended", false);
              }

              if (owner.currentWeapon.name === "") {
                console.log("app barrier is stronger than your fist. Take damage?");
                let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
                if (takeDamage === 1) {
                  app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
                }
              }
            } else {
              app.pushBack(owner, app.getOppositeDirection(owner.direction));
            }
          }
        }
      }

      // INDESTRUCTIBLE FWD BARRIER
      else {
        // console.log('attacking invurnerable barrier w/ bolt');
        console.log(
          ownerType,
          owner.number,
          owner.id,
          "hit an barrier ",
          myCell.barrier.id,
          "w/ a",
          ownerWeaponType,
          "@ ",
          myCell.number,
          " but it is indestructible. Deflect,pushback attacker?",
        );
        if (!app.cellPopups.find((x) => x.msg === "unbreakable" && x.cell.number.x === myCell.number.x && x.cell.number.y === myCell.number.y)) {
          app.cellPopups.push({
            state: false,
            count: 0,
            limit: 35,
            type: "",
            position: "",
            msg: "unbreakable",
            color: "",
            img: "",
            cell: app.gridInfo.find((x) => x.number.x === myCell.number.x && x.number.y === myCell.number.y),
          });
        }

        if (type === "melee" && ownerType === "player") {
          let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

          if (shouldDeflect === 1) {
            if (app.rnJesus(1, owner.crits.pushBack) === 1) {
              app.setDeflection(owner, "defended", true);
            } else {
              app.setDeflection(owner, "defended", false);
            }

            if (owner.currentWeapon.name === "") {
              console.log("app barrier is stronger than your fist. Take damage?");
              let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
              if (takeDamage === 1) {
                app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
              }
            }
          } else {
            app.pushBack(owner, app.getOppositeDirection(owner.direction));
          }
        }
      }
    } else {
      if (range === 1) {
        if (targetCell.barrier.destructible.state === true) {
          // WEAPON CHECK
          if (ownerType === "player") {
            ownerWeaponName = owner.currentWeapon.name;
          } else {
            ownerWeaponName = owner.trap.itemNameRef;
          }
          if (type === "bolt" || type === "flyOverBolt") {
            if (targetCell.barrier.destructible.weapons.find((x) => x === "bolt")) {
              weaponCheck = true;
            }
          }
          if (type === "melee" && targetCell.barrier.destructible.weapons.find((x) => x === ownerWeaponName)) {
            weaponCheck = true;
          }
          if (weaponCheck === true) {
            // DAMAGE, DON'T DESTROY FWD BARRIER
            if (targetCell.barrier.hp - calcedDamage > 0) {
              console.log(
                ownerType,
                owner.number,
                owner.id,
                "hit an barrier ",
                targetCell.barrier.id,
                "w/ a",
                ownerWeaponType,
                "@ ",
                targetCell.number,
                " and damaged it",
              );
              // app.gridInfo.find(elem => elem.number.x === targetCell.number.x && elem.number.y === targetCell.number.y ).barrier.hp -= calcedDamage;

              let hp = targetCell.barrier.hp - calcedDamage;

              targetCell.barrier = {
                id: targetCell.barrier.id,
                trap: targetCell.barrier.trap,
                state: targetCell.barrier.state,
                name: targetCell.barrier.name,
                type: targetCell.barrier.type,
                hp: hp,
                destructible: targetCell.barrier.destructible,
                locked: targetCell.barrier.locked,
                position: targetCell.barrier.position,
                height: targetCell.barrier.height,
              };

              app.obstacleBarrierToDestroy.push({
                type: "barrier",
                action: "damage",
                count: 0,
                limit: 30,
                complete: false,
                cell: targetCell,
              });
            }

            // DESTROY FWD BARRIER W/ OR W/O RUBBLE
            else if (targetCell.barrier.hp - calcedDamage <= 0) {
              console.log(
                ownerType,
                owner.number,
                owner.id,
                "hit an barrier ",
                targetCell.barrier.id,
                "w/ a",
                ownerWeaponType,
                "@ ",
                targetCell.number,
                " and destroyed it",
              );
              if (
                targetCell.barrier.destructible.leaveRubble === true &&
                targetCell.obstacle.state !== true &&
                targetCell.item.name === "" &&
                targetCell.terrain.type !== "void" &&
                targetCell.terrain.type !== "deep"
              ) {
                // console.log("leave rubble on ", targetCell.number, "removing barrier");
                targetCell.rubble = true;
                // targetCell.terrain.type = 'hazard';

                targetCell.barrier = {
                  id: targetCell.barrier.id,
                  trap: targetCell.barrier.trap,
                  state: false,
                  name: targetCell.barrier.name,
                  type: targetCell.barrier.type,
                  hp: 0,
                  destructible: targetCell.barrier.destructible,
                  locked: targetCell.barrier.locked,
                  position: targetCell.barrier.position,
                  height: targetCell.barrier.height,
                };

                if (ownerType === "player") {
                  app.players[owner.number - 1].statusDisplay = {
                    state: true,
                    status: "Destroyed " + targetCell.barrier.name + "!",
                    count: 1,
                    limit: app.players[owner.number - 1].statusDisplay.limit,
                  };

                  if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                    owner.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "destroyedItem",
                      img: "",
                    });
                  }
                }
              } else {
                // console.log('no rubble. Just remove barrier');
                targetCell.barrier = {
                  id: targetCell.barrier.id,
                  trap: targetCell.barrier.trap,
                  state: false,
                  name: targetCell.barrier.name,
                  type: targetCell.barrier.type,
                  hp: 0,
                  destructible: targetCell.barrier.destructible,
                  locked: targetCell.barrier.locked,
                  position: targetCell.barrier.position,
                  height: targetCell.barrier.height,
                };

                if (ownerType === "player") {
                  app.players[owner.number - 1].statusDisplay = {
                    state: true,
                    status: "Destroyed " + targetCell.barrier.name + "!",
                    count: 1,
                    limit: app.players[owner.number - 1].statusDisplay.limit,
                  };

                  if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                    owner.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "destroyedItem",
                      img: "",
                    });
                  }
                }
              }

              app.obstacleBarrierToDestroy.push({
                type: "barrier",
                action: "destroy",
                count: 0,
                limit: 30,
                complete: false,
                cell: targetCell,
              });
            }
          }

          // WEAPON NO GOOD
          else {
            // console.log(
            //   "your current weapon cannot destroy app, you need ",
            //   targetCell.obstacle.weapons,
            //   ". Deflect player?"
            // );
            console.log(
              ownerType,
              owner.number,
              owner.id,
              "hit an barrier ",
              targetCell.barrier.id,
              "w/ a",
              ownerWeaponType,
              "@ ",
              targetCell.number,
              " but their current weapon cannot destroy app, they need",
              targetCell.barrier.destructible.weapons,
              ". Deflect,pushback attacker?",
            );
            if (
              !app.cellPopups.find(
                (x) => x.msg === "unbreakable" && x.cell.number.x === targetCell.number.x && x.cell.number.y === targetCell.number.y,
              )
            ) {
              app.cellPopups.push({
                state: false,
                count: 0,
                limit: 35,
                type: "",
                position: "",
                msg: "unbreakable",
                color: "",
                img: "",
                cell: app.gridInfo.find((x) => x.number.x === targetCell.number.x && x.number.y === targetCell.number.y),
              });
            }

            if (type === "melee" && ownerType === "player") {
              let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

              if (shouldDeflect === 1) {
                if (app.rnJesus(1, owner.crits.pushBack) === 1) {
                  app.setDeflection(owner, "defended", true);
                } else {
                  app.setDeflection(owner, "defended", false);
                }

                if (owner.currentWeapon.name === "") {
                  console.log("app barrier is stronger than your fist. Take damage?");
                  let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
                  if (takeDamage === 1) {
                    app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
                  }
                }
              } else {
                app.pushBack(owner, app.getOppositeDirection(owner.direction));
              }
            }
          }
        }

        // INDESTRUCTIBLE FWD BARRIER
        else {
          console.log(
            ownerType,
            owner.number,
            owner.id,
            "hit an barrier ",
            targetCell.barrier.id,
            "w/ a",
            ownerWeaponType,
            "@ ",
            targetCell.number,
            " but it is indestructible. Deflect,pushback attacker?",
          );
          // console.log('attacking invurnerable barrier w/ bolt');
          if (
            !app.cellPopups.find((x) => x.msg === "unbreakable" && x.cell.number.x === targetCell.number.x && x.cell.number.y === targetCell.number.y)
          ) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: 35,
              type: "",
              position: "",
              msg: "unbreakable",
              color: "",
              img: "",
              cell: app.gridInfo.find((x) => x.number.x === targetCell.number.x && x.number.y === targetCell.number.y),
            });
          }

          if (type === "melee" && ownerType === "player") {
            let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

            if (shouldDeflect === 1) {
              if (app.rnJesus(1, owner.crits.pushBack) === 1) {
                app.setDeflection(owner, "defended", true);
              } else {
                app.setDeflection(owner, "defended", false);
              }

              if (owner.currentWeapon.name === "") {
                console.log("app barrier is stronger than your fist. Take damage?");
                let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
                if (takeDamage === 1) {
                  app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
                }
              }
            } else {
              app.pushBack(owner, app.getOppositeDirection(owner.direction));
            }
          }
        }
      } else {
        if (targetCell2.barrier.destructible.state === true) {
          // WEAPON CHECK
          if (ownerType === "player") {
            ownerWeaponName = owner.currentWeapon.name;
          } else {
            ownerWeaponName = owner.trap.itemNameRef;
          }
          if (type === "bolt" || type === "flyOverBolt") {
            if (targetCell2.barrier.destructible.weapons.find((x) => x === "bolt")) {
              weaponCheck = true;
            }
          }
          if (type === "melee" && targetCell2.barrier.destructible.weapons.find((x) => x === ownerWeaponName)) {
            weaponCheck = true;
          }
          if (weaponCheck === true) {
            // DAMAGE, DON'T DESTROY FWD BARRIER
            if (targetCell2.barrier.hp - calcedDamage > 0) {
              console.log(
                ownerType,
                owner.number,
                owner.id,
                "hit an barrier ",
                targetCell2.barrier.id,
                "w/ a",
                ownerWeaponType,
                "@ ",
                targetCell2.number,
                " and damaged it",
              );
              // app.gridInfo.find(elem => elem.number.x === targetCell2.number.x && elem.number.y === targetCell2.number.y ).barrier.hp -= calcedDamage;

              let hp = targetCell2.barrier.hp - calcedDamage;

              targetCell2.barrier = {
                id: targetCell2.barrier.id,
                trap: targetCell2.barrier.trap,
                state: targetCell2.barrier.state,
                name: targetCell2.barrier.name,
                type: targetCell2.barrier.type,
                hp: hp,
                destructible: targetCell2.barrier.destructible,
                locked: targetCell2.barrier.locked,
                position: targetCell2.barrier.position,
                height: targetCell2.barrier.height,
              };

              app.obstacleBarrierToDestroy.push({
                type: "barrier",
                action: "damage",
                count: 0,
                limit: 30,
                complete: false,
                cell: targetCell2,
              });
            }

            // DESTROY FWD BARRIER W/ OR W/O RUBBLE
            else if (targetCell2.barrier.hp - calcedDamage <= 0) {
              console.log(
                ownerType,
                owner.number,
                owner.id,
                "hit an barrier ",
                targetCell2.barrier.id,
                "w/ a",
                ownerWeaponType,
                "@ ",
                targetCell2.number,
                " and destroyed it",
              );
              if (
                targetCell2.barrier.destructible.leaveRubble === true &&
                targetCell2.obstacle.state !== true &&
                targetCell2.item.name === "" &&
                targetCell2.terrain.type !== "void" &&
                targetCell2.terrain.type !== "deep"
              ) {
                // console.log("leave rubble on ", targetCell2.number, "removing barrier");
                targetCell2.rubble = true;
                // targetCell2.terrain.type = 'hazard';

                targetCell2.barrier = {
                  id: targetCell2.barrier.id,
                  trap: targetCell2.barrier.trap,
                  state: false,
                  name: targetCell2.barrier.name,
                  type: targetCell2.barrier.type,
                  hp: 0,
                  destructible: targetCell2.barrier.destructible,
                  locked: targetCell2.barrier.locked,
                  position: targetCell2.barrier.position,
                  height: targetCell2.barrier.height,
                };

                if (ownerType === "player") {
                  app.players[owner.number - 1].statusDisplay = {
                    state: true,
                    status: "Destroyed " + targetCell2.barrier.name + "!",
                    count: 1,
                    limit: app.players[owner.number - 1].statusDisplay.limit,
                  };

                  if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                    owner.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "destroyedItem",
                      img: "",
                    });
                  }
                }
              } else {
                // console.log('no rubble. Just remove barrier');
                targetCell2.barrier = {
                  id: targetCell2.barrier.id,
                  trap: targetCell2.barrier.trap,
                  state: false,
                  name: targetCell2.barrier.name,
                  type: targetCell2.barrier.type,
                  hp: 0,
                  destructible: targetCell2.barrier.destructible,
                  locked: targetCell2.barrier.locked,
                  position: targetCell2.barrier.position,
                  height: targetCell2.barrier.height,
                };

                if (ownerType === "player") {
                  app.players[owner.number - 1].statusDisplay = {
                    state: true,
                    status: "Destroyed " + targetCell2.barrier.name + "!",
                    count: 1,
                    limit: app.players[owner.number - 1].statusDisplay.limit,
                  };

                  if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
                    owner.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "destroyedItem",
                      img: "",
                    });
                  }
                }
              }

              app.obstacleBarrierToDestroy.push({
                type: "barrier",
                action: "destroy",
                count: 0,
                limit: 30,
                complete: false,
                cell: targetCell2,
              });
            }
          }

          // WEAPON NO GOOD
          else {
            // console.log(
            //   "your current weapon cannot destroy app, you need ",
            //   targetCell2.obstacle.weapons,
            //   ". Deflect player?"
            // );
            onsole.log(
              ownerType,
              owner.number,
              owner.id,
              "hit an barrier ",
              targetCell2.barrier.id,
              "w/ a",
              ownerWeaponType,
              "@ ",
              targetCell2.number,
              " but their current weapon cannot destroy app, they need",
              targetCell2.barrier.destructible.weapons,
              ". Deflect,pushback attacker?",
            );
            if (
              !app.cellPopups.find(
                (x) => x.msg === "unbreakable" && x.cell.number.x === targetCell2.number.x && x.cell.number.y === targetCell2.number.y,
              )
            ) {
              app.cellPopups.push({
                state: false,
                count: 0,
                limit: 35,
                type: "",
                position: "",
                msg: "unbreakable",
                color: "",
                img: "",
                cell: app.gridInfo.find((x) => x.number.x === targetCell2.number.x && x.number.y === targetCell2.number.y),
              });
            }

            if (type === "melee" && ownerType === "player") {
              let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

              if (shouldDeflect === 1) {
                if (app.rnJesus(1, owner.crits.pushBack) === 1) {
                  app.setDeflection(owner, "defended", true);
                } else {
                  app.setDeflection(owner, "defended", false);
                }

                if (owner.currentWeapon.name === "") {
                  console.log("app barrier is stronger than your fist. Take damage?");
                  let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
                  if (takeDamage === 1) {
                    app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
                  }
                }
              } else {
                app.pushBack(owner, app.getOppositeDirection(owner.direction));
              }
            }
          }
        }

        // INDESTRUCTIBLE FWD BARRIER
        else {
          console.log(
            ownerType,
            owner.number,
            owner.id,
            "hit an barrier ",
            targetCell2.barrier.id,
            "w/ a",
            ownerWeaponType,
            "@ ",
            targetCell2.number,
            " but it is indestructible. deflected, pushback attack?",
          );
          // console.log('attacking invurnerable barrier w/ bolt');
          if (
            !app.cellPopups.find(
              (x) => x.msg === "unbreakable" && x.cell.number.x === targetCell2.number.x && x.cell.number.y === targetCell2.number.y,
            )
          ) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: 35,
              type: "",
              position: "",
              msg: "unbreakable",
              color: "",
              img: "",
              cell: app.gridInfo.find((x) => x.number.x === targetCell2.number.x && x.number.y === targetCell2.number.y),
            });
          }

          if (type === "melee" && ownerType === "player") {
            let shouldDeflect = app.rnJesus(1, owner.crits.guardBreak);

            if (shouldDeflect === 1) {
              if (app.rnJesus(1, owner.crits.pushBack) === 1) {
                app.setDeflection(owner, "defended", true);
              } else {
                app.setDeflection(owner, "defended", false);
              }

              if (owner.currentWeapon.name === "") {
                console.log("app barrier is stronger than your fist. Take damage?");
                let takeDamage = app.rnJesus(1, owner.crits.guardBreak);
                if (takeDamage === 1) {
                  app.handleMiscPlayerDamage(owner, "obstacleBarrierInvulnurable");
                }
              }
            } else {
              app.pushBack(owner, app.getOppositeDirection(owner.direction));
            }
          }
        }
      }
    }

    // bolt.kill = true;
    if (type === "bolt" || type === "flyOverBolt") {
      app.projectiles.find((blt) => blt.id === bolt.id).kill = true;
    }
  };
  // DESTROY ITEMS AND RUBBLE
  const handleNonObstacleBarrierDamage = (calcedDamage, range) => {
    if (ownerType === "player") {
      ownerWeaponName = owner.currentWeapon.name;
    } else {
      ownerWeaponName = owner.trap.itemNameRef;
    }
    if (range === 1) {
      if (targetCell && targetCell.item.name !== "" && calcedDamage > 0 && ownerWeaponName !== "") {
        console.log(
          ownerType,
          owner.number,
          owner.id,
          "hit an item ",
          targetCell.item.name,
          "w/ a",
          ownerWeaponType,
          "@ ",
          targetCell.number,
          " and destroyed it.",
        );

        if (ownerType === "player") {
          app.players[owner.number - 1].statusDisplay = {
            state: true,
            status: "Destroyed " + targetCell.item.name + "!",
            count: 1,
            limit: app.players[owner.number - 1].statusDisplay.limit,
          };

          if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
            owner.popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "destroyedItem",
              img: "",
            });
          }
        }

        app.gridInfo.find((elem) => elem.number.x === targetCell.number.x && elem.number.y === targetCell.number.y).item = {
          name: "",
          type: "",
          subType: "",
          effect: "",
          initDrawn: false,
        };
      }

      if ((targetCell.rubble === true) & (calcedDamage > 0)) {
        console.log(ownerType, owner.number, owner.id, "hit rubble w/ a", ownerWeaponType, "@ ", targetCell.number, " and destroyed it.");
        app.gridInfo.find((elem) => elem.number.x === targetCell.number.x && elem.number.y === targetCell.number.y).rubble = false;
      }
    } else {
      if (targetCell2 && targetCell2.item.name !== "" && calcedDamage > 0 && ownerWeaponName !== "") {
        console.log(
          ownerType,
          owner.number,
          owner.id,
          "hit an item ",
          targetCell2.item.name,
          "w/ a",
          ownerWeaponType,
          "@ ",
          targetCell2.number,
          " and destroyed it.",
        );
        if (ownerType === "player") {
          app.players[owner.number - 1].statusDisplay = {
            state: true,
            status: "Destroyed " + targetCell2.item.name + "!",
            count: 1,
            limit: app.players[owner.number - 1].statusDisplay.limit,
          };

          if (!owner.popups.find((x) => x.msg === "destroyedItem")) {
            owner.popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "destroyedItem",
              img: "",
            });
          }
        }

        app.gridInfo.find((elem) => elem.number.x === targetCell2.number.x && elem.number.y === targetCell2.number.y).item = {
          name: "",
          type: "",
          subType: "",
          effect: "",
          initDrawn: false,
        };
      }

      if ((targetCell2.rubble === true) & (calcedDamage > 0)) {
        console.log(ownerType, owner.number, owner.id, "hit rubble w/ a", ownerWeaponType, "@ ", targetCell2.number, " and destroyed it.");
        // console.log('damage/clear rubble @ ',targetCell2.number);
        app.gridInfo.find((elem) => elem.number.x === targetCell2.number.x && elem.number.y === targetCell2.number.y).rubble = false;
      }
    }
  };
  if (type === "melee") {
    let doubleHitChance;
    let singleHitChance;
    if (ownerType === "player") {
      ownerWeaponType = owner.currentWeapon.type;
      doubleHitChance = owner.crits.doubleHit;
      singleHitChance = owner.crits.singleHit;
      ownerDirection = owner.direction;
      ownerAttackCharge = owner.attacking.charge;
    } else {
      ownerWeaponType = owner.trap.item.subType;
      doubleHitChance = 2;
      singleHitChance = 1;
      ownerDirection = app.getDirectionFromCells(myCell.number, owner.trap.target);
    }

    // THE HIGHER THE ATTACK CHARGE
    // THE LOWER THE SINGLE HIT CHANCE & THE HIGHER THE DOUBLE HIT CHANCE
    let doubleHit = app.rnJesus(1, doubleHitChance + ownerAttackCharge);
    let singleHit = app.rnJesus(1, singleHitChance + ownerAttackCharge);

    if (singleHit === 1) {
      damage = 1;
    }
    if (doubleHit !== 1) {
      damage = 2;
    }
    let shouldDamage = 0;
    if (ownerType === "player") {
      if (owner.attacking.blunt === true) {
        shouldDamage = app.rnJesus(1, owner.crits.guardBreak);
        if ((shouldDamage = 1)) {
          damage = 1;
        } else {
          damage = 0;
        }
      }
      if (owner.currentWeapon.name === "") {
        shouldDamage = app.rnJesus(1, owner.crits.guardBreak + 3);
        if ((shouldDamage = 1)) {
          damage = 1;
        } else {
          damage = 0;
        }
      }
    }

    // AT ELEVATION
    if (targetCell) {
      if (targetCell.elevation.number < myCell.elevation.number + 1) {
        let checkSpearTarget = false;
        // set app false if first target obstacles or barrier industructible or not destroyed

        // SWORD/ RANGE === 1 ATTACK
        if (ownerWeaponType !== "spear") {
          // MY CELL BARRIER?
          let myCellBarrier = false;
          if (myCell.barrier.state === true) {
            if (myCell.barrier.position === ownerDirection) {
              myCellBarrier = true;

              handleBarrierDamage("myCellBarrier", damage, 0);
            }
          }

          // FWD BARRIER?
          let fwdBarrier = false;
          if (targetCell.barrier.state === true) {
            fwdBarrier = app.checkForwardBarrier(ownerDirection, targetCell);
          }

          if (fwdBarrier === true) {
            handleBarrierDamage("fwdBarrier", damage, 1);
          }

          // NO FWD BARRIER. OBSTACLE, REAR  BARRIER (SPEAR)?
          else if (fwdBarrier !== true && myCellBarrier !== true) {
            if (targetCell.obstacle.state === true) {
              handleObstacleDamage(damage, 1);
            } else {
              // NO OBSTACLE. ITEM ON GROUND? DESTROY

              handleNonObstacleBarrierDamage(damage, 1);

              // NO OBSTACLE. ITEM OR RUBBLE. DESTROY REAR BARRIER

              // else {
              //   // do nothing
              // }
            }
          }
        }

        // CHECK 1ST CELL, SPEAR TARGET 1
        if (ownerWeaponType === "spear") {
          let myCellBarrier = false;
          if (myCell.barrier.state === true) {
            if (myCell.barrier.position === ownerDirection) {
              myCellBarrier = true;
              handleBarrierDamage("myCellBarrier", damage, 0);
            }
          }

          // FWD BARRIER?
          let fwdBarrier = false;
          if (targetCell.barrier.state === true) {
            fwdBarrier = app.checkForwardBarrier(ownerDirection, targetCell);
          }

          if (myCellBarrier !== true && fwdBarrier === true) {
            handleBarrierDamage("fwdBarrier", damage, 1);
          }

          // NO FWD BARRIER. OBSTACLE, REAR  BARRIER (SPEAR)?
          else if (myCellBarrier !== true && fwdBarrier !== true) {
            if (targetCell.obstacle.state === true) {
              handleObstacleDamage(damage, 1);
            } else {
              // NO OBSTACLE. ITEM ON GROUND? DESTROY

              handleNonObstacleBarrierDamage(damage, 1);

              // NO OBSTACLE. ITEM OR RUBBLE. DESTROY REAR BARRIER

              if (ownerWeaponType === "spear" && targetCell.item.name === "" && targetCell.rubble !== true) {
                let rearBarrier = false;
                if (targetCell.barrier.state === true) {
                  if (ownerDirection === targetCell.barrier.position) {
                    rearBarrier = true;
                  }
                }
                if (rearBarrier === true) {
                  handleBarrierDamage("rearBarrier", damage, 1);
                } else {
                  // console.log('spear target one no obstructions, atk spear target 2');
                  checkSpearTarget = true;
                }
              }
              // else {
              //   // do nothing
              // }
            }
          }
        }

        // CHECK 2ND CELL SPEAR TARGET 2
        if (ownerWeaponType === "spear" && checkSpearTarget === true) {
          let targetCell2;
          if (ownerType === "player") {
            targetCell2 = app.gridInfo.find((elem) => elem.number.x === owner.target.cell2.number.x && elem.number.y === owner.target.cell2.number.y);
          } else {
            targetCell2 = app.gridInfo.find((elem) => elem.number.x === owner.trap.target.x && elem.number.y === owner.trap.target.y);
          }

          let myCellBarrier = false;
          if (myCell.barrier.state === true) {
            if (myCell.barrier.position === ownerDirection) {
              myCellBarrier = true;
              handleBarrierDamage("myCellBarrier", damage, 0);
            }
          }

          if (targetCell2) {
            let fwdBarrier = false;
            if (targetCell2.barrier.state === true) {
              fwdBarrier = app.checkForwardBarrier(ownerDirection, targetCell2);
            }

            if (fwdBarrier === true) {
              handleBarrierDamage("fwdBarrier", damage, 2);
            }

            // NO FWD BARRIER. OBSTACLE?
            else if (myCellBarrier !== true && fwdBarrier !== true) {
              if (targetCell2.obstacle.state === true) {
                handleObstacleDamage(damage, 2);
              } else {
                // NO OBSTACLE. ITEM ON GROUND? DESTROY
                handleNonObstacleBarrierDamage(damage, 2);

                // NO OBSTACLE. DESTROY REAR BARRIER
                if (ownerType === "player") {
                  if (!owner.popups.find((x) => x.msg === "missedAttack2")) {
                    owner.popups.push({
                      state: false,
                      count: 0,
                      limit: owner.attacking.animRef.limit[player.currentWeapon.type] - owner.attacking.animRef.peak[player.currentWeapon.type],
                      type: "",
                      position: "",
                      msg: "missedAttack2",
                      img: "",
                    });
                  }
                }
              }
            }
          }
        }
      }
      if (targetCell.elevation.number > myCell.elevation.number) {
        console.log("target is above your elevation");
      }
    }

    if (!targetCell) {
      if (myCell.barrier.state === true && myCell.barrier.position === ownerDirection) {
        handleBarrierDamage("myCellBarrier", damage, 0);
      }
    }
  }

  if (type === "bolt") {
    let doubleHitChance;
    let singleHitChance;
    if (ownerType === "player") {
      doubleHitChance = owner.crits.doubleHit;
      singleHitChance = owner.crits.singleHit;
    } else {
      doubleHitChance = 2;
      singleHitChance = 1;
    }
    // THE HIGHER THE ATTACK CHARGE
    // THE LOWER THE SINGLE HIT CHANCE & THE HIGHER THE DOUBLE HIT CHANCE
    ownerAttackCharge = bolt.charge;
    let doubleHit = app.rnJesus(1, doubleHitChance + ownerAttackCharge);
    let singleHit = app.rnJesus(1, singleHitChance + ownerAttackCharge);

    if (singleHit === 1) {
      damage = 1;
    }
    if (doubleHit !== 1) {
      damage = 2;
    }

    let myCellBarrier = false;
    if (myCell) {
      if (myCell.barrier.state === true) {
        if (myCell.barrier.position === bolt.direction) {
          myCellBarrier = true;
          handleBarrierDamage("myCellBarrier", damage, 0);
        }
      }
    }

    // FWD BARRIER CHECK
    let fwdBarrier = false;
    if (targetCell.barrier.state === true) {
      fwdBarrier = app.checkForwardBarrier(bolt.direction, targetCell);
    }

    // IF TARGET CELL IS ORIGIN CELL
    if (targetCell.number.x === bolt.origin.number.x && targetCell.number.y === bolt.origin.number.y) {
      fwdBarrier = false;
    }

    // FWD BARRIER
    if (myCellBarrier !== true && fwdBarrier === true && targetCell.barrier.height >= 1) {
      // console.log('owner ',owner.number,'hit fwd barrier ',targetCell.barrier.name,'@ ',targetCell.number,type);
      handleBarrierDamage("fwdBarrier", damage, 1);
    }

    // NO FWD BARRIER. OBSTACLE?
    if (myCellBarrier !== true && fwdBarrier !== true) {
      if (targetCell.obstacle.state === true && targetCell.obstacle.height >= 1) {
        console.log("player ", owner.number, "hit obstacle ", targetCell.obstacle.name, " @ ", targetCell.number, type, " for ", damage, " damage");
        handleObstacleDamage(damage, 1);
      }
      // NO OBSTACLE. REAR BARRIER CHECK
      else {
        // NO OBSTACLE. ITEM ON GROUND? DESTROY
        // console.log('bolt cant destroy item on ground');

        let rearBarrier = false;
        if (targetCell.barrier.state === true) {
          if (bolt.direction === targetCell.barrier.position) {
            rearBarrier = true;
          }
        }
        if (rearBarrier === true && targetCell.barrier.height >= 1) {
          // console.log('player ',owner.number,'hit rear barrier ',targetCell.barrier.name,' @ ',targetCell.number,type);
          handleBarrierDamage("rearBarrier", damage, 1);
        }
      }
    }
  }

  if (type === "flyOverBolt") {
    myCell = undefined;
    if (bolt.direction === "north") {
      myCell = app.gridInfo.find((elem) => elem.number.x === targetCell.number.x + 1 && elem.number.y === targetCell.number.y);
    }
    if (bolt.direction === "south") {
      myCell = app.gridInfo.find((elem) => elem.number.x === targetCell.number.x - 1 && elem.number.y === targetCell.number.y);
    }
    if (bolt.direction === "east") {
      myCell = app.gridInfo.find((elem) => elem.number.x === targetCell.number.x && elem.number.y === targetCell.number.y - 1);
    }
    if (bolt.direction === "east") {
      myCell = app.gridInfo.find((elem) => elem.number.x === targetCell.number.x && elem.number.y === targetCell.number.y + 1);
    }

    let doubleHitChance;
    let singleHitChance;
    if (ownerType === "player") {
      doubleHitChance = owner.crits.doubleHit;
      singleHitChance = owner.crits.singleHit;
    } else {
      doubleHitChance = 2;
      singleHitChance = 1;
    }
    ownerAttackCharge = bolt.charge;

    // THE HIGHER THE ATTACK CHARGE
    // THE LOWER THE SINGLE HIT CHANCE & THE HIGHER THE DOUBLE HIT CHANCE
    let doubleHit = app.rnJesus(1, doubleHitChance + ownerAttackCharge);
    let singleHit = app.rnJesus(1, singleHitChance + ownerAttackCharge);
    if (singleHit === 1) {
      damage = 1;
    }
    if (doubleHit !== 1) {
      damage = 2;
    }

    // (targetCell.obstacle.height + targetCell.elevation.number) < bolt.elevation;
    let obstacleHeightCheck = targetCell.obstacle.height + targetCell.elevation.number >= bolt.elevation + 1;
    let barrierHeightCheck = targetCell.barrier.height + targetCell.elevation.number >= bolt.elevation + 1;

    let myCellBarrier = false;
    if (myCell.barrier.state === true) {
      if (myCell.barrier.position === bolt.direction) {
        myCellBarrier = true;
        handleBarrierDamage("myCellBarrier", damage, 0);
      }
    }

    // FWD BARRIER?
    let fwdBarrier = false;
    if (targetCell.barrier.state === true) {
      fwdBarrier = app.checkForwardBarrier(bolt.direction, targetCell);
    }

    if (myCellBarrier !== true && fwdBarrier === true && barrierHeightCheck === true) {
      handleBarrierDamage("fwdBarrier", damage, 1);
    }

    // NO FWD BARRIER. OBSTACLE?
    if (myCellBarrier !== true && fwdBarrier !== true) {
      if (targetCell.obstacle.state === true && obstacleHeightCheck === true) {
        // console.log('targetCell.obstacle.hp',targetCell.obstacle.hp);
        handleObstacleDamage(damage, 1);
      } else {
        // NO OBSTACLE. ITEM ON GROUND? DESTROY
        // console.log('bolt cant destroy item on ground');

        // NO OBSTACLE. DESTROY REAR BARRIER
        let rearBarrier = false;
        if (targetCell.barrier.state === true) {
          if (bolt.direction === targetCell.barrier.position) {
            rearBarrier = true;
          }
        }
        if (rearBarrier === true && barrierHeightCheck === true) {
          handleBarrierDamage("rearBarrier", damage);
        }
      }
    }
  }

  if (type === "arc") {
  }
}
