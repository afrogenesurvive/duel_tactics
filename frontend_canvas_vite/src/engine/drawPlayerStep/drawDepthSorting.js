export function drawDepthSorting(app, plyr, context, context2, updatedPlayerImg, sx, sy, sWidth, sHeight, newCharDrawPoint, x, y) {
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
        context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, finalCoords.x, finalCoords.y, app.playerDrawWidth2, app.playerDrawHeight2);
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
        context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, finalCoords.x, finalCoords.y, app.playerDrawWidth2, app.playerDrawHeight2);
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
        context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, finalCoords.x, finalCoords.y, app.playerDrawWidth2, app.playerDrawHeight2);
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
        // console.log("drawPlyr dflct dpth srt", {
        //   drawCellx: drawCell.x,
        //   drawCelly: drawCell.y,
        //   finalCoordsx: finalCoords.x,
        //   finalCoordsy: finalCoords.y,
        // });

        context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, finalCoords.x, finalCoords.y, app.playerDrawWidth2, app.playerDrawHeight2);
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
      // console.log("deflected elastic counter overflow?", plyr.success.deflected.count);
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
        context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, finalCoords.x, finalCoords.y, app.playerDrawWidth2, app.playerDrawHeight2);
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
}
