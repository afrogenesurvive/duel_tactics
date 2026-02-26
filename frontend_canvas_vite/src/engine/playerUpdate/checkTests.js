export function checkTests(app, player) {
  if (app.time === 10 && player.number === 1) {
    app.toggleCameraCustomView();
    // app.setAutoCamera("test", player);
    // app.setAutoCamera('attackFocus',player);
    // app.setAutoCamera('attackFocusBreak',player);
    // app.setAutoCamera('playerSpawnFocus',player);
    // app.setAutoCamera('aiSpawnFocus',player);
    // app.setAutoCamera('pushbackPan',player);
    // app.setAutoCamera('followBolt',player);
    // console.log(
    //   "xxx",
    //   app.gridInfo.filter((x) => x.obstacle.state === true || x.barrier.state === true && x.).length
    // );
    // app.projectileTester(app.gridInfo.find((x) => x.number.x === 3 && x.number.y === 0));
    // let testTraps = app.customObstacleBarrierTrapSet("activateInactive", "");
    // let testTraps = app.customObstacleBarrierTrapSet("shuffleActive","")
    // let testTraps = app.customObstacleBarrierTrapSet("refreshActive","")
    // let testTraps = app.customObstacleBarrierTrapSet("setNewRandom", "");
    // let testTraps = app.customObstacleBarrierTrapSet(
    //   "setNewCustom",
    //   app.customTrapSetNewCustomTestData
    // );
    // for (const trap of testTraps) {
    //   app.gridInfo.find((x) => x.number.x === trap.location.x && x.number.y === trap.location.y)[trap.type].trap = trap.trap;
    // }
    // player = app.setElasticCounter("test", "start", true, player);
  }
  // TRAPS
  if (app.time === 100 && player.number === 1) {
    // let testTraps = app.customObstacleBarrierTrapSet("refreshActive", "");
    // let testTraps = app.customObstacleBarrierTrapSet("activateInactive", "");
  }
  if (app.time === 120 && player.number === 1) {
    // app.setDeflection(player, "defended", true);
    // app.setDeflection(player, "attacked", false);
    // app.pushBack(player, app.getOppositeDirection(player.direction));
  }
  // CIRCLE ARC CREMENTER TESTING
  if (app.testCount.state === true && player.number === 1) {
    if (app.testCount.count < app.testCount.limit) {
      app.testCount.count++;

      app.circleArcCrementer("testing", player, "isometric", 50, 180, 180, "arc", "counterClockwise", "front", "east");
    }
    if (app.testCount.count >= app.testCount.limit) {
      app.testCount.state = false;
    }
  }
  // POPUP TESTING
  if (app.time === 100 && player.number === 1) {
    let newArray = [];
    let x = 0;
    let y = 0;
    for (const [key, value] of Object.entries(app.popupImageRef)) {
      newArray.push(key);
    }
    // player.popups.push({
    //   state: false,
    //   count: 0,
    //   limit: 50,
    //   type: "",
    //   position: "",
    //   msg: "hpUp" + "_-5",
    //   img: "",
    //   cell: app.gridInfo.find(
    //     (x) =>
    //       x.number.x === player.currentPosition.cell.number.x &&
    //       x.number.y === player.currentPosition.cell.number.y
    //   ),
    // });
    // for (var i = 0; i < 12; i++) {
    //   if (
    //     !player.popups.find((x) => x.msg === newArray[i])
    //     // player.number === 2 &&
    //     // newArray[i] !== "hpUp" &&
    //     // newArray[i] !== "hpDown"
    //   ) {
    //     if (newArray[i] === "hpUp" || newArray[i] === "hpDown") {
    //       player.popups.push({
    //         state: false,
    //         count: 0,
    //         limit: 50,
    //         type: "",
    //         position: "",
    //         msg: newArray[i] + "_-5",
    //         img: "",
    //         cell: app.gridInfo.find(
    //           (x) =>
    //             x.number.x === player.currentPosition.cell.number.x &&
    //             x.number.y === player.currentPosition.cell.number.y
    //         ),
    //       });
    //     } else {
    //       player.popups.push({
    //         state: false,
    //         count: 0,
    //         limit: 50,
    //         type: "",
    //         position: "",
    //         msg: newArray[i],
    //         img: "",
    //         cell: app.gridInfo.find(
    //           (x) =>
    //             x.number.x === player.currentPosition.cell.number.x &&
    //             x.number.y === player.currentPosition.cell.number.y
    //         ),
    //       });
    //     }
    //   }
    // }
  }
  // DEFLECTION TESTING
  // if (app.time === 100 && player.number === 1) {
  //   app.setDeflection(player, "parried", false);
  // }
  // if (app.time === 250 && player.number === 1) {
  //   // app.setDeflection(player, "attacked", false);
  //   app.setDeflection(player, "outOfStamina", false);
  // }
}
