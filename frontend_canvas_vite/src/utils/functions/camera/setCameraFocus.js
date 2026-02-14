export function setCameraFocus(app, focusType, canvas, context, canvas2, context2) {
  console.log("setting camera focus", "zoom", app.camera.zoom.x, "pan", app.camera.pan);

  if (focusType === "init" || focusType === "reset") {
    if (app.camera.mode === "pan") {
      app.camera.focus.x = canvas.width / 2;
      app.camera.focus.y = canvas.height / 2;
    }

    if (app.camera.mode === "zoom") {
      app.camera.focus.x = canvas.width / 2;
      app.camera.focus.y = canvas.height / 2;
    }
  }

  if (focusType === "input") {
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    }

    let zoom = app.camera.zoom.x;
    if (app.camera.mode === "pan") {
      // console.log('beep');
      switch (app.camera.panDirection) {
        case "north":
          app.camera.focus.y -= 10;
          break;
        case "south":
          app.camera.focus.y += 10;
          break;
        case "east":
          app.camera.focus.x += 10;
          break;
        case "west":
          app.camera.focus.x -= 10;
          break;
        default:
      }
    }

    if (app.camera.mode === "zoom") {
      // if (app.camera.zoomDirection === 'out' && app.camera.zoom.x > 1) {
      //
      //
      //
      //     if (app.camera.pan.x !== -1) {
      //
      //       if (app.camera.pan.x < 1) {
      //         // app.camera.focus.x -= 10;
      //         app.camera.focus.x -= (10*app.camera.zoom.x);
      //       }
      //       if (app.camera.pan.x > 1) {
      //         // app.camera.focus.x += 10;
      //         app.camera.focus.x += (10*app.camera.zoom.x);
      //       }
      //
      //     }
      //     if (app.camera.pan.y !== -1) {
      //
      //       if (app.camera.pan.y < 1) {
      //         // app.camera.focus.y -= 10;
      //         app.camera.focus.y -= (5*app.camera.zoom.x);
      //       }
      //       if (app.camera.pan.y > 1) {
      //         // app.camera.focus.y += 10;
      //         app.camera.focus.y += (5*app.camera.zoom.x);
      //       }
      //
      //     }
      //
      //
      app.camera.focus.x = (canvas.width / 2 - app.camera.zoomFocusPan.x) / app.camera.zoom.x;
      app.camera.focus.y = (canvas.height / 2 - app.camera.zoomFocusPan.y) / app.camera.zoom.y;
      // const x = app.canvasWidth/2;
      // const y = app.canvasHeight/2;
      // app.camera.focus.x = (x-app.camera.zoomFocusPan.x)/app.camera.zoom.x;
      // app.camera.focus.y = (y-app.camera.zoomFocusPan.y)/app.camera.zoom.y;
      //
      // }
      //
      // if (app.camera.zoomDirection === 'in') {
      //
      //
      // }
    }
  }

  // console.log('camera focus set',app.camera.focus,focusType,'zoom',app.camera.zoom,'pan',app.camera.pan);
}
