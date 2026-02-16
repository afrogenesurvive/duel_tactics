export function drawPlayerStep(app, playerNumber, canvas, context, canvas2, context2) {
  // console.log('drawing player step',playerNumber);

  let gridInfo = [];
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  let wall = app.wallRef.current;
  let wall2 = app.wall2Ref.current;
  let wall3 = app.wall3Ref.current;

  canvas.width = app.canvasWidth;
  canvas.height = app.canvasHeight;
  canvas2.width = app.canvasWidth;
  canvas2.height = app.canvasHeight;

  let floorImageWidth = app.floorImageWidth;
  let floorImageHeight = app.floorImageHeight;
  let wallImageWidth = app.wallImageWidth;
  let wallImageHeight = app.wallImageHeight;
  let sceneX = app.canvasWidth / 2;
  let sceneY = app.sceneY;
  let tileWidth = app.tileWidth;

  gridInfo = app.gridInfo;

  let player = app.players[playerNumber - 1];

  let updatedPlayerImg;
  let newDirection;

  if (player.falling.state === true) {
    // console.log('player',player.number,'falling count',player.falling.count,'limit',player.falling.limit,'position',player.nextPosition,'action',player.action);
    if (player.falling.count === player.falling.limit) {
      app.killPlayer(player);
    }
  }

  context.clearRect(0, 0, app.canvasWidth, app.canvasHeight);
  context2.clearRect(0, 0, app.canvasWidth, app.canvasHeight);

  context.translate(app.camera.zoomFocusPan.x, app.camera.zoomFocusPan.y);
  context2.translate(app.camera.zoomFocusPan.x, app.camera.zoomFocusPan.y);

  context.scale(app.camera.zoom.x, app.camera.zoom.y);
  context2.scale(app.camera.zoom.x, app.camera.zoom.y);

  for (var x = 0; x < app.gridWidth + 1; x++) {
    for (var y = 0; y < app.gridWidth + 1; y++) {
      let p = new Point();
      p.x = x * tileWidth;
      p.y = y * tileWidth;
      let iso = app.cartesianToIsometric(p);

      if (app.showGridIsoGuide === true) {
        context.font = "15px Arial";
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(iso.x + sceneX, iso.y + sceneY, 3, 0, 2 * Math.PI);
        context.fill();
        context.fillText("" + x + "," + y + "", iso.x + sceneX - 25, iso.y + sceneY - 5);

        context.fillStyle = "white";
        context.beginPath();
        context.arc(p.x + sceneX, p.y + sceneY, 3, 0, 2 * Math.PI);
        context.fill();
        context.fillText("" + x + "," + y + "", p.x + sceneX, p.y + sceneY - 5);
      }

      let offset = { x: floorImageWidth / 2, y: floorImageHeight };
      iso.x += sceneX;
      iso.y += sceneY;
      let center = {
        x: iso.x - offset.x / 2 + 23,
        y: iso.y - offset.y / 2 - 2,
      };

      let floor;
      let drawFloor = true;
      let gridInfoCell = app.gridInfo.find((elem) => elem.number.x === x && elem.number.y === y);
      gridInfoCell.center = center;
      gridInfoCell.drawCenter = center;
      floor = app.floorImgs[gridInfoCell.terrain.name];

      // VOID
      // FLOOR
      if (gridInfoCell.void.state === true) {
        // drawFloor = false;
        floor = app.floorImgs.void3;
      }
      //BLINKER!!
      if (app.cellToVoid.state === true && app.cellToVoid.x === x && app.cellToVoid.y === y) {
        if (app.cellToVoid.count === 1) {
          if (
            !app.cellPopups.find(
              (x) => x.msg === "cellVoiding" && x.cell.number.x === gridInfoCell.number.x && x.cell.number.y === gridInfoCell.number.y,
            )
          ) {
            app.cellPopups.push({
              state: false,
              count: 0,
              limit: 35,
              type: "",
              position: "",
              msg: "cellVoiding",
              color: "",
              img: "",
              cell: app.gridInfo.find((x) => x.number.x === gridInfoCell.number.x && x.number.y === gridInfoCell.number.y),
            });
          }
        }
        if (app.cellToVoid.count % 5 === 0) {
          floor = app.floorImgs.void3;
          // drawFloor = false;
        } else {
          floor = app.floorImgs.void2;
          // drawFloor = true;
        }
      }

      // DROWNING
      for (const plyrb of app.players) {
        if (plyrb.drowning === true) {
          if (plyrb.currentPosition.cell.number.x === x && plyrb.currentPosition.cell.number.y === y) {
            // console.log('player',plyrb.number,'drowning count',plyrb.falling.count,'position',plyrb.nextPosition);
            if (plyrb.falling.count % 2 === 0) {
              // drawFloor = false;
              floor = app.floorImgs.void3;
            } else {
              // floor = floorImgs.stone
              floor = app.floorImgs[gridInfoCell.terrain.name];
            }
          }
        }
      }

      // FALLING OBSTACLE DEEP BLINKER
      if (gridInfoCell.obstacle.state === true && gridInfoCell.obstacle.moving.falling.state === true && gridInfoCell.terrain.type === "deep") {
        if (gridInfoCell.obstacle.moving.falling.count % 3 === 0) {
          floor = app.floorImgs.void3;
        } else {
          floor = app.floorImgs[gridInfoCell.terrain.name];
        }
      }

      // CELLS UNDER ATTACK & PREATTACK!!
      if (app.cellsUnderAttack.length > 0) {
        for (const cll of app.cellsUnderAttack) {
          if (cll.number.x === x && cll.number.y === y) {
            floor = app.floorAttackRef.current;
          }
        }
      }
      if (app.cellsUnderPreAttack.length > 0) {
        for (const cll2 of app.cellsUnderPreAttack) {
          if (cll2.number.x === x && cll2.number.y === y) {
            floor = app.floorAttack2Ref.current;
          }
        }
      }
      // CELLS TO HIGHLIGHT
      if (app.cellsToHighlight.length > 0) {
        for (const cll2 of app.cellsToHighlight) {
          if (cll2.x === x && cll2.y === y) {
            floor = app.floorVoidRef.current;
          }
        }
      }
      // CELLS TO HIGHLIGHT V2!!
      if (app.cellsToHighlight2.length > 0) {
        for (const cll3 of app.cellsToHighlight2) {
          if (cll3.number.x === x && cll3.number.y === y) {
            floor = app.floorHighlightRef.current;
          }
        }
      }

      // FLOOR
      if (drawFloor === true) {
        context.drawImage(floor, iso.x - offset.x, iso.y - offset.y);
      }

      // RUBBLE
      if (gridInfoCell.rubble === true) {
        context.drawImage(app.floorImgs.rubble, iso.x - offset.x, iso.y - offset.y);
      }

      // CELL COORD LABEL
      context.font = "10px Arial";
      context.fillStyle = "black";
      context.fillText("" + x + "," + y + "", iso.x - offset.x / 2 + 18, iso.y - offset.y / 2 + 12);

      context.fillStyle = "black";
      context.fillRect(center.x, center.y, 5, 5);

      // CELL VERTEX POINTS
      let vertices = [
        { x: center.x, y: center.y + tileWidth / 2 },
        { x: center.x + tileWidth, y: center.y },
        { x: center.x, y: center.y - tileWidth / 2 },
        { x: center.x - tileWidth, y: center.y },
      ];
      for (const vertex of vertices) {
        context.fillStyle = "yellow";
        context.fillRect(vertex.x - 2.5, vertex.y - 2.5, 5, 5);
      }
      gridInfoCell.vertices = vertices;

      // TARGET HIGHLIGHT!!
      let floorHighlight;
      for (const plyr3 of app.players) {
        if (x === plyr3.target.cell1.number.x && y === plyr3.target.cell1.number.y) {
          if (plyr3.ai.state !== true && plyr3.dead.state !== true && plyr3.falling.state !== true && plyr3.drowning !== true) {
            switch (plyr3.number) {
              case 1:
                floorHighlight = "purple";
                break;
              case 2:
                floorHighlight = "red";
                break;
            }
          }
          if (plyr3.ai.state === true && plyr3.dead.state !== true && plyr3.falling.state !== true && plyr3.drowning !== true) {
            floorHighlight = "brown";
          }
          if (plyr3.dead.state !== true) {
            context.lineWidth = 5;
            context.beginPath();
            for (const vertex of vertices) {
              context.strokeStyle = floorHighlight;

              context.lineTo(vertex.x, vertex.y);
            }
            context.closePath();
            context.stroke();
          }
        }
      }

      // MOUSED OVER CELL
      if (app.mouseOverCell.state === true && x === app.mouseOverCell.cell.number.x && y === app.mouseOverCell.cell.number.y) {
        context.lineWidth = 5;
        context.beginPath();
        for (const vertex of vertices) {
          context.strokeStyle = "orange";
          context.lineTo(vertex.x, vertex.y);
        }
        context.closePath();
        context.stroke();
      }

      // IN GAME ITEM PLACEMENT!!
      if (gridInfoCell.item.name !== "" && gridInfoCell.void.state !== true) {
        let hide = false;
        if (app.obstacleItemsToDrop.length > 0) {
          for (const cell of app.obstacleItemsToDrop) {
            if (gridInfoCell.number.x === cell.target.x && gridInfoCell.number.y === cell.target.y && gridInfoCell.item.name === cell.item.name) {
              hide = true;
            }
          }
        }

        if (hide !== true) {
          // console.log("Drawing item:", gridInfoCell.item);
          let itemImg;
          let fillClr;
          if (gridInfoCell.item.type === "item") {
            switch (gridInfoCell.item.name) {
              case "moveSpeedUp":
                fillClr = "purple";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "moveSpeedDown":
                fillClr = "blue";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "hpUp":
                fillClr = "yellow";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "hpDown":
                fillClr = "brown";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "focusUp":
                fillClr = "white";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "focusDown":
                fillClr = "black";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "strengthUp":
                fillClr = "green";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "strengthDown":
                fillClr = "red";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "ammo5":
                fillClr = "#283618";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
              case "ammo10":
                fillClr = "#283618";
                itemImg = app.itemImgs[gridInfoCell.item.name];
                break;
            }
          } else if (gridInfoCell.item.type === "weapon") {
            switch (gridInfoCell.item.subType) {
              case "sword":
                fillClr = "orange";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
              case "spear":
                fillClr = "maroon";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
              case "crossbow":
                fillClr = "navy";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
            }
          } else if (gridInfoCell.item.type === "armor") {
            switch (gridInfoCell.item.subType) {
              case "helmet":
                fillClr = "grey";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
              case "mail":
                fillClr = "olive";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
              case "greaves":
                fillClr = "#b5179e";
                itemImg = app.itemImgs[gridInfoCell.item.subType];
                break;
            }
          }

          context.drawImage(itemImg, center.x - 15, center.y - 15);

          // context.fillStyle = fillClr;
          // context.beginPath();
          // context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
          // context.fill();
        }
      }

      //POPUPS
      // CELL HIGHLIGHT
      for (const popup of app.cellPopups) {
        if (popup.state === true && x === popup.cell.number.x && y === popup.cell.number.y) {
          context.lineWidth = 5;
          context.beginPath();
          for (const vertex of vertices) {
            context.strokeStyle = popup.color;
            context.lineTo(vertex.x, vertex.y);
          }
          context.closePath();
          context.stroke();
        }
      }
      // // CELL POPUPS?

      // DRAWN PLAYERS!!
      const playerDrawLog = (
        x,
        y,
        plyr,
        finalAnimIndex,
        updatedPlayerImg,
        sx,
        sy,
        sWidth,
        sHeight,
        pointxthisplayerDrawWidth2,
        pointythisplayerDrawHeight2,
        thisplayerDrawWidth,
        thisplayerDrawHeight,
      ) => {
        console.log("** playerDrawLog **");
        // console.log("-- player --", plyr.number);
        // console.log("-- strafing --", plyr.strafing.state);
        // console.log("-- turning --", plyr.turning.state);
        console.log("-- currently drawing --", x, y);
        // console.log(
        //   "-- current position --",
        //   plyr.currentPosition.cell.number.x,
        //   plyr.currentPosition.cell.number.y
        // );
        // console.log("-- moving state --", plyr.moving.state);
        // console.log("-- moving step --", plyr.moving.step);
        // console.log("-- target --", plyr.target.cell1.number.x, plyr.target.cell1.number.y);
        // console.log("-- direction --", plyr.direction);
        console.log("-- origin --", plyr.moving.origin.number.x, plyr.moving.origin.number.y);
        // console.log("-- action --", plyr.action);
        // console.log("updatedPlayerImg", updatedPlayerImg);

        // console.log("finalAnimIndex", finalAnimIndex);
        // console.log("updatedPlayerImg", updatedPlayerImg);
        // console.log("sx", sx);
        // console.log("sy", sy);
        // console.log("sWidth", sWidth);
        // console.log("sHeight", sHeight);
        // console.log("point.x - app.playerDrawWidth / 2", pointxthisplayerDrawWidth2);
        // console.log("point.y - app.playerDrawHeight / 2", pointythisplayerDrawHeight2);
        // console.log("app.playerDrawWidth", thisplayerDrawWidth);
        // console.log("app.playerDrawHeight", thisplayerDrawHeight);
      };

      for (let plyr of app.players) {
        let point = {
          x: plyr.nextPosition.x,
          y: plyr.nextPosition.y,
        };
        let newCharDrawPoint = {
          x: plyr.nextPosition.x - app.floorImageHeight / 2,
          y: plyr.nextPosition.y - app.floorImageHeight,
        };

        let weapon = plyr.currentWeapon.type;
        if (plyr.currentWeapon.type === "" || !plyr.currentWeapon.type) {
          weapon = "unarmed";
        }

        let finalAnimIndex;

        if (plyr.attacking.state === true && plyr.success.deflected.state !== true) {
          plyr.action = "attacking";
        }
        let frameIndexBase;
        let increment;
        let frameTypeIndex;
        let remainder;
        let newIndex;
        // SET ANIMATION INDEX USED FOR SPRITE SHEET STEPPING BASED ON ACTION
        // FOR TESTING BY CALLING ONLY @ 1 CELL
        if (plyr.currentPosition.cell.number.x === x && plyr.currentPosition.cell.number.y === y && plyr.number === 1) {
          switch (plyr.action) {
            case "moving":
              let moveSpeed = plyr.speed.move;
              if (plyr.stamina.current < 1) {
                moveSpeed = 0.05;
              }
              if (plyr.terrainMoveSpeed.state === true) {
                moveSpeed = plyr.terrainMoveSpeed.speed;
              }
              if (plyr.pushing.state === true) {
                moveSpeed = plyr.pushing.moveSpeed;
              }
              if (plyr.pulling.state === true) {
                moveSpeed = plyr.pulling.moveSpeed;
              }
              if (plyr.pushed.state === true) {
                moveSpeed = plyr.pushed.moveSpeed;
              }
              if (plyr.pulled.state === true) {
                moveSpeed = plyr.pulled.moveSpeed;
              }

              let rangeIndex = plyr.speed.range.indexOf(moveSpeed);
              let moveAnimIndex = app.moveStepRef[rangeIndex].indexOf(plyr.moving.step);
              finalAnimIndex = moveAnimIndex + 1;
              console.log("draw player step", {
                plyr_number: plyr.number,
                move_speed: plyr.speed.move,
                moveSpeed: moveSpeed,
                step: plyr.moving.step,
                finalAnimIndex: finalAnimIndex,
              });

              if (plyr.target.cell1.void == true) {
                // console.log('anim testing mv void spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
              }
              break;
            case "jumping":
              let rangeIndex4 = plyr.speed.range.indexOf(0.1);
              let moveAnimIndex4 = app.moveStepRef[rangeIndex4].indexOf(plyr.moving.step);
              finalAnimIndex = moveAnimIndex4;
              // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
              break;
            case "strafe moving":
              if (plyr.pushBack.state === true) {
                let rangeIndex3 = plyr.speed.range.indexOf(plyr.speed.move);
                let moveAnimIndex3 = app.moveStepRef[rangeIndex3].indexOf(plyr.moving.step);
                finalAnimIndex = moveAnimIndex3;
                console.log("anim testing pushback spd", plyr.speed.move, "step", plyr.moving.step, "indx", finalAnimIndex);
              } else {
                let moveSpeed = plyr.speed.move;
                // if (plyr.pushing.state === true) {
                //   moveSpeed = plyr.pushing.moveSpeed;
                // }
                if (plyr.pulling.state === true) {
                  moveSpeed = plyr.pulling.moveSpeed;
                }
                if (plyr.pushed.state === true) {
                  moveSpeed = plyr.pushed.moveSpeed;
                }
                if (plyr.pulled.state === true) {
                  moveSpeed = plyr.pulled.moveSpeed;
                }
                let rangeIndex2 = plyr.speed.range.indexOf(moveSpeed);
                let moveAnimIndex2 = app.moveStepRef[rangeIndex2].indexOf(plyr.moving.step);
                finalAnimIndex = moveAnimIndex2;
                console.log("anim testing strafe mv spd", plyr.speed.move, "step", plyr.moving.step, "indx", finalAnimIndex);
              }
              break;
            case "flanking":
              let rangeIndex6 = plyr.speed.range.indexOf(0.2);
              let moveAnimIndex6 = app.moveStepRef[rangeIndex6].indexOf(plyr.moving.step);
              finalAnimIndex = moveAnimIndex6;
              console.log("flanking step", plyr.flanking.step, "step", plyr.moving.step, "anim indx", finalAnimIndex);
              // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
              break;
            case "attacking":
              // let animIndex = plyr.attacking.count -1;
              let animIndex;
              // if (
              //   plyr.elasticCounter.state === true &&
              //   plyr.elasticCounter.type === "attacking"
              // ) {
              //   if (plyr.elasticCounter.countUp.state === true) {
              //     animIndex = plyr.elasticCounter.countUp.count - 1;
              //   }
              //   if (plyr.elasticCounter.pause.state === true) {
              //     if (plyr.elasticCounter.pause.count < 11) {
              //       animIndex = plyr.elasticCounter.pause.count - 1;
              //     } else {
              //       if (plyr.elasticCounter.pause.count % 10 === 0) {
              //         animIndex = 9;
              //         // animIndex5 = 10;
              //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
              //       } else {
              //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
              //         animIndex = plyr.elasticCounter.pause.count - mod - 1;
              //       }
              //     }
              //   }
              //   if (plyr.elasticCounter.countDown.state === true) {
              //     animIndex = plyr.elasticCounter.countDown.count - 1;
              //   }
              // } else {
              //   animIndex = plyr.attacking.count - 1;
              // }
              animIndex = plyr.attacking.count - 1;

              frameIndexBase = app.actionAnimFrameTypeCountRef[plyr.action].sheetLength / app.actionAnimFrameTypeCountRef[plyr.action].typeCount;
              increment = Math.ceil(plyr[plyr.action].limit / app.actionAnimFrameTypeCountRef[plyr.action].typeCount);
              frameTypeIndex = Math.floor(plyr[plyr.action].count / increment);
              remainder = plyr[plyr.action].count % increment;
              newIndex = frameIndexBase * frameTypeIndex + remainder;

              finalAnimIndex = newIndex;
              // finalAnimIndex = animIndex;
              // console.log(
              //   "anim testing atk",
              //   plyr.attacking.count,
              //   plyr.attacking.limit,
              //   finalAnimIndex
              // );
              break;
            case "defending":
              let animIndex2 = plyr.defending.count - 1;
              // if (plyr.defending.decay.state !== true) {
              //   if (plyr.defending.count > 0) {
              //     finalAnimIndex = animIndex2;
              //     // console.log('anim testing def wind up',plyr.defending.count,'plyr',plyr.number, animIndex2);
              //   }
              //   if (plyr.defending.count === 0) {
              //     let animIndex2a = 5;
              //     finalAnimIndex = animIndex2a;
              //     // console.log('anim testing def held',plyr.defending.count,'plyr',plyr.number, animIndex2a);
              //   }
              // }
              // if (plyr.defending.decay.state === true) {
              //   if (plyr.defending.decay.count < 11) {
              //     animIndex2 = plyr.defending.decay.count - 1;
              //   } else {
              //     if (plyr.defending.decay.count % 10 === 0) {
              //       animIndex2 = 9;
              //     } else {
              //       let mod = Math.floor(plyr.defending.decay.count / 10) * 10;
              //       animIndex2 = plyr.defending.decay.count - mod - 1;
              //     }
              //   }
              //   finalAnimIndex = animIndex2;
              // }
              frameIndexBase = app.actionAnimFrameTypeCountRef[plyr.action].sheetLength / app.actionAnimFrameTypeCountRef[plyr.action].typeCount;
              increment = Math.ceil(plyr[plyr.action].limit / app.actionAnimFrameTypeCountRef[plyr.action].typeCount);
              frameTypeIndex = Math.floor(plyr[plyr.action].count / increment);
              remainder = plyr[plyr.action].count % increment;
              newIndex = frameIndexBase * frameTypeIndex + remainder;

              finalAnimIndex = newIndex;

              break;
            case "idle":
              if (plyr.number === 1) {
                // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
              }
              if (plyr.number === 2) {
                // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
              }
              let animIndex3 = plyr.idleAnim.count + 1;
              finalAnimIndex = animIndex3;
              // finalAnimIndex = 1;
              break;
            case "falling":
              let animIndex4 = plyr.falling.count - 1;
              finalAnimIndex = animIndex4;
              // console.log("anim testing fall", plyr.falling.count, "plyr", plyr.number);
              break;
            case "deflected":
              let animIndex5 = plyr.success.deflected.count - 1;
              // if (
              //   plyr.elasticCounter.state === true &&
              //   plyr.elasticCounter.type === "deflected"
              // ) {
              //   if (plyr.elasticCounter.countUp.state === true) {
              //     animIndex5 = plyr.elasticCounter.countUp.count - 1;
              //   }
              //   if (plyr.elasticCounter.pause.state === true) {
              //     if (plyr.elasticCounter.pause.count < 11) {
              //       animIndex5 = plyr.elasticCounter.pause.count - 1;
              //     } else {
              //       if (plyr.elasticCounter.pause.count % 10 === 0) {
              //         animIndex5 = 9;
              //         // animIndex5 = 10;
              //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
              //       } else {
              //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
              //         animIndex5 = plyr.elasticCounter.pause.count - mod - 1;
              //       }
              //     }
              //   }
              //   if (plyr.elasticCounter.countDown.state === true) {
              //     animIndex5 = plyr.elasticCounter.countDown.count - 1;
              //   }
              // }

              if (plyr.halfPushBack.state === true) {
                if (plyr.halfPushBack.countUp.state === true) {
                  animIndex5 = plyr.halfPushBack.countUp.count - 1;
                }
                if (plyr.halfPushBack.countDown.state === true) {
                  animIndex5 = plyr.halfPushBack.countDown.count - 1;
                }
              }
              finalAnimIndex = animIndex5;
              // console.log('anim testing dflct',plyr.success.deflected.count,'plyr',plyr.number);
              break;
            case "dodging":
              let animIndex7 = plyr.dodging.count - 1;
              // if (
              //   plyr.elasticCounter.state === true &&
              //   plyr.elasticCounter.type === "dodging"
              // ) {
              //   if (plyr.elasticCounter.countUp.state === true) {
              //     // animIndex7 = plyr.elasticCounter.countUp.count-1;
              //     if (plyr.elasticCounter.countUp.count < 11) {
              //       animIndex7 = plyr.elasticCounter.countUp.count - 1;
              //     } else {
              //       if (plyr.elasticCounter.countUp.count % 10 === 0) {
              //         animIndex7 = 9;
              //         // animIndex5 = 10;
              //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
              //       } else {
              //         let mod = Math.floor(plyr.elasticCounter.countUp.count / 10) * 10;
              //         animIndex7 = plyr.elasticCounter.countUp.count - mod - 1;
              //       }
              //     }
              //   }
              //   if (plyr.elasticCounter.pause.state === true) {
              //     if (plyr.elasticCounter.pause.count < 11) {
              //       animIndex7 = plyr.elasticCounter.pause.count - 1;
              //     } else {
              //       if (plyr.elasticCounter.pause.count % 10 === 0) {
              //         animIndex7 = 9;
              //         // animIndex5 = 10;
              //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
              //       } else {
              //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
              //         animIndex7 = plyr.elasticCounter.pause.count - mod - 1;
              //       }
              //     }
              //   }
              //   if (plyr.elasticCounter.countDown.state === true) {
              //     // animIndex7 = plyr.elasticCounter.countDown.count-1;
              //     if (plyr.elasticCounter.countDown.count < 11) {
              //       animIndex7 = plyr.elasticCounter.countDown.count - 1;
              //     } else {
              //       if (plyr.elasticCounter.countDown.count % 10 === 0) {
              //         animIndex7 = 9;
              //         // animIndex5 = 10;
              //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
              //       } else {
              //         let mod =
              //           Math.floor(plyr.elasticCounter.countDown.count / 10) * 10;
              //         animIndex7 = plyr.elasticCounter.countDown.count - mod - 1;
              //       }
              //     }
              //   }
              // }
              finalAnimIndex = animIndex7;
              console.log("anim testing dodge", plyr.dodging.count, "indx", finalAnimIndex);
              break;
          }
        }
        // FOR TESTING BY CALLING ONLY @ 1 CELL

        // REAL DEAL
        switch (plyr.action) {
          case "moving":
            let moveSpeed = plyr.speed.move;
            if (plyr.terrainMoveSpeed.state === true) {
              moveSpeed = plyr.terrainMoveSpeed.speed;
            }
            if (plyr.pushing.state === true) {
              moveSpeed = plyr.pushing.moveSpeed;
            }
            if (plyr.pulling.state === true) {
              moveSpeed = plyr.pulling.moveSpeed;
            }
            if (plyr.pushed.state === true) {
              moveSpeed = plyr.pushed.moveSpeed;
            }
            if (plyr.pulled.state === true) {
              moveSpeed = plyr.pulled.moveSpeed;
            }
            let rangeIndex = plyr.speed.range.indexOf(moveSpeed);
            let moveAnimIndex = app.moveStepRef[rangeIndex].indexOf(plyr.moving.step);
            finalAnimIndex = moveAnimIndex + 1;
            // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
            if (plyr.target.cell1.void == true) {
              // console.log('anim testing mv void spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
            }
            break;
          case "jumping":
            let rangeIndex4 = plyr.speed.range.indexOf(0.1);
            let moveAnimIndex4 = app.moveStepRef[rangeIndex4].indexOf(plyr.moving.step);
            finalAnimIndex = moveAnimIndex4;
            // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
            break;
          case "strafe moving":
            if (plyr.pushBack.state === true) {
              let rangeIndex3 = plyr.speed.range.indexOf(plyr.speed.move);
              let moveAnimIndex3 = app.moveStepRef[rangeIndex3].indexOf(plyr.moving.step);
              finalAnimIndex = moveAnimIndex3;
              // console.log('anim testing pushback spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number);
            } else {
              let moveSpeed = plyr.speed.move;
              // if (plyr.pushing.state === true) {
              //   moveSpeed = plyr.pushing.moveSpeed;
              // }
              if (plyr.pulling.state === true) {
                moveSpeed = plyr.pulling.moveSpeed;
              }
              if (plyr.pushed.state === true) {
                moveSpeed = plyr.pushed.moveSpeed;
              }
              if (plyr.pulled.state === true) {
                moveSpeed = plyr.pulled.moveSpeed;
              }
              let rangeIndex2 = plyr.speed.range.indexOf(moveSpeed);
              let moveAnimIndex2 = app.moveStepRef[rangeIndex2].indexOf(plyr.moving.step);
              finalAnimIndex = moveAnimIndex2;
              // console.log('anim testing strafe mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number);
            }
            break;
          case "flanking":
            let rangeIndex6 = plyr.speed.range.indexOf(0.2);
            let moveAnimIndex6 = app.moveStepRef[rangeIndex6].indexOf(plyr.moving.step);
            finalAnimIndex = moveAnimIndex6;
            // console.log('flanking step',plyr.flanking.step,'step',plyr.moving.step);
            // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
            break;
          case "attacking":
            // let animIndex = plyr.attacking.count -1;
            let animIndex;

            // if (
            //   plyr.elasticCounter.state === true &&
            //   plyr.elasticCounter.type === "attacking"
            // ) {
            //   if (plyr.elasticCounter.countUp.state === true) {
            //     animIndex = plyr.elasticCounter.countUp.count - 1;
            //   }
            //   if (plyr.elasticCounter.pause.state === true) {
            //     if (plyr.elasticCounter.pause.count < 11) {
            //       animIndex = plyr.elasticCounter.pause.count - 1;
            //     } else {
            //       if (plyr.elasticCounter.pause.count % 10 === 0) {
            //         animIndex = 9;
            //         // animIndex5 = 10;
            //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
            //       } else {
            //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
            //         animIndex = plyr.elasticCounter.pause.count - mod - 1;
            //       }
            //     }
            //   }
            //   if (plyr.elasticCounter.countDown.state === true) {
            //     animIndex = plyr.elasticCounter.countDown.count - 1;
            //   }
            // } else {
            //   animIndex = plyr.attacking.count - 1;
            // }

            // animIndex = plyr.attacking.count - 1;
            // finalAnimIndex = animIndex;
            frameIndexBase = app.actionAnimFrameTypeCountRef[plyr.action].sheetLength / app.actionAnimFrameTypeCountRef[plyr.action].typeCount;
            increment = Math.ceil(plyr[plyr.action].limit / app.actionAnimFrameTypeCountRef[plyr.action].typeCount);
            frameTypeIndex = Math.floor(plyr[plyr.action].count / increment);
            remainder = plyr[plyr.action].count % increment;
            newIndex = frameIndexBase * frameTypeIndex + remainder;

            finalAnimIndex = newIndex;
            // console.log('anim testing atk',plyr.attacking.count,'plyr',plyr.number);
            break;
          case "defending":
            let animIndex2 = plyr.defending.count - 1;

            // if (plyr.defending.decay.state !== true) {
            //   if (plyr.defending.count > 0) {
            //     finalAnimIndex = animIndex2;
            //     // console.log('anim testing def wind up',plyr.defending.count,'plyr',plyr.number, animIndex2);
            //   }
            //   if (plyr.defending.count === 0) {
            //     let animIndex2a = 5;
            //     finalAnimIndex = animIndex2a;
            //     // console.log('anim testing def held',plyr.defending.count,'plyr',plyr.number, animIndex2a);
            //   }
            // }
            // if (plyr.defending.decay.state === true) {
            //   if (plyr.defending.decay.count < 11) {
            //     animIndex2 = plyr.defending.decay.count - 1;
            //   } else {
            //     if (plyr.defending.decay.count % 10 === 0) {
            //       animIndex2 = 9;
            //     } else {
            //       let mod = Math.floor(plyr.defending.decay.count / 10) * 10;
            //       animIndex2 = plyr.defending.decay.count - mod - 1;
            //     }
            //   }
            //   finalAnimIndex = animIndex2;
            // }
            frameIndexBase = app.actionAnimFrameTypeCountRef[plyr.action].sheetLength / app.actionAnimFrameTypeCountRef[plyr.action].typeCount;
            increment = Math.ceil(plyr[plyr.action].limit / app.actionAnimFrameTypeCountRef[plyr.action].typeCount);
            frameTypeIndex = Math.floor(plyr[plyr.action].count / increment);
            remainder = plyr[plyr.action].count % increment;
            newIndex = frameIndexBase * frameTypeIndex + remainder;

            finalAnimIndex = newIndex;

            break;
          case "idle":
            if (plyr.number === 1) {
              // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
            }
            if (plyr.number === 2) {
              // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
            }
            let animIndex3 = plyr.idleAnim.count + 1;
            finalAnimIndex = animIndex3;
            // finalAnimIndex = 1;
            break;
          case "falling":
            let animIndex4 = plyr.falling.count - 1;
            finalAnimIndex = animIndex4;
            // console.log('anim testing fall',plyr.falling.count,'plyr',plyr.number);
            break;
          case "deflected":
            let animIndex5 = plyr.success.deflected.count - 1;

            // if (
            //   plyr.elasticCounter.state === true &&
            //   plyr.elasticCounter.type === "deflected"
            // ) {
            //   if (plyr.elasticCounter.countUp.state === true) {
            //     animIndex5 = plyr.elasticCounter.countUp.count - 1;
            //   }
            //   if (plyr.elasticCounter.pause.state === true) {
            //     if (plyr.elasticCounter.pause.count < 11) {
            //       animIndex5 = plyr.elasticCounter.pause.count - 1;
            //     } else {
            //       if (plyr.elasticCounter.pause.count % 10 === 0) {
            //         animIndex5 = 9;
            //         // animIndex5 = 10;
            //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
            //       } else {
            //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
            //         animIndex5 = plyr.elasticCounter.pause.count - mod - 1;
            //       }
            //     }
            //   }
            //   if (plyr.elasticCounter.countDown.state === true) {
            //     animIndex5 = plyr.elasticCounter.countDown.count - 1;
            //   }
            // }
            if (plyr.halfPushBack.state === true) {
              if (plyr.halfPushBack.countUp.state === true) {
                animIndex5 = plyr.halfPushBack.countUp.count - 1;
              }
              if (plyr.halfPushBack.countDown.state === true) {
                animIndex5 = plyr.halfPushBack.countDown.count - 1;
              }
            }
            finalAnimIndex = animIndex5;
            // console.log('anim testing dflct',plyr.success.deflected.count,'plyr',plyr.number);
            break;
          case "dodging":
            let animIndex7 = plyr.dodging.count - 1;

            // if (
            //   plyr.elasticCounter.state === true &&
            //   plyr.elasticCounter.type === "dodging"
            // ) {
            //   if (plyr.elasticCounter.countUp.state === true) {
            //     // animIndex7 = plyr.elasticCounter.countUp.count-1;

            //     if (plyr.elasticCounter.countUp.count < 11) {
            //       animIndex7 = plyr.elasticCounter.countUp.count - 1;
            //     } else {
            //       if (plyr.elasticCounter.countUp.count % 10 === 0) {
            //         animIndex7 = 9;
            //         // animIndex5 = 10;
            //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
            //       } else {
            //         let mod = Math.floor(plyr.elasticCounter.countUp.count / 10) * 10;
            //         animIndex7 = plyr.elasticCounter.countUp.count - mod - 1;
            //       }
            //     }
            //   }
            //   if (plyr.elasticCounter.pause.state === true) {
            //     if (plyr.elasticCounter.pause.count < 11) {
            //       animIndex7 = plyr.elasticCounter.pause.count - 1;
            //     } else {
            //       if (plyr.elasticCounter.pause.count % 10 === 0) {
            //         animIndex7 = 9;
            //         // animIndex5 = 10;
            //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
            //       } else {
            //         let mod = Math.floor(plyr.elasticCounter.pause.count / 10) * 10;
            //         animIndex7 = plyr.elasticCounter.pause.count - mod - 1;
            //       }
            //     }
            //   }
            //   if (plyr.elasticCounter.countDown.state === true) {
            //     // animIndex7 = plyr.elasticCounter.countDown.count-1;

            //     if (plyr.elasticCounter.countDown.count < 11) {
            //       animIndex7 = plyr.elasticCounter.countDown.count - 1;
            //     } else {
            //       if (plyr.elasticCounter.countDown.count % 10 === 0) {
            //         animIndex7 = 9;
            //         // animIndex5 = 10;
            //         // animIndex5 = (plyr.elasticCounter.pause.count-mod)
            //       } else {
            //         let mod = Math.floor(plyr.elasticCounter.countDown.count / 10) * 10;
            //         animIndex7 = plyr.elasticCounter.countDown.count - mod - 1;
            //       }
            //     }
            //   }
            // }

            finalAnimIndex = animIndex7;
            // console.log('anim testing dodge',plyr.dodging.count,'plyr',plyr.number);
            break;
        }

        // SPRITE SHEET CHAR AVATAR & ACTION SWITCH!
        if (plyr.ai.state === false) {
          switch (plyr.action) {
            case "idle":
              updatedPlayerImg = app.playerImgs[plyr.number - 1].idle[weapon];
              break;
            case "moving":
              if (plyr.pushing.state === true) {
                updatedPlayerImg = app.playerImgs[plyr.number - 1].pushing[weapon];
              }
              if (plyr.pulled.state === true) {
                updatedPlayerImg = app.playerImgs[plyr.number - 1].pulled[weapon];
              }
              if (plyr.pushed.state === true) {
                updatedPlayerImg = app.playerImgs[plyr.number - 1].pushed[weapon];
              } else {
                updatedPlayerImg = app.playerImgs[plyr.number - 1].walking[weapon];
              }

              break;
            case "jumping":
              updatedPlayerImg = app.playerImgs[plyr.number - 1].jumping[weapon];
              break;
            case "flanking":
              updatedPlayerImg = app.playerImgs[plyr.number - 1].flanking[weapon];
              break;
            case "strafe moving":
              if (plyr.pushBack.state === true) {
                updatedPlayerImg = app.playerImgs[plyr.number - 1].pushBack[weapon];
              }
              if (plyr.pulling.state === true) {
                updatedPlayerImg = app.playerImgs[plyr.number - 1].pulling[weapon];
              }
              if (plyr.pulled.state === true) {
                updatedPlayerImg = app.playerImgs[plyr.number - 1].pulled[weapon];
              }
              if (plyr.pushed.state === true) {
                updatedPlayerImg = app.playerImgs[plyr.number - 1].pushed[weapon];
              } else {
                updatedPlayerImg = app.playerImgs[plyr.number - 1].strafing[weapon];
              }
              break;
            case "falling":
              updatedPlayerImg = app.playerImgs[plyr.number - 1].falling[weapon];
              break;
            case "attacking":
              updatedPlayerImg = app.playerImgs[plyr.number - 1].attacking[weapon];
              break;
            case "defending":
              updatedPlayerImg = app.playerImgs[plyr.number - 1].defending[weapon];
              break;
            case "deflected":
              updatedPlayerImg = app.playerImgs[plyr.number - 1].deflected[weapon];
              break;
            case "dodging":
              updatedPlayerImg = app.playerImgs[plyr.number - 1].dodging[weapon];
              break;
            case "dead":
              updatedPlayerImg = app.playerImgs[plyr.number - 1].idle[weapon];
              break;
          }
        }
        if (plyr.ai.state === true) {
          let plyrImgIndex;
          if (plyr.ai.imgType === "A") {
            plyrImgIndex = 2;
          } else if (plyr.ai.imgType === "B") {
            plyrImgIndex = 3;
          }

          switch (plyr.action) {
            case "idle":
              updatedPlayerImg = app.playerImgs[plyrImgIndex].idle[weapon];
              break;
            case "moving":
              if (plyr.pushing.state === true) {
                updatedPlayerImg = app.playerImgs[plyrImgIndex].pushing[weapon];
              }
              if (plyr.pulled.state === true) {
                updatedPlayerImg = app.playerImgs[plyrImgIndex].pulled[weapon];
              }
              if (plyr.pushed.state === true) {
                updatedPlayerImg = app.playerImgs[plyrImgIndex].pushed[weapon];
              } else {
                updatedPlayerImg = app.playerImgs[plyrImgIndex].walking[weapon];
              }
              break;
            case "jumping":
              updatedPlayerImg = app.playerImgs[plyrImgIndex].jumping[weapon];
              break;
            case "flanking":
              updatedPlayerImg = app.playerImgs[plyrImgIndex].flanking[weapon];
              break;
            case "strafe moving":
              if (plyr.pushBack.state === true) {
                updatedPlayerImg = app.playerImgs[plyrImgIndex].pushBack[weapon];
              }
              if (plyr.pulling.state === true) {
                updatedPlayerImg = app.playerImgs[plyrImgIndex].pulling[weapon];
              }
              if (plyr.pulled.state === true) {
                updatedPlayerImg = app.playerImgs[plyrImgIndex].pulled[weapon];
              }
              if (plyr.pushed.state === true) {
                updatedPlayerImg = app.playerImgs[plyrImgIndex].pushed[weapon];
              } else {
                updatedPlayerImg = app.playerImgs[plyrImgIndex].strafing[weapon];
              }
              break;
            case "falling":
              updatedPlayerImg = app.playerImgs[plyrImgIndex].falling[weapon];
              break;
            case "attacking":
              updatedPlayerImg = app.playerImgs[plyrImgIndex].attacking[weapon];
              break;
            case "defending":
              updatedPlayerImg = app.playerImgs[plyrImgIndex].defending[weapon];
              break;
            case "deflected":
              updatedPlayerImg = app.playerImgs[plyrImgIndex].deflected[weapon];
              break;
            case "dodging":
              updatedPlayerImg = app.playerImgs[plyrImgIndex].dodging[weapon];
              break;
            case "dead":
              updatedPlayerImg = app.playerImgs[plyrImgIndex].idle[weapon];
              break;
          }
        }

        // SET SPRITE SHEET CLIP LOCATION!
        let dirs = ["north", "south", "east", "west"];
        let dirIndex = dirs.indexOf(plyr.direction);
        let sHeight = app.charSpriteHeight;
        let sWidth = app.charSpriteWidth;
        let sy = dirIndex * sHeight;
        let sx = (finalAnimIndex - 1) * sWidth;

        // PLAYER OUTLINES
        if (app.showPlayerOutlines === true) {
          // PLAYER OUTLINES
          let popupCoordObject = {
            north: app.popupDrawCalc("north", { x: plyr.nextPosition.x - 25, y: plyr.nextPosition.y - 25 }, plyr.number),
            west: app.popupDrawCalc("west", { x: plyr.nextPosition.x - 25, y: plyr.nextPosition.y - 25 }, plyr.number),
            south: app.popupDrawCalc("south", { x: plyr.nextPosition.x - 25, y: plyr.nextPosition.y - 25 }, plyr.number),
          };
          let origin = popupCoordObject.west;
          let width = popupCoordObject.north.pt4.x - origin.pt3.x;
          let height = popupCoordObject.south.pt2.y - origin.pt3.y;
          context2.strokeStyle = "red";
          context2.lineWidth = 2;
          context2.beginPath();
          context2.roundRect(origin.pt3.x, origin.pt3.y, width, height, 2);
          context2.stroke();

          let origin2 = {
            x: plyr.nextPosition.x - app.floorImageHeight / 2,
            y: plyr.nextPosition.y - app.floorImageHeight,
          };
          let height2 = plyr.nextPosition.y + app.floorImageHeight / 2 + 2 - (plyr.nextPosition.y - app.floorImageHeight);
          let width2 = app.playerDrawWidth + 2;
          context2.strokeStyle = "blue";
          context2.lineWidth = 2;
          context2.beginPath();
          context2.roundRect(origin2.x, origin2.y, width2 + 2, app.playerDrawHeight * 1.5, 2);
          // context2.roundRect(origin2.x, origin2.y, width2, height2, 2);
          // context2.roundRect(
          //   origin2.x,
          //   origin2.y,
          //   app.playerDrawWidth,
          //   app.playerDrawHeight * 1.5,
          //   2
          // );
          // context2.roundRect(
          //   origin2.x,
          //   origin2.y,
          //   app.playerDrawWidth + 2,
          //   app.floorImageHeight * 1.5,
          //   2
          // );
          context2.stroke();
        }

        //PLAYER DEPTH SORTING!!

        const setCurrentPlayerDrawCell = (type, xArg, yArg) => {
          app.currentPlayerDrawCell = { x: xArg, y: yArg };
          // if (plyr.number === 1) {
          //   // console.log(type, ".", xArg, ".", yArg, ".", player.elasticCounter.state);
          // }
          // for (const animAction of plyr.actionDirectionAnimationArray) {
          //   for (const point of animAction.points) {
          //     // if (x === 0 && y === 0) {
          //     context.fillStyle = point.color;
          //     context.beginPath();
          //     context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
          //     context.fill();
          //     // }
          //   }
          // }
        };

        // IN-GRID MOVING & MID STRAFE KEY RELEASE
        if (plyr.target.cell1.void === false && plyr.moving.state === true && plyr.falling.state !== true && plyr.jumping.state !== true) {
          let jumpYCalc = 10 - app.moveStepRef[1].indexOf(plyr.moving.step);

          let direction = plyr.direction;

          if (plyr.strafing.direction !== "") {
            direction = plyr.strafing.direction;
          }

          // if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
          if (x === plyr.currentPosition.cell.number.x && y === plyr.currentPosition.cell.number.y) {
            if (plyr.jumping.state === true) {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10 - jumpYCalc * 3,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            } else {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }
          }

          // if (direction === "north") {
          //   if (
          //     x === plyr.moving.origin.number.x &&
          //     y === plyr.moving.origin.number.y
          //   ) {
          //     if (plyr.jumping.state === true) {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10 - jumpYCalc * 3,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     } else {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }
          // }
          // if (direction === "west") {
          //   if (
          //     x === plyr.moving.origin.number.x &&
          //     y === plyr.moving.origin.number.y
          //   ) {
          //     if (plyr.jumping.state === true) {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10 - jumpYCalc * 3,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     } else {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }
          // }
          // if (direction === "east") {
          //   if (
          //     x === plyr.moving.origin.number.x + 1 &&
          //     y === plyr.moving.origin.number.y
          //   ) {
          //     if (plyr.jumping.state === true) {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10 - jumpYCalc * 3,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     } else {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }
          // }
          // if (direction === "south") {
          //   if (
          //     x === plyr.moving.origin.number.x &&
          //     y === plyr.moving.origin.number.y + 1
          //   ) {
          //     if (plyr.jumping.state === true) {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10 - jumpYCalc * 3,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     } else {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }
          // }

          if (plyr.pushBack.state === true) {
            // context2.drawImage(indicatorImgs.pushback, point.x-20, point.y-20, 35,35);
          }
        }
        // STATIONARY & HALFPUSH BACK
        else if (
          plyr.moving.state === false &&
          plyr.ghost.state !== true &&
          plyr.dodging.state !== true &&
          plyr.elasticCounter.state !== true &&
          plyr.action !== "attacking"
        ) {
          if (plyr.halfPushBack.state === true && plyr.success.deflected.state !== true) {
            elasticCountCalcResult = app.calcElasticCountCoords("halfPushBack", "player", plyr);
            let finalCoords = app.calcElasticCountCoords("halfPushBack", "player", plyr).coords;
            let drawCell = app.calcElasticCountCoords("halfPushBack", "player", plyr).drawCell;
            plyr = app.calcElasticCountCoords("halfPushBack", "player", plyr).player;

            if (x === 0 && y === 0) {
              // app.testDraw.push({
              //   color: "purple",
              //   x: finalCoords.x,
              //   y: finalCoords.y,
              //   direction: plyr.direction,
              // });
            }

            finalCoords.x -= 5;
            finalCoords.y -= 10;

            if (x === plyr.currentPosition.cell.number.x && y === plyr.currentPosition.cell.number.y) {
              setCurrentPlayerDrawCell(x, y, "non-elastic");
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                finalCoords.x,
                finalCoords.y,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }

            // if (
            //   !app.gridInfo.find(
            //     (x) =>
            //       x.number.x ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.halfPushBack.direction
            //         ).x &&
            //       x.number.y ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.halfPushBack.direction
            //         ).y
            //   )
            // ) {
            //   if (
            //     x === plyr.currentPosition.cell.number.x &&
            //     y === plyr.currentPosition.cell.number.y
            //   ) {
            //     setCurrentPlayerDrawCell(x, y, "non-elastic");
            //     context2.drawImage(
            //       updatedPlayerImg,
            //       sx,
            //       sy,
            //       sWidth,
            //       sHeight,
            //       finalCoords.x,
            //       finalCoords.y,
            //       app.playerDrawWidth2,
            //       app.playerDrawHeight2
            //     );
            //   }
            // } else {
            //   if (plyr.direction === "north") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y + 1
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "non-elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.direction === "east") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "non-elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.direction === "west") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x + 1 &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "non-elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.direction === "south") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x + 1 &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "non-elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            // }
          } else {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y && plyr.success.deflected.state === false) {
              setCurrentPlayerDrawCell(x, y, "non-elastic");
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }
          }
        }
        // VOID/EDGE MOVE
        else if (plyr.target.cell1.void === true && plyr.moving.state === true && plyr.falling.state !== true && plyr.jumping.state !== true) {
          // console.log('heading for thevoid @ draw step');
          // if (
          //   x === plyr.currentPosition.cell.number.x &&
          //   y === plyr.currentPosition.cell.number.y
          // ) {
          //   console.log('heading for thevoid @ draw step',plyr.target.cell1.number);
          // }

          if (plyr.moving.origin.number.x === app.gridWidth && plyr.moving.origin.number.y !== 0 && plyr.moving.origin.number.y !== app.gridWidth) {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y + 1) {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
              // context2.fillStyle = "black";
              // context2.fillRect(point.x, point.y,5,5);
            }
          }
          if (plyr.moving.origin.number.x === app.gridWidth && plyr.moving.origin.number.y === 0) {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
              // context2.fillStyle = "black";
              // context2.fillRect(point.x, point.y,5,5);
            }
          }
          if (plyr.moving.origin.number.x === app.gridWidth && plyr.moving.origin.number.y === app.gridWidth) {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
              // context2.fillStyle = "black";
              // context2.fillRect(point.x, point.y,5,5);
            }
          }
          if (plyr.moving.origin.number.x === 0 && plyr.moving.origin.number.y === app.gridWidth) {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
              // context2.fillStyle = "black";
              // context2.fillRect(point.x, point.y,5,5);
            }
          }
          if (plyr.moving.origin.number.x === 0 && plyr.moving.origin.number.y === 0) {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
              // context2.fillStyle = "black";
              // context2.fillRect(point.x, point.y,5,5);
            }
          } else {
            if (x === plyr.moving.origin.number.x + 1 && y === plyr.moving.origin.number.y) {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
              // context2.fillStyle = "black";
              // context2.fillRect(point.x, point.y,5,5);
            }
          }
        }

        // ELASTIC COUNTER ATTACKING
        if (
          (plyr.attacking.state === true || plyr.action === "attacking") &&
          plyr.moving.state === false &&
          plyr.ghost.state !== true &&
          plyr.dodging.state !== true
        ) {
          if (plyr.elasticCounter.state === true && plyr.elasticCounter.type === "attacking") {
            let finalCoords = app.calcElasticCountCoords("attacking", "player", plyr).coords;
            let drawCell = app.calcElasticCountCoords("attacking", "player", plyr).drawCell;
            plyr = app.calcElasticCountCoords("attacking", "player", plyr).player;
            finalCoords.x -= 5;
            finalCoords.y -= 10;

            // test logging
            if (x === app.gridWidth && y === app.gridWidth) {
              if (plyr.elasticCounter.countUp.state === true) {
                // app.testDraw.push({
                //   color: "red",
                //   x: finalCoords.x,
                //   y: finalCoords.y,
                // });
                // console.log('attacking elastic count coords: countUp: ',plyr.elasticCounter.countUp.count,finalCoords,plyr.elasticCounter.direction);
              }
              if (plyr.elasticCounter.countDown.state === true) {
                // app.testDraw.push({
                //   color: "blue",
                //   x: finalCoords.x,
                //   y: finalCoords.y,
                // });
                // console.log('attacking elastic count coords: countDown: ',plyr.elasticCounter.countDown.count,finalCoords,plyr.elasticCounter.direction);
              }
              if (plyr.elasticCounter.pause.state === true) {
                // app.testDraw.push({
                //   color: "blue",
                //   x: finalCoords.x,
                //   y: finalCoords.y,
                // });
                // console.log('attacking elastic count coords: pause: ',plyr.elasticCounter.pause.count,finalCoords,plyr.elasticCounter.direction);
              }
            }

            if (x === plyr.currentPosition.cell.number.x && y === plyr.currentPosition.cell.number.y) {
              setCurrentPlayerDrawCell(x, y, "elastic");
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                finalCoords.x,
                finalCoords.y,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }

            // if (
            //   !app.gridInfo.find(
            //     (x) =>
            //       x.number.x ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.elasticCounter.direction
            //         ).x &&
            //       x.number.y ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.elasticCounter.direction
            //         ).y
            //   )
            // ) {
            //   if (
            //     x === plyr.currentPosition.cell.number.x &&
            //     y === plyr.currentPosition.cell.number.y
            //   ) {
            //     setCurrentPlayerDrawCell(x, y, "elastic");
            //     context2.drawImage(
            //       updatedPlayerImg,
            //       sx,
            //       sy,
            //       sWidth,
            //       sHeight,
            //       finalCoords.x,
            //       finalCoords.y,
            //       app.playerDrawWidth2,
            //       app.playerDrawHeight2
            //     );
            //   }
            // } else {
            //   if (plyr.elasticCounter.direction === "north") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "east") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x + 1 &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //       setCurrentPlayerDrawCell(x, y, "elastic");
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "west") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "south") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y + 1
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            // }
          } else {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y && plyr.success.deflected.state === false) {
              setCurrentPlayerDrawCell(x, y, "elastic");
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }
          }

          // if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y && plyr.success.deflected.state === false) {
          //
          //   context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-(app.playerDrawWidth/2), point.y-(app.playerDrawHeight/2), app.playerDrawWidth, app.playerDrawHeight);
          //
          // }
        }
        // ELASTIC COUNTER DEFENDING
        if (
          (plyr.defending.state === true || plyr.action === "defending") &&
          plyr.moving.state === false &&
          plyr.ghost.state !== true &&
          plyr.dodging.state !== true
        ) {
          if (plyr.elasticCounter.state === true && plyr.elasticCounter.type === "defending") {
            let finalCoords = app.calcElasticCountCoords("defending", "player", plyr).coords;
            let drawCell = app.calcElasticCountCoords("defending", "player", plyr).drawCell;
            plyr = app.calcElasticCountCoords("defending", "player", plyr).player;

            finalCoords.x -= 5;
            finalCoords.y -= 10;

            // test logging
            if (x === app.gridWidth && y === app.gridWidth) {
              // app.testDraw.push({ color: "red", x: finalCoords.x, y: finalCoords.y });
              if (plyr.elasticCounter.countUp.state === true) {
                // app.testDraw.push({
                //   color: "red",
                //   x: finalCoords.x,
                //   y: finalCoords.y,
                // });
                // console.log('attacking elastic count coords: countUp: ',plyr.elasticCounter.countUp.count,finalCoords,plyr.elasticCounter.direction);
              }
              if (plyr.elasticCounter.countDown.state === true) {
                // app.testDraw.push({
                //   color: "blue",
                //   x: finalCoords.x,
                //   y: finalCoords.y,
                // });
                // console.log('attacking elastic count coords: countDown: ',plyr.elasticCounter.countDown.count,finalCoords,plyr.elasticCounter.direction);
              }
              if (plyr.elasticCounter.pause.state === true) {
                // app.testDraw.push({
                //   color: "blue",
                //   x: finalCoords.x,
                //   y: finalCoords.y,
                // });
                // console.log('attacking elastic count coords: pause: ',plyr.elasticCounter.pause.count,finalCoords,plyr.elasticCounter.direction);
              }
            }

            if (x === plyr.currentPosition.cell.number.x && y === plyr.currentPosition.cell.number.y) {
              setCurrentPlayerDrawCell(x, y, "elastic");
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                finalCoords.x,
                finalCoords.y,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }

            // if (
            //   !app.gridInfo.find(
            //     (x) =>
            //       x.number.x ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.elasticCounter.direction
            //         ).x &&
            //       x.number.y ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.elasticCounter.direction
            //         ).y
            //   )
            // ) {
            //   if (
            //     x === plyr.currentPosition.cell.number.x &&
            //     y === plyr.currentPosition.cell.number.y
            //   ) {
            //     setCurrentPlayerDrawCell(x, y, "elastic");
            //     context2.drawImage(
            //       updatedPlayerImg,
            //       sx,
            //       sy,
            //       sWidth,
            //       sHeight,
            //       finalCoords.x,
            //       finalCoords.y,
            //       app.playerDrawWidth2,
            //       app.playerDrawHeight2
            //     );
            //   }
            // } else {
            //   if (plyr.elasticCounter.direction === "north") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "east") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x + 1 &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "west") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "south") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y + 1
            //     ) {
            //       setCurrentPlayerDrawCell(x, y, "elastic");
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            // }
          } else {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y && plyr.success.deflected.state === false) {
              setCurrentPlayerDrawCell(x, y, "elastic");
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }
          }
        }

        // DIRECTIONAL ACTION INDICATION
        if (plyr.actionDirectionAnimationArray.length > 0) {
          // console.log("b", x, y);

          for (const animAction of plyr.actionDirectionAnimationArray) {
            let lnWdth = 5;
            if (animAction.actionDirectionType === "thrust") {
              lnWdth = 8;
            }
            let lastPoint;
            for (const point of animAction.points) {
              // if (x === app.gridWidth && y === app.gridWidth) {
              //   context.fillStyle = "purple";
              //   context.beginPath();
              //   context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
              //   context.fill();
              // }
            }
            if (animAction.points.length > 1) {
              context.beginPath();
              context.moveTo(animAction.points[0].x, animAction.points[0].y);
              for (var i = 1; i < animAction.points.length - 1; i++) {
                context.arcTo(animAction.points[i].x, animAction.points[i].y, animAction.points[i + 1].x, animAction.points[i + 1].y, 40);
              }

              lastPoint = animAction.points[animAction.points.length - 1];
              context.lineTo(lastPoint.x, lastPoint.y);

              context.strokeStyle = animAction.points[0].color;
              context.lineWidth = lnWdth;
              context.stroke();

              if (animAction.points[0].x2) {
                context.beginPath();
                context.moveTo(animAction.points[0].x2, animAction.points[0].y2);
                for (var i = 1; i < animAction.points.length - 1; i++) {
                  context.arcTo(animAction.points[i].x2, animAction.points[i].y2, animAction.points[i + 1].x2, animAction.points[i + 1].y2, 30);
                }
                lastPoint = animAction.points[animAction.points.length - 1];
                context.lineTo(lastPoint.x2, lastPoint.y2);

                context.strokeStyle = animAction.points[0].color;
                context.lineWidth = lnWdth;
                context.stroke();
              }

              if (animAction.points[0].lineArray?.length > 0) {
                for (var i = 0; i < animAction.points.length; i++) {
                  let length = animAction.points[i].lineArray.length - 1;
                  if (i === animAction.points.length - 1) {
                    let pointOuter = {
                      x: animAction.points[i].x,
                      y: animAction.points[i].y,
                      // x: animAction.points[i].lineArray[0].x,
                      // y: animAction.points[i].lineArray[0].y,
                    };
                    let pointInner = {
                      x: animAction.points[i].x2,
                      y: animAction.points[i].y2,
                      // x: animAction.points[i].lineArray[length]?.x,
                      // y: animAction.points[i].lineArray[length]?.y,
                    };
                    context.beginPath();
                    context.moveTo(pointInner.x, pointInner.y);
                    context.lineTo(pointOuter.x, pointOuter.y);

                    context.strokeStyle = animAction.points[i].color;
                    context.lineWidth = lnWdth;
                    context.stroke();
                  }
                }
              }
            }
          }
        }

        if (plyr.jumping.state === true) {
          let jumpYCalc = 10 - app.moveStepRef[1].indexOf(plyr.moving.step);

          // if (plyr.direction === "north") {
          //   if (
          //     x === plyr.moving.origin.number.x &&
          //     y === plyr.moving.origin.number.y
          //   ) {
          //     context2.drawImage(
          //       updatedPlayerImg,
          //       sx,
          //       sy,
          //       sWidth,
          //       sHeight,
          //       newCharDrawPoint.x - 5,
          //       newCharDrawPoint.y - 10 - jumpYCalc * 3,
          //       app.playerDrawWidth2,
          //       app.playerDrawHeight2
          //     );
          //   }
          // }
          // if (plyr.direction === "west") {
          //   if (
          //     x === plyr.moving.origin.number.x &&
          //     y === plyr.moving.origin.number.y
          //   ) {
          //     context2.drawImage(
          //       updatedPlayerImg,
          //       sx,
          //       sy,
          //       sWidth,
          //       sHeight,
          //       newCharDrawPoint.x - 5,
          //       newCharDrawPoint.y - 10 - jumpYCalc * 3,
          //       app.playerDrawWidth2,
          //       app.playerDrawHeight2
          //     );
          //   }
          // }
          // if (plyr.direction === "east") {
          //   if (x === plyr.target.cell2.number.x && y === plyr.target.cell2.number.y) {
          //     context2.drawImage(
          //       updatedPlayerImg,
          //       sx,
          //       sy,
          //       sWidth,
          //       sHeight,
          //       newCharDrawPoint.x - 5,
          //       newCharDrawPoint.y - 10 - jumpYCalc * 3,
          //       app.playerDrawWidth2,
          //       app.playerDrawHeight2
          //     );
          //   }
          // }
          // if (plyr.direction === "south") {
          //   if (x === plyr.target.cell2.number.x && y === plyr.target.cell2.number.y) {
          //     context2.drawImage(
          //       updatedPlayerImg,
          //       sx,
          //       sy,
          //       sWidth,
          //       sHeight,
          //       newCharDrawPoint.x - 5,
          //       newCharDrawPoint.y - 10 - jumpYCalc * 3,
          //       app.playerDrawWidth2,
          //       app.playerDrawHeight2
          //     );
          //   }
          // }
          if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
            context2.drawImage(
              updatedPlayerImg,
              sx,
              sy,
              sWidth,
              sHeight,
              newCharDrawPoint.x - 5,
              newCharDrawPoint.y - 10 - jumpYCalc * 3,
              app.playerDrawWidth2,
              app.playerDrawHeight2,
            );
          }
        }
        // STRAFE MOVEMENT
        if (plyr.strafing.state === true && plyr.falling.state !== true && plyr.jumping.state !== true) {
          // if (
          //   plyr.strafing.direction === "north" ||
          //   plyr.strafing.direction === "northWest" ||
          //   plyr.strafing.direction === "west"
          // ) {
          //   if (
          //     x === plyr.moving.origin.number.x &&
          //     y === plyr.moving.origin.number.y
          //   ) {
          //     // context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
          //     context2.drawImage(
          //       updatedPlayerImg,
          //       sx,
          //       sy,
          //       sWidth,
          //       sHeight,
          //       newCharDrawPoint.x - 5,
          //       newCharDrawPoint.y - 10,
          //       app.playerDrawWidth2,
          //       app.playerDrawHeight2
          //     );
          //   }
          // }
          // if (plyr.strafing.direction === "east" || plyr.direction === "east") {
          //   if (
          //     x === plyr.moving.origin.number.x + 1 &&
          //     y === plyr.moving.origin.number.y
          //   ) {
          //     // if (x === plyr.target.cell1.number.x && y === plyr.target.cell1.number.y) {
          //     // context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
          //     context2.drawImage(
          //       updatedPlayerImg,
          //       sx,
          //       sy,
          //       sWidth,
          //       sHeight,
          //       newCharDrawPoint.x - 5,
          //       newCharDrawPoint.y - 10,
          //       app.playerDrawWidth2,
          //       app.playerDrawHeight2
          //     );
          //   }
          // }
          // if (plyr.strafing.direction === "south" || plyr.direction === "south") {
          //   if (
          //     x === plyr.moving.origin.number.x &&
          //     y === plyr.moving.origin.number.y + 1
          //   ) {
          //     // if (x === plyr.moving.destination.number.x && y === plyr.moving.destination.number.y) {
          //     // if (x === plyr.target.cell1.number.x && y === plyr.target.cell1.number.y) {
          //     // context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
          //     context2.drawImage(
          //       updatedPlayerImg,
          //       sx,
          //       sy,
          //       sWidth,
          //       sHeight,
          //       newCharDrawPoint.x - 5,
          //       newCharDrawPoint.y - 10,
          //       app.playerDrawWidth2,
          //       app.playerDrawHeight2
          //     );
          //   }
          // }

          // if (plyr.strafing.direction === "northEast") {
          //   if (
          //     x === plyr.moving.origin.number.x + 1 &&
          //     y === plyr.moving.origin.number.y
          //   ) {
          //     // context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
          //     context2.drawImage(
          //       updatedPlayerImg,
          //       sx,
          //       sy,
          //       sWidth,
          //       sHeight,
          //       newCharDrawPoint.x - 5,
          //       newCharDrawPoint.y - 10,
          //       app.playerDrawWidth2,
          //       app.playerDrawHeight2
          //     );
          //   }
          // }
          // if (plyr.strafing.direction === "southWest") {
          //   if (
          //     x === plyr.moving.origin.number.x &&
          //     y === plyr.moving.origin.number.y + 1
          //   ) {
          //     // context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
          //     context2.drawImage(
          //       updatedPlayerImg,
          //       sx,
          //       sy,
          //       sWidth,
          //       sHeight,
          //       newCharDrawPoint.x - 5,
          //       newCharDrawPoint.y - 10,
          //       app.playerDrawWidth2,
          //       app.playerDrawHeight2
          //     );
          //   }
          // }
          if (
            x === plyr.moving.origin.number.x &&
            y === plyr.moving.origin.number.y
            // plyr.success.deflected.state === false
          ) {
            setCurrentPlayerDrawCell(x, y, "non-elastic");
            context2.drawImage(
              updatedPlayerImg,
              sx,
              sy,
              sWidth,
              sHeight,
              newCharDrawPoint.x - 5,
              newCharDrawPoint.y - 10,
              app.playerDrawWidth2,
              app.playerDrawHeight2,
            );
          }
        }
        // FLANKING
        if ((plyr.flanking.state === true || plyr.action === "flanking") && plyr.falling.state !== true) {
          // if (plyr.flanking.step === 1) {
          //   if (plyr.flanking.direction === "north") {
          //     if (
          //       x === plyr.moving.origin.number.x &&
          //       y === plyr.moving.origin.number.y
          //     ) {
          //       // console.log('draw flank north',);
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }

          //   if (plyr.flanking.direction === "west") {
          //     if (
          //       x === plyr.moving.origin.number.x &&
          //       y === plyr.moving.origin.number.y
          //     ) {
          //       // console.log('draw flank west',);
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }

          //   if (plyr.flanking.direction === "east") {
          //     if (
          //       x === plyr.moving.origin.number.x + 1 &&
          //       y === plyr.moving.origin.number.y
          //     ) {
          //       // console.log('draw flank east',);
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }

          //   if (plyr.flanking.direction === "south") {
          //     if (
          //       x === plyr.moving.origin.number.x &&
          //       y === plyr.moving.origin.number.y + 1
          //     ) {
          //       // console.log('draw flank south',);
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }
          // }

          // if (plyr.flanking.step === 2) {
          //   if (plyr.direction === "north") {
          //     if (
          //       x === plyr.moving.origin.number.x &&
          //       y === plyr.moving.origin.number.y
          //     ) {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }

          //   if (plyr.direction === "west") {
          //     if (
          //       x === plyr.moving.origin.number.x &&
          //       y === plyr.moving.origin.number.y
          //     ) {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }

          //   if (plyr.direction === "east") {
          //     if (
          //       x === plyr.moving.origin.number.x + 1 &&
          //       y === plyr.moving.origin.number.y
          //     ) {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }

          //   if (plyr.direction === "south") {
          //     if (
          //       x === plyr.moving.origin.number.x &&
          //       y === plyr.moving.origin.number.y + 1
          //     ) {
          //       context2.drawImage(
          //         updatedPlayerImg,
          //         sx,
          //         sy,
          //         sWidth,
          //         sHeight,
          //         newCharDrawPoint.x - 5,
          //         newCharDrawPoint.y - 10,
          //         app.playerDrawWidth2,
          //         app.playerDrawHeight2
          //       );
          //     }
          //   }
          // }
          if (
            x === plyr.currentPosition.cell.number.x &&
            y === plyr.currentPosition.cell.number.y
            // plyr.success.deflected.state === false
          ) {
            setCurrentPlayerDrawCell(x, y, "non-elastic");
            context2.drawImage(
              updatedPlayerImg,
              sx,
              sy,
              sWidth,
              sHeight,
              newCharDrawPoint.x - 5,
              newCharDrawPoint.y - 10,
              app.playerDrawWidth2,
              app.playerDrawHeight2,
            );
          }
        }
        // FALLING
        if (plyr.falling.state === true) {
          // IN BOUNDS
          if (x === plyr.target.cell1.number.x && y === plyr.target.cell1.number.y) {
            context.drawImage(
              updatedPlayerImg,
              sx,
              sy,
              sWidth,
              sHeight,
              newCharDrawPoint.x - 5,
              newCharDrawPoint.y - 10,
              app.playerDrawWidth2,
              app.playerDrawHeight2,
            );
          }

          // OUT OF BOUNDS
          if (
            plyr.target.cell1.number.x < 0 ||
            plyr.target.cell1.number.y < 0 ||
            plyr.target.cell1.number.x > app.gridWidth ||
            plyr.target.cell1.number.y > app.gridWidth
          ) {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
              context.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                newCharDrawPoint.x - 5,
                newCharDrawPoint.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }
          }
        }
        // DEFLECTED
        if (plyr.success.deflected.state === true) {
          if (plyr.elasticCounter.state === true && plyr.elasticCounter.type === "deflected") {
            let finalCoords = app.calcElasticCountCoords("deflected", "player", plyr).coords;
            let drawCell = app.calcElasticCountCoords("deflected", "player", plyr).drawCell;
            plyr = app.calcElasticCountCoords("deflected", "player", plyr).player;
            finalCoords.x -= 5;
            finalCoords.y -= 10;

            if (x === plyr.currentPosition.cell.number.x && y === plyr.currentPosition.cell.number.y) {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                finalCoords.x,
                finalCoords.y,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }

            // if (
            //   !app.gridInfo.find(
            //     (x) =>
            //       x.number.x ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.elasticCounter.direction
            //         ).x &&
            //       x.number.y ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.elasticCounter.direction
            //         ).y
            //   )
            // ) {
            //   if (
            //     x === plyr.currentPosition.cell.number.x &&
            //     y === plyr.currentPosition.cell.number.y
            //   ) {
            //     context2.drawImage(
            //       updatedPlayerImg,
            //       sx,
            //       sy,
            //       sWidth,
            //       sHeight,
            //       finalCoords.x,
            //       finalCoords.y,
            //       app.playerDrawWidth2,
            //       app.playerDrawHeight2
            //     );
            //   }
            // } else {
            //   if (plyr.elasticCounter.direction === "south") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y + 1
            //     ) {
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "west") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "east") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x + 1 &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "north") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x + 1 &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            // }
          }
          if (plyr.elasticCounter.state !== true && plyr.elasticCounter.type === "deflected" && x === app.gridWidth && y === app.gridWidth) {
            // console.log('deflected elastic counter overflow?',plyr.success.deflected.count);
          }
        }
        // DODGING
        if (plyr.action === "dodging" && plyr.success.deflected.state !== true) {
          if (plyr.elasticCounter.state === true && plyr.elasticCounter.type === "dodging") {
            let finalCoords = app.calcElasticCountCoords("dodging", "player", plyr).coords;
            let drawCell = app.calcElasticCountCoords("dodging", "player", plyr).drawCell;

            plyr = app.calcElasticCountCoords("dodging", "player", plyr).player;
            finalCoords.x -= 5;
            finalCoords.y -= 10;

            // test logging
            if (x === app.gridWidth && y === app.gridWidth) {
              if (plyr.elasticCounter.countUp.state === true) {
                // app.testDraw.push({color: 'red',x:finalCoords.x,y:finalCoords.y })
                // console.log('dodging elastic coount coords: countUp: ',plyr.elasticCounter.countUp.count,finalCoords,plyr.elasticCounter.direction);
              }
              if (plyr.elasticCounter.countDown.state === true) {
                // app.testDraw.push({color: 'blue',x:finalCoords.x,y:finalCoords.y })
                // console.log('dodging elastic coount coords: countDown: ',plyr.elasticCounter.countDown.count,finalCoords,plyr.elasticCounter.direction);
              }
              if (plyr.elasticCounter.pause.state === true) {
                // app.testDraw.push({color: 'blue',x:finalCoords.x,y:finalCoords.y })
                // console.log('dodging elastic coount coords: pause: ',plyr.elasticCounter.pause.count,finalCoords,plyr.elasticCounter.direction);
              }
            }

            if (x === plyr.currentPosition.cell.number.x && y === plyr.currentPosition.cell.number.y) {
              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                finalCoords.x,
                finalCoords.y,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );
            }

            // if (
            //   !app.gridInfo.find(
            //     (x) =>
            //       x.number.x ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.elasticCounter.direction
            //         ).x &&
            //       x.number.y ===
            //         app.getCellFromDirection(
            //           1,
            //           plyr.currentPosition.cell.number,
            //           plyr.elasticCounter.direction
            //         ).y
            //   )
            // ) {
            //   if (
            //     x === plyr.currentPosition.cell.number.x &&
            //     y === plyr.currentPosition.cell.number.y
            //   ) {
            //     context2.drawImage(
            //       updatedPlayerImg,
            //       sx,
            //       sy,
            //       sWidth,
            //       sHeight,
            //       finalCoords.x,
            //       finalCoords.y,
            //       app.playerDrawWidth2,
            //       app.playerDrawHeight2
            //     );
            //   }
            // } else {
            //   if (plyr.elasticCounter.direction === "north") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "east") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x + 1 &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "west") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y
            //     ) {
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            //   if (plyr.elasticCounter.direction === "south") {
            //     if (
            //       x === plyr.currentPosition.cell.number.x &&
            //       y === plyr.currentPosition.cell.number.y + 1
            //     ) {
            //       context2.drawImage(
            //         updatedPlayerImg,
            //         sx,
            //         sy,
            //         sWidth,
            //         sHeight,
            //         finalCoords.x,
            //         finalCoords.y,
            //         app.playerDrawWidth2,
            //         app.playerDrawHeight2
            //       );
            //     }
            //   }
            // }
          }
        }

        // DEPTH SORTING END!!

        // RESPAWN
        if (plyr.respawn === true) {
          if (x === plyr.startPosition.cell.number.x && y === plyr.startPosition.cell.number.y) {
            // console.log('respawning... confirm dead player',plyr.dead.state,x,y);

            let canRespawn = false;
            let positionOccupied = false;
            let respawnPosCellRef = app.gridInfo.find(
              (x) => x.number.x === plyr.startPosition.cell.number.x && x.number.y === plyr.startPosition.cell.number.y,
            );
            let respawnCellNo;
            let respawnCellCenter;

            for (const plyrx of app.players) {
              if (
                plyrx.currentPosition.cell.number.x === plyr.startPosition.cell.number.x &&
                plyrx.currentPosition.cell.number.y === plyr.startPosition.cell.number.y
              ) {
                positionOccupied = true;
              }
            }
            if (respawnPosCellRef.obstacle.state === true || respawnPosCellRef.terrain.type === "deep" || respawnPosCellRef.void === true) {
              positionOccupied = true;
            }

            if (positionOccupied === true) {
              respawnCellNo = app.getRandomFreeCell();
              respawnPosCellRef = app.gridInfo.find((x) => x.number.x === respawnCellNo.number.x && x.number.y === respawnCellNo.number.y);

              if (respawnCellNo) {
                canRespawn = true;
              } else {
                console.log("no cells for respawn. Unlikely but true. Reassign obstacle cell");
                if (app.gridInfo.filter((x) => x.obstacle.state === true)[0]) {
                  app.gridInfo.filter((x) => x.obstacle.state === true)[0].obstacle.state = false;
                  respawnPosCellRef = app.gridInfo.find((x) => x.number.x === respawnCellNo.number.x && x.number.y === respawnCellNo.number.y);
                  let oldLvlData = app.gridInfo.filter((x) => x.obstacle.state === true)[0].levelData.split("_");
                  oldLvlData[1] = "*";
                  app.gridInfo.filter((x) => x.obstacle.state === true)[0].levelData = oldLvlData.join("_");
                  canRespawn = true;
                } else {
                  console.log("no free cells for respawn and no obstacle cell to comandeer. Highly unlikley");

                  if (app.gridInfo.filter((x) => x.void.state === true)[0]) {
                    app.gridInfo.filter((x) => x.void.state === true)[0].void.state = false;
                    respawnPosCellRef = app.gridInfo.find((x) => x.number.x === respawnCellNo.number.x && x.number.y === respawnCellNo.number.y);
                    let oldLvlData = app.gridInfo.filter((x) => x.void.state === true)[0].levelData.split("_");
                    oldLvlData[3] = "a";
                    app.gridInfo.filter((x) => x.void.state === true)[0].levelData = oldLvlData.join("_");
                    canRespawn = true;
                  }
                }
              }
            } else if ((canRespawn = true && respawnPosCellRef)) {
              canRespawn = true;
            }

            if (canRespawn === true) {
              // console.log('can respawn');
              let respawnPoint = respawnPosCellRef;
              plyr.dead.state = false;
              plyr.currentPosition.cell.number = respawnPoint.number;
              plyr.currentPosition.cell.center = respawnPoint.center;
              plyr.nextPosition = respawnPoint.center;
              app.getTarget(plyr);
              plyr.moving = {
                state: false,
                step: 0,
                course: "",
                origin: {
                  number: {
                    x: respawnPoint.number.x,
                    y: respawnPoint.number.y,
                  },
                  center: {
                    x: respawnPoint.center.x,
                    y: respawnPoint.center.y,
                  },
                },
                destination: {
                  x: app.players[plyr.number - 1].target.cell1.center.x,
                  y: app.players[plyr.number - 1].target.cell1.center.y,
                },
              };
              let origin2 = {
                x: plyr.nextPosition.x - app.floorImageHeight / 2,
                y: plyr.nextPosition.y - app.floorImageHeight,
              };

              plyr.direction = "north";
              plyr.respawn = false;
              app.players[plyr.number - 1] = plyr;

              context2.drawImage(
                updatedPlayerImg,
                sx,
                sy,
                sWidth,
                sHeight,
                // respawnPoint.center.x - 25,
                // respawnPoint.center.y - 50,
                origin2.x - 5,
                origin2.y - 10,
                app.playerDrawWidth2,
                app.playerDrawHeight2,
              );

              if (
                app.camera.customView.state !== true &&
                app.settingAutoCamera === false &&
                plyr.ai.state !== true &&
                app.camera.preInstructions.length === 0 &&
                app.camera.instructions.length === 0
              ) {
                app.setAutoCamera("playerSpawnFocus", plyr);
              } else {
                // console.log("no setting auto cam: playerSpawnFocus");
              }
            }
          }
        }
        // DEAD
        if (plyr.dead.state === true && player.dead.count > 0 && plyr.dead.count < plyr.dead.limit) {
          if (x === plyr.ghost.position.cell.number.x && y === plyr.ghost.position.cell.number.y) {
            // console.log('player',plyr.number,'dying',player.dead.count);
            context2.drawImage(app.indicatorImgs.death, plyr.ghost.position.cell.center.x - 15, plyr.ghost.position.cell.center.y - 15, 25, 25);
          }
        }
        // GHOST
        if (plyr.ghost.state === true && player.dead.count === 0) {
          if (x === plyr.ghost.position.cell.number.x && y === plyr.ghost.position.cell.number.y) {
            // console.log(
            //   "player ",
            //   plyr.number,
            //   "ghost @",
            //   plyr.ghost.position.cell.number,
            //   plyr.ghost.position.cell.center
            // );
            context2.drawImage(app.indicatorImgs.ghost, plyr.ghost.position.cell.center.x - 20, plyr.ghost.position.cell.center.y - 20, 25, 25);
          }
        }

        // PLAYER POPUPS
        if (x === app.gridWidth && y === app.gridWidth && app.hideAllPopups !== true) {
          let popupBorderColor = app.playerColourRef["player" + plyr.number + ""];

          if (plyr.dead.state !== true && plyr.popups.length > 0) {
            for (const popup of plyr.popups) {
              if (popup.state === true) {
                // console.log('drawing a popup');
                let popupDrawCoords;
                if (popup.position === "" || !popup.position) {
                  let currentPopups = plyr.popups.filter((x) => x.state === true);
                  // let positions = ['north','east','south','west','northEast','southEast','southWest']
                  let positions = ["north", "east", "south", "west", "northEast", "northWest", "southEast", "southWest"];

                  // REMOVE 1ST FREE POSITION IF IT'S THE SAME AS PLAYER'S DIRECTION
                  if (plyr.strafing.state === true) {
                    if (positions[0] === plyr.strafing.direction) {
                      const first = positions.shift();
                      positions.push(first);
                    }
                  } else {
                    if (positions[0] === plyr.direction) {
                      const first = positions.shift();
                      positions.push(first);
                    }
                  }

                  // REMOVE POSITIONS ALREADY TAKEN BY PLAYERS' OTHER POPUPS
                  for (const popup2 of currentPopups) {
                    if (popup2.position && popup2.position !== "") {
                      let indx = positions.indexOf(popup2.position);
                      positions.splice(indx, 1);
                    }
                  }

                  let dir = undefined;

                  // CHECK OTHER PLAYER'S POSITION AND THE POPUPS POSITION
                  // REMOVE OCCUPIED POSITIONS
                  for (const plyr2 of app.players) {
                    if (plyr2.ai.state !== true && plyr2.number !== plyr.number) {
                      let myPos = plyr.currentPosition.cell.number;
                      let invalidPos = app.players[plyr2.number - 1].currentPosition.cell.number;

                      dir = undefined;
                      // let invalidPositions = [invalidPos];

                      // GET DIRECTION OF OTHER PLAYER CELL RELATIVE TO ME
                      dir = app.getDirectionFromCells(myPos, invalidPos);

                      if (dir && positions.includes(dir) === true) {
                        positions.splice(positions.indexOf(dir), 1);
                        // console.log('player popups (unset): human player position is close to player',plyr.number,' @ ',invalidPos,'dir',dir);
                        // console.log('dont draw over player @',dir,'choose frome these position',positions);
                      }

                      // GET DIRECTION OF ALL OTHER PLAYERS' POPUPS OCCUPY, RELATIVE TO ME
                      for (const pop of plyr2.popups) {
                        dir = undefined;

                        if (pop.state === true) {
                          let invalidPos2 = {
                            x: undefined,
                            y: undefined,
                          };

                          invalidPos2 = app.getCellFromDirection(1, invalidPos, pop.position);

                          dir = app.getDirectionFromCells(myPos, invalidPos2);

                          if (dir && positions.includes(dir) === true) {
                            positions.splice(positions.indexOf(dir), 1);
                            // console.log('player popups (unset): human player popup position is close to player',plyr.number,' @ ',invalidPos2,'dir',dir);
                            // console.log('dont draw over player @',dir,'choose frome these position',positions);
                          }
                        }
                      }
                    }
                  }

                  // GET DIRECTION OF CELL POPUPS' POPUPS  CELLS RELATIVE TO ME
                  // REMOVE OCCUPIED POSITIONS
                  for (const popup2 of app.cellPopups) {
                    dir = undefined;

                    if (popup2.state === true) {
                      let myPos = plyr.currentPosition.cell.number;
                      let cellPos = popup2.cell.number;
                      let invalidPos2 = {
                        x: undefined,
                        y: undefined,
                      };

                      invalidPos2 = app.getCellFromDirection(1, cellPos, popup2.position);

                      dir = app.getDirectionFromCells(myPos, invalidPos2);

                      if (dir && positions.includes(dir) === true) {
                        positions.splice(positions.indexOf(dir), 1);
                        // console.log('player popups (unset): cell popup position is close to player',plyr.number,' @ ',invalidPos2,'dir',dir);
                        // console.log('dont draw over player @',dir,'choose frome these position',positions);
                      }

                      // let indx = positions.indexOf(popup2.position);
                      // positions.splice(indx,1)
                    }
                  }

                  // console.log('new or postponed popup ',popup.msg,'position',positions[0]);

                  if (!positions[0]) {
                    // console.log(
                    //   "no open positions for new or postponed popup",
                    //   popup.msg
                    // );
                    popup.state = false;
                    popup.count = 0;
                  } else {
                    popup.position = positions[0];
                    if (currentPopups.find((x) => x.msg === popup.msg)) {
                      // console.log("popup already exists", popup.msg);
                    }
                  }

                  let popupProgress = false;
                  let showProgress = false;
                  let writeValue = false;
                  if (
                    plyr.prePush.state === true ||
                    plyr.prePull.state === true ||
                    plyr.dodging.state === true ||
                    plyr.action === "dodging" ||
                    plyr.action === "defending" ||
                    plyr.action === "attacking" ||
                    plyr.attacking.state === true
                  ) {
                    showProgress = true;
                  }
                  if (
                    popup.msg === "attacking1" ||
                    popup.msg === "attacking2" ||
                    popup.msg === "defending" ||
                    popup.msg === "prePush" ||
                    popup.msg === "prePull" ||
                    popup.msg === "dodging" ||
                    popup.msg === "charging"
                  ) {
                    popupProgress = true;
                  }

                  if (popup.img === "") {
                    popup.img = app.popupImageRef[popup.msg];
                  }

                  if (popup.msg.split("_")) {
                    if (popup.msg.split("_")[0] === "hpUp" || popup.msg.split("_")[0] === "hpDown") {
                      writeValue = true;
                      popup.img = app.popupImageRef[popup.msg.split("_")[0]];
                    }
                  }

                  popupDrawCoords = app.popupDrawCalc(popup.position, { x: point.x - 25, y: point.y - 25 }, plyr.number);

                  app.drawPopupBubble(
                    context2,
                    popupDrawCoords.origin.x,
                    popupDrawCoords.origin.y,
                    app.popupSize,
                    app.popupSize,
                    5,
                    popupDrawCoords.anchor.x,
                    popupDrawCoords.anchor.y,
                    popupBorderColor,
                  );
                  let centerPopupOffset = (app.popupSize - app.popupImgSize) / 2;

                  if (showProgress === true && popupProgress === true) {
                    let perc = app.playerPopupProgressCalc(plyr, popup);
                    context2.fillStyle = app.popupProgressImgGradColor2;
                    context2.beginPath();
                    // context2.roundRect(popupDrawCoords.origin.x,(popupDrawCoords.origin.y)+app.popupSize, app.popupSize, app.popupSize*perc, 5);
                    // context2.stroke();
                    context2.fillStyle = app.popupProgressImgGradColor1;
                    context2.roundRect(popupDrawCoords.origin.x, popupDrawCoords.origin.y + app.popupSize, 10, app.popupSize * perc, 5);
                    context2.fill();
                    // console.log("playerPopupProgress init", perc);
                  }

                  if (writeValue === true) {
                    context2.font = "15px Arial";
                    context2.fillStyle = "black";
                    context2.fillText(
                      popup.msg.split("_")[1],
                      popupDrawCoords.origin.x + (app.popupSize - popup.msg.split("_")[1].length * 7) / 2,
                      popupDrawCoords.origin.y + 15,
                    );

                    centerPopupOffset = (app.popupSize - app.popupImgSize * 0.75) / 2;
                    context2.drawImage(
                      popup.img,
                      popupDrawCoords.origin.x + centerPopupOffset,
                      popupDrawCoords.origin.y + (centerPopupOffset + 5),
                      app.popupImgSize * 0.75,
                      app.popupImgSize * 0.75,
                    );
                  } else {
                    context2.drawImage(
                      popup.img,
                      popupDrawCoords.origin.x + centerPopupOffset,
                      popupDrawCoords.origin.y + centerPopupOffset,
                      app.popupImgSize,
                      app.popupImgSize,
                    );
                  }
                } else if (popup.position !== "northWest") {
                  let dir = undefined;
                  let dirs = [];

                  let currentPopups = app.cellPopups.filter((x) => x.state === true);

                  // HAVE ANY OTHER PLAYERS OR OTHER PLAYERS' POPUPS MOVED TO INVALID POSITIONS SINCE POPUP'S 1ST DRAW
                  for (const plyr2 of app.players) {
                    if (plyr2.ai.state !== true && plyr2.number !== plyr.number) {
                      let myPos = plyr.currentPosition.cell.number;
                      let invalidPos = app.players[plyr2.number - 1].currentPosition.cell.number;

                      dir = app.getDirectionFromCells(myPos, invalidPos);

                      if (dir) {
                        // console.log('player popups (set): human player position is close to player',plyr.number,' @ ',invalidPos,' dir ',dir);
                        dirs.push(dir);
                      }

                      for (const pop of plyr2.popups) {
                        dir = undefined;
                        let invalidPos2 = {
                          x: undefined,
                          y: undefined,
                        };

                        invalidPos2 = app.getCellFromDirection(1, invalidPos, pop.position);

                        dir = app.getDirectionFromCells(myPos, invalidPos2);

                        // if (dir && positions.includes(dir) === true) {
                        //   positions.splice(positions.indexOf(dir),1);
                        //   // console.log('dont draw over player @',dir,'choose frome these position',positions);
                        // }
                        if (dir) {
                          // console.log('player popups (set): human player popup position is close to player',plyr.number,' @ ',invalidPos2,' dir ',dir);
                          dirs.push(dir);
                        }
                      }
                    }
                  }

                  // HAVE ANY CELL POPUPS MOVED TO A NEARBY CELL TO ME
                  for (const popup2 of currentPopups) {
                    dir = undefined;

                    let myPos = plyr.currentPosition.cell.number;

                    let cellPos = popup2.cell.number;
                    let invalidPos2 = {
                      x: undefined,
                      y: undefined,
                    };

                    invalidPos2 = app.getCellFromDirection(1, cellPos, popup2.position);

                    dir = app.getDirectionFromCells(myPos, invalidPos2);

                    if (dir) {
                      // console.log('player popups (set): cell popup position is close to player',plyr.number,' @ ',invalidPos2,' dir ',dir);
                      dirs.push(dir);
                    }
                  }

                  // console.log('dirs',dirs,'popup.position',popup.position);
                  // if (popup.position === dir ) {
                  if (dirs.find((x) => x === popup.position)) {
                    plyr.popups.find((x) => x.msg === popup.msg).position = "";
                    plyr.popups.find((x) => x.msg === popup.msg).state = false;
                    console.log("A new invalid direction === popup's position. reconsidering...", popup.msg);
                  } else {
                    let popupProgress = false;
                    let showProgress = false;
                    let writeValue = false;
                    if (
                      plyr.prePush.state === true ||
                      plyr.prePull.state === true ||
                      plyr.dodging.state === true ||
                      plyr.action === "dodging" ||
                      plyr.action === "defending" ||
                      plyr.action === "attacking" ||
                      plyr.attacking.state === true
                    ) {
                      showProgress = true;
                    }
                    if (
                      popup.msg === "attacking" ||
                      popup.msg === "attacking1" ||
                      popup.msg === "attacking2" ||
                      popup.msg === "defending" ||
                      popup.msg === "prePush" ||
                      popup.msg === "prePull" ||
                      popup.msg === "dodging" ||
                      popup.msg === "charging"
                    ) {
                      popupProgress = true;
                    }

                    if (popup.img === "") {
                      popup.img = app.popupImageRef[popup.msg];
                    }

                    if (popup.msg.split("_")) {
                      if (popup.msg.split("_")[0] === "hpUp" || popup.msg.split("_")[0] === "hpDown") {
                        writeValue = true;
                        popup.img = app.popupImageRef[popup.msg.split("_")[0]];
                      }
                    }

                    popupDrawCoords = app.popupDrawCalc(popup.position, { x: point.x - 25, y: point.y - 25 }, plyr.number);
                    app.drawPopupBubble(
                      context2,
                      popupDrawCoords.origin.x,
                      popupDrawCoords.origin.y,
                      app.popupSize,
                      app.popupSize,
                      5,
                      popupDrawCoords.anchor.x,
                      popupDrawCoords.anchor.y,
                      popupBorderColor,
                    );
                    let centerPopupOffset = (app.popupSize - app.popupImgSize) / 2;

                    if (showProgress === true && popupProgress === true) {
                      let perc = app.playerPopupProgressCalc(plyr, popup);
                      context2.fillStyle = app.popupProgressImgGradColor2;
                      context2.beginPath();
                      // context2.roundRect(popupDrawCoords.origin.x,(popupDrawCoords.origin.y)+app.popupSize, app.popupSize, app.popupSize*perc, 5);
                      // context2.stroke();
                      context2.fillStyle = app.popupProgressImgGradColor1;
                      context2.roundRect(popupDrawCoords.origin.x, popupDrawCoords.origin.y + app.popupSize, 10, app.popupSize * perc, 5);
                      context2.fill();
                      // console.log(
                      //   "playerPopupProgress continue",
                      //   perc,
                      //   app.popupSize * perc
                      // );
                    }

                    if (writeValue === true) {
                      context2.font = "15px Arial";
                      context2.fillStyle = "black";
                      context2.fillText(
                        popup.msg.split("_")[1],
                        popupDrawCoords.origin.x + (app.popupSize - popup.msg.split("_")[1].length * 7) / 2,
                        popupDrawCoords.origin.y + 15,
                      );

                      centerPopupOffset = (app.popupSize - app.popupImgSize * 0.75) / 2;
                      context2.drawImage(
                        popup.img,
                        popupDrawCoords.origin.x + centerPopupOffset,
                        popupDrawCoords.origin.y + (centerPopupOffset + 5),
                        app.popupImgSize * 0.75,
                        app.popupImgSize * 0.75,
                      );
                    } else {
                      if (player.action === "defending" && popup.msg === "defending") {
                        if (player.defending.peak === true) {
                          popup.img = app.popupImageRef.defending_1;
                        }
                        if (player.defending.decay.state === true) {
                          let prog = 100 - (player.defending.decay.count / player.defending.decay.limit) * 100;
                          if (prog > 10) {
                            popup.img = app.popupImageRef.defending_4;
                          }
                          if (prog > 30) {
                            popup.img = app.popupImageRef.defending_3;
                          }
                          if (prog > 50) {
                            popup.img = app.popupImageRef.defending_2;
                          }
                          if (prog > 70) {
                            popup.img = app.popupImageRef.defending_1;
                          }
                        } else {
                          popup.img = app.popupImageRef.defending;
                        }
                      }
                      context2.drawImage(
                        popup.img,
                        popupDrawCoords.origin.x + centerPopupOffset,
                        popupDrawCoords.origin.y + centerPopupOffset,
                        app.popupImgSize,
                        app.popupImgSize,
                      );
                    }
                  }
                }
              }
            }
          }
        }

        app.players[plyr.number - 1] = plyr;
      }

      // OBSTACLES & BARRIERS

      // OBSTACLE BARRIER DIRECTIONAL ACTION ANIM
      for (const animAction of app.obstacleBarrierActionAnimationArray) {
        let lnWdth = 5;
        if (animAction.actionDirectionType === "thrust") {
          lnWdth = 8;
        }
        // for (const point of animAction.points) {
        //   context.fillStyle = point.color;
        //   context.beginPath();
        //   context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        //   context.fill();
        // }
        if (animAction.points.length > 1) {
          let lastPoint;

          context.beginPath();
          context.moveTo(animAction.points[0].x, animAction.points[0].y);
          for (var i = 1; i < animAction.points.length - 1; i++) {
            context.arcTo(animAction.points[i].x, animAction.points[i].y, animAction.points[i + 1].x, animAction.points[i + 1].y, 40);
          }
          lastPoint = animAction.points[animAction.points.length - 1];
          context.lineTo(lastPoint.x, lastPoint.y);

          context.strokeStyle = animAction.points[0].color;
          context.lineWidth = lnWdth;
          context.stroke();

          if (animAction.points[0].x2) {
            context.beginPath();
            context.moveTo(animAction.points[0].x2, animAction.points[0].y2);
            for (var i = 1; i < animAction.points.length - 1; i++) {
              context.arcTo(animAction.points[i].x2, animAction.points[i].y2, animAction.points[i + 1].x2, animAction.points[i + 1].y2, 30);
            }
            lastPoint = animAction.points[animAction.points.length - 1];
            context.lineTo(lastPoint.x, lastPoint.y);

            context.strokeStyle = animAction.points[0].color;
            context.lineWidth = lnWdth;
            context.stroke();
          }

          if (animAction.points[0].lineArray) {
            for (var i = 1; i < animAction.points.length - 1; i++) {
              if (i === animAction.points.length - 1) {
                let pointOuter = {
                  x: animAction.points[i].x,
                  y: animAction.points[i].y,
                  // x: animAction.points[i].lineArray[0].x,
                  // y: animAction.points[i].lineArray[0].y,
                };
                let pointInner = {
                  x: animAction.points[i].x2,
                  y: animAction.points[i].y2,
                  // x: animAction.points[i].lineArray[length]?.x,
                  // y: animAction.points[i].lineArray[length]?.y,
                };
                context.beginPath();
                context.moveTo(pointInner.x, pointInner.y);
                context.lineTo(pointOuter.x, pointOuter.y);

                context.strokeStyle = animAction.points[i].color;
                context.lineWidth = lnWdth;
                context.stroke();
              }
            }
          }
        }
      }

      // FALLING
      // IN BOUNDS
      if (gridInfoCell.obstacle.state === true && gridInfoCell.obstacle.moving.falling.state === true) {
        let obstacleImg = app.obstacleImgs[gridInfoCell.obstacle.type];

        context.drawImage(obstacleImg, gridInfoCell.obstacle.moving.nextPosition.x, gridInfoCell.obstacle.moving.nextPosition.y);
        gridInfoCell.obstacle.moving.nextPosition.y += 2;

        // console.log('falling obstacle',gridInfoCell.obstacle.moving.nextPosition,'x/y',x,y);
      }
      // OUT OF BOUNDS
      for (const obstacle of app.obstaclesOutOfBoundsFall) {
        // here!! draw at origin cell x/y
        // if (x === 0 && y === 0) {
        if (x === obstacle.moving.origin.number.x && y === obstacle.moving.origin.number.y) {
          // console.log('obstacle falling out of bounds b count',obstacle.moving.origin.center,'position',obstacle.moving.nextPosition);
          let obstacleImg = app.obstacleImgs[obstacle.type];
          context.drawImage(obstacleImg, obstacle.moving.nextPosition.x, obstacle.moving.nextPosition.y);
          obstacle.moving.nextPosition = {
            x: obstacle.moving.nextPosition.x,
            y: obstacle.moving.nextPosition.y + 2,
            // y: obstacle.moving.nextPosition.y+obstacle.moving.falling.count*5
          };
        }
      }

      // STATIONARY
      if (
        gridInfoCell.obstacle.state === true &&
        gridInfoCell.void.state !== true &&
        gridInfoCell.terrain.type !== "deep" &&
        gridInfoCell.obstacle.moving.falling.state !== true
      ) {
        let hide = false;

        if (app.obstacleBarrierToDestroy.length > 0) {
          for (const cell of app.obstacleBarrierToDestroy) {
            if (
              cell.type === "obstacle" &&
              gridInfoCell.number.x === cell.cell.number.x &&
              gridInfoCell.number.y === cell.cell.number.y &&
              gridInfoCell.obstacle.name === cell.cell.obstacle.name
            ) {
              hide = true;
            }
          }
        }

        if (app.halfPushBackObstacles.length > 0) {
          let obstacleImg = app.obstacleImgs[gridInfoCell.obstacle.type];

          for (const obs of app.halfPushBackObstacles) {
            if (obs.myCellNo.x === gridInfoCell.number.x && obs.myCellNo.y === gridInfoCell.number.y) {
              if (obs.state === true) {
                if (obs.countUp.state === true) {
                  hide = true;
                }
              }
            }
          }
        }

        if (hide !== true) {
          let obstacleImg = app.obstacleImgs[gridInfoCell.obstacle.type];

          if (gridInfoCell.obstacle.moving.state !== true) {
            context2.drawImage(obstacleImg, iso.x - offset.x, iso.y - obstacleImg.height);
          } else {
            // console.log('x/y',x,y);
            // context2.drawImage(obstacleImg, gridInfoCell.obstacle.moving.nextPosition.x-offset.x, gridInfoCell.obstacle.moving.nextPosition.y- Math.ceil(obstacleImg.height/2));
          }
        }
      }

      // MOVING
      for (const cell of app.gridInfo) {
        if (cell.obstacle.state === true && cell.obstacle.moving.state === true) {
          let drawHere = {
            x: cell.obstacle.moving.origin.number.x,
            y: cell.obstacle.moving.origin.number.y,
          };
          let direction = undefined;
          if (cell.obstacle.moving.destination.number.y === cell.obstacle.moving.origin.number.y + 1) {
            direction = "south";
          }
          if (cell.obstacle.moving.destination.number.y === cell.obstacle.moving.origin.number.y - 1) {
            direction = "north";
          }
          if (cell.obstacle.moving.destination.number.x === cell.obstacle.moving.origin.number.x - 1) {
            direction = "west";
          }
          if (cell.obstacle.moving.destination.number.x === cell.obstacle.moving.origin.number.x + 1) {
            direction = "east";
          }

          if (
            cell.obstacle.moving.destination.number.x !== null &&
            cell.obstacle.moving.destination.number.x > -1 &&
            cell.obstacle.moving.destination.number.x < app.gridWidth + 1
          ) {
            if (direction === "south" || direction === "east") {
              drawHere = cell.obstacle.moving.destination.number;
            }
          }

          if (x === drawHere.x && y === drawHere.y) {
            // console.log('x/y',x,y,direction,cell.obstacle.moving.step);

            let obstacleImg = app.obstacleImgs[cell.obstacle.type];
            context2.drawImage(
              obstacleImg,
              cell.obstacle.moving.nextPosition.x - offset.x,
              cell.obstacle.moving.nextPosition.y - Math.ceil(obstacleImg.height / 2, 30, 30),
            );
          }

          // console.log('falling obstacle',gridInfoCell.obstacle.moving.nextPosition,'x/y',x,y);
        }
      }
      // HALFPUSHBACK
      if (app.halfPushBackObstacles.length > 0) {
        let drawCell;
        for (const obs of app.halfPushBackObstacles) {
          // if (obs.state === true) {
          //   if (obs.countUp.state === true) {
          //     if (obs.countUp.count === 1 && !obs.coords.x && !obs.coords.y) {
          //       obs.coords = {
          //         x: (iso.x - offset.x),
          //         y: (iso.y - (obstacleImg.height)),
          //       }
          //       drawCell = app.calcElasticCountCoords('halfPushBack','obstacle',obs).drawCell;
          //       console.log('drawCell1',drawCell);
          //       if (x === drawCell.x && y === drawCell.y) {
          //           context2.drawImage(obstacleImg, obs.coords.x, obs.coords.y);
          //       }
          //
          //     }
          //     else {
          //
          //       obs.coords = app.calcElasticCountCoords('halfPushBack','obstacle',obs).coords;
          //       drawCell = app.calcElasticCountCoords('halfPushBack','obstacle',obs).drawCell;
          //       console.log('drawCell2',drawCell);
          //       if (x === drawCell.x && y === drawCell.y) {
          //           context2.drawImage(obstacleImg, obs.coords.x, obs.coords.y);
          //       }
          //     }
          //   }
          // }
          if (obs.myCellNo.x === gridInfoCell.number.x && obs.myCellNo.y === gridInfoCell.number.y && gridInfoCell.obstacle.type) {
            if (obs.state === true) {
              if (obs.countUp.state === true) {
                let obstacleImg = app.obstacleImgs[gridInfoCell.obstacle.type];
                if (obs.countUp.count === 1 && !obs.coords.x && !obs.coords.y) {
                  obs.coords = {
                    x: iso.x - offset.x,
                    y: iso.y - obstacleImg.height,
                  };
                  context2.drawImage(obstacleImg, obs.coords.x, obs.coords.y);
                } else {
                  obs.coords = app.calcElasticCountCoords("halfPushBack", "obstacle", obs).coords;
                  context2.drawImage(obstacleImg, obs.coords.x, obs.coords.y);
                }
              }
            }
          }
        }
      }

      // DROP ITEMS & DAMAGE/DESTROY OBSTACLES & BARRIERS
      for (const cell of app.obstacleBarrierToDestroy) {
        if (gridInfoCell.number.x === cell.cell.number.x && gridInfoCell.number.y === cell.cell.number.y) {
          // if (gridInfoCell.number.x === cell.cell.number.x && gridInfoCell.number.y === cell.cell.number.y && (cell.cell.obstacle.type || cell.cell.barrier.type)) {
          if (cell.count % 3 === 0) {
            if (cell.type === "obstacle" && cell.cell.obstacle.type) {
              let obstacleImg = app.obstacleImgs[cell.cell.obstacle.type];
              context2.drawImage(obstacleImg, iso.x - offset.x, iso.y - obstacleImg.height);
            }
            if (cell.type === "barrier" && cell.cell.barrier.type) {
              let barrierImg = app.barrierImgs[cell.cell.barrier.type][cell.cell.barrier.position];
              context2.drawImage(barrierImg, iso.x - offset.x, iso.y - barrierImg.height, barrierImg.width, barrierImg.height);
            }
          }
        }
      }
      for (const cell of app.obstacleItemsToDrop) {
        // console.log('obstacleItemsToDrop',cell);
        if (gridInfoCell.number.x === cell.target.x && gridInfoCell.number.y === cell.target.y) {
          if (cell.count % 3 === 0) {
            let itemImg;
            if (cell.item.type === "item") {
              itemImg = app.itemImgs[cell.item.name];
            }
            if (cell.item.type === "weapon" || cell.item.type === "armor") {
              itemImg = app.itemImgs[cell.item.subType];
            }
            context2.drawImage(itemImg, center.x - 15, center.y - 15);
          }
        }
      }

      // STATIONARY BARRIERS
      if (gridInfoCell.barrier.state === true && gridInfoCell.void.state !== true) {
        let hide = false;

        if (app.obstacleBarrierToDestroy.length > 0) {
          for (const cell of app.obstacleBarrierToDestroy) {
            if (
              cell.type === "barrier" &&
              gridInfoCell.number.x === cell.cell.number.x &&
              gridInfoCell.number.y === cell.cell.number.y &&
              gridInfoCell.barrier.name === cell.cell.barrier.name
            ) {
              hide = true;
            }
          }
        }

        if (hide !== true) {
          let barrierImg = app.barrierImgs[gridInfoCell.barrier.type][gridInfoCell.barrier.position];
          context2.drawImage(barrierImg, iso.x - offset.x, iso.y - barrierImg.height, barrierImg.width, barrierImg.height);
        }
      }

      // PROJECTILES
      for (const bolt of app.projectiles) {
        if (bolt.currentPosition.number.x === x && bolt.currentPosition.number.y === y) {
          let boltImg;
          switch (bolt.direction) {
            case "north":
              boltImg = app.boltImgs[bolt.direction];
              break;
            case "south":
              boltImg = app.boltImgs[bolt.direction];
              break;
            case "east":
              boltImg = app.boltImgs[bolt.direction];
              break;
            case "west":
              boltImg = app.boltImgs[bolt.direction];
              break;
          }
          // console.log("dd", boltImg, bolt.direction);

          // context2.fillStyle = "black";
          // context2.fillRect(bolt.currentPosition.center.x, bolt.currentPosition.center.y,10,5);
          // app.testDraw.push({color:'green',x:bolt.currentPosition.center.x,y:bolt.currentPosition.center.y})
          context2.drawImage(boltImg, bolt.currentPosition.center.x - 15, bolt.currentPosition.center.y - 15, 35, 35);
        }
      }

      // CELL POPUPS
      if (app.hideAllPopups !== true) {
        // if (x === 0 && y === 0) {
        if (x === app.gridWidth && y === app.gridWidth) {
          // console.log(app.pickupAmmoRef.current);

          for (const popup of app.cellPopups) {
            let popupBorderColor = "black";
            if (popup.state === true) {
              // console.log("drawing a popup", popup.cell.number);
              // console.log('drawing a popup');
              let popupDrawCoords;
              if (popup.position === "" || !popup.position) {
                let currentPopups = app.cellPopups.filter((x) => x.state === true);
                let currentPopupsThisCell = app.cellPopups.filter(
                  (x) => x.state === true && x.cell.number.x === popup.cell.number.x && x.cell.number.y === popup.cell.number.y,
                );
                let positions = ["north", "east", "south", "west", "northEast", "northWest", "southEast", "southWest"];

                if (popup.color === "") {
                  popup.color = app.cellColorRef.find((x) => x.x === popup.cell.number.x && x.y === popup.cell.number.y).color;
                }

                // REMOVE POSITIONS OF POPUPS ALREADY DRAWN FOR THIS CELL
                for (const popup2 of currentPopupsThisCell) {
                  if (popup2.position && popup2.position !== "") {
                    let indx = positions.indexOf(popup2.position);
                    positions.splice(indx, 1);
                  }
                }

                let dir = undefined;
                let dirs = [];

                for (const plyr2 of app.players) {
                  if (plyr2.ai.state !== true) {
                    let myPos = popup.cell.number;
                    let invalidPos = app.players[plyr2.number - 1].currentPosition.cell.number;
                    // let invalidPositions = [invalidPos];

                    // GET DIRECTION OF PLAYER CELL RELATIVE TO ME
                    dir = app.getDirectionFromCells(myPos, invalidPos);

                    if (dir && positions.includes(dir) === true) {
                      positions.splice(positions.indexOf(dir), 1);
                      // console.log('dont draw over player @',dir,'choose frome these position',positions);
                    }

                    // GET DIRECTION THAT ALL OTHER PLAYER'S POPUPS OCCUPY, RELATIVE TO ME
                    for (const pop of plyr2.popups) {
                      dir = undefined;

                      if (pop.state === true) {
                        let invalidPos2 = {
                          x: undefined,
                          y: undefined,
                        };

                        invalidPos2 = app.getCellFromDirection(1, invalidPos, pop.position);

                        // let dir = undefined;

                        dir = app.getDirectionFromCells(myPos, invalidPos2);

                        if (dir && positions.includes(dir) === true) {
                          positions.splice(positions.indexOf(dir), 1);
                          // console.log('dont draw over player @',dir,'choose frome these position',positions);
                        }
                      }
                    }
                  }
                }

                // GET DIRECTION OF CELLS THAT AREN'T THIS CELL'S POPUPS' POPUPS CELLS RELATIVE TO ME
                for (const popup2 of currentPopups) {
                  dir = undefined;

                  if (
                    popup.cell.number.x !== popup2.cell.number.x &&
                    popup.cell.number.y !== popup2.cell.number.y &&
                    popup2.msg !== popup.msg &&
                    popup2.state === true
                  ) {
                    let myPos = popup.cell.number;
                    let cellPos = popup2.cell.number;
                    let invalidPos2 = {
                      x: undefined,
                      y: undefined,
                    };

                    invalidPos2 = app.getCellFromDirection(1, cellPos, popup2.position);

                    dir = app.getDirectionFromCells(myPos, invalidPos2);

                    if (dir && positions.includes(dir) === true) {
                      positions.splice(positions.indexOf(dir), 1);
                      // console.log('dont draw over player @',dir,'choose frome these position',positions);
                    }
                  }
                }

                if (!positions[0]) {
                  // console.log('no open positions for', popup.msg);
                  popup.state = false;
                  popup.count = 0;
                } else {
                  popup.position = positions[0];
                }

                popup.img = app.popupImageRef[popup.msg];

                popupDrawCoords = app.popupDrawCalc(popup.position, { x: popup.cell.center.x - 25, y: popup.cell.center.y - 15 }, 0);
                app.drawPopupBubble(
                  context2,
                  popupDrawCoords.origin.x,
                  popupDrawCoords.origin.y,
                  app.popupSize,
                  app.popupSize,
                  5,
                  popupDrawCoords.anchor.x,
                  popupDrawCoords.anchor.y,
                  popup.color,
                );
                // context2.fillStyle = 'black';
                // context2.fillText(""+popup.type+"", popupDrawCoords.origin.x+10, popupDrawCoords.origin.y+5);
                // console.log('popup.msg',popup.msg,popup.img);
                let centerPopupOffset = (app.popupSize - app.popupImgSize) / 2;
                context2.drawImage(
                  popup.img,
                  popupDrawCoords.origin.x + centerPopupOffset,
                  popupDrawCoords.origin.y + centerPopupOffset,
                  app.popupImgSize,
                  app.popupImgSize,
                );
              } else {
                let dir = undefined;
                let dirs = [];

                let currentPopupsNotThis = app.cellPopups.filter(
                  (x) =>
                    x.state === true && x.msg !== popup.msg && x.cell.number.x !== popup.cell.number.x && x.cell.number.y !== popup.cell.number.y,
                );

                for (const plyr2 of app.players) {
                  if (plyr2.ai.state !== true) {
                    let myPos = popup.cell.number;
                    let invalidPos = app.players[plyr2.number - 1].currentPosition.cell.number;

                    // invalidpostions2 push plyr2 position
                    // for player popups
                    //   invalid cell = pop.cell.number + popup position mod, invalposits2 push invalidcell
                    //

                    dir = app.getDirectionFromCells(myPos, invalidPos);

                    dirs.push(dir);

                    for (const pop of plyr2.popups) {
                      if (pop.state === true) {
                        let invalidPos2 = {
                          x: undefined,
                          y: undefined,
                        };

                        invalidPos2 = app.getCellFromDirection(1, invalidPos, pop.position);

                        dir = app.getDirectionFromCells(myPos, invalidPos2);

                        // if (dir && positions.includes(dir) === true) {
                        //   positions.splice(positions.indexOf(dir),1);
                        //   // console.log('dont draw over player @',dir,'choose frome these position',positions);
                        // }
                        dirs.push(dir);
                      }
                    }
                  }
                }

                for (const popup2 of currentPopupsNotThis) {
                  dir = undefined;

                  if (popup2.msg !== popup.msg && popup2.state === true) {
                    let myPos = popup.cell.number;

                    let cellPos = popup2.cell.number;
                    let invalidPos2 = {
                      x: undefined,
                      y: undefined,
                    };

                    invalidPos2 = app.getCellFromDirection(1, cellPos, popup2.position);

                    dir = app.getDirectionFromCells(myPos, invalidPos2);

                    dirs.push(dir);
                  }
                }

                // if (popup.position === dir ) {
                if (dirs.find((x) => x === popup.position)) {
                  // for (const pop of app.cellPopups) {
                  //   pop.position = '';
                  //   pop.state = false;
                  // }
                  app.cellPopups.find(
                    (x) => x.msg === popup.msg && x.cell.number.x === popup.cell.number.x && x.cell.number.x === popup.cell.number.x,
                  ).state = false;
                  app.cellPopups.find(
                    (x) => x.msg === popup.msg && x.cell.number.x === popup.cell.number.x && x.cell.number.x === popup.cell.number.x,
                  ).position = "";
                  // console.log('reconsidering...',popup.msg);
                } else {
                  popup.img = app.popupImageRef[popup.msg];
                  popupDrawCoords = app.popupDrawCalc(
                    popup.position,
                    {
                      x: popup.cell.center.x - 25,
                      y: popup.cell.center.y - 15,
                    },
                    0,
                  );
                  // app.drawPopupBubble2(context2,popupDrawCoords.origin.x,popupDrawCoords.origin.y,app.popupSize,app.popupSize,2)
                  app.drawPopupBubble(
                    context2,
                    popupDrawCoords.origin.x,
                    popupDrawCoords.origin.y,
                    app.popupSize,
                    app.popupSize,
                    5,
                    popupDrawCoords.anchor.x,
                    popupDrawCoords.anchor.y,
                    popup.color,
                  );
                  // context2.fillStyle = 'black';
                  // context2.fillText(""+popup.type+"", popupDrawCoords.origin.x+10, popupDrawCoords.origin.y+5);
                  // console.log('popup.msg',popup.msg);
                  let centerPopupOffset = (app.popupSize - app.popupImgSize) / 2;
                  context2.drawImage(
                    popup.img,
                    popupDrawCoords.origin.x + centerPopupOffset,
                    popupDrawCoords.origin.y + centerPopupOffset,
                    app.popupImgSize,
                    app.popupImgSize,
                  );
                }
              }
            }
          }
        }
      }

      // CAMERA FOCUS POINT
      if (x === app.gridWidth && y === app.gridWidth) {
        // console.log("Camera centered");
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(app.camera.focus.x, app.camera.focus.y, 10, 0, 2 * Math.PI);
        // context.arc(app.camera.zoomFocusPan.x, app.camera.zoomFocusPan.y, 10, 0, 2 * Math.PI);
        context.fill();
      }

      // TEST DRAW

      if (app.testDraw.length > 1) {
        if (x === app.gridWidth && y === app.gridWidth) {
          for (const point of app.testDraw) {
            context.fillStyle = point.color;
            context.beginPath();
            context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            context.fill();
          }
        }
        if (app.testDraw[0]?.type === "arcCrementer") {
          let lastPoint;
          context.beginPath();
          context.moveTo(app.testDraw[0].x, app.testDraw[0].y);
          for (var i = 1; i < app.testDraw.length - 1; i++) {
            context.arcTo(app.testDraw[i].x, app.testDraw[i].y, app.testDraw[i + 1].x, app.testDraw[i + 1].y, 20);
          }
          lastPoint = app.testDraw[app.testDraw.length - 1];
          context.lineTo(lastPoint.x, lastPoint.y);

          context.strokeStyle = app.testDraw[0].color;
          context.lineWidth = 5;
          context.stroke();

          if (app.testDraw[0].x2) {
            context.beginPath();
            context.moveTo(app.testDraw[0].x2, app.testDraw[0].y2);
            for (var i = 1; i < app.testDraw.length - 1; i++) {
              context.arcTo(app.testDraw[i].x2, app.testDraw[i].y2, app.testDraw[i + 1].x2, app.testDraw[i + 1].y2, 30);
            }
            lastPoint = app.testDraw[app.testDraw.length - 1];
            context.lineTo(lastPoint.x, lastPoint.y);

            context.strokeStyle = app.testDraw[0].color;
            context.lineWidth = 5;
            context.stroke();
          }

          if (app.testDraw[0].lineArray?.length > 0) {
            for (var i = 0; i < app.testDraw.length - 0; i++) {
              let pointOuter = {
                x: app.testDraw[i].x,
                y: app.testDraw[i].y,
                // x: app.testDraw[i].lineArray[0].x,
                // y: app.testDraw[i].lineArray[0].y,
              };
              let pointInner = {
                x: app.testDraw[i].x2,
                y: app.testDraw[i].y2,
                // x: app.testDraw[i].lineArray[length]?.x,
                // y: app.testDraw[i].lineArray[length]?.y,
              };
              context.beginPath();
              context.moveTo(pointInner.x, pointInner.y);
              context.lineTo(pointOuter.x, pointOuter.y);

              context.strokeStyle = app.testDraw[i].color;
              context.lineWidth = 5;
              context.stroke();
            }
          }
        } else {
          for (const point of app.testDraw) {
            if (x === app.gridWidth && y === app.gridWidth) {
              context.fillStyle = point.color;
              context.beginPath();
              context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
              context.fill();
            }
          }
        }
      }
    }
  }

  app.players[player.number - 1] = player;

  // if (player.ai.state === true ) {
  //   app.aiEvaluate(player)
  // }
}
