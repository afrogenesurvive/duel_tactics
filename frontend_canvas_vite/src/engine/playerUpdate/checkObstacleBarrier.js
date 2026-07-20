export function checkObstacleBarrier(app, player, nextPosition) {
  const logObstacleMoving = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("obstacle.moving", message, data, { fn: "checkObstacleBarrier" });
    }
  };
  const logObstacleFalling = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("obstacle.falling", message, data, { fn: "checkObstacleBarrier" });
    }
  };
  const logObstacleHalfPushBack = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("obstacle.halfPushBack", message, data, { fn: "checkObstacleBarrier" });
    }
  };
  const logObstacleCount = (message, data) => {
    if (app?.globalLogger) {
      app.globalLogger("obstacle.count", message, data, { fn: "checkObstacleBarrier" });
    }
  };
  // MOVING & FALLING
  // CHECK OBSTACLE/BARRIER TRAPS AND UPDATE CELL BARRIER/OBSTACLE
  for (let cell of app.gridInfo) {
    if (cell.obstacle.state === true && cell.obstacle.moving.state === true && cell.obstacle.moving.falling.state !== true) {
      // console.log("tracking moving obstacle", cell.obstacle.moving.origin);

      let destCellRef = app.gridInfo.find(
        (x) => x.number.x === cell.obstacle.moving.destination.number.x && x.number.y === cell.obstacle.moving.destination.number.y,
      );

      let obstacleCrementObj = undefined;
      if (!destCellRef) {
        obstacleCrementObj = app.obstacleMoveCrementer(cell, {
          center: cell.obstacle.moving.destination.center,
        });
      } else {
        obstacleCrementObj = app.obstacleMoveCrementer(cell, destCellRef);
      }

      cell.obstacle.moving.nextPosition = obstacleCrementObj.pos;
      cell.obstacle.moving.step = obstacleCrementObj.step;
      nextPosition = obstacleCrementObj.pos;
      logObstacleCount("step", {
        obstacleId: cell.obstacle.id,
        origin: cell.obstacle.moving.origin.number,
        destination: cell.obstacle.moving.destination.number,
        step: cell.obstacle.moving.step,
      });

      let atDestRanges = [false, false, false, false];

      let destRngIndx = undefined;
      if (
        nextPosition.x >= cell.obstacle.moving.destination.center.x - 1 &&
        nextPosition.x <= cell.obstacle.moving.destination.center.x + 1 &&
        nextPosition.y >= cell.obstacle.moving.destination.center.y - 1 &&
        nextPosition.y <= cell.obstacle.moving.destination.center.y + 1
      ) {
        atDestRanges[0] = true;
        destRngIndx = 0;
      }
      if (nextPosition.x === cell.obstacle.moving.destination.center.x - 0.25 && nextPosition.y === cell.obstacle.moving.destination.center.y + 0.5) {
        atDestRanges[1] = true;
        destRngIndx = 1;
      }
      if (nextPosition.x === cell.obstacle.moving.destination.center.x && nextPosition.y === cell.obstacle.moving.destination.center.y) {
        atDestRanges[2] = true;
        destRngIndx = 2;
      }
      if (nextPosition.x === cell.obstacle.moving.destination.center.x - 5 && nextPosition.y === cell.obstacle.moving.destination.center.y - 5) {
        atDestRanges[3] = true;
        destRngIndx = 3;
      }

      for (const el of atDestRanges) {
        if (el === true) {
          let indx = atDestRanges.indexOf(el);
          // console.log('obstacle at destination');

          if (destCellRef) {
            // console.log("obstacle at in bounds destination", cell.obstacle);

            let cell2 = cell;
            let originLevelData = cell2.levelData.split("_");
            originLevelData[1] = "*";

            let originCellRef = app.gridInfo.find(
              (x) => x.number.x === cell.obstacle.moving.origin.number.x && x.number.y === cell.obstacle.moving.origin.number.y,
            );
            let destCellRef = app.gridInfo.find(
              (x) => x.number.x === cell.obstacle.moving.destination.number.x && x.number.y === cell.obstacle.moving.destination.number.y,
            );

            if (destCellRef.void.state === true || destCellRef.terrain.type === "deep") {
              logObstacleFalling("arriveAtDestinationInBounds", {
                obstacleId: cell2.obstacle.id,
                destination: destCellRef.number,
              });
              destCellRef.obstacle = {
                state: true,
                id: cell2.obstacle.id,
                trap: cell2.obstacle.trap,
                name: cell2.obstacle.name,
                type: cell2.obstacle.type,
                hp: cell2.obstacle.hp,
                destructible: cell2.obstacle.destructible,
                locked: cell2.obstacle.locked,
                weight: cell2.obstacle.weight,
                height: cell2.obstacle.height,
                items: cell2.obstacle.items,
                effects: cell2.obstacle.effects,
                moving: {
                  state: false,
                  step: 0,
                  origin: {
                    number: {
                      x: undefined,
                      y: undefined,
                    },
                    center: {
                      x: undefined,
                      y: undefined,
                    },
                  },
                  destination: {
                    number: {
                      x: undefined,
                      y: undefined,
                    },
                    center: {
                      x: undefined,
                      y: undefined,
                    },
                  },
                  currentPosition: {
                    x: undefined,
                    y: undefined,
                  },
                  nextPosition: {
                    x: destCellRef.center.x,
                    y: destCellRef.center.y,
                  },
                  moveSpeed: 0,
                  pushable: true,
                  pushed: false,
                  pusher: undefined,
                  falling: {
                    state: true,
                    count: 0,
                    limit: cell2.obstacle.moving.falling.limit,
                  },
                },
              };

              destCellRef.obstacle.moving.nextPosition.x -= app.floorImageWidth / 2;
              destCellRef.obstacle.moving.nextPosition.y -= app.floorImageHeight / 2;
            }
            if (destCellRef.void.state !== true && destCellRef.terrain.type !== "deep") {
              logObstacleMoving("arrivedInBounds", {
                obstacleId: cell2.obstacle.id,
                destination: destCellRef.number,
              });
              destCellRef.obstacle = {
                id: cell2.obstacle.id,
                trap: cell2.obstacle.trap,
                state: true,
                name: cell2.obstacle.name,
                type: cell2.obstacle.type,
                hp: cell2.obstacle.hp,
                destructible: cell2.obstacle.destructible,
                locked: cell2.obstacle.locked,
                weight: cell2.obstacle.weight,
                height: cell2.obstacle.height,
                items: cell2.obstacle.items,
                effects: cell2.obstacle.effects,
                moving: {
                  state: false,
                  step: 0,
                  origin: {
                    number: originCellRef.number,
                    center: {
                      x: undefined,
                      y: undefined,
                    },
                  },
                  destination: {
                    number: destCellRef.number,
                    center: {
                      x: undefined,
                      y: undefined,
                    },
                  },
                  currentPosition: {
                    x: undefined,
                    y: undefined,
                  },
                  nextPosition: {
                    x: undefined,
                    y: undefined,
                  },
                  moveSpeed: 0,
                  pushable: true,
                  pushed: false,
                  pusher: undefined,
                  falling: cell2.obstacle.moving.falling,
                },
              };
            }

            destCellRef.levelData = cell2.levelData;

            originCellRef.obstacle = {
              id: "",
              trap: {},
              state: false,
              name: "",
              type: "",
              hp: 0,
              destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
              },
              locked: {
                state: false,
                key: "",
              },
              weight: 1,
              height: 0.5,
              items: [],
              effects: [],
              moving: {
                state: false,
                step: 0,
                origin: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                destination: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                currentPosition: {
                  x: undefined,
                  y: undefined,
                },
                nextPosition: {
                  x: undefined,
                  y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                  state: false,
                  count: 0,
                  limit: 25,
                },
              },
            };
            originCellRef.levelData = originLevelData.join("_");

            for (const obs of app.obstacleBarrierToDestroy) {
              if (originCellRef.number.x === obs.cell.number.x && originCellRef.number.y === obs.cell.number.y && destCellRef.void.state !== true) {
                app.obstacleBarrierToDestroy.push({
                  type: "obstacle",
                  action: "damage",
                  count: 0,
                  limit: 30,
                  complete: false,
                  cell: destCellRef,
                });
              }
            }

            for (const plyr of app.players) {
              if (plyr.currentPosition.cell.number.x === destCellRef.number.x && plyr.currentPosition.cell.number.y === destCellRef.number.y) {
                app.obstaclePlayerOverlap("obstacle", destCellRef, plyr, destCellRef.obstacle);
              }
            }
            app.obstacleCheckDestination(destCellRef, player);
          } else {
            // console.log('obstacle at out of bounds destination',cell.obstacle.moving.origin.center,cell.obstacle.moving.nextPosition);
            let cell2 = cell;
            let originLevelData = cell2.levelData.split("_");
            originLevelData[1] = "*";

            cell2.obstacle.moving.falling = {
              state: true,
              count: 0,
              limit: cell2.obstacle.moving.falling.limit,
            };
            logObstacleFalling("startOutOfBounds", {
              obstacleId: cell2.obstacle.id,
              origin: cell2.obstacle.moving.origin.number,
            });

            cell2.obstacle.moving.nextPosition.x -= app.floorImageWidth / 2;
            cell2.obstacle.moving.nextPosition.y -= app.floorImageHeight / 2;

            app.obstaclesOutOfBoundsFall.push(cell2.obstacle);

            let originCellRef = app.gridInfo.find(
              (x) => x.number.x === cell.obstacle.moving.origin.number.x && x.number.y === cell.obstacle.moving.origin.number.y,
            );

            originCellRef.obstacle = {
              id: 0,
              trap: {},
              state: false,
              name: "",
              type: "",
              hp: 0,
              destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
              },
              locked: {
                state: false,
                key: "",
              },
              weight: 1,
              height: 0.5,
              items: [],
              effects: [],
              moving: {
                state: false,
                step: 0,
                origin: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                destination: {
                  number: {
                    x: undefined,
                    y: undefined,
                  },
                  center: {
                    x: undefined,
                    y: undefined,
                  },
                },
                currentPosition: {
                  x: undefined,
                  y: undefined,
                },
                nextPosition: {
                  x: undefined,
                  y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                  state: false,
                  count: 0,
                  limit: 25,
                },
              },
            };
            originCellRef.levelData = originLevelData.join("_");
          }

          break;
        }
      }

      // if (cell.obstacle.moving.step >= 1) {
      //
      // }
    }

    // step falling.count
    if (cell.obstacle.state === true && cell.obstacle.moving.falling.state === true) {
      // console.log('falling obstacle');
      if (cell.obstacle.moving.falling.count < cell.obstacle.moving.falling.limit) {
        cell.obstacle.moving.falling.count++;
        logObstacleCount("fallingInBounds", {
          obstacleId: cell.obstacle.id,
          count: cell.obstacle.moving.falling.count,
          limit: cell.obstacle.moving.falling.limit,
        });
        // console.log('obstacle falling in bounds a count',cell.obstacle.moving.falling.count,'position',cell.obstacle.moving.nextPosition);
      }
      if (cell.obstacle.moving.falling.count >= cell.obstacle.moving.falling.limit) {
        let cell2 = cell;
        let levelData = cell2.levelData.split("_");
        levelData[1] = "*";
        cell.levelData = levelData.join("_");
        cell.obstacle = {
          id: 0,
          trap: {},
          state: false,
          name: "",
          type: "",
          hp: 0,
          destructible: {
            state: false,
            weapons: [],
            leaveRubble: false,
          },
          locked: {
            state: false,
            key: "",
          },
          weight: 1,
          height: 0.5,
          items: [],
          effects: [],
          moving: {
            state: false,
            step: 0,
            origin: {
              number: {
                x: undefined,
                y: undefined,
              },
              center: {
                x: undefined,
                y: undefined,
              },
            },
            destination: {
              number: {
                x: undefined,
                y: undefined,
              },
              center: {
                x: undefined,
                y: undefined,
              },
            },
            currentPosition: {
              x: undefined,
              y: undefined,
            },
            nextPosition: {
              x: undefined,
              y: undefined,
            },
            moveSpeed: 0,
            pushable: true,
            pushed: false,
            pusher: undefined,
            falling: {
              state: false,
              count: 0,
              limit: 10,
            },
          },
        };
        logObstacleFalling("endInBounds", {
          obstacleId: cell2.obstacle.id,
          cell: cell2.number,
        });
        // console.log('obstacle falling in bounds over');
      }
    }

    // CHECK OBSTACLE/BARRIER TRAPS AND UPDATE CELL BARRIER/OBSTACLE
    if (cell.obstacle.state === true) {
      if (cell.obstacle.trap?.state === true) {
        cell = app.obstacleBarrierTrapChecker(cell, "obstacle");
      }
    }
    if (cell.barrier.state === true) {
      if (cell.barrier.trap?.state === true) {
        cell = app.obstacleBarrierTrapChecker(cell, "barrier");
      }
    }
  }
  for (const elem of app.obstaclesOutOfBoundsFall) {
    if (elem.moving.falling.count < elem.moving.falling.limit) {
      elem.moving.falling.count++;
      logObstacleCount("fallingOutOfBounds", {
        obstacleId: elem.id,
        count: elem.moving.falling.count,
        limit: elem.moving.falling.limit,
      });
      // obstacle.moving.nextPosition.y += (obstacle.moving.falling.count*5)
      // console.log('obstacle falling out of bounds a count',elem.moving.falling.count,'position',elem.moving.nextPosition);
    }
    if (elem.moving.falling.count >= elem.moving.falling.limit) {
      // console.log('obstacle falling out of bounds over');
      logObstacleFalling("endOutOfBounds", {
        obstacleId: elem.id,
      });
      let index = app.obstaclesOutOfBoundsFall.indexOf(elem);
      app.obstaclesOutOfBoundsFall.splice(index, 1);
    }
  }
  // OBSTACLE/BARRIER DAMAGE/DESTROY
  for (const cell of app.obstacleBarrierToDestroy) {
    if (cell.limit > 0) {
      if (cell.count < cell.limit) {
        cell.count++;
        logObstacleCount("obstacleBarrierToDestroy", {
          type: cell.type,
          action: cell.action,
          count: cell.count,
          limit: cell.limit,
          cell: cell.cell?.number,
        });
      } else if (cell.count >= cell.limit) {
        logObstacleCount("obstacleBarrierToDestroyComplete", {
          type: cell.type,
          action: cell.action,
          limit: cell.limit,
          cell: cell.cell?.number,
        });
        let index = app.obstacleBarrierToDestroy.indexOf(cell);
        app.obstacleBarrierToDestroy.splice(index, 1);
      }
    }
  }
  // OBSTACLE HALF PUSHED BACK
  for (const halfPushBackObstacle of app.halfPushBackObstacles) {
    if (halfPushBackObstacle.state === true) {
      if (halfPushBackObstacle.countUp.state === true) {
        if (halfPushBackObstacle.countUp.count < halfPushBackObstacle.countUp.limit) {
          if (halfPushBackObstacle.countUp.count === 1) {
            // console.log("obstacle 1/2 pushback start", halfPushBackObstacle.myCellNo);
            logObstacleHalfPushBack("start", {
              id: halfPushBackObstacle.id,
              cell: halfPushBackObstacle.myCellNo,
            });
          }

          halfPushBackObstacle.countUp.count++;
          logObstacleCount("halfPushBackUp", {
            id: halfPushBackObstacle.id,
            count: halfPushBackObstacle.countUp.count,
            limit: halfPushBackObstacle.countUp.limit,
          });
          // console.log("obstacle 1/2 pushback count up", halfPushBackObstacle.countUp.count);
        }

        if (halfPushBackObstacle.countUp.count >= halfPushBackObstacle.countUp.limit) {
          halfPushBackObstacle.countUp = {
            state: false,
            count: 0,
            limit: halfPushBackObstacle.countUp.limit,
          };

          // console.log('obstacle 1/2 pushback peak');
          // app.handleHalfPushBackResult('obstacle',halfPushBackObstacle);
          logObstacleHalfPushBack("obstacleHalfPushBackPeak", {
            id: halfPushBackObstacle.id,
          });
          halfPushBackObstacle.countDown.state = true;
        }
      }

      if (halfPushBackObstacle.countDown.state === true) {
        if (halfPushBackObstacle.countDown.count < halfPushBackObstacle.countDown.limit) {
          halfPushBackObstacle.countDown.count++;
          logObstacleCount("obstacleHalfPushBackCountDown", {
            id: halfPushBackObstacle.id,
            count: halfPushBackObstacle.countDown.count,
            limit: halfPushBackObstacle.countDown.limit,
          });
          // console.log('obstacle 1/2 pushback count down',halfPushBackObstacle.countDown.count);
        }

        if (halfPushBackObstacle.countDown.count >= halfPushBackObstacle.countDown.limit) {
          halfPushBackObstacle.countDown = {
            state: false,
            count: 0,
            limit: halfPushBackObstacle.countDown.limit,
          };

          // console.log("obstacle 1/2 pushback end");
          logObstacleHalfPushBack("obstacleHalfPushBackEnd", {
            id: halfPushBackObstacle.id,
          });
          app.handleHalfPushBackResult("obstacle", halfPushBackObstacle);
          halfPushBackObstacle.state = false;
        }
      }
    }

    if (halfPushBackObstacle.state !== true) {
      let index = app.halfPushBackObstacles.indexOf(halfPushBackObstacle);
      app.halfPushBackObstacles.splice(index, 1);
    }
  }

  // OBSTACLE BARRIER DIRECTIONAL ACTION ANIMATION
  for (let elem of app.obstacleBarrierActionAnimationArray) {
    if (elem.actionDirectionType === "slash") {
      if (elem.delay.state !== true) {
        if (elem.counter.count < elem.counter.limit) {
          elem.counter.count++;
          elem = app.circleArcCrementer(
            "obstacleBarrierDirectionalAction",
            null,
            "isometric",
            elem.radius,
            elem.angle,
            elem.startAngle,
            elem.shape,
            elem.direction,
            elem.face,
            elem,
          );
        }
        if (elem.counter.count >= elem.counter.limit) {
          elem.delay.state = true;
        }
      } else {
        if (elem.delay.count < elem.delay.limit) {
          elem.delay.count++;
        }
        if (elem.delay.count >= elem.delay.limit) {
          let index = app.obstacleBarrierActionAnimationArray.findIndex((x) => {
            return x.id === elem.id;
          });
          app.obstacleBarrierActionAnimationArray.splice(index, 1);
        }
      }
    }
    if (elem.actionDirectionType === "thrust") {
      if (elem.delay.state !== true) {
        if (elem.counter.count < elem.counter.limit) {
          elem.counter.count++;
          elem = app.directionalActionAnimLineCrementer(elem.ownerType, null, elem);
        }
        if (elem.counter.count >= elem.counter.limit) {
          elem.delay.state = true;
        }
      } else {
        if (elem.delay.count < elem.delay.limit) {
          elem.delay.count++;
        }
        if (elem.delay.count >= elem.delay.limit) {
          let index = app.obstacleBarrierActionAnimationArray.findIndex((x) => {
            return x.id === elem.id;
          });
          app.obstacleBarrierActionAnimationArray.splice(index, 1);
        }
      }
    }
  }
}
