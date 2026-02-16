export function checkFlanking(app, player) {
  // CHECK/SET STATE
  if (player.flanking.state === true) {
    // RESET DODGING
    app.players[player.number - 1].dodging = {
      countState: false,
      state: false,
      count: 0,
      limit: player.dodging.limit,
      peak: {
        start: player.dodging.peak.start,
        end: player.dodging.peak.end,
      },
      direction: "",
    };

    if (player.elasticCounter.state === true && player.elasticCounter.type === "dodging") {
      player.elasticCounter.state = false;
      player.elasticCounter.type = "";
      player.elasticCounter.subType = "";
    }

    if (app.players[player.number - 1].popups.find((x) => x.msg === "dodging")) {
      app.players[player.number - 1].popups.splice(
        app.players[player.number - 1].popups.findIndex((x) => x.msg === "dodging"),
        1,
      );
    }

    if (player.flanking.step === 2) {
      // console.log(
      //   "flanking step 2 plyr dir: ",
      //   player.direction,
      //   " pre-flank dir: ",
      //   player.flanking.preFlankDirection,
      //   " flank dir: ",
      //   player.flanking.direction,
      //   "current position: ",
      //   player.currentPosition.cell.number,
      //   " strafing: ",
      //   player.strafing.state,
      //   " move step: ",
      //   player.moving.step
      // );
      // console.log(
      //   "flanking step 2: ",
      //   player.moving.state,
      //   player.moving.step,
      //   "-",
      //   player.turning.state
      // );
      // console.log("3", player.currentPosition.cell.number);

      player.direction = app.getOppositeDirection(player.flanking.direction);
      player.turning.toDirection = app.getOppositeDirection(player.flanking.direction);

      player.flanking = {
        checking: false,
        direction: "",
        preFlankDirection: "",
        state: false,
        step: 0,
        target1: { x: 0, y: 0 },
        target2: { x: 0, y: 0 },
      };

      if (player.popups.find((x) => x.msg === "flanking2")) {
        player.popups.splice(
          player.popups.findIndex((y) => y.msg === "flanking2"),
          1,
        );
      }
    }
    if (player.flanking.step === 1) {
      // console.log(
      //   "flanking step 1 plyr dir: ",
      //   player.direction,
      //   " pre-flank dir: ",
      //   player.flanking.preFlankDirection,
      //   " flank dir: ",
      //   player.flanking.direction,
      //   "current position: ",
      //   player.currentPosition.cell.number,
      //   " strafing: ",
      //   player.strafing.state,
      //   " move step: ",
      //   player.moving.step
      // );
      // console.log("flanking step 1: ");
      // console.log("2", player.currentPosition.cell.number);
      let continueFlank = false;
      if (
        app.keyPressed[player.number - 1].north === true ||
        app.keyPressed[player.number - 1].south === true ||
        app.keyPressed[player.number - 1].east === true ||
        app.keyPressed[player.number - 1].west === true
      ) {
        if (player.flanking.direction === keyPressedDirection) {
          // console.log(
          //   "already flanking in this direction. no move interrupt. continue flank"
          // );
          continueFlank = true;
        } else {
          // console.log(
          //   "flanking cancelled by move input!",
          //   player.flanking.direction,
          //   player.turning.toDirection,
          //   player.direction,
          //   keyPressedDirection
          // );
          player.action = "idle";
          player.turning.toDirection = player.direction;

          app.players[player.number - 1].statusDisplay = {
            state: true,
            status: "flanking cancelled!",
            count: 1,
            limit: app.players[player.number - 1].statusDisplay.limit,
          };
          player.flanking = {
            checking: false,
            direction: "",
            preFlankDirection: "",
            state: false,
            step: 0,
            target1: { x: 0, y: 0 },
            target2: { x: 0, y: 0 },
          };

          if (player.popups.find((x) => x.msg === "flanking2")) {
            player.popups.splice(
              player.popups.findIndex((y) => y.msg === "flanking2"),
              1,
            );
          }
          if (!player.popups.find((x) => x.msg === "noFlanking")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "noFlanking",
              img: "",
            });
          }
        }
      } else {
        continueFlank = true;
      }

      if (continueFlank === true) {
        let target = app.getTarget(player);

        let myCell = app.gridInfo.find(
          (elem2) => elem2.number.x === player.currentPosition.cell.number.x && elem2.number.y === player.currentPosition.cell.number.y,
        );
        let myCellBlock = app.checkMyCellBarrier(player.direction, myCell);

        if (target.cell1.free === true && myCellBlock !== true) {
          player.flanking.step = 2;
          player.flanking.target2 = target.cell1.number;
          // player.action = 'moving';
          player.action = "flanking";
          player.moving = {
            state: true,
            step: 0,
            course: "",
            origin: {
              number: {
                x: player.currentPosition.cell.number.x,
                y: player.currentPosition.cell.number.y,
              },
              center: {
                x: player.currentPosition.cell.center.x,
                y: player.currentPosition.cell.center.y,
              },
            },
            destination: target.cell1.center,
          };
          nextPosition = app.lineCrementer(player);
          player.nextPosition = nextPosition;

          if (player.ai.state === true) {
            app.keyPressed[player.number - 1].dodge = false;
          }

          if (!player.popups.find((x) => x.msg === "flanking2")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 20,
              type: "",
              position: "",
              msg: "flanking2",
              img: "",
            });
          }

          if (app.players[player.number - 1].popups.find((x) => x.msg === "dodging")) {
            app.players[player.number - 1].popups.splice(
              app.players[player.number - 1].popups.findIndex((x) => x.msg === "dodging"),
              1,
            );
          }
        } else {
          // console.log(
          //   "cancel flanking 2",
          //   player.flanking.direction,
          //   player.flanking.preFlankDirection,
          //   player.direction
          // );
          player.action = "idle";
          player.turning.toDirection = player.direction;

          app.players[player.number - 1].statusDisplay = {
            state: true,
            status: "flanking cancelled!",
            count: 1,
            limit: app.players[player.number - 1].statusDisplay.limit,
          };
          player.flanking = {
            checking: false,
            direction: "",
            preFlankDirection: "",
            state: false,
            step: 0,
            target1: { x: 0, y: 0 },
            target2: { x: 0, y: 0 },
          };

          if (player.popups.find((x) => x.msg === "flanking2")) {
            player.popups.splice(
              player.popups.findIndex((y) => y.msg === "flanking2"),
              1,
            );
          }
          if (!player.popups.find((x) => x.msg === "noFlanking")) {
            player.popups.push({
              state: false,
              count: 0,
              limit: 30,
              type: "",
              position: "",
              msg: "noFlanking",
              img: "",
            });
          }
        }
      }
    }
  }
  // START
  if (app.keyPressed[player.number - 1].dodge === true && player.flanking.state !== true && player.attacking.state !== true) {
    if (
      app.keyPressed[player.number - 1].north === true ||
      app.keyPressed[player.number - 1].south === true ||
      app.keyPressed[player.number - 1].east === true ||
      app.keyPressed[player.number - 1].west === true
    ) {
      if (player.strafing.state !== true && player.flanking.state !== true) {
        const cancelDodge = () => {
          // RESET DODGING
          app.players[player.number - 1].stamina.current += app.staminaCostRef.dodge.pre;
          app.players[player.number - 1].dodging = {
            countState: false,
            state: false,
            count: 0,
            limit: player.dodging.limit,
            peak: {
              start: player.dodging.peak.start,
              end: player.dodging.peak.end,
            },
            direction: "",
          };
          player.action = "idle";
          if (player.elasticCounter.state === true && player.elasticCounter.type === "dodging") {
            player.elasticCounter.state = false;
            player.elasticCounter.type = "";
            player.elasticCounter.subType = "";
          }
        };

        const continueDodge = () => {
          player.dodging.countState = true;
        };
        let canFlank1 = false;

        if (player.dodging.countState === true && player.dodging.state !== true) {
          if (player.dodging.count <= player.dodging.peak.start - player.crits.dodge) {
            canFlank1 = true;
            // console.log("can flank before dodge peak start");
          } else {
            console.log("too late in dodge windup to flank");
            continueDodge();
          }
        }
        if (player.dodging.countState === true && player.dodging.state === true) {
          // console.log("peak dodging. can't flank");
        }
        if (player.dodging.countState !== true && player.dodging.state !== true) {
          console.log("highly unlikely. can flank anyway");
          canFlank1 = true;
        }

        if (canFlank1 === true) {
          cancelDodge();
          if (keyPressedDirection !== player.direction) {
            let canFlank2 = false;
            switch (player.direction) {
              case "north":
                if (keyPressedDirection === "east" || keyPressedDirection === "west") {
                  canFlank2 = true;
                }
                break;
              case "south":
                if (keyPressedDirection === "east" || keyPressedDirection === "west") {
                  canFlank2 = true;
                }
                break;
              case "west":
                if (keyPressedDirection === "north" || keyPressedDirection === "south") {
                  canFlank2 = true;
                }
                break;
              case "east":
                if (keyPressedDirection === "north" || keyPressedDirection === "south") {
                  canFlank2 = true;
                }
                break;
            }

            if (canFlank2 === true) {
              if (player.stamina.current - app.staminaCostRef.flank >= 0) {
                // console.log('flanking step',keyPressedDirection,player.direction);
                app.players[player.number - 1].flanking.checking = true;
                app.players[player.number - 1].flanking.direction = keyPressedDirection;
                app.players[player.number - 1].flanking.preFlankDirection = player.direction;

                let target = app.getTarget(player);

                let myCell = app.gridInfo.find(
                  (elem2) => elem2.number.x === player.currentPosition.cell.number.x && elem2.number.y === player.currentPosition.cell.number.y,
                );
                let myCellBlock = app.checkMyCellBarrier(keyPressedDirection, myCell);

                // if (target.cell1.free === true) {
                if (target.cell1.free === true && myCellBlock !== true) {
                  player.stamina.current = player.stamina.current - app.staminaCostRef.flank;
                  // console.log('flank stam check1. cost',app.staminaCostRef.flank,'stam',player.stamina.current);

                  // console.log('flanking step 0 plyr dir: ',player.direction,' pre-flank dir: ',player.flanking.preFlankDirection,' flank dir: ',player.flanking.direction,"current position: ",player.currentPosition.cell.number,' strafing: ',player.strafing.state,' move step: ',player.moving.step);

                  app.players[player.number - 1].flanking.checking = false;
                  app.players[player.number - 1].flanking.state = true;
                  app.players[player.number - 1].flanking.step = 1;
                  app.players[player.number - 1].flanking.target1 = target.cell1.number;
                  // console.log('app.players[player.number-1].flanking.target1',app.players[player.number-1].flanking.target1);
                  // player.action = 'moving';

                  if (!player.popups.find((x) => x.msg === "preAction2") && !player.popups.find((x) => x.msg === "dodgeStart")) {
                    player.popups.push({
                      state: false,
                      count: 0,
                      limit: 5,
                      type: "",
                      position: "",
                      msg: "preAction2",
                      img: "",
                    });
                  }

                  player.action = "flanking";
                  player.moving = {
                    state: true,
                    step: 0,
                    course: "",
                    origin: {
                      number: {
                        x: player.currentPosition.cell.number.x,
                        y: player.currentPosition.cell.number.y,
                      },
                      center: {
                        x: player.currentPosition.cell.center.x,
                        y: player.currentPosition.cell.center.y,
                      },
                    },
                    destination: target.cell1.center,
                  };
                  nextPosition = app.lineCrementer(player);
                  player.nextPosition = nextPosition;
                  // console.log("1", player.currentPosition.cell.number);
                  if (
                    app.mouseOverCell.state === true &&
                    app.mouseOverCell.cell.number.x === player.currentPosition.cell.number.x &&
                    app.mouseOverCell.cell.number.y === player.currentPosition.cell.number.y
                  ) {
                    app.clicked.player = undefined;
                  }
                } else {
                  // console.log(
                  //   "cancel flanking 1",
                  //   player.flanking.direction,
                  //   player.flanking.preFlankDirection,
                  //   player.direction,
                  //   player.action
                  // );
                  player.action = "idle";
                  player.turning.toDirection = player.direction;

                  app.players[player.number - 1].flanking.checking = false;
                  app.players[player.number - 1].flanking.state = false;
                  app.players[player.number - 1].flanking.direction = "";
                  app.players[player.number - 1].flanking.preFlankDirection = "";

                  if (!player.popups.find((x) => x.msg === "noFlanking")) {
                    player.popups.push({
                      state: false,
                      count: 0,
                      limit: 30,
                      type: "",
                      position: "",
                      msg: "noFlanking",
                      img: "",
                    });
                  }
                  if (player.popups.find((x) => x.msg === "flanking2")) {
                    player.popups.splice(
                      player.popups.findIndex((y) => y.msg === "flanking2"),
                      1,
                    );
                  }
                }
              } else {
                // console.log('flank stam check. cost',app.staminaCostRef.flank,'stam',player.stamina.current);
                player.action = "idle";
                player.stamina.current = 0;
                player.statusDisplay = {
                  state: true,
                  status: "Out of Stamina",
                  count: 1,
                  limit: player.statusDisplay.limit,
                };
              }
            } else {
              console.log("cant flank2 incompatible direction");
            }
          }
          if (keyPressedDirection === player.direction) {
            console.log("!! dodge roll key combo!! or kick");
          }
        }
      } else {
        // console.log("already strafing and/or flanking. cant start flank");
      }
    }
  }
}
