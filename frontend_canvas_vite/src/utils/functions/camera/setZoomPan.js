export function setZoomPan(app, canvas) {
  // console.log('setZoomPan');
  // ADJUST PAN AND ZOOM RELATIVE TO EACH OTHER TO KEEP CENTERED WHEN ZOOMING IN
  // AND CENTERING THE GRID WHEN ZOOMING OUT

  let zoom = app.camera.zoom.x;

  let diff;

  // if (parseFloat(zoom.toFixed(2)) === zoomThresh) {
  if (zoom - 1 === app.zoomThresh) {
    console.log("at zoomThresh");
    app.camera.pan.x = -1;
    app.camera.pan.y = -1;

    app.camera.adjustedPan.x = -1;
    app.camera.adjustedPan.y = -1;

    app.camera.zoomFocusPan.x = (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
    app.camera.zoomFocusPan.y = (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;

    // app.camera.limits.pan.x.max = 400;
    // app.camera.limits.pan.x.min = -400;
  }

  // ZOOMING IN & OUT ABOVE THRESHOLD
  if (zoom - 1 < app.zoomThresh) {
    console.log("above zoomThresh");

    if (app.camera.mode === "zoom" && app.camera.zoomDirection === "in") {
      app.camera.zoomFocusPan.x = (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
      app.camera.zoomFocusPan.y = (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;
    }

    if (app.camera.mode === "zoom" && app.camera.zoomDirection === "out") {
      // ADJUST PAN INCREMENT FOR ZOOM OUT CENTERING

      let increment = 70;

      if (app.camera.pan.x > -1) {
        increment = app.camera.pan.x;
        app.camera.pan.x -= increment;
        app.camera.adjustedPan.x -= 20 * (app.camera.zoom.x - 1);
        app.camera.panDirection = "east";
      }
      if (app.camera.pan.x < -1) {
        increment = app.camera.pan.x * -1;
        app.camera.pan.x += increment;
        app.camera.adjustedPan.x += 20 * (app.camera.zoom.x - 1);
        app.camera.panDirection = "west";
      }

      if (app.camera.pan.y < -1) {
        increment = app.camera.pan.y * -1;
        app.camera.pan.y += increment;
        // app.camera.pan.y += 45;
        app.camera.adjustedPan.y += 1.5 * (app.camera.zoom.x - 1);
        app.camera.panDirection = "north";
      }
      if (app.camera.pan.y > -1) {
        increment = app.camera.pan.y;
        app.camera.pan.y -= increment;
        // app.camera.pan.y -= 45;
        app.camera.adjustedPan.y -= 1.5 * (app.camera.zoom.x - 1);
        app.camera.panDirection = "south";
      }

      // console.log(
      //   "increment2 ",
      //   increment,
      //   "zoom",
      //   zoom - 1,
      //   "pan x,y",
      //   app.camera.pan.x,
      //   app.camera.pan.y
      // );
      app.camera.zoomFocusPan.x = (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
      app.camera.zoomFocusPan.y = (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;
    }

    // app.camera.zoomFocusPan.x = ((canvas.width/2)*(1-zoom)+1)+(app.camera.pan.x*zoom);
    // app.camera.zoomFocusPan.y = ((canvas.height/2)*(1-zoom)+1)+(app.camera.pan.y*zoom);
  }

  // ZOOMING BELOW THRESHOLD
  if (zoom - 1 > app.zoomThresh) {
    console.log("below zoomThresh", zoom - 1, app.zoomThresh);
    diff = zoom - 1;
    let diffx;
    let diffy;

    if (app.camera.mode === "pan") {
      app.camera.zoomFocusPan.x = (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
      app.camera.zoomFocusPan.y = (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;
    }
    if (app.camera.mode === "zoom") {
      // ZOOM INTO WHAT CAMERA IS CENTERED ON (MAGIC FORMULA!!!)
      if (app.camera.zoomDirection === "in") {
        // app.camera.zoomFocusPan.x = (canvas.width / 2) - (app.players[0].currentPosition.cell.center.x * zoom);
        // app.camera.zoomFocusPan.y = (canvas.height / 2) - (app.players[0].currentPosition.cell.center.y * zoom);

        // app.camera.zoomFocusPan.x = (canvas.width / 2) - (app.players[0].currentPosition.cell.center.x * zoom-1);
        // app.camera.zoomFocusPan.y = (canvas.height / 2) - (app.players[0].currentPosition.cell.center.y * zoom-1);

        // app.camera.zoomFocusPan.x = (diff*(canvas.width/2));
        // app.camera.zoomFocusPan.y = (diff*(canvas.width/2))-(diff*(canvas.width/6));

        // app.camera.zoomFocusPan.x = ((canvas.width/2)*(1-zoom)+1)+(app.camera.pan.x*zoom);
        // app.camera.zoomFocusPan.y = ((canvas.height/2)*(1-zoom)+1)+(app.camera.pan.y*zoom);

        app.camera.zoomFocusPan.x = (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
        app.camera.zoomFocusPan.y = (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;
      }

      // WHEN ZOOMING OUT INSIDE THRESHOLD, TEND TOWARDS A CENTER ALIGNMENT
      if (app.camera.zoomDirection === "out") {
        let zoomSteps = ((zoom - 1 - app.zoomThresh) / 0.02).toFixed(0);
        zoomSteps = parseInt(zoomSteps);
        if (zoomSteps === 0) {
          zoomSteps = 1;
        }

        // ADJUST PAN INCREMENT FOR ZOOM OUT CENTERING

        let xIncrement = 10;
        let yIncrement = 3.5;

        if (app.camera.pan.x > -1) {
          if (app.camera.pan.x !== 0 && zoomSteps !== 0) {
            xIncrement = (app.camera.pan.x / zoomSteps).toFixed(0);
          } else {
            // console.log('1 pan',app.camera.pan.x,'zoomSteps',zoomSteps);
            xIncrement = 0;
          }
          app.camera.pan.x -= xIncrement;
          app.camera.adjustedPan.x -= 20 * (app.camera.zoom.x - 1);
          app.camera.panDirection = "east";
        }
        if (app.camera.pan.x < -1) {
          if (app.camera.pan.x !== 0 && zoomSteps !== 0) {
            xIncrement = (app.camera.pan.x / zoomSteps).toFixed(0) * -1;
          } else {
            // console.log('2 pan',app.camera.pan.x,'zoomSteps',zoomSteps);
            xIncrement = 0;
          }
          app.camera.pan.x += xIncrement;
          app.camera.adjustedPan.x += 20 * (app.camera.zoom.x - 1);
          app.camera.panDirection = "west";
        }

        if (app.camera.pan.y < -1) {
          if (app.camera.pan.y !== 0 && zoomSteps !== 0) {
            yIncrement = (app.camera.pan.y / zoomSteps).toFixed(0) * -1;
          } else {
            // console.log('3 pan',app.camera.pan.y,'zoomSteps',zoomSteps);
            yIncrement = 0;
          }
          app.camera.pan.y += yIncrement;
          app.camera.adjustedPan.y += 1.5 * (app.camera.zoom.x - 1);
          app.camera.panDirection = "north";
        }
        if (app.camera.pan.y > -1) {
          if (app.camera.pan.y !== 0 && zoomSteps !== 0) {
            yIncrement = (app.camera.pan.y / zoomSteps).toFixed(0);
          } else {
            // console.log('4 pan',app.camera.pan.y,'zoomSteps',zoomSteps);
            yIncrement = 0;
          }
          app.camera.pan.y -= yIncrement;
          app.camera.adjustedPan.y -= 1.5 * (app.camera.zoom.x - 1);
          app.camera.panDirection = "south";
        }

        // console.log('increment x,y',xIncrement,yIncrement,'zoom',zoom-1,'pan x,y',app.camera.pan.x,app.camera.pan.y);
        app.camera.zoomFocusPan.x = (canvas.width / 2) * (1 - zoom) + 1 + app.camera.pan.x * zoom;
        app.camera.zoomFocusPan.y = (canvas.height / 2) * (1 - zoom) + 1 + app.camera.pan.y * zoom;
      }
    }

    // SET PAN LIMITS BASED ON ZOOM
    let zoomMod;
    if (zoom - 1 > 0) {
      zoomMod = zoom - 1;
    } else {
      zoomMod = 0.01;
      // zoomMod = 1;
    }
    let baseLimit = 0;
    let baseLimitMod = 0;

    // console.log('zoomMod',zoomMod);

    let panAmount;
    switch (app.camera.panDirection) {
      case "north":
        baseLimit = 200;
        if (app.gridWidth >= 12) {
          baseLimit = 250;
        }
        if (app.camera.state !== true && app.camera.fixed !== true && app.camera.instructions[app.camera.currentInstruction]) {
          baseLimit += 100;
        }
        panAmount = app.camera.pan.y;
        app.camera.limits.pan.y.max = baseLimit + (zoomMod / 5) * panAmount;
        // console.log('1',baseLimit,panAmount,zoomMod);
        break;
      case "south":
        baseLimit = -200;
        if (app.gridWidth >= 12) {
          baseLimit = -200;
        }
        if (app.camera.state !== true && app.camera.fixed !== true && app.camera.instructions[app.camera.currentInstruction]) {
          baseLimit -= 100;
        }
        panAmount = app.camera.pan.y;
        app.camera.limits.pan.y.min = baseLimit + (zoomMod / 5) * panAmount;
        // console.log('2',baseLimit,panAmount,zoomMod);
        break;
      case "east":
        // baseLimit = -400;
        baseLimit = -300;
        if (app.gridWidth >= 12) {
          baseLimit = -400;
        }
        if (app.camera.state !== true && app.camera.fixed !== true && app.camera.instructions[app.camera.currentInstruction]) {
          baseLimit -= 100;
        }
        panAmount = app.camera.pan.x;
        app.camera.limits.pan.x.min = baseLimit + (zoomMod / 5) * panAmount;
        // console.log('3',baseLimit,panAmount,zoomMod);
        break;
      case "west":
        // baseLimit = 400;
        baseLimit = 300;
        if (app.gridWidth >= 12) {
          baseLimit = 400;
        }
        if (app.camera.state !== true && app.camera.fixed !== true && app.camera.instructions[app.camera.currentInstruction]) {
          baseLimit += 100;
        }
        panAmount = app.camera.pan.x;
        app.camera.limits.pan.x.max = baseLimit + (zoomMod / 5) * panAmount;
        // console.log('4',baseLimit,panAmount,zoomMod);
        break;
      default:
        break;
    }
    // console.log('baseLimit',baseLimit);
    // console.log('panAmount',panAmount);
    // console.log('x: min ',app.camera.limits.pan.x.min,' max ',app.camera.limits.pan.x.max);
    // console.log('y: min ',app.camera.limits.pan.y.min,' max ',app.camera.limits.pan.y.max);
  }

  const x = app.canvasWidth / 2;
  const y = app.canvasHeight / 2;
  let newX = (x - app.camera.zoomFocusPan.x) / app.camera.zoom.x;
  let newY = (y - app.camera.zoomFocusPan.y) / app.camera.zoom.y;
  app.camera.focus.x = newX;
  app.camera.focus.y = newY;

  // console.log('ZFP!',app.camera.zoomFocusPan.x.toFixed(2),',',app.camera.zoomFocusPan.y.toFixed(2));
}
