export function customObstacleBarrierTrapSet(app, instructionType, data) {
  // when externalized, call and update gridinfo function
  let localGridInfo = [];
  // console.log("customObstacleBarrierTrapSet", instructionType);
  let type;
  let trapsToSet = [];
  const trapRandomizer = (trap) => {
    trap.persistent = app.rnJesus(0, 3) === 1;
    if (trap.persistent !== true) {
      switch (app.rnJesus(0, 3)) {
        case 0:
          trap.remaining = 5;
          break;
        case 1:
          trap.remaining = 10;
          break;
        case 2:
          trap.remaining = 15;
          break;
        case 3:
          trap.remaining = 25;
          break;
        default:
          break;
      }
    } else {
      trap.remaining = 0;
    }

    trap.direction = "";
    trap.action = "attack";
    trap.timer.enabled = app.rnJesus(1, 0) === 1;
    switch (app.rnJesus(0, 2)) {
      case 0:
        if (app.rnJesus(0, 1) === 1) {
          trap.timer.limit = 30;
        } else {
          trap.timer.limit = 40;
        }
        break;
      case 1:
        if (app.rnJesus(0, 1) === 1) {
          trap.timer.limit = 40;
        } else {
          trap.timer.limit = 60;
        }
        break;
      case 2:
        if (app.rnJesus(0, 1) === 1) {
          trap.timer.limit = 60;
        } else {
          trap.timer.limit = 80;
        }
        break;
      default:
        break;
    }
    if (app.rnJesus(0, 2) === 1) {
      trap.trigger.type = "player";
    } else {
      trap.trigger.type = "any";
    }
    let weapons = app.itemList.filter((x) => x.type === "weapon");
    let indx = app.rnJesus(0, weapons.length - 1);
    trap.itemNameRef = weapons[indx].name;
    return trap;
  };
  if (instructionType === "activateInactive") {
    for (let elem of app.gridInfo) {
      if (elem.obstacle.state === true) {
        type = "obstacle";
        if (
          elem[type].trap?.state !== true &&
          elem[type].trap?.persistent !== undefined &&
          elem[type].trap?.action !== "" &&
          elem[type].trap?.timer.enabled !== undefined
        ) {
          elem[type].trap.state = true;
          elem[type].trap = app.obstacleBarrierTrapInitSet("", type, elem);
          // console.log("1", elem.number, elem[type].trap);
          trapsToSet.push({
            type: type,
            location: elem.number,
            trap: elem[type].trap,
          });
        }
      }
      if (elem.barrier.state === true) {
        type = "barrier";
        if (
          elem[type].trap.state !== true &&
          elem[type].trap.persistent !== undefined &&
          elem[type].trap.action !== "" &&
          elem[type].trap.timer.enabled !== undefined
        ) {
          elem[type].trap.state = true;
          elem[type].trap = app.obstacleBarrierTrapInitSet("", type, elem);
          // console.log("2", elem.number, elem[type].trap);
          trapsToSet.push({
            type: type,
            location: elem.number,
            trap: elem[type].trap,
          });
        }
      }
    }
  }
  if (instructionType === "shuffleActive") {
    for (let elem of app.gridInfo) {
      if (elem.obstacle.state === true) {
        if (elem.obstacle.trap.state === true) {
          elem.obstacle.trap = trapRandomizer(elem.obstacle.trap, "obstacle");
          elem.obstacle.trap = app.obstacleBarrierTrapInitSet("", "obstacle", elem);
          trapsToSet.push({
            type: "obstacle",
            location: elem.number,
            trap: elem.obstacle.trap,
          });
        }
      }
      if (elem.barrier.state === true) {
        if (elem.barrier.trap.state === true) {
          elem.barrier.trap = trapRandomizer(elem.barrier.trap, "barrier");
          elem.barrier.trap = app.obstacleBarrierTrapInitSet("", "barrier", elem);
          trapsToSet.push({
            type: "barrier",
            location: elem.number,
            trap: elem.barrier.trap,
          });
        }
      }
    }
  }
  if (instructionType === "refreshActive") {
    for (let elem of app.gridInfo) {
      if (elem.obstacle.state === true) {
        type = "obstacle";
        if (elem[type].trap.state === true) {
          if (elem[type].trap.persistent !== true) {
            switch (app.rnJesus(0, 3)) {
              case 0:
                elem[type].trap.remaining = 5;
                break;
              case 1:
                elem[type].trap.remaining = 10;
                break;
              case 2:
                elem[type].trap.remaining = 15;
                break;
              case 3:
                elem[type].trap.remaining = 25;
                break;
              default:
                break;
            }
          } else {
            elem[type].trap.remaining = 0;
          }
          elem[type].trap = app.obstacleBarrierTrapInitSet("", type, elem);
          trapsToSet.push({
            type: type,
            location: elem.number,
            trap: elem.trap,
          });
        }
        if (elem[type].trap.state !== true && elem[type].trap.persistent !== true && elem[type].trap.remaining === 0) {
          elem[type].trap.state = true;
          switch (app.rnJesus(0, 3)) {
            case 0:
              elem[type].trap.remaining = 5;
              break;
            case 1:
              elem[type].trap.remaining = 10;
              break;
            case 2:
              elem[type].trap.remaining = 15;
              break;
            case 3:
              elem[type].trap.remaining = 25;
              break;
            default:
              break;
          }
          elem[type].trap = app.obstacleBarrierTrapInitSet("", type, elem);
          trapsToSet.push({
            type: type,
            location: elem.number,
            trap: elem[type].trap,
          });
        }
      }
      if (elem.barrier.state === true) {
        type = "barrier";
        if (elem[type].trap.state === true) {
          if (elem[type].trap.persistent !== true) {
            switch (app.rnJesus(0, 3)) {
              case 0:
                elem[type].trap.remaining = 5;
                break;
              case 1:
                elem[type].trap.remaining = 10;
                break;
              case 2:
                elem[type].trap.remaining = 15;
                break;
              case 3:
                elem[type].trap.remaining = 25;
                break;
              default:
                break;
            }
          } else {
            elem[type].trap.remaining = 0;
          }
          elem[type].trap = app.obstacleBarrierTrapInitSet("", type, elem);
          trapsToSet.push({
            type: type,
            location: elem.number,
            trap: elem.trap,
          });
        }
        if (elem[type].trap.state !== true && elem[type].trap.persistent !== true && elem[type].trap.remaining === 0) {
          elem[type].trap.state = true;
          switch (app.rnJesus(0, 3)) {
            case 0:
              elem[type].trap.remaining = 5;
              break;
            case 1:
              elem[type].trap.remaining = 10;
              break;
            case 2:
              elem[type].trap.remaining = 15;
              break;
            case 3:
              elem[type].trap.remaining = 25;
              break;
            default:
              break;
          }
          elem[type].trap = app.obstacleBarrierTrapInitSet("", type, elem);
          trapsToSet.push({
            type: type,
            location: elem.number,
            trap: elem[type].trap,
          });
        }
      }
    }
  }
  if (instructionType === "setNewRandom") {
    let obsBarList = app.gridInfo.filter((x) => x.obstacle.state === true || x.barrier.state === true);
    let toSetCount = 0;
    let usedIndices = [];
    switch (app.rnJesus(0, 3)) {
      case 0:
        toSetCount = Math.floor(obsBarList.length * 0.25);
        break;
      case 1:
        toSetCount = Math.floor(obsBarList.length * 0.5);
        break;
      case 2:
        toSetCount = Math.floor(obsBarList.length * 0.75);
        break;
      case 3:
        toSetCount = obsBarList.length;
        break;
      default:
        break;
    }
    for (let index = 0; index < toSetCount; index++) {
      let indx2 = app.rnJesus(0, toSetCount);
      let indx2Unset = true;
      while (indx2Unset === true) {
        indx2 = app.rnJesus(0, toSetCount);
        indx2Unset = usedIndices.includes(indx2);
      }
      if (indx2Unset !== true) {
        usedIndices.push(indx2);
        // console.log("here", indx2, usedIndices);
        let elem = obsBarList[indx2];
        if (elem.obstacle.state === true) {
          type = "obstacle";
          elem[type].trap = trapRandomizer(elem[type].trap, type);
          elem[type].trap.state = true;
          elem[type].trap = app.obstacleBarrierTrapInitSet("", type, elem);
          trapsToSet.push({
            type: type,
            location: elem.number,
            trap: elem[type].trap,
          });
        }
        if (elem.barrier.state === true) {
          type = "barrier";
          elem[type].trap = trapRandomizer(elem[type].trap, type);
          elem[type].trap.state = true;
          elem[type].trap = app.obstacleBarrierTrapInitSet("", type, elem);
          trapsToSet.push({
            type: type,
            location: elem.number,
            trap: elem[type].trap,
          });
        }
      }
    }
  }
  if (instructionType === "setNewCustom") {
    for (const elem of data) {
      let cellRef = app.gridInfo.find((x) => x.number.x === elem.location.x && x.number.y === elem.location.y);
      if (cellRef.obstacle.state === true) {
        if (elem.type === "obstacle") {
          cellRef[elem.type].trap = {
            state: true,
            persistent: elem.persistent,
            remaining: elem.remaining,
            direction: elem.direction || "",
            target: elem.target || {},
            timer: {
              enabled: elem.timerEnabled,
              state: false,
              count: 0,
              limit: elem.timerLimit,
            },
            trigger: {
              type: elem.triggerType,
            },
            action: "attack",
            acting: {
              state: false,
              count: 0,
              peak: 0,
              limit: 0,
            },
            itemNameRef: elem.itemNameRef,
            item: {},
            ammo: 0,
          };
          cellRef[elem.type].trap = app.obstacleBarrierTrapInitSet("", elem.type, cellRef);
          trapsToSet.push({
            type: elem.type,
            location: elem.location,
            trap: cellRef[elem.type].trap,
          });
        } else {
          console.log(
            "custom trap type is ",
            elem.type,
            " but no ",
            elem.type,
            " is in app location",
            elem.location,
            ". Invalid selection. Ignoring...",
          );
        }
      }
      if (cellRef.barrier.state === true) {
        if (elem.type === "barrier") {
          cellRef[elem.type].trap = {
            state: true,
            persistent: elem.persistent,
            remaining: elem.remaining,
            direction: elem.direction || "",
            target: elem.target || {},
            timer: {
              enabled: elem.timerEnabled,
              state: false,
              count: 0,
              limit: elem.timerLimit,
            },
            trigger: {
              type: elem.triggerType,
            },
            action: "attack",
            acting: {
              state: false,
              count: 0,
              peak: 0,
              limit: 0,
            },
            itemNameRef: elem.itemNameRef,
            item: {},
            ammo: 0,
          };
          cellRef[elem.type].trap = app.obstacleBarrierTrapInitSet("", elem.type, cellRef);
          trapsToSet.push({
            type: elem.type,
            location: elem.location,
            trap: cellRef[elem.type].trap,
          });
        } else {
          console.log(
            "custom trap type is ",
            elem.type,
            " but no ",
            elem.type,
            " is in app location",
            elem.location,
            ". Invalid selection. Ignoring...",
          );
        }
      }
      if (cellRef.obstacle.state !== true && cellRef.barrier.state !== true) {
        console.log("custom obs/bar trap location invalid. Ignoring...");
      }
    }
  }
  console.log("trapsToSet", trapsToSet);
  // return trapsToSet;
}
